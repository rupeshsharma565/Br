import React, { Component} from 'react';
import config from './../../config';
import { goBack,sendHome,checkresponse,HBRout } from './../../Comman';

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentdetail:null
    };    
    //sessioncheck();
  }


  componentDidMount() {    
    this.contentDetail();
  }


  contentDetail = () => {
    var formthis = this;

    var args1 = {
      slug: "aboutus"
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

    apiUrl = api_url + "/getcmspage";
    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error===false) {
              formthis.setState({
                contentdetail: json.data.content,
              })
            }
            else {
              formthis.setState({
                contentdetail: null
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  render() {
    let PRODUCT_NAME = `${config.PRODUCT_NAME}`;
    var markup = this.state.contentdetail;
    var parser = new DOMParser()
    var el = parser.parseFromString(markup, "text/xml");
    return (
      <div className="fadeIn">
         <div className="left_logincontent profilepadding0">
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left"> 
              <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">More</div>
            </div>
            <div className="faq_releasepart">
              <ul>

                {/* <li> <a href={HBRout+ "/Faq"}> <span className="m_profileicons"><img src={require("./../../images/nav4.png")} alt="icon" /></span>  FAQ’s</a></li>
                <li> <a href={HBRout+ "/AboutUs"}> <span className="m_profileicons"><img src={require("./../../images/navabout.png")} alt="icon" /></span>  About Us</a></li>
                <li> <a href={HBRout+ "/Support"}> <span className="m_profileicons"><img src={require("./../../images/nav5.png")} alt="icon" /></span>  Support</a></li>
                <li> <a href={HBRout+ "/HowToPlay"}> <span className="m_profileicons"><img src={require("./../../images/navhowtoplay.png")} alt="icon" /></span>  How To Play</a></li>
                <li> <a href={HBRout+ "/TermsCondition"}> <span className="m_profileicons"><img src={require("./../../images/nav7.png")} alt="icon" /></span>  Terms &amp; Conditions</a></li>
                <li> <a href={HBRout+ "/FantasyPointSystem"}> <span className="m_profileicons"><img src={require("./../../images/nav8.png")} alt="icon" /></span>  Fantasy Points</a></li> */}
                

                <li> <a href={HBRout+ "/Faq"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more1.png")} /></div> <span className="faq_pagename">FAQ’s</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
                <li> <a href={HBRout+ "/AboutUs"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more2.png")} /></div> <span className="faq_pagename">About Us</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
                <li> <a href={HBRout+ "/Support"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more3.png")} /></div> <span className="faq_pagename">Support</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
                <li> <a href={HBRout+ "/HowToPlay"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more4.png")} /></div> <span className="faq_pagename">How To Play</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
                <li> <a href={HBRout+ "/TermsCondition"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more5.png")} /></div> <span className="faq_pagename">Terms &amp; Conditions</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
                <li> <a href={HBRout+ "/FantasyPointSystem"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more6.png")} /></div> <span className="faq_pagename">Fantasy Points</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
                <li> <a href={HBRout+ "/PrivacyPolicy"} className="faq_walletpanel"><div className="faq_iconleftbox"><img src={require("./../../images/more7.png")} /></div> <span className="faq_pagename">Privacy Policy</span> <div className="faq_righarrow pull-right"><img src={require("./../../images/arrow_right.png")} className="arrow" /></div> </a> </li>
              </ul>
            </div>
          </div>
        </div>	
        <div className="full_div right_content"><figure className="side_logo"><img src="images/logo.png" alt="logo" /></figure></div>
      </div>
    );
  }
}

export default More;
