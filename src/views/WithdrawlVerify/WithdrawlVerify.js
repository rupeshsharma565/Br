import React, { Component } from 'react';
import configurl from '../../config';
import { goBack, sendHome, checkresponse, timestampToDate, sessioncheck, validation,OTP_TIMEOUT,overrideLoaderCss,loaderColorCode,securityCall } from '../../Comman';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios"
import config from '../../config';
import {Button} from "reactstrap";
import { ClipLoader } from 'react-spinners';

let swindow=window;
securityCall(swindow);

class WithdrawlVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabstatus: "tab1",
      panname: "",
      pannumber: "",
      dob: "",
      panimage: "",
      file1: null,
      chequefile1: null,
      imageurl: "",
      accountno: "",
      ifsc: "",
      bankname: "",
      bankaccholdername: "",
      isbankdverify: "0",
      isemailverify: "",
      ispanverify: "0",
      isphoneverify: "",
      email: "",
      phone: "",
      pancardsaveone: false,
      accountsaveone: false,
      isIfscVerified: false,
      resend_email_time : sessionStorage.getItem('resend_email_time') && sessionStorage.getItem('resend_email_time') ? sessionStorage.getItem('resend_email_time') : 0,
      isLoading :false,
      stateName:"",
      isDisabled:false
    };
    sessioncheck();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeFile1 = this.onChangeFile1.bind(this);
    this.onChangeUploadCheque = this.onChangeUploadCheque.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  componentDidMount() {
    sessioncheck();
    this.listPancardDetail();
    this.getAccountDetail();
    this.listVerifyCheckSum();
    if(sessionStorage.getItem('resend_email_time')>0){
      this.startTimer();
    }
  }

  onClickActive = (e) => {

    if (e.target.id === "tab1") {
      this.setState({ tabstatus: "tab1" });
    }
    if (this.state.isemailverify === "1" && this.state.isphoneverify === "1" && e.target.id === "tab2") {
      this.setState({ tabstatus: "tab2" });
    }
    if (this.state.isemailverify === "1" && this.state.isphoneverify === "1" && this.state.ispanverify === "1" && e.target.id === "tab3") {
      this.setState({ tabstatus: "tab3" });
    }

  }


  onChangeFile1(e) {
    this.setState({ file1: e.target.files[0] }, () => { });
  }
  onChangeUploadCheque(e) {
    this.setState({ chequefile1: e.target.files[0] }, () => { });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    if (this.state.pancardsaveone === false) {
      let formthis = this;
      formthis.setState({
        isLoading: true
      });
      var panname = (this.state.panname) ? this.state.panname.toString() : "";
      var pannumber = (this.state.pannumber) ? this.state.pannumber.toString() : "";
      var dob = (this.state.dob) ? this.state.dob.toString() : "";

      var pushfiles = [];
      const formData = new FormData();
      if (this.state.file1) {
        pushfiles.push(this.state.file1);
        formData.append('panimage', this.state.file1);
      }

      formData.append('panname', panname);
      formData.append('pannumber', pannumber);
      formData.append('dob', dob);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        }
      };
      var api_url = `${configurl.API_URL}`;
      var url = api_url + "/frontapi/updatepancard";
      axios.post(url, formData, config)
        .then((response) => {
          formthis.setState({
            isLoading: false
          });
          if (response.data.error === false) {
            formthis.setState({ pancardsaveone: true },()=>{
              formthis.listPancardDetail();
            });

            checkresponse("Success", true, response.data.msg, 1);
          }
          else {
            checkresponse("Warning", false, response.data.msg, 3);
          }

        }).catch((error) => {
          formthis.setState({
            isLoading: false
          });
          if (error.response) {
            var chkresp = checkresponse("Wrong", error.response.status, "eeee", 2);
            if (chkresp === true) {
              if (error.response.data.error === true) {
                checkresponse("Warning", false, error.response.data.msg, 3);
              }
            }

          } else if (error.request) {
            checkresponse("Wrong", false, error.toString(), 0);
          } else {
            checkresponse("Wrong", false, error.toString(), 0);
          }
        });
    }
  }


  listPancardDetail = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }

    var apiUrl = "";
    var api_url = `${configurl.API_URL}`;

    apiUrl = api_url + "/frontapi/getpancard";
    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if ((json) && json.data) {
              formthis.setState({
                panname: json.data.panname,
                pannumber: json.data.pannumber,
                dob: timestampToDate(json.data.dob),
                imageurl: json.data.panimage,
                pancardsaveone: true
              })
            }
            else {
              formthis.setState({
                //statelist: []
              })
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


  sendVerifyEmail = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }

    var apiUrl = "";
    var api_url = `${configurl.API_URL}`;

    apiUrl = api_url + "/frontapi/sendverifyemail";
    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.listPancardDetail();
              formthis.setState({ pancardsaveone: true });
              checkresponse("Sent", 200, json.msg, 1);

              sessionStorage.setItem('resend_email_time',OTP_TIMEOUT);
              formthis.state.resend_email_time = sessionStorage.getItem('resend_email_time');
              formthis.startTimer();
            }
            else {
              checkresponse("Not Sent", false, json.msg, 3);
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

  onSubmitAccountDetail = () => {
    //alert('kkkkkkkkk');
    let formthis=this;
    formthis.setState({
      isLoading: true
    });
    if (this.state.accountsaveone === false) {
      let  acno=this.state.accountno;
      let  ifsccode= this.state.ifsc;
      let  bankname= this.state.bankname;
      let acholdername=this.state.bankaccholdername;
      let stateName=this.state.stateName;

      const formDataAcc = new FormData();
      formDataAcc.append('image', this.state.chequefile1);
      formDataAcc.append('acno', acno);
      formDataAcc.append('ifsccode', ifsccode);
      formDataAcc.append('bankname', bankname);
      formDataAcc.append('acholdername', acholdername);
      formDataAcc.append('state', stateName);
     // console.log("form data ",formDataAcc)
      //console.log(ifsccode,acno,bankname,acholdername);
   
      const configAcc = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        }
      };
      var api_url = `${config.API_URL}`;
      var apiUrl = "";
      apiUrl = api_url + "/frontapi/updatebankdetails";

      if(this.state.isIfscVerified === true){
        axios.post(apiUrl, formDataAcc, configAcc)
        .then((response) => {
          formthis.setState({
            isLoading: false
          });
          if (response.data.error === false) {
            formthis.setState({ accountsaveone: true },()=>{
               this.getAccountDetail();
            });

            checkresponse("Success", true, response.data.msg, 1);
          }
          else {
            checkresponse("Warning", false, response.data.msg, 3);
          }

        }).catch((error) => {
          formthis.setState({
            isLoading: false
          });
          if (error.response) {
            var chkresp = checkresponse("Wrong", error.response.status, "eeee", 2);
            if (chkresp === true) {
              if (error.response.data.error === true) {
                checkresponse("Warning", false, error.response.data.msg, 3);
              }
            }

          } else if (error.request) {
            checkresponse("Wrong", false, error.toString(), 0);
          } else {
            checkresponse("Wrong", false, error.toString(), 0);
          }
        });
      }else{
        checkresponse("Warning", true, "Please verify ifsc code first.", 3);
        formthis.setState({
          isLoading: false
        });
      }
      
    }
  }

  getAccountDetail = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var apiUrl = "";
    var api_url = `${configurl.API_URL}`;

    apiUrl = api_url + "/frontapi/getbankdetails";
    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if ((json) && json.data) {
              formthis.setState({
                accountno: json.data.acno,
                imageAccIMG: json.data.image,
                ifsc: json.data.ifsccode,
                bankname: json.data.bankname,
                bankaccholdername: json.data.acholdername,
                accountsaveone: true,
                stateName: json.data.state
              })
            }
            else {
              formthis.setState({
                //statelist: []
              })
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

  startTimer() {
    var formthis = this;
    this.timer = setInterval ( function() { 
      if(formthis.state.resend_email_time==0){
        formthis.resetTimer();
      }else{
        formthis.setState({
          resend_email_time : formthis.state.resend_email_time-1
        })
      }
  }, 1000);
    
  }
  resetTimer() {
    sessionStorage.setItem('resend_email_time',0);
    this.setState({
      resend_email_time : 0
    })
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
            if (json.error === false) {
              formthis.setState({
                isbankdverify: json.data.isbankdverify,
                isemailverify: json.data.isemailverify,
                ispanverify: json.data.ispanverify,
                isphoneverify: json.data.isphoneverify,
                email: json.data.email,
                phone: json.data.phone,
              })
              if(json.data.isbankdverify == "1"){
                formthis.setState({
                  isIfscVerified : true,
                  isDisabled:true
                })
              }else{
                formthis.setState({
                  isIfscVerified : false,
                  isDisabled:false
                })
              }
            }
            else {
              formthis.setState({
                playerlist: []
              })
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


  searchIFSCDetail = (searchifsccode) => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var args1 = {
      ifsccode:this.state.ifsc
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
    apiUrl = api_url + "/checkifsc";

    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              checkresponse("Success", true, json.msg, 1);
              //console 
              formthis.setState({
                isIfscVerified: true,
                bankname : json.data.BANK,
                stateName : json.data.STATE,
                isDisabled:true
              })
            }
            else {
              checkresponse("Wrong", false, json.msg, 3);
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

  componentWillUnmount() {
    clearInterval(this.timer);
    sessionStorage.setItem('resend_email_time',0);
  }


  render() {
    let formthis = this;
    let username = sessionStorage.getItem("username");
    let checktype = username.indexOf("@");
    let imagePhone = require("./../../images/call_b_icon.png");
    let imageEmail = require("./../../images/email_b_icon.png");
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
              <div className="hd_center">Verify</div>
            </div>
            <div className="my_accountpage">
              <div className="verify_pgcsmain">
                <div className="tab_area home_nttabsbox matchboxes_intels">
                  <ul className="nav nav-pills uprelive_tab">
                    <li className={(("tab1" === this.state.tabstatus) ? "active" : "")} ><span id="tab1" onClick={this.onClickActive} data-toggle="tab pointernone">IDENTITY </span></li>
                    <li className={(("tab2" === this.state.tabstatus) ? "active" : "")} ><span id="tab2" onClick={this.onClickActive} data-toggle="tab pointernone">PAN CARD </span></li>
                    <li className={(("tab3" === this.state.tabstatus) ? "active" : "")} ><span id="tab3" onClick={this.onClickActive} data-toggle="tab pointernone">ACCOUNT </span></li>
                  </ul>
                  <div className="tab-content clearfix">
                    <div className={"tab-pane" + (("tab1" === this.state.tabstatus) ? " active" : "")} id="match1">
                      <div className="withdrawl_alldetailsbox">
                        <div className={"v_mobile " + (this.state.isemailverify === "1" ? "tab-varify" :((this.state.isemailverify==="0")?"tab-notvarify":""))}>
                          <div className="img" style={{ verticalAlign: 'top' }}>
                            <img src={imageEmail} />
                          </div>
                          <div className="contant"><h3 className="ng-binding">{this.state.email} </h3></div>

                          {((this.state.isemailverify === "1") ? (<span className="btn-verified">Is Verified</span>) : null)}
                          {(this.state.isemailverify === "0" && (!sessionStorage.getItem('resend_email_time') || sessionStorage.getItem('resend_email_time') === "0")) ?  (<span className="btn-notverified">Not Verified <a className="underline" onClick={this.sendVerifyEmail}>Click here</a> </span>):((this.state.isemailverify === "1") ? "" : (<span className="btn-notverified">Resend in {formthis.state.resend_email_time} secs</span>))}
                        </div>

                        <div className={"v_mobile " + (this.state.isphoneverify === "1" ? " tab-varify" : ((this.state.isphoneverify === "0")?" tab-notvarify":""))}>
                          <div className="img" style={{ verticalAlign: 'top' }}>
                            <img src={imagePhone} />
                          </div>
                          <div className="contant"><h3 className="ng-binding">{this.state.phone}</h3></div>
                          {((this.state.isphoneverify === "1") ? (<span className="btn-verified">Is Verified</span>) : null)}
                          {((this.state.isphoneverify === "0") ?  (<span className="btn-notverified">Not Verified <a className="underline" onClick={this.sendVerifyEmail}>Click here</a> </span>):null)}
                        </div>

                      </div>
                    </div>
                    <div className={"tab-pane" + (("tab2" === this.state.tabstatus) ? " active" : "")} id="match2">
                      <AvForm onValidSubmit={this.onFormSubmit}>
                        <div className="withdrawl_alldetailsbox">
                          <div className="bank_toppart">
                            <div className="onupload_imgbd">  <img src={this.state.imageurl} /> </div>
                            <div className={"bd_c" + ((this.state.pancardsaveone === true) ? " hidden " : "")}>
                              <h2>ADD YOUR PAN CARD DETAILS</h2>
                              <label className={"g_button "}>
                                <i ng-class="{'fa fa-check' : files.length>0,'fa fa-cloud-upload' : files.length<=0}" aria-hidden="true" className={"fa fa-cloud-upload "} /> UPLOAD PAN CARD IMAGE
                              <input type="file" className={"g_button "} name="file1" onChange={this.onChangeFile1} placeholder="Upload Pan Card Image" />
                              </label>
                              <span>{(this.state.file1) ? this.state.file1.name : ""}</span>
                              
                            </div>
                          </div>
                          <div className="bank_panformpart">
                            <div className="form-group"><AvField placeholder="Name on Pan Card *" readOnly={this.state.pancardsaveone} type="text" className="form-control" name="panname" onChange={this.onChange} value={this.state.panname}
                              validate={{
                                required: { value: true, errorMessage: "Name is required" },
                                pattern: { value: validation.name, errorMessage: 'Name is not valid.' },
                                maxLength: { value: 50, errorMessage: 'Your name limit is 50 characters' }
                              }}
                            /></div>
                            <div className="form-group"><AvField placeholder="Pan Card Number  *" readOnly={this.state.pancardsaveone} type="text" className="form-control" name="pannumber" onChange={this.onChange} value={this.state.pannumber}
                              validate={{
                                required: { value: true, errorMessage: "Pan Card Number is required" },
                                pattern: { value: validation.pancard, errorMessage: 'Pan Card Number is not valid.' },
                                maxLength: { value: 15, errorMessage: 'Your pan card Number limit is 15 characters' }
                              }} /></div>
                            <div className="form-group"><AvField placeholder="Date of Birth *" readOnly={this.state.pancardsaveone} type="date" className="form-control" name="dob" onChange={this.onChange} value={this.state.dob} /></div>
                          </div>
                        </div>
                        <a className={"all_transaction up_bt " + (this.state.pancardsaveone === true ? " hidden" : "")}> <button className="savebtn_pencard pointer">Save PAN Card </button> </a>
                        <a className={"all_transaction up_bt" + (this.state.ispanverify === "0" ? " hidden" : " isverifed ")}>Verified  </a>
                      </AvForm>
                    </div>
                    <div className={"tab-pane" + (("tab3" === this.state.tabstatus) ? " active" : "")} id="match3">
                      <div className="withdrawl_alldetailsbox">
                        <AvForm onValidSubmit={this.onSubmitAccountDetail}>
                          <div className="my_profilepage">
                            <div className="myprofile_details">
                              <div className="profile_titalhead">
                                <h2>ACCOUNT DETAILS </h2>
                              </div>
                              <div className="profile_fieldsdetails">

                                <div className="bank_toppart">
                                  <div className="onupload_imgbd">  <img src={this.state.imageAccIMG} /> </div>
                                  <div className={"bd_c" + ((this.state.accountsaveone === true) ? " hidden " : "")}>
                                    <h2>ADD YOUR CANCELLED CHEQUE/PASSBOOK DETAILS</h2>
                                    <label className={"g_button "}>
                                      <i ng-class="{'fa fa-check' : files.length>0,'fa fa-cloud-upload' : files.length<=0}" aria-hidden="true" className={"fa fa-cloud-upload "} /> UPLOAD CANCELLED CHEQUE/PASSBOOK IMAGE
                                    <input type="file" className={"g_button "} name="file1" onChange={this.onChangeUploadCheque} placeholder="Upload Cancelled Cheque/Passbook Image" />
                                    </label>                                    
                                    <span>{(this.state.chequefile1) ? this.state.chequefile1.name : ""}</span>
                                  </div>
                                </div>
                                
                                <div className="form-group">
                                  <AvField type="text" className="form-control" name="bankaccholdername" readOnly={this.state.accountsaveone} onChange={formthis.onChange} value={formthis.state.bankaccholdername} placeholder="Bank Holder Name"
                                    validate={{
                                      required: { value: true, errorMessage: "Please enter bank holder name" },
                                      pattern: { value: validation.address, errorMessage: 'Please enter valid bank holder name' },
                                      maxLength: { value: 200, errorMessage: 'Your bank holder name limit is 200 characters' }
                                    }} />
                                </div>
                                <div className="form-group">
                                  {
                                    (this.state.accountsaveone===false) ?
                                  <AvField type="text" className="form-control" name="accountno" disabled={(this.state.accountsaveone===true)?"disabled":""} readOnly={this.state.accountsaveone} onChange={formthis.onChange} value={formthis.state.accountno} placeholder="Account No."
                                    validate={{
                                      required: { value: true, errorMessage: "Please enter account no." },
                                       pattern: { value: validation.username, errorMessage: 'Please enter valid account no.' },
                                      maxLength: { value: 20, errorMessage: 'Your account no. limit is 20 characters' }
                                    }} />
                                    : <AvField type="text" className="form-control" name="accountno" disabled={(this.state.accountsaveone===true)?"disabled":""} readOnly={this.state.accountsaveone}  value={formthis.state.accountno} placeholder="Account No."
                                  /> }
                                </div>
                                <div className="form-group">
                                  <AvField type="text" className="form-control" name="ifsc" readOnly={(this.state.accountsaveone || this.state.isIfscVerified)} onChange={formthis.onChange} value={formthis.state.ifsc} placeholder="IFSC"
                                    validate={{
                                      required: { value: true, errorMessage: "Please enter ifsc" },
                                      // pattern: { value: validation.ifsc, errorMessage: 'Please enter valid ifsc' },
                                      maxLength: { value: 15, errorMessage: 'Your ifsc limit is 15 characters' }
                                    }} /> 
                                    {(!this.state.isIfscVerified && this.state.accountsaveone != true) ? <Button className="isverifybtn" onClick={this.searchIFSCDetail}>Verify</Button> : ""}
                                </div>
                                <div className="form-group">
                                  <AvField type="text" className="form-control" name="bankname" readOnly={(this.state.accountsaveone || this.state.isIfscVerified)} onChange={formthis.onChange} value={formthis.state.bankname} placeholder="Bank Name"
                                    validate={{
                                      required: { value: true, errorMessage: "Please enter bank name" },
                                      pattern: { value: validation.address, errorMessage: 'Please enter valid bank name' },
                                      maxLength: { value: 200, errorMessage: 'Your bank name limit is 200 characters' }
                                    }} />
                                </div>
                                <div className="form-group">
                                  <AvField type="text" className="form-control" name="stateName" readOnly={this.state.accountsaveone || this.state.isIfscVerified} onChange={formthis.onChange} value={formthis.state.stateName} placeholder="State Name"
                                    validate={{
                                      required: { value: true, errorMessage: "Please enter state name" },
                                    }} />
                                </div>

                              </div>

                            </div>
                          </div>
                          <a className={"all_transaction up_bt" + (this.state.accountsaveone === true ? " hidden" : "")}> <button className="savebtn_pencard pointer">Submit </button> </a>
                          <a className={"all_transaction up_bt" + (this.state.isbankdverify === "0" ? " hidden" : " isverifed ")}>Verified  </a>
                          <a className={"all_transaction up_bt" + ((this.state.accountsaveone === true && this.state.isbankdverify === "0") ? " pending" : " hidden ")}>Pending  </a>
                        </AvForm>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithdrawlVerify;
