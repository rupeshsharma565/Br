import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import config from './../../config';
import { goBack, sendHome, checkresponse, timestampToDate, validation, sessioncheck,HBRout,securityCall } from './../../Comman';
import Select from 'react-select';
import axios from 'axios';

let swindow=window;
securityCall(swindow);

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      dob: "",
      gender: "",
      genderck: { "male": false, "female": false },
      name: "",
      profilepic: "",
      refercode: "",
      secondaryemail: "",
      sstate: "",
      teamname: "",
      istnameedit:"1",
      phone: "",
      email: "",
      statelist: [],
      openclosechangepassword: false,
      profilepicfile:{}
    };
    sessioncheck();
  }


  componentDidMount() {
    sessioncheck();
    this.getProfile();
    this.listStateList();
  }

  updateProfile = () => {
    var formthis = this;
    const formData = new FormData();
      formData.append('teamname', formthis.state.teamname);
      formData.append('gender', formthis.state.gender);
      formData.append('dob', formthis.state.dob);
      formData.append('email', formthis.state.email);
      formData.append('address', formthis.state.address);
      formData.append('state', formthis.state.sstate);
      formData.append('city', formthis.state.city);

      formData.append('profilepic', formthis.state.profilepicfile);
      formData.append('name', formthis.state.name);

      var api_url = `${config.API_URL}`;
      var apiUrl = "";
      apiUrl = api_url + "/frontapi/userprofile";

    // var object = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
    //   },
    //   body: JSON.stringify(args1)
    // }
    
    // fetch(apiUrl, object)
    //   .then(function (response) {
    //     var chkresp = checkresponse("Wrong", response.status, response.message, 2);
    //     if (chkresp === true) {
    //       response.json().then(json => {
    //         if (json.error === false) {
    //           checkresponse("Save", 200, json.msg, 1);
    //         }
    //         else {
    //           checkresponse("Warning", false, json.msg, 3);
    //         }
    //       })
    //     }
    //   }).catch(error => {
    //     checkresponse("Wrong", false, error.toString(), 0);
    //   });

      //////////////////////////
      const configdata = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt') + ''
        }
      };
      axios
        .post(apiUrl, formData, configdata)
        .then(response => {

          if (response.data.error === false) {
            formthis.getProfile();
            checkresponse("Save", 200, response.data.msg, 1);
          }
          else {
            checkresponse("Warning", false, response.data.msg, 3);
          }
          // if (response.data.code === 0) {
          //   this.setState({ 
          //         playerImage: response.data.data[0] ,
          //         playerImageURL: CONST.BACKEND_URL +"/uploads/players/"+response.data.data[0] ,
          //     });
          //   console.log('response.',response.data.data);
          // } else {
          //   alert('Error to upload image');
          // }
        })
        .catch(error => {});
  }


  getProfile = () => {
    var formthis = this;
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
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              let genderck = {};
              genderck[json.data.gender] = true;

              let ppic=api_url+"/uploads/icons/dummy-user.png";
              if(json.data.profilepic)
              {
                ppic=json.data.profilepic;
              }
              sessionStorage.setItem("profilepic",ppic);

              formthis.setState({
                phone: json.data.phone,
                email: json.data.email,
                teamname: json.data.teamname,
                istnameedit:json.data.istnameedit,
                gender: json.data.gender,
                genderck: genderck,
                dob: (json.data.dob) ? timestampToDate(json.data.dob) : json.data.dob,
                email: json.data.email,
                address: json.data.address,
                sstate: json.data.state,
                city: json.data.city,
                profilepic: ppic,
                name: json.data.name,
              })
            }
            else {
              formthis.setState({
                playerlist: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  onChange = (e) => {
    let formthis = this;
    if (e.target.name === "gender") {
      let gender = (e.target.value === "1") ? "male" : "female";
      let genderck = {};
      genderck[gender] = true;
      //formthis.state.genderck
      this.setState({
        gender: gender,
        genderck: genderck
      });
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleChange = (selectedOption1) => {
    this.setState({ sstate: selectedOption1.value });
  }


  listStateList = () => {
    var formthis = this;
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }

    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;
    var apiUrl = "";
    var api_url = `${config.API_URL}`;

    apiUrl = api_url + "/getstate";
    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if ((json) && json.data.length > 0) {
              var statelist = [];
              json["data"].forEach(function (itemUnit, index) {
                statelist.push({ value: itemUnit.name, label: itemUnit.name });
              });
              formthis.setState({
                statelist: statelist,
              })
            }
            else {
              formthis.setState({
                statelist: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  changePasswordEvent = () => {
    this.setState({ openclosechangepassword: !this.state.openclosechangepassword })
  }

  handleInputChange = (e) => {
  }


  onChangePassword = () => {
    var formthis = this;
    if (formthis.state.newpassword === formthis.state.conformpassword) {
      let args1 = {
        oldpassword: formthis.state.oldpassword,
        password: formthis.state.newpassword,
        //conformpassword:formthis.state.conformpassword
      };
      
      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        body: JSON.stringify(args1)
      }

      var parameter = this.props.match.params.ids;
      var user_ids = (parameter) ? parameter : 0;
      var apiUrl = "";
      var api_url = `${config.API_URL}`;

      apiUrl = api_url + "/frontapi/changepassword";
      fetch(apiUrl, object)
        .then(function (response) {
          var chkresp = checkresponse("Wrong", response.status, response.message, 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                formthis.setState({
                  oldpassword: "",
                  newpassword: "",
                  conformpassword: ""
                });
                formthis.changePasswordEvent();
                checkresponse("Changed", 200, json.msg, 1);
              }
              else {
                checkresponse("Not changed", false, json.msg, 3);
              }
            })
          }
        }).catch(error => {
          checkresponse("Wrong", false, error.toString(), 0);
        });
    }
    else {
      checkresponse("Not match", false, "New password and conform password is not match", 3);
    }
  }

 
  handleChangeFile(selectorFiles)
  {
    if(selectorFiles && selectorFiles.length>0)
    {
      
      this.setState({ profilepicfile: selectorFiles[0] });
    }
  }

  render() {
    const formthis = this;
    const { selectedOption1 } = this.state;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Profile</div>
            </div>
            <AvForm onValidSubmit={this.updateProfile}>
              <div className="my_profilepage">
                <div className="myprofile_details">

                  <div className="bgarea_proads">
                    <div className="user_namnbg">
                      <div className="userimgleod_ag">
                        <span className="cameraicon_minads">
                          <img src={formthis.state.profilepic} alt="icon" />
                        </span>
                        <span className="idusrimgv bhads_moahed">
                          <img src={require("./../../images/cameraicon.png")} alt="icon" />
                          <input type="file" onChange={ (e) => this.handleChangeFile(e.target.files) } /> </span>
                        <span className="input_filedis">  </span>    </div>
                      <a href={HBRout+ "/MyProfile"}>{sessionStorage.getItem("username")}</a>
                      
                    </div>
                  </div>


                  <div className="profile_titalhead">
                    <h2>BASIC DETAILS </h2>
                  </div>
                  <div className="profile_fieldsdetails">
                  <div className="form-group">
                      <input type="text" className="form-control" name="name" onChange={formthis.onChange} value={formthis.state.name} placeholder="Name" />
                      
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" readOnly={true} name="phone" onChange={formthis.onChange} value={formthis.state.phone} placeholder="Mobile No." />
                      <small>* Phone no. should be match with your authentic identity.</small>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" readOnly={true} name="email" onChange={formthis.onChange} value={formthis.state.email} placeholder="Email" />
                      <small>* Email should be match with your authentic identity.</small>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" readOnly={(formthis.state.istnameedit==="1")?false:true} name="teamname" onChange={formthis.onChange} value={formthis.state.teamname} placeholder="Team Name" />
                      <small>* Team Name should be editable one time only .</small>
                    </div>
                    <div className="form-group">
                      <input type="date" className="form-control" name="dob" onChange={formthis.onChange} value={formthis.state.dob} placeholder="DOB" />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <div className="radio-btn">
                        <AvField type="radio" name="gender" value="1" onChange={formthis.onChange} checked={(formthis.state.gender === "male") ? true : false} />
                        <label htmlFor={1}>Male</label>
                      </div>
                      <div className="radio-btn">
                        <AvField type="radio" name="gender" value="2" onChange={formthis.onChange} checked={(formthis.state.gender === "female") ? true : false} />
                        <label htmlFor={2}>Female</label>
                      </div>
                    </div>

                    <a className={"t_wallet_panel cursor-pointer pad_chgds" + ((this.state.paymentmodeselected === "paytm") ? "paymentmethodselect" : "")} id="paytm" onClick={formthis.changePasswordEvent}>
                      <div className="img pointernone"><img className="pointernone" src={require("./../../images/support_icon.png")} /></div>
                      <span className="font-bold pointernone" >Change Password </span>
                      <div className="img pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div>
                    </a>

                  </div>
                  <div className="profile_titalhead">
                    <h2>CONTACT DETAILS </h2>
                  </div>
                  <div className="profile_fieldsdetails">
                    <div className="form-group">
                      <AvField type="text" className="form-control" name="address" onChange={formthis.onChange} value={formthis.state.address} placeholder="Address*"
                        validate={{
                          required: { value: true, errorMessage: "Please enter a address" },
                          pattern: { value: validation.address, errorMessage: 'Please enter valid address' },
                          maxLength: { value: 200, errorMessage: 'Your address limit is 200 characters' }
                        }} />
                    </div>
                    <div className="form-group">
                      <AvField type="text" className="form-control" name="city" onChange={formthis.onChange} value={formthis.state.city} placeholder="City*"
                        validate={{
                          required: { value: true, errorMessage: "Please enter a city" },
                          pattern: { value: validation.name, errorMessage: 'Please enter valid city' },
                        }} />
                    </div>
                    <div className="form-group">
                      {/* <AvField type="text" className="form-control" name="state" onChange={formthis.onChange} value={formthis.state.sstate} placeholder="State*" /> */}
                      <Select options={this.state.statelist}
                        className="dropdown-width cursor-initial statecat"
                        name="form-field-name"
                        value={{ value: this.state.sstate, label: this.state.sstate }}
                        onChange={this.handleChange}
                        //onInputChange={this.handleInputChange}

                        placeholder="Please enter customer.."
                      />
                    </div>
                  </div>
                  <button className={"all_transaction up_bt pointer"}><img src={require("./../../images/update_p_icon.png")} /> Edit Profile</button>
                </div>
              </div>
            </AvForm>
          </div>
        </div>


        <div className={"playerdetail player_selectedbyin" + ((this.state.openclosechangepassword === true) ? "" : " playerdetailclose")}>
          <i className="fa fa-times-circle-o closebutton pointer" onClick={formthis.changePasswordEvent}></i>

          <AvForm onValidSubmit={this.onChangePassword}>
            <div className="my_profilepage">
              <div className="myprofile_details">
                <div className="profile_titalhead">
                  <h2>PASSWORD CHANGE </h2>
                </div>
                <div className="profile_fieldsdetails">
                  <div className="form-group">
                    <AvField type="password" className="form-control" name="oldpassword" onChange={formthis.onChange} value={formthis.state.oldpassword} placeholder="Old Password"
                      validate={{
                        required: { value: true, errorMessage: "Please enter old password" },
                        // minLength: { value: 8, errorMessage: 'Your old password should be atleast 8 characters' },
                        // maxLength: { value: 20, errorMessage: 'Your old password should be max. 20 characters' },
                        // pattern: { value: validation.password, errorMessage: 'Must contain at least one lower case letter, one upper case letter and one digit' },
                      }} />
                  </div>
                  <div className="form-group">
                    <AvField type="password" className="form-control" name="newpassword" onChange={formthis.onChange} value={formthis.state.newpassword} placeholder="New Password"
                      validate={{
                        required: { value: true, errorMessage: "Please enter new password" },
                        minLength: { value: 8, errorMessage: 'Your new password should be atleast 8 characters' },
                        maxLength: { value: 20, errorMessage: 'Your new password should be max. 20 characters' },
                        pattern: { value: validation.password, errorMessage: 'Must contain at least one lower case letter, one upper case letter and one digit' },
                      }} />
                  </div>
                  <div className="form-group">
                    <AvField type="password" className="form-control" name="conformpassword" onChange={formthis.onChange} value={formthis.state.conformpassword} placeholder="Confirm Password"
                      validate={{
                        required: { value: true, errorMessage: "Please enter confirm password" },
                        minLength: { value: 8, errorMessage: 'Your confirm password should be atleast 8 characters' },
                        maxLength: { value: 20, errorMessage: 'Your confirm password should be max. 20 characters' },
                        pattern: { value: validation.password, errorMessage: 'Must contain at least one lower case letter, one upper case letter and one digit' }
                      }} />
                  </div>


                  <a className={"all_transaction up_bt " + ((this.state.openclosechangepassword === true) ? "" : "hidden")}> <button className="savebtn_pencard pointer">Change Password </button> </a>
                </div>

              </div>
            </div>

          </AvForm>

        </div>
      </div>
    );
  }
}

export default MyProfile;
