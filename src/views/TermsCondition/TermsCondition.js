import React, { Component} from 'react';
import config from './../../config';
import { goBack,sendHome,checkresponse } from './../../Comman';

class TermsCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentdetail:null
    };    
    //sessioncheck();
  }


  componentDidMount() {    
    this.termCondDetail();
  }


  termCondDetail = () => {
    var formthis = this;

    var args1 = {
      slug: "tandc"
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
    return (
      <div className="fadeIn">
        <div className="left_logincontent">
          <div className="background-cover ng-scope">
            <div className={"header_bg"+ ((this.props.location.pathname==="/termscon")?" hidden":"")}>
              <div className="hd_left"> 
                <span onClick={goBack} className="hd_back" /> 
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Terms &amp; Conditions</div>
            </div>
            <div className="terms_conditionscontnt">
            
              <div className="job_data_text">
                <div dangerouslySetInnerHTML={{ __html: markup }} />
              </div>
            </div>
          </div>
        </div>	
      </div>
    );
  }
}

export default TermsCondition;
