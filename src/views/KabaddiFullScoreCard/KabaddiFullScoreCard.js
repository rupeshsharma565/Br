import React, { Component} from 'react';
import { goBack, sendHome, checkresponse, sessioncheck, matchFormatTypes, overrideLoaderCss, loaderColorCode} from '../../Comman';
import config from '../../config';
import { ClipLoader } from 'react-spinners';

class KabaddiFullScoreCard extends Component {
  constructor(props) {
    super(props);

    let urlString = this.props.location.pathname; 
    let urlParamsArr = urlString.split("/",2);

    this.state = {
      tabstatus: "tab1",
      team1name: "",
      team2name: "",
      teamselected: "",
      results:{},
      match:{},
      teamAInningCount : {},
      teamBInningCount : {},
      team_key:"a",
      opponent_team_key:"b",
      innings: {},
      secondUrlIndex : urlParamsArr[1],
      isLoading: false
    };
    sessioncheck();
    
  }

  componentDidMount() {
    sessioncheck();
    this.getPlayerScore();
  }

  onClickActive = (e) => {
    this.setState({
      tabstatus: e.target.id,
      teamselected: e.target.innerHTML
    });
    if(e.target.id == 'tab1'){
      this.setState({
        team_key: "a",
        opponent_team_key: "b"
      });
    }else{
      this.setState({
        team_key: "b",
        opponent_team_key: "a"
      });
    }
  }


