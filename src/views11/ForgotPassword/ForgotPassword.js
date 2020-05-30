import React, { Component } from 'react';
//import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import email from './../../images/email.svg'
// import pass from './../../images/pass.svg'
// import facebook from './../../images/facebook.svg'
// import google from './../../images/google.svg'
// import refer_code from './../../images/refer_code.svg'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import config from './../../config';
import { checkresponse,HBRout,validation, overrideLoaderCss, loaderColorCode} from './../../Comman';
//import swal from 'sweetalert';
import logo from './../../images/logo.png'
import { ClipLoader } from 'react-spinners';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      refercode: '',
      devicetoken:'',
      devicetype:'',
      profilepic:'',
      isLoading :false
    }
  }

  componentDidMount() {    
    sessionStorage.clear();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  LoginPage=()=>{
    window.location.href =HBRout+'/';
  }

  getForgotPassword=()=>{
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var username = (this.state.username) ? this.state.username.toString() : "";
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
            //checkresponse("Register",200,json.msg,1);
            window.location.href =HBRout+'/ResetPassword/'+username;
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

  RegisterPage=()=>{
    window.location.href =HBRout+'/Register';
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
        <div className="toplogin_innercontbox">
          <h2>Forgot your Password? Get a New One.</h2>
          <p>Enter your registered email or mobile number to receive a 4 digit OTP to reset your Password.</p>
        </div>
        <AvForm onValidSubmit={this.getForgotPassword} name="login" className="app_start_form">
          <div className="form-group">
            <span className="icon"><img src={require("./../../images/user.svg")} alt="" /></span> 
            <AvField type="text" name="username" value={this.state.username} onChange={this.onChange} className="form-control" placeholder="Mobile Number" 
            validate={{
              required: { value: true, errorMessage: "Mobile No. or Email Id is required" },
              pattern: { value: validation.username, errorMessage: 'Please enter valid Mobile No. or Email Id' },
              minLength: { value: 10, errorMessage: 'Mobile No. or Email Id must be minimum 10 digits' },
              maxLength: { value: 10, errorMessage: 'Mobile No. or Email Id must be maximum 10 digits' }
            }}/>
          </div>
          <div className="sec_btn">
            <button type="submit" className="btn blue_btn">Send OTP</button>
          </div>
        </AvForm>
        <div className="foot add_width_left">
          <p>Already have an account? 
          <a onClick={this.RegisterPage}>Sign Up</a>
          </p>
        </div>
      </div>	
      <div className="full_div right_content"><figure className="side_logo"><img src={logo} alt="logo" /></figure></div>
      </div>
    );
  }
}

export default ForgotPassword;
