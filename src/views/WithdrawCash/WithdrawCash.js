import React, { Component } from 'react';
import {
  Col, Row
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { checkresponse,goBack,sendHome,sessioncheck ,HBRout,validation,overrideLoaderCss,loaderColorCode,securityCall} from './../../Comman';
import config from './../../config';
import { ClipLoader } from 'react-spinners';

let swindow=window;
securityCall(swindow);

class WithdrawCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountadded:0,
      paymentmodeselected:"",
      isbankdverify:"0",
      isemailverify:"0",
      ispanverify:"0",
      isphoneverify :"0",
      isLoading :false
    };
    sessioncheck();

  }

  componentDidMount() {    
    sessioncheck();
    this.listVerifyCheckSum()     
  } 

  addAmount=(e)=>{
    let lastamount=(this.state.amountadded)?this.state.amountadded:0;
    let amountvalue=(e.target.innerHTML)?parseInt(e.target.innerHTML):0;
    amountvalue=parseFloat(lastamount)+amountvalue;
    this.setState({amountadded:amountvalue});
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }

  createWithdrawCash=()=>{
    if(this.state.amountadded)
    {
      var formthis = this;
      formthis.setState({
        isLoading: true
      });
      var args1 = {
        amount:this.state.amountadded
      };
      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        body: JSON.stringify(args1)
      }

      
      var api_url = `${config.API_URL}`;

      var apiUrl = "";
      apiUrl = api_url + "/frontapi/withdrawreq";

      fetch(apiUrl, object)
        .then(function (response) {
          formthis.setState({
            isLoading: false
          });
          var chkresp = checkresponse("Wrong", response.status, response.message, 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                //window.location.href =HBRout+"/MyAccount";
                checkresponse("Withdrawn", 200, json.msg, 1);
              }
              else {
                checkresponse("Warning", false, json.msg, 3);
              }
            })
          }
        }).catch(error => {
          formthis.setState({
            isLoading: false
          });
          checkresponse("Wrong", false, error.toString(), 0);
        });
    }
    else
    {
      checkresponse("Warning", false, "Please add amount", 3);
    }
  }

  selectPaymentMode=(e)=>{
    this.setState({paymentmodeselected:e.target.id});
  }

  listVerifyCheckSum = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var args1 = {};
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getprofile";

    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            console.log("json--->>", json);
            if (json.error === false) {
              if(json.data.isbankdverify==="1" && json.data.isemailverify==="1" && json.data.ispanverify==="1" && json.data.isphoneverify==="1")
              {

              }
              else
              {
                window.location.href =HBRout+"/WithdrawlVerify";
              }
            }
            
          })
        }
      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  render() {
    var formthis = this;
    return (
      <div className="fadeIn">
      {/** loader section start */}
      <div className={"loaderdiv" + ((this.state.isLoading === true) ? "" : " hidden")}>
        <ClipLoader
          css={overrideLoaderCss}
          sizeUnit={"px"}
          size={60}
          color={loaderColorCode}
          loading={this.state.isLoading}
        />
      </div>
      {/** loader section end */}
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left"> 
                <span onClick={goBack} className="hd_back" /> 
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Win Cash</div>
            </div>

            <AvForm onValidSubmit={this.createWithdrawCash}>
            <div className="my_accountpage">
              <div className="add_cashpart">
                <h2 className="ad_c">Withdraw cash from your winning account</h2>	
                <form className="addcash_formpart">
                  <div className="form-group">
                    <AvField type="text" name="amountadded" className="form-control" min={10} ng-model="amount" onChange={this.onChange} value={this.state.amountadded} placeholder="Add amount" 
                     validate={{
                      required: { value: true, errorMessage: "Amount is required" },
                      pattern: { value: validation.username, errorMessage: 'Amount is not valid.' }
                    }}/>
                  </div>
                  
                  <Row>
                    <Col><a className="ad_cash_b" onClick={this.addAmount}>+100</a></Col>
                    <Col><a className="ad_cash_b" onClick={this.addAmount}>+200</a></Col>
                    <Col><a className="ad_cash_b" onClick={this.addAmount}>+300</a></Col>
                  </Row>
                </form>
                <div className="addcash_withbox">
                  {/* <div className="adcash_titalm">Withdraw Cash With</div> */}
                  <div className="ad_otheratage">
                  
                    
                  </div>
                </div>
              </div>
              <a className="all_transaction up_bt"> <button className="savebtn_pencard pointer" >Continue </button> </a>
            </div>

            </AvForm>
          </div>
        </div>	
      </div>
    );
  }
}

export default WithdrawCash;
