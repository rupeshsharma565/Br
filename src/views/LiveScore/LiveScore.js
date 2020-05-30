import React, { Component } from 'react';
import config from './../../config';
import { goBack,sendHome,checkresponse ,sessioncheck,HBRout, matchFormatTypes, overrideLoaderCss, loaderColorCode,securityCall} from './../../Comman';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';

let swindow=window;
securityCall(swindow);

class LiveScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabstatus:"tab1",
      matchlist:[],
      selectmatchlist:[],
      matchscorelist:[],
      isLoading :false
    };    
    sessioncheck();
  }

  componentDidMount() {    
    sessioncheck();
    this.listMatchesLive();
    //this.getMatchList();
    this.getMatchScore();
  }

  onClickActive=(e)=>{
    this.setState({tabstatus:e.target.id});
  }

  listMatchesLive = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    let args1={};
    args1={
      atype:"live",//"fixtures",
      gameid:1
    }
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body:JSON.stringify(args1)
    }

    var pageno = this.state.pageno;
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/listmatchesfront";

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
                matchlist: json.data
              })

            }
            else {
              formthis.setState({
                matchlist: []
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

  


  getMatchList = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var args1 = {
      matchid: matchid
    };
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = "https://cricapi.com/api/cricket?apikey=iOSnsZbuhgMXyy5gSL4N4kzDGGC3"; //api_url + "/frontapi/getsinglematch";

    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            var pushCatg=[];
            json.data.forEach(function(itemCatg,index) {

              pushCatg.push({value: itemCatg.unique_id, label: itemCatg.title});
              
            });
            formthis.setState({
              selectmatchlist: pushCatg
            })
          })
        }
      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  handleCatgChange = (e) => {    
    this.setState({ procategory: e.label,procategoryid:e.value});
  }


  getMatchScore = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    var apiUrl = "";
    let API_URL=`${config.API_URL}`;
    
    
    apiUrl=API_URL+"/getmatchdata?responsetype=live";

    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if(!json.error)
            {
                //console.log("json.data----->>>",json.data.list);
                formthis.setState({
                  matchscorelist: json.data.list
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
            <div className="hd_center">Live Score</div>
          </div>
          <div className="my_accountpage">
            <div className="verify_pgcsmain">
              <div className="tab_area home_nttabsbox matchboxes_intels">
                <ul className="nav nav-pills livescorepage">
                  {/* <li className={(("tab1"===this.state.tabstatus)?"active":"")}><a id="tab1" onClick={this.onClickActive} data-toggle="tab">Live Score </a></li>        */}
                  {/* <li className={(("tab2"===this.state.tabstatus)?"active":"")}><a id="tab2" onClick={this.onClickActive} data-toggle="tab">Result </a></li>  */}
                </ul>
                <div className="tab-content clearfix">
                  <div className={"tab-pane"+ (("tab1"===this.state.tabstatus)?" active":"")} id="match1">
                    <div className="withdrawl_alldetailsbox">
                      <div className="livescore_tabs">
                        {/* Repeat */}
                        {
                          (this.state.matchscorelist?this.state.matchscorelist:[]).map(function(itemLive,indexLive){return(
                        <div className="live_scmaininnerbox">
                          <div className="ltest_divbox"> <h6> {matchFormatTypes(itemLive.type)}</h6></div>	 
                          <div className="live_teamscore">
                            <ul>
                              <li>
                                <div className="teamvs_icon">
                                  <img src={(itemLive.inningsdetail.team_a && itemLive.inningsdetail.team_a.logo) ? itemLive.inningsdetail.team_a.logo : ""} alt="image" />
                                </div> 
                                <div className="teamvs_name">
                                  <span className="teamname_dinamic textcapitalize">{(itemLive.inningsdetail.team_a.short_name) ? itemLive.inningsdetail.team_a.short_name : ""} 
                                  <span className="second_insmatch">  
                                      {(itemLive.inningsdetail.a) ? Object.values((itemLive.inningsdetail.a)).map(function(itemSc,indexSc){ 
                                          var comm="";
                                          if(itemLive.inningsdetail.a>(indexSc+1))
                                          {
                                            comm=", ";
                                          }
                                          return(<span key={indexSc}>  {itemSc+""+comm}</span>
                                      )}) : ""}
                                    </span>
                                  </span>
                                </div>
                              </li>	
                              <li>
                                <div className="teamvs_icon">
                                  <img src={(itemLive.inningsdetail.team_b && itemLive.inningsdetail.team_b.logo) ? itemLive.inningsdetail.team_b.logo : ""} alt="image" />
                                </div> 
                                <div className="teamvs_name">
                                  <span className="teamname_dinamic textcapitalize">{(itemLive.inningsdetail.team_b.short_name) ? itemLive.inningsdetail.team_b.short_name : ""} </span>
                                  {(itemLive.inningsdetail.b) ? Object.values((itemLive.inningsdetail.b)).map(function(itemSc,indexSc){ 
                                          var comm="";
                                          if(itemLive.inningsdetail.a>(indexSc+1))
                                          {
                                            comm=", ";
                                          }
                                          return(<span key={indexSc}>  {itemSc+""+comm}</span>
                                      )}) : ""}
                                </div>
                              </li>	
                            </ul>	
                          </div> 
                          <div className="plaustatus_box">
                          {/* <span className="matchliver_status">Play in Progress</span>  */}
                          <a  className="full_scorecard pull-right" href={HBRout+"/FullScoreCard/"+itemLive.gameid+"/"+itemLive.matchid}>Full Scorecard</a></div>	 
                        </div>
                        )})
                        }
                        {
                            (("tab1" === this.state.tabstatus)?((this.state.matchscorelist && this.state.matchscorelist.length)?null:( <p className="text-center">There is no live match currently.</p>)):null)
                          }
                      </div>
                    </div>
                  </div>
                  <div className={"tab-pane"+ (("tab2"===this.state.tabstatus)?" active":"")} id="match2">
                    <div className="withdrawl_alldetailsbox">
                      <div className="livescore_tabs">
                        <h5 className="live_scotitalm">Live Score Card</h5> 
                        <div className="result_seriesselect">
                        <Select options={this.state.selectmatchlist}
                                className="dropdown-width"
                                name="form-field-name"
                                value={{value: this.state.procategoryid, label: this.state.procategory}}
                                required
                                onChange={this.handleCatgChange}
                                placeholder="Select Series From the list"
                              />
                        </div>

                          {/* Repeat */}
                        <div className="live_scmaininnerbox">
                         <div className="plaustatus_box"> 
                         <a className="full_scorecard pull-right" href={HBRout+"/FullScoreCard/"+this.state.procategoryid}>Final Score</a>
                         </div>	 	
                        </div>
                        
                        
                        <div className="no_resultfount hidden"> <p>No Result Found</p></div>
                      </div>
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

export default LiveScore;
