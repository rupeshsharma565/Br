import React, { Component } from 'react';
import {
  Collapse,Card
} from 'reactstrap';
import config from './../../config';
import { goBack,sendHome,sessioncheck,checkresponse,overrideLoaderCss,loaderColorCode} from './../../Comman';
import { ClipLoader } from 'react-spinners';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      isLoading :false
    };    
    //sessioncheck();
    this.toggle = this.toggle.bind(this);
  }


  componentDidMount() {    
    //sessioncheck();
    this.contentDetail();
  } 

  toggle(e) {
    let collapse=this.state.collapse;
    let status=(this.state.collapse[e.target.id])?this.state.collapse[e.target.id]:false;
    collapse[e.target.id]=!status;
    this.setState({ collapse: collapse });
  }


  contentDetail = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });

    var args1 = {
      slug: "faqs"
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
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
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
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  render() {
    var markup = this.state.contentdetail;
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
          <div className="background-cover ng-scope">
            <div className={"header_bg" + ((this.props.location.pathname === "/faqs") ? " hidden" : "")}>
              <div className="hd_left"> 
                <span onClick={goBack} className="hd_back" /> 
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">FAQs</div>
            </div>

             <div className="terms_conditionscontnt">
              <div className="job_data_text">
                <div dangerouslySetInnerHTML={{ __html: markup }} />
              </div>
            </div>
            {/* <div className="faq_releasepart">
              <ul>
                <li> <a id="1" className="faq_walletpanel" onClick={formthis.toggle} ><div className="faq_iconleftbox pointernone"><img className="pointernone" src={require("./../../images/about.png")} /></div> <span className="faq_pagename pointernone">About Us</span> <div className="faq_righarrow pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div> </a> </li>
                <Collapse isOpen={formthis.state.collapse["1"]}>  
                   <Card>
                     1
                   </Card>
                </Collapse>
                <li> <a id="2" className="faq_walletpanel" onClick={formthis.toggle}><div className="faq_iconleftbox pointernone"><img className="pointernone" src={require("./../../images/verify.png")} /></div> <span className="faq_pagename pointernone">Account Verifications</span> <div className="faq_righarrow pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div> </a> </li>
                <Collapse isOpen={formthis.state.collapse["2"]}>  
                   <Card>
                     2
                   </Card>
                </Collapse>
                <li> <a id="3" className="faq_walletpanel" onClick={formthis.toggle}><div className="faq_iconleftbox pointernone"><img className="pointernone" src={require("./../../images/play.png")} /></div> <span className="faq_pagename pointernone">How to Play</span> <div className="faq_righarrow pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div> </a> </li>
                <Collapse isOpen={formthis.state.collapse["3"]}>  
                   <Card>
                     3
                   </Card>
                </Collapse>
                <li> <a id="4" className="faq_walletpanel" onClick={formthis.toggle}><div className="faq_iconleftbox pointernone"><img className="pointernone" src={require("./../../images/legality.png")} /></div> <span className="faq_pagename pointernone">Legalities</span> <div className="faq_righarrow pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div> </a> </li>
                <Collapse isOpen={formthis.state.collapse["4"]}>  
                   <Card>
                     4
                   </Card>
                </Collapse>
                <li> <a id="5" className="faq_walletpanel" onClick={formthis.toggle}><div className="faq_iconleftbox pointernone"><img className="pointernone" src={require("./../../images/offter-tnc.png")} /></div> <span className=" pointernone faq_pagename">Offer Terms &amp; Conditions</span> <div className="faq_righarrow pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div> </a> </li>
                <Collapse isOpen={formthis.state.collapse["5"]}>  
                   <Card>
                     5
                   </Card>
                </Collapse>
                <li> <a id="6" className="faq_walletpanel" onClick={formthis.toggle}><div className="faq_iconleftbox pointernone"><img className="pointernone" src={require("./../../images/Asset 8@48x.png")} /></div> <span className=" pointernone faq_pagename">Regular &amp; Safe play</span> <div className="faq_righarrow pull-right pointernone"><img src={require("./../../images/arrow_right.png")} className="arrow pointernone" /></div> </a> </li>
                <Collapse isOpen={formthis.state.collapse["6"]}>  
                   <Card>
                     6
                   </Card>
                </Collapse>
              </ul>
            </div> */}
          </div>
        </div>	
        
      </div>
    );
  }
}

export default Faq;
