import React, { Component } from 'react';
//import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

// import email from './../../images/email.svg'
// import facebook from './../../images/facebook.svg'
// import google from './../../images/google.svg'
// import refer_code from './../../images/refer_code.svg'
import { AvForm,AvField} from 'availity-reactstrap-validation';
import config from './../../config';
import { checkresponse ,HBRout,validation, dashboardpage,goBack,overrideLoaderCss,loaderColorCode,OTP_TIMEOUT,securityCall} from './../../Comman';
import swal from 'sweetalert';
import pass from './../../images/pass.svg'
import { ClipLoader } from 'react-spinners';

let swindow=window;
securityCall(swindow);

class LoginPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      otp: '',
      password:'',
      isLoading :false
    }
    if(sessionStorage.getItem('jwt')){
      window.location.href =HBRout+'/matches';
    }else{
      sessionStorage.clear();
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  LoginPage = () => {
    window.location.href =HBRout+ '/';
  }

  onSubmit = (e) => {
    var username = atob(this.props.match.params.username);
    var password = (this.state.password) ? this.state.password.toString() : "";

    //let checktype = username.indexOf("@");

    //var str = "9632587456";
    //var pattphone =validation.mobile10verify; ///[0-9]/g;
    //var resultphone = (username.match(pattphone))?(username.match(pattphone)).length:0;

    var pattemail =validation.email; ///[0-9]/g;
    var resultemail = (username.match(pattemail))?(username.match(pattemail)).length:0;

//    console.log("result--->>>",resultphone,resultemail);
    if(resultemail>0)
    {
      var formthis = this;
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
          "password" :password,
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
                 sessionStorage.setItem("name",json.data.userinfo.name); 
                 sessionStorage.setItem("teamname",json.data.userinfo.teamname);                 
                 sessionStorage.setItem("jwt",json.data.token);
                 sessionStorage.setItem("refercode",json.data.refercode);
                 sessionStorage.setItem("id",json.data.id);
                 sessionStorage.setItem("profilepic",json.data.userinfo.profilepic);
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
              title: "Invalid!",
              text: "Invalid email id!",
              icon: "warning",
            });
      }
   
  }

  openForgotPass=()=>{
    this.getForgotPassword();
    //window.location.href =HBRout+'/ForgotPassword';
  }

  getForgotPassword=()=>{
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var username =atob(this.props.match.params.username); //(this.state.username) ? this.state.username.toString() : "";
    var api_url = `${config.API_URL}`;
    var reqapi = "";
    reqapi = api_url+"/resendotp";
    
    var args1 = {
      username:username,
      devicetoken:'asd46ad46ada4ds',
      devicetype:'web',
      atype:'forget' //[newreg/forget]
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args1)
    }

    fetch(reqapi, object)
      .then(function(response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp=checkresponse("Wrong",response.status,"",2);
        if(chkresp===true)
        {  
        response.json().then(json => {
          if (json.error===false) {
            sessionStorage.setItem('resend_otp_time',OTP_TIMEOUT);
            //checkresponse("Register",200,json.msg,1);
            //window.location.href =HBRout+'/ResetPassword/'+username;
            window.location.href =HBRout+'/ResetPassword/'+username
          }
          else {
            checkresponse("Warning",false,json.msg,3);
          }
        })
      }

      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong",false,error.toString(),0);
      });
    
  }



  render() {
    return (
      <div className="fadeIn">{/** loader section start */}
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
              <div className="hd_center">Enter Password</div>
            </div>

            ENTER OTP</div>
          <div className="otpvar_fiy" >
          <AvForm onValidSubmit={this.onSubmit} className="app_start_form">
            <div className="form-group">
              {atob(this.props.match.params.username)}
            </div>
            <div className="form-group">
            <span className="icon"><img src={pass} alt="" /></span> 
              <AvField type="password" name="password" autoFocus value={this.state.password} onChange={this.onChange} className="form-control" placeholder="Password *" 
               validate={{
                required: { value: true, errorMessage: "Password is required" },
                //pattern: { value: validation.password, errorMessage: 'Password must be at least 8 characters and must contain at least one lower case letter, one upper case letter and one digit' },
                //minLength: { value: 8, errorMessage: 'Password must be at least 8 characters' },
                //maxLength: { value: 20, errorMessage: 'Password not more then 20 characters' }
              }} /> 
            </div>
            <div className="form-group">
              <a className="forgot_pass" onClick={this.openForgotPass}>Forgot password?</a>
            </div>
            <div className="sec_btn">
              <button type="submit" className="btn blue_btn">LOG IN</button>
            </div>
          </AvForm>
        </div>
        </div>
      </div>
    );
  }
}

export default LoginPassword;
