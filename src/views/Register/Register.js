import React, { Component } from 'react';
//import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import email from './../../images/call_newicon.png'
import pass from './../../images/pass.svg'
import facebook from './../../images/facebook.svg'
import google from './../../images/google.svg'
import refer_code from './../../images/refer_code.svg'
import { AvForm,AvField } from 'availity-reactstrap-validation';
import config from './../../config';
import { checkresponse,HBRout,validation,dashboardpage,overrideLoaderCss,loaderColorCode,OTP_TIMEOUT} from './../../Comman';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import swal from 'sweetalert';
import logo from './../../images/logo.png'
import { ClipLoader } from 'react-spinners';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //username: '',
      password: '',
      refercode: '',
      devicetoken:'',
      devicetype:'',
      profilepic:'',
      phone:'',
      email:'',
      isLoading :false
    }
  }

  componentDidMount() {    
    sessionStorage.clear();
    let queryString = this.props.location.search.split("=");
    let refererr = queryString[1];
    this.setState({
      refercode:refererr
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  LoginPage=()=>{
    window.location.href=HBRout+ '/';
  }

  RegisterPlayer=()=>{
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var api_url = `${config.API_URL}`;
    var reqapi = "";
    reqapi = api_url+"/userregister";


    //var username = (this.state.username) ? this.state.username.toString() : "";
    var email = (this.state.email) ? this.state.email.toString() : "";
    var phone = (this.state.phone) ? this.state.phone.toString() : "";
    var password = (this.state.password) ? this.state.password.toString() : "";
    var refercode = (this.state.refercode) ? this.state.refercode.toString() : "";

    var args1 = {
      //username:username,
      email:email,
      phone:phone,
      password:password,
      refercode:refercode,
      devicetoken:'asd46ad46ada4ds',
      devicetype:'web'
      //profilepic:'xyz.jpg'
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
      .then(function(response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp=checkresponse("Wrong",response.status,"",2);
        if(chkresp===true)
        {  
        response.json().then(json => {
          if (json.error!==true) {
            //checkresponse("Register",200,json.msg,1);
            sessionStorage.setItem('resend_otp_time',OTP_TIMEOUT);
            window.location.href=HBRout+'/Verifyotp/'+btoa(phone);
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


  responseGoogle = (gresponse) => {
    if(gresponse.profileObj)
    {
    let formthis=this;
    formthis.setState({
      isLoading: true
    });
    let data={
      "email" :gresponse.profileObj.email,
      "socialid" :gresponse.profileObj.googleId,
      logintype:'G',
      devicetype:'web',
      devicetoken:"asd46ad46ada4ds"
    };
    
    if(gresponse.phone)
    {
      data.phone=gresponse.phone;
    }

    formthis.setState({
      socialemail:gresponse.profileObj.email,
      socialid:gresponse.profileObj.googleId,
      logintype:"G"
    });

    var getusersobj={ 
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'                 
      }),
      body: JSON.stringify(data)
    }    
    var api_url=`${config.API_URL}`;
       
    fetch(api_url+'/sociallogin', getusersobj)
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
              if(json.code===6)
              {
                window.location.href ="/#/Verifyotp/"+btoa(gresponse.phone);
              }
              else
              {  
                sessionStorage.clear();
                sessionStorage.setItem("username",gresponse.profileObj.email);
                sessionStorage.setItem("jwt",json.data.token);
                sessionStorage.setItem("refercode",json.data.refercode);
                sessionStorage.setItem("id",json.data.id);
                sessionStorage.setItem("logintype","G");
                sessionStorage.setItem("profilepic",json.data.userinfo.profilepic);
                window.location.href =dashboardpage;
              }
            }
            else
            {
              if(json.code===5)
              {
                formthis.setState({
                  isMobile: true,
                });
              }
              else
              {
                formthis.setState({
                  isMobile: false,
                });

                swal({
                  title: "Wrong!",
                  text: json.msg,
                  icon: "error",
                });
                
              }
            }
        })
          


      }).catch(error => {
        formthis.setState({
          isMobile: false,
          isLoading:false
        });
        swal({
          title: "Wrong!",
          text: error.toString(),
          icon: "error",
        });          
      });
    }
  }

  responseFacebook = (fresponse) => {
    console.log("fresponse=",fresponse);
    let formthis=this;
    formthis.setState({
      isLoading: true
    });

    let data={
      "email" :fresponse.email,
      "socialid" :fresponse.id,
      logintype:'F',
      devicetype:'web',
      devicetoken:"asd46ad46ada4ds"
    };

    if(fresponse.phone)
    {
      data.phone=fresponse.phone;
    }

    formthis.setState({
      socialemail:fresponse.email,
      socialid:fresponse.id,
      logintype:"F"
    });
    var getusersobj={ 
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'                 
      }),
      body: JSON.stringify(data)
    }    
    var api_url=`${config.API_URL}`;
       
    fetch(api_url+'/sociallogin', getusersobj)
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
              if(json.code===6)
              {
                window.location.href ="/#/Verifyotp/"+btoa(fresponse.phone);
              }
              else
              {
                sessionStorage.clear();
                sessionStorage.setItem("username",fresponse.email);
                sessionStorage.setItem("jwt",json.data.token);
                sessionStorage.setItem("refercode",json.data.refercode);
                sessionStorage.setItem("id",json.data.id);
                sessionStorage.setItem("logintype","F");
                sessionStorage.setItem("profilepic",json.data.userinfo.profilepic);

                window.location.href =dashboardpage;
              }
            }
            else
            {
              if(json.code===5)
              {
                formthis.setState({
                  isMobile: true,
                  isLoading:false
                });
              }
              else
              {
                formthis.setState({
                  isMobile: false,
                  isLoading:false
                });

                swal({
                  title: "Warning!",
                  text: json.msg,
                  icon: "warning",
                });
              }
            }
        })
          


      }).catch(error => {
        formthis.setState({
          isMobile: false,
          isLoading:false
        });

        swal({
          title: "Wrong!",
          text: error.toString(),
          icon: "error",
        });          
      }); 
  }


  render() {
    const componentClicked = () => {
    }
    
    let PRODUCT_NAME = `${config.PRODUCT_NAME}`;
    let FB_APP_ID=`${config.FB_APP_ID}`;
    let GOOGLE_CLIENT_ID=`${config.GOOGLE_CLIENT_ID}`;

    return (
      <div>
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
          <div className="toplogin_innercontbox">
            <h2>Welcome to {PRODUCT_NAME}</h2>
            <p>By Clicking on Sign up, I hereby confirm to be 18 years old &amp; provide my acceptance to <a href="/#/TermsCondition">Terms &amp; Conditions</a>  and <a href="/#/PrivacyPolicy">Privacy Policy</a> of {PRODUCT_NAME}</p>
          </div>
          <div className="social_login">
            <p>Sign up with Social </p>
            <div className="social_btn">
            <FacebookLogin
                appId={FB_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={this.responseFacebook.bind(this)} 
                cssClass="facebook1"
                icon="fa-facebook"
                textButton=""
                />
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText=""
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                className="google1"
              />
            </div>
          </div>
          <div className="or">or</div>
          <AvForm onValidSubmit={this.RegisterPlayer} name="login" className="app_start_form">
          <div className="form-group">
            <span className="icon">
            <img src={refer_code} alt="" /></span>
            <AvField type="text" className="form-control" name="refercode" value={this.state.refercode} onChange={this.onChange} placeholder="Referral Code (Optional)" 
            validate={{              
              pattern: { value: validation.address, errorMessage: 'Please enter valid refer code' },
              maxLength: { value: 12, errorMessage: 'Refer code must be between 4 and 8 characters long.' },
              minLength: { value: 4, errorMessage: 'Refer code must be between 4 and 8 characters long.' }
            }}/>
          </div>
            <div className="form-group">
              <span className="icon"><img src={email} alt="" /></span> 
              <AvField type="text" ng-model="user.Email" name="phone" value={this.state.phone} onChange={this.onChange} className="form-control" placeholder="Mobile Number *" 
               validate={{
                required: { value: true, errorMessage: "Mobile No. is required" },
                pattern: { value: validation.username, errorMessage: 'Please enter valid Mobile No.' },
                minLength: { value: 10, errorMessage: 'Mobile No. must be minimum 10 digits' },
                maxLength: { value: 10, errorMessage: 'Mobile No. must be maximum 10 digits' }
                
              }} />
            </div>
            <div className="form-group">
              <span className="icon"><img src={require('./../../images/email.svg')} alt="" /></span> 
              <AvField type="text" ng-model="user.Email" name="email" value={this.state.email} onChange={this.onChange} className="form-control" placeholder="Email Address *" 
               validate={{
                required: { value: true, errorMessage: "Email Id is required" },
                pattern: { value: validation.email, errorMessage: 'Please enter valid email id' },
                maxLength: { value: 50, errorMessage: 'Email must be between 6 and 50 characters long.' },
                minLength: { value: 6, errorMessage: 'Email must be between 6 and 50 characters long.' }
              }} />
            </div>
            <div className="form-group">
              <span className="icon"><img src={pass} alt="" /></span> 
              <AvField type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" placeholder="Password *" 
               validate={{
                required: { value: true, errorMessage: "Password is required" },
                pattern: { value: validation.password, errorMessage: 'Password must be at least 8 characters and must contain at least one lower case letter, one upper case letter and one digit' },
                maxLength: { value: 15, errorMessage: 'Your password must be 15 characters' },
                minLength: { value: 8, errorMessage: 'Your password must be at least 8 characters' }
              }} /> 
            </div>
            <div className="sec_btn">
              <button type="submit" className="btn blue_btn">SIGN UP</button>
            </div>
          </AvForm>
          <div className="foot add_width_left">
            <p>Already have an account? 
              <a onClick={this.LoginPage}>Sign In</a>
            </p>
          </div>
        </div>	
        {/* <div className="full_div right_content"><figure className="side_logo"><img src={logo} alt="logo" /></figure></div> */}
      </div>
    );
  }
}

export default Register;
