import React, { Component } from 'react';
import config from './../../config';
import { goBack, sendHome, checkresponse, overrideLoaderCss, loaderColorCode } from './../../Comman';
import { ClipLoader } from 'react-spinners';

class HowToPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentdetail: null,
      isLoading :false
    };
    //sessioncheck();
  }


  componentDidMount() {
    this.contentDetail();
  }


  contentDetail = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });

    var args1 = {
      slug: "howtoplay"
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
            <div className={"header_bg" + ((this.props.location.pathname === "/hwtoply") ? " hidden" : "")}>
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">How To Play</div>
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

export default HowToPlay;
