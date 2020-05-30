import React, { Component} from 'react';
import { goBack, sendHome, checkresponse, sessioncheck, matchFormatTypes, overrideLoaderCss, loaderColorCode} from './../../Comman';
import config from './../../config';
import { ClipLoader } from 'react-spinners';

class FullScoreCard extends Component {
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
      inningsName : {
        1 : "1st",
        2 : "2nd",
        3 : "3rd",
        4 : "4th",
        5 : "5th",
      },
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
                  teamInningCount : json.data.inningsdetail,
                  innings : json.data.innings
                
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
                  <div className="ltest_divbox"> <h5>{ (this.state.matchtype) ?  matchFormatTypes(this.state.matchtype) : ""}</h5></div>
                  {
                    (this.state.inningsdetail) ? 
                    <div className="live_teamscore">
                      <ul>
                      <li>
                        <div className="teamvs_icon"><img src={this.state.inningsdetail.team_a['logo']} alt="image" /></div> 
                        <div className="teamvs_name"> <span className="teamname_dinamic"> {this.state.team1name} </span></div>
                          <span>
                          {
                            (this.state.match && this.state.match.teams) ?
                              Object.values(this.state.inningsdetail['a']).map(function (scores, index_score) {
                                let comm=(index_score===0)?"":", ";
                                return (
                                  <span key={'score_'+index_score}> {(scores) ? comm+scores:""}</span>
                                )
                            })
                            : ""
                            }
                          </span>
                        </li>
                        
                        <li>
                          <div className="teamvs_icon"><img src={this.state.inningsdetail.team_b['logo']} alt="image" /></div> 
                          <div className="teamvs_name"> <span className="teamname_dinamic"> {this.state.team2name} </span></div>
                            <span>
                            {
                              (this.state.match && this.state.match.teams) ?
                                Object.values(this.state.inningsdetail['b']).map(function (scores, index_score) {
                                  let comm=(index_score===0)?"":", ";
                                  return (
                                    <span key={index_score}> {(scores) ? comm+scores:""}  </span>
                                  )
                              })
                              : ""
                              }
                            </span>
                        </li>
                      </ul>
                    </div> : ''
                  }
                  {
                    this.state.results.status =="completed" ? <p>{this.state.match['msgs'] ? this.state.match['msgs']['completed'] : this.state.match['msgs']['info']}</p> : ""
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
                          {(this.state.teamInningCount && this.state.teamInningCount[this.state.team_key]) ?
                           Object.keys(this.state.teamInningCount[this.state.team_key]).map((inning_number,index) => {
                           return(<li key={index}>
                             <div className="inning-card-header">
                              <span className="">{this.state.teamselected} { (this.state.matchtype && this.state.matchtype === 'test') ?  this.state.inningsName[inning_number] : ""} Innings</span>
                              <span className="pull-right">{this.state.inningsdetail[this.state.team_key][inning_number]}</span>
                             </div>
                             <div className="full_scorealldetatable">
                                <div className="table-responsive batting-div">
                                  <table className="table table-hovered batting-table" >
                                    <thead>
                                      <tr className="td-bg-gray">
                                        <th>Batsman</th>
                                        <th></th>
                                        <th>R</th>
                                        <th>B</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        <th>SR</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      
                                      (this.state.match && this.state.match.teams) ?
                                        this.state.match.innings[this.state.team_key+"_"+inning_number]['batting_order'].map(function (playing_xi, index_playing_xi) {

                                          return (
                                          <tr key={index_playing_xi}>
                                              <td> {formthis.state.match.players[playing_xi]['fullname']} {(formthis.state.match.teams[formthis.state.team_key]['match'].keeper === playing_xi) ? "(wk)" :"" } {formthis.state.match.teams[formthis.state.team_key]['match'].captain === playing_xi ? "(c)" :"" } </td>
                                              <td>
                                                { 
                                                  formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['dismissed'] == true ? formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['out_str'] : 'not out' 
                                                }
                                              </td>
                                              <td> <b> { formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['runs'] ? formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['runs'] : 0 } </b> </td>
                                              <td> { formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['balls'] ? formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['balls'] : 0 } </td>                                              
                                              <td> { formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['fours'] ? formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['fours'] : 0 } </td>                                              
                                              <td> { formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['sixes'] ? formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['sixes'] : 0 } </td>                                              
                                              <td> { formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['strike_rate'] ? formthis.state.match.players[playing_xi]['match']['innings'][inning_number]['batting']['strike_rate'] : 0 } </td>                                          
                                            </tr>
                                          )
                                      })
                                      : ""
                                      }
                                    </tbody>
                                      {
                                        (this.state.match && this.state.match.innings[this.state.team_key+"_"+inning_number]) ? 
                                        (<tbody>
                                            <tr>
                                              <th>Extras</th>
                                              <td colSpan="6" className="extra_run_block"><b>{this.state.match.innings[this.state.team_key+"_"+inning_number].extras ? this.state.match.innings[this.state.team_key+"_"+inning_number].extras : 0} </b>(b {this.state.match.innings[this.state.team_key+"_"+inning_number].bye ? this.state.match.innings[this.state.team_key+"_"+inning_number].bye :0}, lb {this.state.match.innings[this.state.team_key+"_"+inning_number].legbye ? this.state.match.innings[this.state.team_key+"_"+inning_number].legbye : 0}, w {this.state.match.innings[this.state.team_key+"_"+inning_number].wide ? this.state.match.innings[this.state.team_key+"_"+inning_number].wide : 0}, nb {this.state.match.innings[this.state.team_key+"_"+inning_number].noball ? this.state.match.innings[this.state.team_key+"_"+inning_number].noball :0}, p {this.state.match.innings[this.state.team_key+"_"+inning_number].penality ? this.state.match.innings[this.state.team_key+"_"+inning_number].penality :0})</td>
                                            </tr>
                                            <tr>
                                              <th>Total</th>
                                              <td colSpan="6" className="total_run_block"><b>{this.state.match.innings[this.state.team_key+"_"+inning_number].runs ? this.state.match.innings[this.state.team_key+"_"+inning_number].runs : 0} </b>({this.state.match.innings[this.state.team_key+"_"+inning_number].wickets ? this.state.match.innings[this.state.team_key+"_"+inning_number].wickets : 0} wkts, {this.state.match.innings[this.state.team_key+"_"+inning_number].overs ? this.state.match.innings[this.state.team_key+"_"+inning_number].overs : 0} Ov)</td>
                                            </tr>
                                            {((this.state.match.teams[this.state.team_key]['match']['playing_xi']).filter(x => !(this.state.match.innings[this.state.team_key+"_"+inning_number]['batting_order']).includes(x))).length > 0 ?
                                            <tr>
                                              <th>{(this.state.matchstatus && this.state.matchstatus === "completed") ? "Did not Bat" : "Yet to Bat" }</th>
                                              <td colSpan="6">
                                              {
                                                ((this.state.match.teams[this.state.team_key]['match']['playing_xi']).filter(x => !(this.state.match.innings[this.state.team_key+"_"+inning_number]['batting_order']).includes(x))).map((item_player,player_index)=>{
                                                  let comm=(player_index===0)?"":", ";
                                                  
                                                  return(
                                                    <span key={player_index}>{comm+formthis.state.match.players[item_player]['fullname']}</span>
                                                  )
                                                })
                                              }
                                              </td>
                                            </tr>
                                            : ""
                                            }
                                          </tbody>
                                        )
                                        : ""
                                      }
                                  </table>

                                </div>
                              </div>
                              <br></br>
                              <div className="full_scorealldetatable">
                                <div className="table-responsive bowler-div">
                                  <table className="table table-hovered bowler-table" >
                                    <thead>
                                      <tr className="td-bg-gray">
                                        <th>Bowler</th>
                                        <th>O</th>
                                        <th>M</th>
                                        <th>R</th>
                                        <th>W</th>
                                        <th>EX</th>
                                        <th>ECO</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      
                                      (this.state.match && this.state.match.innings) && this.state.match.innings[this.state.opponent_team_key+'_'+inning_number] ?
                                        this.state.match.innings[this.state.opponent_team_key+'_'+inning_number]['bowling_order'].map(function (bowling_order, index_bowling_order) {

                                          return (
                                            <tr key={index_bowling_order}>
                                              <td>{formthis.state.match.players[bowling_order]['fullname']}</td>
                                              <td>{ formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['overs'] ? formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['overs'] : 0 } </td>
                                              <td>{ formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['maiden_overs'] ? formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['maiden_overs'] : 0 } </td>
                                              <td>{ formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['runs'] ? formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['runs'] : 0 } </td>
                                              <td>{ formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['wickets'] ? formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['wickets'] : 0 } </td>
                                              <td>{ formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['extras'] ? formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['extras'] : 0 } </td>
                                              <td>{ formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['economy'] ? formthis.state.match.players[bowling_order]['match']['innings'][inning_number]['bowling']['economy'] : 0 } </td>                                             
                              
                                            </tr>
                                          )
                                      })
                                      : ""
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                            </li>)})
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
                            <td>{this.state.match.short_name ? this.state.match.short_name :""}, {this.state.match.related_name ? this.state.match.related_name :""}, {this.state.match.season ? this.state.match.season['name'] :""}</td>
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
                              <td>{this.state.match.venue ? this.state.match.venue :""}</td>
                          </tr>
                          <tr>
                              <td colSpan="2">{this.state.inningsdetail && this.state.inningsdetail.team_a.full_name ? this.state.inningsdetail.team_a.full_name : ""} Squad</td>
                          </tr>
                          <tr>
                              <td>Playing XI</td>
                              <td>
                                {
                                  (this.state.match && this.state.match.teams && this.state.match.teams.a && formthis.state.match.teams['a']['match']['playing_xi']) ? 
                                  (formthis.state.match.teams['a']['match']['playing_xi']).map((item_player,player_index)=>{
                                    let comm=(player_index===0)?"":", ";
                                    
                                    return(
                                      <span key={player_index}>{comm+formthis.state.match.players[item_player]['fullname']}{(formthis.state.match.teams['a']['match'].keeper === item_player) ? "(wk)" :"" } {formthis.state.match.teams['a']['match'].captain === item_player ? "(c)" :"" }</span>
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
                                  (this.state.match.teams && this.state.match.teams.a && this.state.match.teams['a']['match']['playing_xi']) ? 
                                    ((this.state.match.teams['a']['match']['players']).filter(x => !(this.state.match.teams['a']['match']['playing_xi']).includes(x))).map((item_player,player_index)=>{
                                      let comm=(player_index===0)?"":", ";
                                      
                                      return(
                                        <span key={player_index}>{comm+formthis.state.match.players[item_player]['fullname']}</span>
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
                              <td>Playing XI</td>
                              <td>
                                {
                                  (this.state.match.teams && this.state.match.teams.b && this.state.match.teams['b']['match']['playing_xi']) ? 
                                  (formthis.state.match.teams['b']['match']['playing_xi']).map((item_player,player_index)=>{
                                    let comm=(player_index===0)?"":", ";
                                    
                                    return(
                                      <span key={player_index}>{comm+formthis.state.match.players[item_player]['fullname']}{(formthis.state.match.teams['b']['match'].keeper === item_player) ? "(wk)" :"" } {formthis.state.match.teams['b']['match'].captain === item_player ? "(c)" :"" }</span>
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
                                    ((this.state.match.teams['b']['match']['players']).filter(x => !(this.state.match.teams['b']['match']['playing_xi']).includes(x))).map((item_player,player_index)=>{
                                      let comm=(player_index===0)?"":", ";
                                      
                                      return(
                                        <span key={player_index}>{comm+formthis.state.match.players[item_player]['fullname']}</span>
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

export default FullScoreCard;
