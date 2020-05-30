import React, { Component } from 'react';
import { goBack, sendHome, checkresponse, pointsname, overrideLoaderCss, loaderColorCode,fantasyPointSystem,securityCall } from './../../Comman';
import { Collapse, Card } from 'reactstrap';
import config from './../../config';
import { ClipLoader } from 'react-spinners';

// let swindow=window;
// securityCall(swindow);

class FantasyPointSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      tabstatus: "tab1",
      fantasypointslist: {},
      isLoading: false,
      gametype: "cricket",
      fantasytxt: "<p></p>",
      //fantasyPointSystem:fantasyPointSystem['cricket'] ? fantasyPointSystem['cricket'] : {}

    };
    //sessioncheck();
    this.toggle = this.toggle.bind(this);
    this.onClickGameType = this.onClickGameType.bind(this)
  }


  componentDidMount() {
    //sessioncheck();
    this.getFantasyPointes('cricket', 'Twenty20');
  }

  toggle(e) {
    let collapse = this.state.collapse;
    let status = (this.state.collapse[e.target.id]) ? this.state.collapse[e.target.id] : false;
    collapse[e.target.id] = !status;
    this.setState({ collapse: collapse });
  }

  onClickActive = (e) => {
    if (this.state.gametype == "cricket") {
      if (e.target.id === "tab1") {
        this.getFantasyPointes('cricket', 'Twenty20');
      }
      if (e.target.id === "tab2") {
        this.getFantasyPointes('cricket', 'ODI');
      }
      if (e.target.id === "tab3") {
        this.getFantasyPointes('cricket', 'Test');
      }
      this.setState({ tabstatus: e.target.id });
    } else if (this.state.gametype == "kabaddi") {
      this.getFantasyPointes(this.state.gametype, this.state.gametype)
    } else if (this.state.gametype == "football") {
    }
  }

  onClickGameType = (e) => {
    if (e.currentTarget.dataset.gametype) {
      this.setState({ gametype: e.currentTarget.dataset.gametype });
      if (e.currentTarget.dataset.gametype == "cricket") {
        this.getFantasyPointes(e.currentTarget.dataset.gametype, 'Twenty20')
      } else if (e.currentTarget.dataset.gametype == "kabaddi") {
        this.getFantasyPointes(e.currentTarget.dataset.gametype, e.currentTarget.dataset.gametype)
      } else if (e.currentTarget.dataset.gametype == "football") {
        this.getFantasyPointes(e.currentTarget.dataset.gametype, e.currentTarget.dataset.gametype)
        // this.setState({
        //   fantasytxt: "<p></p>"
        // })
      }
    }
  }
  getFantasyPointes = (gametype, type) => {
    
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var args1 = {
      gametype: gametype,
      mtype: type
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }
    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/fantasyptssytm";
    formthis.setState({
      fantasypointslist: {}
    })
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
                fantasypointslist: json.data[type],
                fantasytxt: (json.details && json.details.fantasytxt)?json.details.fantasytxt:"<p></p>"
              })
            }
            else {
              formthis.setState({
                fantasypointslist: {},
                fantasytxt:""
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
    const formthis = this;
    var markup = this.state.fantasytxt;
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
            <div className={"header_bg" + ((this.props.location.pathname === "/FantasyPointSystem/mobile") ? " hidden" : "")}>
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Fantasy Points System</div>
            </div>
            <div className="select_match_type section_cls">
              <div className="fantcy_poisystem">
                <h2>Here’s how your team <span><u>earns points</u></span></h2>
              </div>
              <div className="tab_area">
                <ul className="nav nav-pills fantasy_pointsystab">
                  <li className={(("cricket" === this.state.gametype) ? "active" : "")}><span data-toggle="tab" className="fant_systempointlist" id="tab1" alt="cricket" data-gametype="cricket" data-id="tab1" onClick={this.onClickGameType}><img src={require("./../../images/cricket.svg")} /><span className="mt_namefanpoint">Cricket</span> </span></li>
                  <li className={(("football" === this.state.gametype) ? "active" : "")}><a data-toggle="tab" id="tab2" alt="football" data-gametype="football" data-id="tab2" onClick={this.onClickGameType} className="fant_systempointlist"><img src={require("./../../images/football.svg")} /><span className="mt_namefanpoint">Football</span> </a></li>
                  <li className={(("kabaddi" === this.state.gametype) ? "active" : "")}><a data-toggle="tab" id="tab1" alt="kabaddi" data-gametype="kabaddi" data-id="tab3" onClick={this.onClickGameType} className="fant_systempointlist"><img src={require("./../../images/kabaddi.svg")} /><span className="mt_namefanpoint">Kabaddi</span> </a></li>
                </ul>
                <div className="tab-content clearfix">
                  {/*----- First tab start  ----------*/}
                  <div className="tab-pane active" id="match1">
                    <div className="caption_etionmain">
                      <div className="your_selectedbox"><figure>
                        <img src={require("./../../images/captain.svg")} alt="captain" />
                      </figure>
                        <p className="cap_text">Your selected Captain will be awarded <b>2x points</b> for his on-field performance.</p>
                      </div>
                      <div className="your_selectedbox"><figure><img src={require("./../../images/vice_captain.svg")} alt="vice captain" /> </figure>
                        <p className="cap_text">A player selected to be the Vice-captain of your team will be given <b>1.5x points</b> for his on-field performance.</p>
                      </div>
                      {/*--- inner tab start  -------*/}
                      <div className="tab_area home_nttabsbox matchboxes_intels">
                        {(this.state.fantasypointslist && this.state.gametype == "cricket") ?
                          <ul className="nav nav-pills tabforfantasy_pointpage">
                            <li className={(("tab1" === this.state.tabstatus) ? "active" : "")}><a id="tab1" onClick={this.onClickActive} data-toggle="tab">T20 </a></li>
                            <li className={(("tab2" === this.state.tabstatus) ? "active" : "")}><a id="tab2" onClick={this.onClickActive} data-toggle="tab">Odi </a></li>
                            <li className={(("tab3" === this.state.tabstatus) ? "active" : "")}><a id="tab3" onClick={this.onClickActive} data-toggle="tab">Test </a></li>
                          </ul>
                          : ""
                        }
                        <div className="tab-content clearfix">
                          <div className={"tab-pane active"} id="point1">
                            <div className="inner_bodyarea">
                              {(this.state.fantasypointslist && this.state.gametype == "cricket") ?
                                <div className="faq_accordian_pg">
                                  <div className="panel-group" id="accordion">

                                    {
                                      (this.state.fantasypointslist) ?
                                        Object.values(this.state.fantasypointslist).map(function (keyFP, indexFP) {
                                          return (
                                            <div className="panel panel-default" key={indexFP}>
                                              <div id={indexFP + 1} onClick={formthis.toggle} className="panel-heading pointer">
                                                <h4 className={"panel-title pointernone text-cap" + ((formthis.state.collapse[indexFP + 1] === true) ? "" : " collapsed")} data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                                  {Object.keys(formthis.state.fantasypointslist)[indexFP]}
                                                </h4>
                                              </div>

                                              <Collapse isOpen={formthis.state.collapse[indexFP + 1]}>
                                                <Card>
                                                  <div id="collapse1" className="panel-collapse in">
                                                    <div className="panel-body">
                                                      <div className="fan_innertablebt table-responsive">
                                                        <table className="table table-striped">
                                                          <thead>
                                                            <tr>
                                                              <th>Type of points</th>
                                                              <th></th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {
                                                              Object.values(keyFP).map(function (keyPoints, indexPoints) {

                                                                return (
                                                                  <tr key={indexPoints}>
                                                                    <td className="text-cap">{pointsname[Object.keys(keyFP)[indexPoints]]}</td>
                                                                    <td>{Object.values(keyFP)[indexPoints]}</td>
                                                                  </tr>
                                                                )
                                                              })
                                                            }
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Card>
                                              </Collapse>
                                            </div>
                                          )
                                        }) : ""
                                    }

                                  </div>
                                </div>
                                : ""
                              }
                              {
                                (this.state.fantasypointslist && (this.state.gametype == "kabaddi" || this.state.gametype == "football")) ?
                                  <Card>
                                    <div id="collapse1" className="panel-collapse in">
                                      <div className="panel-body">
                                        <div className="fan_innertablebt table-responsive">
                                          <table className="table table-striped">
                                            <thead>
                                              <tr>
                                                <th>Action</th>
                                                <th>Points</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {
                                                (fantasyPointSystem) ? 
                                                Object.keys(fantasyPointSystem[formthis.state.gametype]).map(function (item, indexPoint) {

                                                  return (
                                                    <tr key={indexPoint}>
                                                      <td className="text-caps"> {(fantasyPointSystem[formthis.state.gametype] && fantasyPointSystem[formthis.state.gametype][item]) ? fantasyPointSystem[formthis.state.gametype][item] : ""}</td>
                                                      <td>{(formthis.state.fantasypointslist) ? formthis.state.fantasypointslist[item] :""}</td>
                                                    </tr>
                                                  )
                                                })
                                                :""
                                              }
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                  : ""
                              }
                            </div>
                            <div className="footbal_point_text kabaddi_points" dangerouslySetInnerHTML={{ __html: markup }}>

                            </div>
                          </div>


                        </div>
                      </div>
                      {/*--- inner tab start  -------*/}
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

export default FantasyPointSystem;
