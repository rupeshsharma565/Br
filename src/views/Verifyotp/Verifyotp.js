import React, { Component } from 'react';
//import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

// import email from './../../images/email.svg'
// import pass from './../../images/pass.svg'
// import facebook from './../../images/facebook.svg'
// import google from './../../images/google.svg'
// import refer_code from './../../images/refer_code.svg'
import { AvForm,AvField } from 'availity-reactstrap-validation';
import config from './../../config';
import { checkresponse ,HBRout,validation,goBack,dashboardpage,overrideLoaderCss,loaderColorCode,OTP_TIMEOUT} from './../../Comman';
//import swal from 'sweetalert';
import { ClipLoader } from 'react-spinners';

class Verifyotp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      otp: '',
      isLoading :false,
      resend_otp_time : sessionStorage.getItem('resend_otp_time') && sessionStorage.getItem('resend_otp_time') ? sessionStorage.getItem('resend_otp_time') : 0

    }
    this.startTimer = this.startTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.startTimer();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  LoginPage = () => {
    window.location.href =HBRout+ '/';
  }

  startTimer() {
    var formthis = this;
    this.timer = setInterval ( function() { 
      if(formthis.state.resend_otp_time==0){
        formthis.resetTimer();
      }else{
        formthis.setState({
          resend_otp_time : formthis.state.resend_otp_time-1
        })
      }
  }, 2000);
    
  }
  resetTimer() {
    sessionStorage.setItem('resend_otp_time',0);
  }

  VerifyOTP = () => {

    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var username = this.props.match.params.username;
    //username = (username) ? username : 0; 

    if (username) {
      var api_url = `${config.API_URL}`;
      let PRODUCT_NAME = `${config.PRODUCT_NAME}`;
      var reqapi = "";
      reqapi = api_url + "/otpverify";

      // var username = (this.state.username) ? this.state.username.toString() : "";
      var otp = (this.state.otp) ? this.state.otp.toString() : "";

      var args1 = {
        phone: atob(username),
        otp: otp,
        devicetype:"web"
      };

      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        body: JSON.stringify(args1)
      }

      fetch(reqapi, object)
        .then(function (response) {
          formthis.setState({
            isLoading: false
          });
          var chkresp = checkresponse("Wrong", response.status, "", 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                //checkresponse("Registed", 200, "Welcome to "+PRODUCT_NAME+"!", 1);
                sessionStorage.clear();
                sessionStorage.setItem("username", json.data.userinfo.email);
                sessionStorage.setItem("jwt", json.data.token);
                sessionStorage.setItem("refercode", json.data.refercode);
                sessionStorage.setItem("id", json.data.id);
                sessionStorage.setItem("profilepic",json.data.userinfo.profilepic);
                window.location.href =dashboardpage;
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
    else {
      window.location.href =HBRout+ '/Register';
    }
  }

  backtoregister = () => {
    window.location.href =HBRout+ '/Register';
  }


  resendOTP = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var username = this.props.match.params.username;
    var api_url = `${config.API_URL}`;
    var reqapi = "";
    reqapi = api_url + "/resendotp";

    var args1 = {
      username: atob(username),
      atype:"newreg",
      devicetype:"web",
      devicetoken:"asd46ad46ada4ds"
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    fetch(reqapi, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, "", 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
               checkresponse("Success", 200, json.msg, 1);
               sessionStorage.setItem('resend_otp_time',OTP_TIMEOUT);
               formthis.state.resend_otp_time = sessionStorage.getItem('resend_otp_time');
               formthis.startTimer();
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
        <div className="left_logincontent">
          <div className="hd_center otpbk">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back fl_leftgs" />
              </div>
              <div className="hd_center">Verify OTP</div>
            </div>

            ENTER OTP</div>
			<div className="otpvar_fiy" >
          <AvForm onValidSubmit={this.VerifyOTP}>
            <div className="form-group">
              <AvField type="text" name="otp" name="otp" value={this.state.otp} onChange={this.onChange} className="form-control" placeholder="Mobile OTP *" 
              validate={{
                required: { value: true, errorMessage: "Mobile otp is required" },
                pattern: { value: validation.username, errorMessage: 'Please enter valid otp' },
                maxLength: { value: 6, errorMessage: 'Your otp must be 6 digits' },
                minLength: { value: 6, errorMessage: 'Your otp must be 6 digits' }
              }}/>
            </div>
            <div className="form-group">
            {(formthis.state.resend_otp_time == 0) ? <span className="pointer resand_otnewbs" onClick={this.resendOTP}>Resend OTP</span> : <span className="pointer resand_otnewbs">Resend OTP in {formthis.state.resend_otp_time} secs</span> }
            </div>

            <div className="sec_btn">
              <button type="submit" className="btn blue_btn">VERIFY OTP</button>
            </div>
          </AvForm>
        </div>
        </div>

      </div>
    );
  }
}

export default Verifyotp;
