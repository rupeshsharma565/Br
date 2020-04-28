import React, { Component } from 'react';
import config from './../../config';
import { goBack, sendHome, checkresponse, sessioncheck, HBRout } from './../../Comman';

import {
  FacebookShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon
} from 'react-share';

class Refer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getReferCodeDetail: {}
    };
    sessioncheck();
    
    
  }


  componentDidMount() {
    
    sessioncheck();
    this.getReferCode();
  }

  getReferCode = () => {
    var formthis = this;
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var apiUrl = "";
    var api_url = `${config.API_URL}`;

    apiUrl = api_url + "/frontapi/getrefercode";
    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if ((json) && json.data) {

              formthis.setState({
                getReferCodeDetail: json.data,
              })
            }
            else {
              formthis.setState({
                getReferCodeDetail: {}
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  copyToClipboard = (text, elementId) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    const parentElement = document.getElementById(elementId);
    parentElement.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    parentElement.removeChild(textField);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + text;
  }

  render() {
    const formthis = this;
    return (
      <div className="fadeIn">
        <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Refer Friend</div>
            </div>
            <div className="refer_friend">
              <img src={require("./../../images/refer.png")} className="refer_imgbox" />
              <h2 className="font-bold">Refer &amp; Earn</h2>
              <p className="font-bold">You will get <i className="fa fa-inr" aria-hidden="true" />{this.state.getReferCodeDetail.refbns} &amp; your friend will also get <i className="fa fa-inr" aria-hidden="true" />{this.state.getReferCodeDetail.refbnsfrnd} for every successful referral.</p>
              <div className="shere_viasoial toplogin_innercontbox">
                <button type="button" className="btn btn-default link_btn" id="btncopy" onClick={() => this.copyToClipboard(this.state.getReferCodeDetail.refercode, "btncopy")}><span id="myTooltip">{this.state.getReferCodeDetail.refercode}</span></button>
                <ul className="shere_idlsocial">
                 
                  <li>
                    
                    <WhatsappShareButton
                      url={config.REFER_FRIEND+"?referrer="+this.state.getReferCodeDetail.refercode}
                      quote={"Think you can challenge me on "+config.PRODUCT_NAME+"? Tap "+config.MAIN_URL +" to download the app & use my invite code "+this.state.getReferCodeDetail.refercode+" to get a Cash Bonus of Rs."+this.state.getReferCodeDetail.refbnsfrnd+"! Let the game begin"}
                      className="Demo__some-network__share-button">
                      <WhatsappIcon
                        size={32}
                        round />
                    </WhatsappShareButton>
                    </li>
                    <li>

                    <FacebookShareButton
                      url={config.REFER_FRIEND+"?referrer="+this.state.getReferCodeDetail.refercode}
                      quote={"Think you can challenge me on "+config.PRODUCT_NAME+"? Tap "+config.MAIN_URL +" to download the app & use my invite code "+this.state.getReferCodeDetail.refercode+" to get a Cash Bonus of Rs."+this.state.getReferCodeDetail.refbnsfrnd+"! Let the game begin"}
                      className="Demo__some-network__share-button">
                      <FacebookIcon
                        size={32}
                        round />
                    </FacebookShareButton>
                    </li>
                    <li>

                    <EmailShareButton
                      url={config.REFER_FRIEND}
                      subject={config.PRODUCT_NAME+"- Refer Code"}
                      body={"Think you can challenge me on "+config.PRODUCT_NAME+"? Tap "+config.MAIN_URL +" to download the app & use my invite code "+this.state.getReferCodeDetail.refercode+" to get a Cash Bonus of Rs."+this.state.getReferCodeDetail.refbnsfrnd+"! Let the game begin"}
                      className="Demo__some-network__share-button">
                      <EmailIcon
                        size={32}
                        round />
                    </EmailShareButton>
                  </li>

                 
                </ul>
                <h6 className="font-bold">Tap on social icon to share your referral</h6>
                <a className="font-bold" href={HBRout + "/TermsCondition"}>Refer Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Refer;