  getPlayerScore = () => {
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
    
    
    apiUrl=API_URL+"/getmatchdata?matchid="+matchid+"&responsetype=fullscore";

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
              //console.log(json.data);
              //return
                formthis.setState({
                  match: json.data.match,
                  team1name: json.data.inningsdetail.team_a["full_name"],
                  team2name: json.data.inningsdetail.team_b["full_name"],
                  teamselected: json.data.inningsdetail.team_a["full_name"],
                  matchtype: json.data.type,
                  matchstatus:json.data.status,
                  inningsdetail: json.data.inningsdetail,
                  results: json.data,
                  innings : json.data.innings
                
                })
            }
          })
        }
      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        //checkresponse("Wrong", false, error.toString(), 0);
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
            <div className={"header_bg" + ((this.state.secondUrlIndex === "fullscorecardmb") ? " hidden" : "")}>
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Full Scorecard</div>
            </div>
            <div className="fullscore_cardmainpage">
              <div className="jointhe_leadge"><p> <span className="trophy_iconjoin"><img src={require("./../../images/trophy.png")} alt="image" /></span> Join the league by selecting your favourite 7 players from the match and earn money.</p></div>
              <div className="full_scorddiffetbox">
                <div className="live_scmaininnerbox">
                  <div className="ltest_divbox"> <h5>{ (this.state.matchtype) ?  matchFormatTypes(this.state.matchtype) : ""}</h5></div>
                  {
                    (this.state.inningsdetail) ? 
                    <div className="live_teamscore">
                      <ul>
                      <li>
                        <div className="teamvs_icon"><img src={this.state.inningsdetail.team_a['logo']} alt="image" /></div> 
                        <div className="teamvs_name"> <span className="teamname_dinamic"> {(this.state.team1name ? this.state.team1name : "")} </span></div>
                          <span>
                          {
                            (this.state.match && this.state.inningsdetail['a'] && this.state.inningsdetail['a']['1']) ?
                               <span> ({this.state.inningsdetail['a']['1']})</span>
                            : "(0)"
                            }
                          </span>
                        </li>
                        
                        <li>
                          <div className="teamvs_icon"><img src={this.state.inningsdetail.team_b['logo']} alt="image" /></div> 
                          <div className="teamvs_name"> <span className="teamname_dinamic"> {(this.state.team2name) ? this.state.team2name :""} </span></div>
                            <span>
                            {
                            (this.state.match && this.state.inningsdetail['b'] && this.state.inningsdetail['b']['1']) ?
                              <span> ({this.state.inningsdetail['b']['1']})</span>
                            : "(0)"
                            }
                            </span>
                        </li>
                      </ul>
                    </div> : ''
                  }
                  {
                    this.state.results.status =="completed" ? <p>{this.state.results['msg_info'] ? this.state.results['msg_info']['completed'] : this.state.results['msg_info']['info']}</p> : ""
                  }
                  <span className="plaustatus_box" className="matchliver_status">{this.state.matchstatus}</span>
                </div>
              </div>
              <div className="full_scorebgstatusmain"><h4>Full Scorecard</h4></div>
              
              <div className="tab_area home_nttabsbox matchboxes_intels">
                <ul className="nav nav-pills">
                    <li className={(("tab1" === this.state.tabstatus) ? "active" : "")} ><a id="tab1" onClick={this.onClickActive} data-toggle="tab pointernone">{this.state.team1name} </a></li>
                    <li className={(("tab2" === this.state.tabstatus) ? "active" : "")} ><a id="tab2" onClick={this.onClickActive} data-toggle="tab pointernone">{this.state.team2name} </a></li>
                
                </ul>

                <div className="tab-content clearfix">
                  <div className={"tab-pane active"} id="match1">
                    <div className="main_matchesallover">
                      <ul>
                          { (this.state.inningsdetail && this.state.inningsdetail[this.state.team_key]) ?
                           <li>
                             <div className="inning-card-header">
                              <span className="">{this.state.teamselected}</span>
                              <span className="pull-right">({this.state.inningsdetail[this.state.team_key] && this.state.inningsdetail[this.state.team_key]['1'] ? this.state.inningsdetail[this.state.team_key]['1'] : 0})</span>
                             </div>
                             <div className="full_scorealldetatable">
                                <div className="table-responsive batting-div">
                                  <table className="table table-hovered batting-table" >
                                    <thead>
                                      <tr className="td-bg-gray">
                                        <th> Player</th>
                                        <th> Raid</th>
                                        <th> Tackle</th>
                                        <th> Bonus</th>
                                        <th> Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      
                                      (this.state.match && this.state.match.teams) ?
                                        this.state.match.teams[this.state.team_key]['match']['starters'].concat(this.state.match.teams[this.state.team_key]['match']['bench']).map(function (starters, index_starters) {

                                          return (
                                          <tr key={index_starters}>
                                              <td> {formthis.state.match.players[starters]['name']} {formthis.state.match.players[starters]['match']['captain'] === true ? "(c)" : ""} </td>
                                              <td> { formthis.state.match.players[starters]['match']['points'] ? formthis.state.match.players[starters]['match']['points']['raid_points']['touch'] : 0 } </td>                                         
                                              <td> { formthis.state.match.players[starters]['match']['points'] ? formthis.state.match.players[starters]['match']['points']['tackle_points']['tackle'] : 0 } </td>                                        
                                              <td> { formthis.state.match.players[starters]['match']['points'] ? (formthis.state.match.players[starters]['match']['points']['tackle_points']['bonus']+formthis.state.match.players[starters]['match']['points']['raid_points']['bonus']) : 0 } </td>                                        
                                              <td> { formthis.state.match.players[starters]['match']['points'] ? formthis.state.match.players[starters]['match']['points']['total'] : 0 } </td> 
                                            </tr>
                                          )
                                      })
                                      : ""
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <br></br>

                            </li>
                            : ""
                           }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <br></br>
              {
                (Object.entries(this.state.match).length !== 0) ?
              <div className="match-info-block">
                <div className="inning-card-header">Match Info</div>
                <div className="full_scorealldetatable">
                  <div className="table-responsive match-div">
                    <table className="table table-hovered match-table" >
                        <tbody>
                            <tr>
                              <td>Match</td>
                              <td>{this.state.match.name ? this.state.match.name :""}</td>
                            </tr>
                            <tr>
                              <td>Date</td>
                              <td>{this.state.match.start_date ? this.state.match.start_date['str'] :""}</td>
                            </tr>
                            <tr>
                                <td>Toss</td>
                                <td>{this.state.match.toss ? this.state.match.toss['str'] :""}</td>
                            </tr>
                            <tr>
                                <td>Venue</td>
                                <td>{this.state.match.venue ? this.state.match.venue['name'] :""}</td>
                            </tr>

                            <tr>
                              <td>Round</td>
                              <td>{this.state.match.round ? this.state.match.round['name'] :""}</td>
                            </tr>
                            <tr>
                              <td>Group</td>
                              <td>{this.state.match.group ? this.state.match.group['name'] :""}</td>
                            </tr>
                            <tr>
                              <td>Season</td>
                              <td>{this.state.match.season ? this.state.match.season['name'] :""}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{this.state.inningsdetail && this.state.inningsdetail.team_a.full_name ? this.state.inningsdetail.team_a.full_name : ""} Squad</td>
                            </tr>
                            <tr>
                              <td>Starters</td>
                              <td>
                              {
                                  (this.state.match.teams && this.state.match.teams.a) ? 
                                  (formthis.state.match.teams['a']['match']['starters']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{comm+formthis.state.match.players[item_player]['name']}{formthis.state.match.players[item_player]['match']['captain'] === true ? "(c)" : ""}</span>
                                  )
                                  })
                                  : ""
                              }
                              </td>
                            </tr>
                            <tr>
                              <td>Bench</td>
                              <td>
                              {
                                  (this.state.match.teams && this.state.match.teams.a) ? 
                                  (formthis.state.match.teams['a']['match']['bench']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{comm+formthis.state.match.players[item_player]['name']}{formthis.state.match.players[item_player]['match']['captain'] === true ? "(c)" : ""}</span>
                                  )
                                  })
                                  : ""
                              }
                              </td>
                            </tr>
                            <tr>
                                <td colSpan="2">{this.state.inningsdetail && this.state.inningsdetail.team_b.full_name ? this.state.inningsdetail.team_b.full_name : ""} Squad</td>
                            </tr>
                            <tr>
                              <td>Starters</td>
                              <td>
                              {
                                  (this.state.match.teams && this.state.match.teams.b) ? 
                                  (formthis.state.match.teams['b']['match']['starters']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{comm+formthis.state.match.players[item_player]['name']}{formthis.state.match.players[item_player]['match']['captain'] === true ? "(c)" : ""}</span>
                                  )
                                  })
                                  : ""
                              }
                              </td>
                            </tr>
                            <tr>
                              <td>Bench</td>
                              <td>
                              {
                                  (this.state.match.teams && this.state.match.teams.b) ? 
                                  (formthis.state.match.teams['b']['match']['bench']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{comm+formthis.state.match.players[item_player]['name']}{formthis.state.match.players[item_player]['match']['captain'] === true ? "(c)" : ""}</span>
                                  )
                                  })
                                  : ""
                              }
                              </td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
                </div>
                : ""
              }
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default KabaddiFullScoreCard;
