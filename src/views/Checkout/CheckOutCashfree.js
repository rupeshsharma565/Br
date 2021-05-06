import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import config from "../../config";
import {
  goBack,
  sendHome,
  checkresponse,
  validation,
  sessioncheck,
  HBRout,
  priceOnPercent,
  toastMessage,
  securityCall
} from "../../Comman";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
let history = createBrowserHistory();
let swindow = window;
securityCall(swindow);

class CheckOutCashfree extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.match.params.amount
        ? this.props.match.params.amount
        : 0,
      isDisabled: true,
      orderData: {},
      order_id: "",
      payment_method: this.props.match.params.type
        ? this.props.match.params.type
        : "",
      promocode:
        this.props.match.params.promocode &&
          this.props.match.params.promocode !== "no"
          ? atob(this.props.match.params.promocode)
          : ""
    };
    sessioncheck();
    this.createOrder = this.createOrder.bind(this);
    this.finalPayment = this.finalPayment.bind(this);
  }

  componentDidMount() {
    sessioncheck();
    const script = document.createElement("script");
    // script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.src = "https://www.cashfree.com/assets/cashfree.sdk.v1.2.js";
    script.async = true;
    document.body.appendChild(script);
    this.createOrder();
  }
  // createOrderLink() {}
  finalPayment(options) {
    console.log("options", options);
    let data = new FormData();
    for (var key in options) {
      data.append(key, options[key]);
    }
    let apiEndpoint = "https://test.cashfree.com/api/v1/order/create";

    // axios.post(apiEndpoint, options).then(
    //   res => console.log(res),
    //   err => console.log(err)
    // );
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        // console.log(this.responseText);
        // window.open(this.responseText.paymentLink, "_blank");
        //  window.location.href = this.responseText.paymentLink;
        // history.push(this.responseText.paymentLink);
      }
    });

    xhr.open("POST", apiEndpoint);
    xhr.send(data);
  }

  createOrder = () => {
    var formthis = this;
    this._isMounted = true;
    var formthis = this;
    let args = {
      amount: formthis.state.amount,
      pcode: formthis.state.promocode
    };
    var object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
      },
      body: JSON.stringify(args)
    };
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/razorpay/createorder";

    formthis.setState({
      orderData: {}
    });

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse(
          "Wrong",
          response.status,
          response.message,
          2
        );
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if (formthis._isMounted) {
                formthis.setState({
                  orderData: json.data,
                  order_id: json.data.rorderid ? json.data.rorderid : "",
                  pcode: formthis.state.promocode
                    ? formthis.state.promocode
                    : ""
                });
                var options = {};
                options = {
                  appId: `${config.CASHFREE_KEY_TEST}`,
                  secretKey: `${config.CASHFREE_SECRET_TEST}`,
                  orderId: json.data.rorderid ? json.data.rorderid : "",
                  orderAmount: formthis.state.amount,
                  orderCurrency: "INR",
                  orderNote: "Add money to wallet",
                  customerName: json.data.username ? json.data.username : "",
                  customerEmail: json.data.email ? json.data.email : "",
                  customerPhone: json.data.phone ? json.data.phone : "",
                  returnUrl: "http://localhost:3882/AddCash",
                  notifyUrl: "http://localhost:3882",
                  signature: "test"
                };

                formthis.finalPayment(options);
                // const rzp1 = new window.(options);
                //let rzp = new Razorpay(options);
                // rzp1.open();
              }
            }
          });
        }
      })
      .catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  };

  doPayment = params => {
    this._isMounted = true;
    var formthis = this;
    let args = params;
    var object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt") + ""
      },
      body: JSON.stringify(args)
    };
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/cashfree/payment";
    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse(
          "Wrong",
          response.status,
          response.message,
          2
        );
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              checkresponse("Success", response.status, json.msg, 1);
              formthis.setState({
                amount: ""
              });
              window.location.href = HBRout + "/MyAccount";
            } else {
              checkresponse("Wrong", response.status, json.msg, 1);
            }
          });
        }
      })
      .catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  };

  onChange = e => {
    const formthis = this;
    let { name, value } = e.target;

    formthis.setState({
      [name]: value
    });
  };

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
              <div className="hd_center">Pay With Cashfree</div>
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

export default CheckOutCashfree;
