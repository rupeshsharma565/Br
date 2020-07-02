import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import config from '../../config';
import { goBack, sendHome, checkresponse, validation, sessioncheck,HBRout,priceOnPercent,toastMessage,securityCall } from '../../Comman';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';
let swindow=window;
securityCall(swindow);

class Checkout extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      amount:  (this.props.match.params.amount) ? (this.props.match.params.amount) :0,
      isDisabled:true,
      orderData:{},
      order_id:"",
      payment_method:(this.props.match.params.type) ? this.props.match.params.type :"",
      promocode:(this.props.match.params.promocode && this.props.match.params.promocode !=="no") ? atob(this.props.match.params.promocode) :""
    };
    sessioncheck();
    this.createOrder = this.createOrder.bind(this);
  }


  componentDidMount() {
    sessioncheck();
    const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          document.body.appendChild(script);
    this.createOrder();
  }

  getPrivateContestInfo = () => {
    this._isMounted = true;
    var formthis = this;
    let args = {atype:"pvtcontest"};
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body:JSON.stringify(args)
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/appsettings";

    formthis.setState({
      privateContestInfo: {}
    })

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({
                  privateContestInfo: json.data,
                  minWinPrize:(json.data.pvtcontest) ? json.data.pvtcontest.winprize.min :0,
                  maxWinPrize:(json.data.pvtcontest) ? json.data.pvtcontest.winprize.max :1000,
                  minContestSize:(json.data.pvtcontest) ? json.data.pvtcontest.cnstsize.min :2,
                  maxContestSize:(json.data.pvtcontest) ? json.data.pvtcontest.cnstsize.max :100,
                  admincommission:(json.data.pvtcontest) ? json.data.pvtcontest.adminchrg :0,
                  minEntryFees:(json.data.pvtcontest) ? json.data.pvtcontest.min_entry_fees :0
                })
              }

            }
            else {
              if(formthis._isMounted){
                formthis.setState({
                  privateContestInfo: {}
                })
              }
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  createOrder = () => {
    this._isMounted = true;
    var formthis = this;
    let args = {amount:formthis.state.amount,pcode:formthis.state.promocode};
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body:JSON.stringify(args)
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/razorpay/createorder";

    formthis.setState({
      orderData: {}
    })

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({
                  orderData: json.data,
                  order_id:(json.data.rorderid) ? json.data.rorderid :"",
                  pcode:(formthis.state.promocode)?formthis.state.promocode:""
                })

                let options = {
                  "key": `${config.RAZORPAY_KEY}`,
                  "amount": formthis.state.amount*100, // 2000 paise = INR 20, amount in paisa
                  "name": `${config.PRODUCT_NAME}`,
                  "order_id":(json.data.rorderid) ? json.data.rorderid :"",
                  "description": "Purchase Description",
                  "image": "https://play.11plays.com/assets/img/logo.png",
                  "handler": function (response){
                    var params = response;
                    formthis.doPayment(params);
                  },
                  "prefill": {
                    "name": (json.data.username) ? json.data.username :"",
                    "email": (json.data.email) ? json.data.email :"",
                    "contact":(json.data.phone) ? json.data.phone :""
                  },
                  "notes": {
                    "description": "Add money to wallet"
                  },
                  "theme": {
                    "color": "#640eb3"
                  }
                };
                const rzp1 = new window.Razorpay(options)
                //let rzp = new Razorpay(options);
                rzp1.open();
              }

            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  doPayment = (params) => {
    this._isMounted = true;
    var formthis = this;
    let args = params;
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body:JSON.stringify(args)
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/razorpay/payment";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              checkresponse("Success", response.status, json.msg, 1);
              formthis.setState({
                amount:""
              })
              window.location.href =HBRout+ "/MyAccount";
            }else{
              checkresponse("Wrong", response.status, json.msg, 1);
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  onChange= (e)=>{
    const formthis = this;
    let {name, value} = e.target;
    
    formthis.setState({
      [name]: value
    });
  }

  render() {
    const formthis = this;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
        <ToastContainer />
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={this.goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Pay With Razorpay</div>
            </div>
            {/* <AvForm onValidSubmit={this.createOrder}>
              <div className="my_profilepage">
                <div className="myprofile_details">
                  <div className="profile_titalhead">
                  </div>
                  <div className="profile_fieldsdetails">
                    <div className="form-group">
                      <AvField type="number" label="Amount" className="form-control" name="amount" onChange={formthis.onChange} value={formthis.state.amount} placeholder={"min Rs 1"}
                      validate={{
                        required: { value: true, errorMessage: "Please enter amount" },
                        // pattern: { value: "^[0-9]\d*$", errorMessage: 'Only positive numbers allowed' },
                        min: { value: 1, errorMessage: 'Mininmum amount should be Rs 1' }
                      }} />
                    </div>
                  </div>
                  <button className={"all_transaction up_bt pointer"}>PAY</button>
                </div>
              </div>
            </AvForm> */}


          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
