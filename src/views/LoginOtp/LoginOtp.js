import React, { Component } from 'react';
//import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

// import email from './../../images/email.svg'
// import pass from './../../images/pass.svg'
// import facebook from './../../images/facebook.svg'
// import google from './../../images/google.svg'
// import refer_code from './../../images/refer_code.svg'
import { AvForm,AvField} from 'availity-reactstrap-validation';
import config from './../../config';
import { checkresponse ,HBRout,dashboardpage,goBack,validation,overrideLoaderCss,loaderColorCode,securityCall} from './../../Comman';
import swal from 'sweetalert';
import { ClipLoader } from 'react-spinners';

let swindow=window;
securityCall(swindow);

class LoginOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      otp: '',
      resetpassword:'',
      isLoading :false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  LoginPage = () => {
    window.location.href =HBRout+ '/';
  }

  onSubmit = (e) => {
    var formthis = this;
    var username = atob(this.props.match.params.username);
    var otp = (this.state.otp) ? this.state.otp.toString() : "";

    if(username!=="" && otp!=="")
    {
      formthis.setState({
        isLoading: true
      });
      var getusersobj={ 
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'                 
        }),
        body: JSON.stringify({
          "username" :username,
          "otp" :otp,
           devicetoken:'asd46ad46ada4ds',
           devicetype:'web',
        })
      }    
      var api_url=`${config.API_URL}`;
         
      fetch(api_url+'/userlogin', getusersobj)
        .then(function(response){
          formthis.setState({
            isLoading: false
          });
          if(response.status!==200)
          {
            swal({
              title: "Wrong!",
              text: "Somthing went wrong.",
              icon: "error",
            });
          }
          
          response.json().then(json=>{
              if(json.error===false)
              {               
                sessionStorage.clear();
                sessionStorage.setItem("username",json.data.userinfo.email);
                sessionStorage.setItem("profilepic",json.data.userinfo.profilepic);
                //sessionStorage.setItem("token",json.data.token);
                sessionStorage.setItem("jwt",json.data.token);
                sessionStorage.setItem("refercode",json.data.refercode);
                sessionStorage.setItem("id",json.data.id);
                window.location.href =dashboardpage;
              }
              else
              {
                  swal({
                    title: "Wrong!",
                    text: json.msg,
                    icon: "error",
                  });
              }
          })
            


        }).catch(error => {
          formthis.setState({
            isLoading: false
          });
          swal({
            title: "Wrong!",
            text: error.toString(),
            icon: "error",
          });          
        });
        
      }
      else
      {
        swal({
              title: "Required!",
              text: "Please enter OTP!",
              icon: "warning",
            });
      }
   
  }


  resendOTP = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var username = atob(this.props.match.params.username);
    var api_url = `${config.API_URL}`;
    var reqapi = "";
    reqapi = api_url + "/resendotp";

    var args1 = {
      username: username,
      atype:"forget",
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
              // window.location.href =HBRout+ '/';
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
                <a onClick={goBack} className="hd_back fl_leftgs"></a>
              </div>
              <div className="hd_center">Enter OTP</div>
            </div>

            ENTER OTP</div>
          <div className="otpvar_fiy" >
          <AvForm onValidSubmit={this.onSubmit}>
          <div className="form-group">
              <AvField type="text" name="otp" name="otp" value={this.state.otp} onChange={this.onChange} className="form-control" placeholder="OTP *" 
              validate={{
                required: { value: true, errorMessage: "Mobile otp is required" },
                pattern: { value: validation.username, errorMessage: 'Please enter valid otp' },
                maxLength: { value: 6, errorMessage: 'Your otp must be 6 digits' },
                minLength: { value: 6, errorMessage: 'Your otp must be 6 digits' }
              }}/>
            </div>
            <div className="form-group">
              <span className="pointer resand_otnewbs" onClick={this.resendOTP}>Resend OTP</span>
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

export default LoginOtp;
