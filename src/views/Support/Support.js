import React, { Component } from 'react';
import { goBack,sendHome,sessioncheck,checkresponse} from './../../Comman';
import config from './../../config';

class Support extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      supportData:{},
    };    
    //sessioncheck();
    this.toggle = this.toggle.bind(this);
    
  }


  componentDidMount() {    
    //sessioncheck();
   //this.getSupportData();
  } 

  /*
  getSupportData = () => {
    this._isMounted = true;
    var formthis = this;
    
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/appsettings";

    formthis.setState({
      supportData: {}
    })


    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({
                  supportData: json.data
                })
              }

            }
            else {
              if(formthis._isMounted){
                formthis.setState({
                  supportData: {}
                })
              }
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }
  */

  toggle(e) {
    let collapse=this.state.collapse;
    let status=(this.state.collapse[e.target.id])?this.state.collapse[e.target.id]:false;
    collapse[e.target.id]=!status;
    this.setState({ collapse: collapse });
  }

  render() {

    var formthis = this;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className={"header_bg"+ ((this.props.location.pathname==="/suprt")?" hidden":"")}>
              <div className="hd_left"> 
                <span onClick={goBack} className="hd_back" /> 
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Support</div>
            </div>
            <div className="support_pagecss">
              <div className="bank"><img src={require("./../../images/support_icon.png")} /></div>
              <div className="support_info"><h2>Our Customer Support is Available 24*7</h2></div>
              <div className="support_info"><p>Email: {config.SUPPORT_EMAIL}</p><div className="col-12 text-center">
              {/* <a className="g_button marTB30" target="_top" href={"mailto:"+config.SUPPORT_EMAIL}>TAP HERE TO E-MAIL US</a> */}
              </div></div>
            </div>
            {(formthis.state.supportData && formthis.state.supportData.config && formthis.state.supportData.config.common.supportphone) ? 
            <div className="bt_fix">
              <div className="w_bt">
                <a className="g_button" href>Call US ON : {formthis.state.supportData.config.common.supportphone}</a>
              </div>
            </div>
            :""
            }
          </div>
        </div>	
        
      </div>
    );
  }
}

export default Support;
