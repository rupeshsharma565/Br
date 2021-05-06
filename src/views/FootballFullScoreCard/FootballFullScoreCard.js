import React, { Component} from 'react';
import { goBack, sendHome, checkresponse, sessioncheck, matchFormatTypes, overrideLoaderCss, loaderColorCode, timestampToDateTime} from '../../Comman';
import config from '../../config';
import { ClipLoader } from 'react-spinners';
import jsonData from './football.json';

class FootballFullScoreCard extends Component {
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
      isLoading: false,
      team_id:"",
      home_team_id:"",
      away_team_id:""
    };
    sessioncheck();
    
  }

  componentDidMount() {
    sessioncheck();
    this.getPlayerScore();
    // console.log("jsonData-->",jsonData);
    // if(jsonData){
    //   this.setState({
    //     match: jsonData.match.match,
    //     team1name: jsonData.inningsdetail.team_a["full_name"],
    //     team2name: jsonData.inningsdetail.team_b["full_name"],
    //     teamselected: jsonData.inningsdetail.team_a["full_name"],
    //     matchtype: jsonData.type,
    //     matchstatus:jsonData.status,
    //     results: jsonData,
    //     inningsdetail:jsonData.inningsdetail,
    //     team_id:jsonData.match.match.home,
    //     home_team_id:jsonData.match.match.home,
    //     away_team_id:jsonData.match.match.away
    //   })
    // }
    
  }

  onClickActive = (e) => {
    this.setState({
      tabstatus: e.target.id,
      teamselected: e.target.innerHTML
    });
    if(e.target.id == 'tab1'){
      this.setState({
        team_key: "a",
        opponent_team_key: "b",
        team_id:this.state.home_team_id
      });
    }else{
      this.setState({
        team_key: "b",
        opponent_team_key: "a",
        team_id:this.state.away_team_id
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

    fetch(apiUrl,object)
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
                  match: json.data.match.match,
                  team1name: json.data.inningsdetail.team_a["full_name"],
                  team2name: json.data.inningsdetail.team_b["full_name"],
                  teamselected: json.data.inningsdetail.team_a["full_name"],
                  matchtype: json.data.type,
                  matchstatus:json.data.status,
                  results: json.data,
                  inningsdetail:json.data.inningsdetail,
                  team_id:json.data.match.match.home,
                  home_team_id:json.data.match.match.home,
                  away_team_id:json.data.match.match.away
                
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
              <div className="jointhe_leadge"><p> <span className="trophy_iconjoin"><img src={require("./../../images/trophy.png")} alt="image" /></span> Join the league by selecting your favourite 11 players from the match and earn money.</p></div>
              <div className="full_scorddiffetbox">
                <div className="live_scmaininnerbox">
                  <div className="ltest_divbox"> <h5>Football</h5></div>
                  {
                    (this.state.inningsdetail) ? 
                    <div className="live_teamscore">
                      <ul>
                      <li>
                        <div className="teamvs_icon"><img src={(this.state.inningsdetail.team_a['logo']) ? this.state.inningsdetail.team_a['logo'] : ""} alt="image" /></div> 
                        <div className="teamvs_name"> <span className="teamname_dinamic"> {(this.state.team1name) ? this.state.team1name : ""} </span></div>
                          <span>
                          {
                            (this.state.match && this.state.inningsdetail.a['1']) ?
                              <span> ({this.state.inningsdetail.a['1']})</span>
                            : "(0)"
                            }
                          </span>
                        </li>
                        
                        <li>
                          <div className="teamvs_icon"><img src={(this.state.inningsdetail.team_b['logo'] ? this.state.inningsdetail.team_b['logo'] : "")} alt="image" /></div> 
                          <div className="teamvs_name"> <span className="teamname_dinamic"> {(this.state.team2name) ? this.state.team2name :""} </span></div>
                            <span>
                            {
                            (this.state.match && this.state.inningsdetail.b['1']) ?
                              <span> ({this.state.inningsdetail.b['1']})</span>
                            : "(0)"
                            }
                            </span>
                        </li>
                      </ul>
                    </div> : ''
                  }
                  {
                    (this.state.results.status ==="completed") ? <p>{(this.state.results.match['match_result']['result'] && this.state.results.match['match_result']['result'] ==='won') ? this.state.results.match.teams[this.state.results.match['match_result']['winner']]['name']+ " Won the match" : ""}</p> : ""
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
                          { (this.state.inningsdetail) ?
                           <li>
                             <div className="inning-card-header">
                              <span className="">{this.state.teamselected}</span>
                              <span className="pull-right">({this.state.inningsdetail[this.state.team_key] ? this.state.inningsdetail[this.state.team_key]['1'] : 0})</span>
                             </div>
                             <div className="full_scorealldetatable">
                                <div className="table-responsive batting-div">
                                  <table className="table table-hovered table-bordered batting-table" >
                                    <thead>
                                      <tr className="td-bg-gray">
                                        <th>Player</th>
                                        <th>Time Played</th>
                                        <th colSpan="5">Goal</th>
                                       <th colSpan="3">Card</th>
                                       <th colSpan="3">Penalty</th>
                                       <th colSpan="2">Foul</th>
                                        <th>Passes</th>
                                        <th>Tackles</th>
                                        <th>Shot on target</th>
                                      </tr>
                                      <tr className="td-bg-gray">
                                        <th></th>
                                        <th>Minutes</th>
                                        <th>Scored</th>
                                        <th>Assist</th>
                                        <th>Own Goal</th>
                                        <th>Saved</th>
                                        <th>Conceded</th>
                                        <th>RC</th>
                                        <th>Y2C</th>
                                        <th>YC</th>
                                        <th>Missed</th>
                                        <th>Saved</th>
                                        <th>Scored</th>
                                        <th>Committed</th>
                                        <th>Drawn</th>
                                        <th>Total</th>
                                        <th>Total</th>
                                        <th>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      
                                      (this.state.results && this.state.results.match && this.state.results.match.teams) ?
                                        this.state.results.match.teams[this.state.team_id]['players'].map(function (player, index_player) {

                                          return (
                                            (formthis.state.results.match.players[player]['in_playing_squad'] === true || formthis.state.results.match.players[player]['stats']['minutes_played'] >0) ? 
                                            <tr key={index_player}>
                                              <td>{(formthis.state.results.match.players[player]['name']) ? formthis.state.results.match.players[player]['name'] : ""}</td>
                                              <td>{(formthis.state.results.match.players[player]['stats']['minutes_played']) ? formthis.state.results.match.players[player]['stats']['minutes_played'] : 0}</td>
                                              <td>{ formthis.state.results.match.players[player]['stats']['goal'] ? formthis.state.results.match.players[player]['stats']['goal']['scored'] : 0 }</td>
                                              <td>{ formthis.state.results.match.players[player]['stats']['goal'] ? formthis.state.results.match.players[player]['stats']['goal']['assist'] : 0 }</td>
                                              <td>{ formthis.state.results.match.players[player]['stats']['goal'] ? formthis.state.results.match.players[player]['stats']['goal']['own_goal_conceded'] : 0 }</td>
                                              <td>{ formthis.state.results.match.players[player]['stats']['goal'] ? formthis.state.results.match.players[player]['stats']['goal']['saved'] : 0 }</td>   
                                              <td>{ formthis.state.results.match.players[player]['stats']['goal'] && formthis.state.results.match.players[player]['stats']['goal']['conceded'] ? formthis.state.results.match.players[player]['stats']['goal']['conceded'] : 0 }</td>                                      
                                              <td>{ formthis.state.results.match.players[player]['stats']['card'] ? formthis.state.results.match.players[player]['stats']['card']['RC']: 0 }</td>                                        
                                              <td>{ formthis.state.results.match.players[player]['stats']['card'] ? formthis.state.results.match.players[player]['stats']['card']['Y2C']: 0 }</td>                                       
                                              <td>{ formthis.state.results.match.players[player]['stats']['card'] ? formthis.state.results.match.players[player]['stats']['card']['YC']: 0 }</td>                                         
                                              <td>{ formthis.state.results.match.players[player]['stats']['penality'] ? formthis.state.results.match.players[player]['stats']['penality']['missed']: 0 }</td>                                        
                                              <td>{ formthis.state.results.match.players[player]['stats']['penality'] ? formthis.state.results.match.players[player]['stats']['penality']['saved']: 0 }</td>                                       
                                              <td>{ formthis.state.results.match.players[player]['stats']['penality'] ? formthis.state.results.match.players[player]['stats']['penality']['scored']: 0 }</td>                                        
                                              <td>{ formthis.state.results.match.players[player]['stats']['foul'] ? formthis.state.results.match.players[player]['stats']['foul']['committed']: 0 }</td>                                       
                                              <td>{ formthis.state.results.match.players[player]['stats']['foul'] ? formthis.state.results.match.players[player]['stats']['foul']['drawn']: 0 }</td>                                       
                                              <td>{ formthis.state.results.match.players[player]['stats']['passes'] ? formthis.state.results.match.players[player]['stats']['passes']: 0 }</td>                                      
                                              <td>{ formthis.state.results.match.players[player]['stats']['tackles'] ? formthis.state.results.match.players[player]['stats']['tackles']: 0 }</td>                                      
                                              <td>{ formthis.state.results.match.players[player]['stats']['shot_on_target'] ? formthis.state.results.match.players[player]['stats']['shot_on_target']: 0 }</td>
                                            </tr>
                                            : ""
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
                              <td>{this.state.match.title ? this.state.match.title :""}</td>
                            </tr>
                            <tr>
                              <td>Date</td>
                              <td>{this.state.match.start ? timestampToDateTime(this.state.match.start.timestamp) :""}</td>
                            </tr>
                            <tr>
                                <td>Venue</td>
                                <td>{this.state.match.stadium ? this.state.match.stadium['name'] :""} {this.state.match.stadium ? ", "+this.state.match.stadium['city'] :""}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{this.state.inningsdetail && this.state.inningsdetail.team_a.full_name ? this.state.inningsdetail.team_a.full_name : ""} Squad</td>
                            </tr>
                            <tr>
                              <td>Lineup</td>
                              <td>
                              {
                                  (this.state.results.match && this.state.results.match.teams && this.state.results.match.teams[this.state.home_team_id] && formthis.state.results.match.teams[this.state.home_team_id]['lineup']) ? 
                                  (formthis.state.results.match.teams[this.state.home_team_id]['lineup']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{(formthis.state.results.match.players[item_player]['name']) ? comm+formthis.state.results.match.players[item_player]['name'] : ""}</span>
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
                                  (this.state.results.match && this.state.results.match.teams && this.state.results.match.teams[this.state.home_team_id] && formthis.state.results.match.teams[this.state.home_team_id]['bench']) ? 
                                  (formthis.state.results.match.teams[this.state.home_team_id]['bench']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{(formthis.state.results.match.players[item_player]['name']) ? comm+formthis.state.results.match.players[item_player]['name'] : ""}</span>
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
                              <td>Lineup</td>
                              <td>
                              {
                                  (this.state.results.match && this.state.results.match.teams && this.state.results.match.teams[this.state.home_team_id] && formthis.state.results.match.teams[this.state.away_team_id]['lineup']) ? 
                                  (formthis.state.results.match.teams[this.state.away_team_id]['lineup']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{(formthis.state.results.match.players[item_player]['name']) ? comm+formthis.state.results.match.players[item_player]['name'] : ""}</span>
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
                                  (this.state.results.match && this.state.results.match.teams && this.state.results.match.teams[this.state.home_team_id] && formthis.state.results.match.teams[this.state.away_team_id]['bench']) ? 
                                  (formthis.state.results.match.teams[this.state.home_team_id]['bench']).map((item_player,player_index)=>{
                                  let comm=(player_index===0)?"":", ";
                                  
                                  return(
                                      <span key={player_index}>{(formthis.state.results.match.players[item_player]['name']) ? comm+formthis.state.results.match.players[item_player]['name'] : ""}</span>
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

export default FootballFullScoreCard;
