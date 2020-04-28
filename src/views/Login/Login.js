import React, { Component } from 'react';
import { Button,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import email from './../../images/nav_newicon.png'
import pass from './../../images/pass.svg'
import facebook from './../../images/facebook.svg'
import google from './../../images/google.svg'
import { AvForm,AvField } from 'availity-reactstrap-validation';
import config from './../../config';
import swal from 'sweetalert';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import logo from './../../images/logo.png'
import { HBRout,dashboardpage, validation,overrideLoaderCss,loaderColorCode} from './../../Comman';
import { futimesSync } from 'fs';
import { ClipLoader } from 'react-spinners';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      refercode: '',
      devicetoken:'',
      devicetype:'',
      profilepic:'',
      redirect:false,
      isLoading :false
    }
    sessionStorage.clear();

    this.toggleMobile = this.toggleMobile.bind(this);
  }

  componentDidMount() {    
    sessionStorage.clear();

    let fees=22;  //
    let bal=40;
    let bns=2;
    let winamt=30;

    let remainingbns=bns;
    let remainingbal=bal;
    let remainingwin=winamt;

    if(bns>5)
    {
      let feesper=fees*25/100;
      remainingbns=bns-feesper;

      fees=feesper-fees;
    }
    else
    {
      fees=bns-fees;
      remainingbns=((bns-fees)<0)?0:(bns-fees);
    }

      if(fees<0)
      {
        fees=-(fees);
        remainingbal=((bal-fees)<0)?0:(bal-fees);
        fees=bal-fees;
      }

      if(fees<0)
      {
          fees=-(fees);
          remainingwin=((winamt-fees)<0)?0:(winamt-fees);
          fees=winamt-fees;
      }

      

      if(fees<=0)
      {
        //console.log("Please add amount");
      }
      else
      {
        //console.log("Amount Remaining---->>>",remainingbns,remainingbal,remainingwin);
      }
  }


  onSubmit = (e) => {
    var username = (this.state.username) ? this.state.username.toString() : "";
    //var password = (this.state.password) ? this.state.password.toString() : "";

    //let checktype = username.indexOf("@");

    //var str = "9632587456";
    var pattphone =validation.mobile10verify; ///[0-9]/g;
    var resultphone = (username.match(pattphone))?(username.match(pattphone)).length:0;

    var pattemail =validation.email; ///[0-9]/g;
    var resultemail = (username.match(pattemail))?(username.match(pattemail)).length:0;

    if(resultphone===10)
    {
      var getusersobj={ 
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'                 
        }),
        body: JSON.stringify({
          "username" :username,
          //"password" :password,
           devicetoken:'asd46ad46ada4ds',
           devicetype:'web',
        })
      }    
      var api_url=`${config.API_URL}`;
         
      fetch(api_url+'/userlogin', getusersobj)
        .then(function(response){
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
                // sessionStorage.clear();
                // sessionStorage.setItem("username",username);
                // //sessionStorage.setItem("token",json.data.token);
                // sessionStorage.setItem("jwt",json.data.token);
                // sessionStorage.setItem("refercode",json.data.refercode);
                // sessionStorage.setItem("id",json.data.id);
                window.location.href =HBRout+"/LoginOtp/"+btoa(username);
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
          swal({
            title: "Wrong!",
            text: error.toString(),
            icon: "error",
          });          
        });
        
      }else
      if(resultemail>0)
      {
        window.location.href =HBRout+"/LoginPassword/"+btoa(username);
      }
      else
      {
        swal({
              title: "Required!",
              text: "Incorrect phone number",
              icon: "warning",
            });
      }
   
  }

  RegisterPage=()=>{
    window.location.href =HBRout+'/Register';
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleMobile() {
    this.setState({
      isMobile: !this.state.isMobile,
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
                window.location.href ="/#/Verifyotp/"+gresponse.phone;
              }
              else
              {  
                sessionStorage.clear();
                sessionStorage.setItem("username",gresponse.profileObj.email);
                sessionStorage.setItem("profilepic",json.data.userinfo.profilepic);
                sessionStorage.setItem("jwt",json.data.token);
                sessionStorage.setItem("refercode",json.data.refercode);
                sessionStorage.setItem("id",json.data.id);
                sessionStorage.setItem("logintype","G");

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
                window.location.href ="/#/Verifyotp/"+fresponse.phone;
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
                });
              }
              else
              {
                formthis.setState({
                  isMobile: false,
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



  btnRegister=()=>{
   
    if(this.state.logintype==="F")
    {
      let fresponse={
        email:this.state.socialemail,
        id:this.state.socialid,
        phone:this.state.phone
      };
      this.responseFacebook(fresponse);
    }

    if(this.state.logintype==="G")
    {
      let gresponse={profileObj:{
        email:this.state.socialemail,
        googleId:this.state.socialid
      },
      phone:this.state.phone};
      
      this.responseGoogle(gresponse);
    }
  }

  
  
  render() {
    var username = (this.state.username) ? this.state.username.toString() : "";
    var pattphone =validation.mobile10verify; ///[0-9]/g;
    var resultphone = (username.match(pattphone))?(username.match(pattphone)).length:0;
    let isMobile=(resultphone===10)?10:40;
    const componentClicked = () => {
      
    }
    
    sessionStorage.clear();
    let PRODUCT_NAME = `${config.PRODUCT_NAME}`;
    let FB_APP_ID=`${config.FB_APP_ID}`;
    let GOOGLE_CLIENT_ID=`${config.GOOGLE_CLIENT_ID}`;
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
          <div className="toplogin_innercontbox">
            <h2>Welcome to {PRODUCT_NAME}</h2>
            <p>Enter your Email or Mobile Number to Start Your Fantasy Journey with {PRODUCT_NAME}.</p>
          </div>
          <div className="social_login">
            <p>Sign in with Social</p>
            <div className="social_btn">
              {/* <a  className="ng-isolate-scope"><img src={facebook} alt="" /></a> hhjh  */}
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
          <AvForm onValidSubmit={this.onSubmit} name="login" className="app_start_form">
            <div className="form-group">
              <span className="icon"><img src={email} alt="" /></span> 
              <AvField type="text" ng-model="user.Email" name="username" value={this.state.username} onChange={this.onChange} className="form-control" placeholder="Email/Mobile No.*" 
               validate={{
                pattern: { value: validation.phneEmailid, errorMessage: 'Please enter valid emailid or mobile no' },
                required: { value: true, errorMessage: "Email or Mobile No. is required" },
                maxLength: { value: isMobile, errorMessage: 'Mobile No. must be maximum '+isMobile+' digits' }
              }} />
            </div>
            {/* <div className="form-group">
              <span className="icon"><img src={pass} alt="" /></span> 
              <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" placeholder="Enter Your Password *" required /> 
              <a className="forgot_pass" onClick={this.openForgotPass}>Forgot password?</a>
            </div> */}
            <div className="sec_btn loginbtn_ind">
              <button type="submit" className="btn blue_btn">SIGN IN</button>
            </div>
          </AvForm>
          <div className="foot add_width_left">
            <p>Already have an account? 
              <a onClick={this.RegisterPage}>Sign Up</a>
            </p>
          </div>
        </div>	

       
        <div className="full_div right_content"><figure className="side_logo"><img src={logo} alt="logo" /></figure></div>


        <Modal isOpen={this.state.isMobile} toggle={this.toggleMobile}
                       className={'modal-sm verfypop_enter ' + this.props.className}>
                       <AvForm onValidSubmit={this.btnRegister} name="login" className="app_start_form">
                  <ModalHeader toggle={this.toggleMobile}>Please enter your mobile no.</ModalHeader>
                  <ModalBody>
                    <div className="iconlogi_call">
                    <span className="icon"><img src={email} alt="" /></span> 
                      <AvField type="text" ng-model="user.Email" name="phone" value={this.state.phone} onChange={this.onChange} className="form-control" placeholder="Mobile No *" 
                  validate={{
                    required: { value: true, errorMessage: "Mobile No. is required" },
                    pattern: { value: validation.username, errorMessage: 'Please enter valid Mobile No.' },
                    minLength: { value: 10, errorMessage: 'Mobile No. must be minimum 10 digits' },
                    maxLength: { value: 10, errorMessage: 'Mobile No. must be maximum 10 digits' }
                    
                  }} />
                  </div>
               
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary">Continue</Button>
                    <Button color="secondary" onClick={this.toggleMobile}>Cancel</Button>
                  </ModalFooter>
                  </AvForm>
                </Modal>
      </div>
    );
  }
}

export default Login;
