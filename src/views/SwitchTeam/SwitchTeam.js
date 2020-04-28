import React, { Component } from 'react';
import config from './../../config';
import {dashboardpage,getCurrentTime,converttosecondnew,goBack,sendHome, checkresponse, sessioncheck, converttosecond, secondsToTime ,HBRout} from './../../Comman';
import { AvForm } from 'availity-reactstrap-validation';

let scurrenttimestamp=0;
let interval;

class SwitchTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getaddedplayeritems: [],
      userteamcount: 0,
      teamview: 0,
      userteam: [],
      playertypelist: [],
      arrayplayertype: {},
      checkplayerlist: [],
      time: 0,
      seconds: 0,
      checkid: 0,
      getjoinedteamlist: {}
    };
    sessioncheck();
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    sessioncheck();
    getCurrentTime().then(resultTimestamp=>{
      scurrenttimestamp=resultTimestamp;
      clearInterval(interval);
      this.startTimer();
      this.getUserTeam();
      this.getPlayerType();
      this.getJoinedTeam();
    })
  }

  getUserTeam = () => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var args1 = {
      matchid: matchid,
      poolcontestid: ""
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getuserteam";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.setState({
                userteam: json.data.teams,
                userteamcount: json.data.total
              })
            }
            else {
              formthis.setState({
                userteam: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  onClickCreateTeam = () => {
    if (this.state.userteamcount < 6) {
      let matchid = this.props.match.params.matchid;
      window.location.href =HBRout+ '/CreateTeams/' + matchid;
    }
    else {
      checkresponse("Warning", false, "Your limit is 6 team to create", 3);
    }
  }

  getTeamDetail = (teamid) => {
    var formthis = this;
    var args1 = {
      teamid: teamid
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getuserteamplayer";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {

              let getaddedplayeritems = {};
              Object.keys(formthis.state.playertypelist).forEach(function (keyPT, indexPT) {
                let teamlist = json.data.filter(itemTeam => itemTeam.playertype == keyPT)
                getaddedplayeritems[keyPT] = teamlist;
              })
              formthis.setState({
                getaddedplayeritems: getaddedplayeritems
              })
            }
            else {
              formthis.setState({
                getaddedplayeritems: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  onClickPreviw = (teamid) => {
    this.setState({ teamview: 1 });
    this.getTeamDetail(teamid);
  }

  getPlayerType = () => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var args1 = {
      gameid: sessionStorage.getItem("gameid")
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(args1)
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/getplayertype";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              let arrayplayertype = {};
              json.data.list.map(function (item, index) {
                arrayplayertype[item.id] = item;
              })
              formthis.setState({
                playertypelist: arrayplayertype
              })
            }
            else {
              formthis.setState({
                playertypelist: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  goBack = () => {
    window.history.back();
  }

  sendHome = () => {
    window.location.href =HBRout+ '/Home';
  }

  startTimer() {
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    interval=setInterval(function () {
      scurrenttimestamp=scurrenttimestamp+1000;
      let sessionmatchtime = sessionStorage.getItem("endtime_" + matchid);
      if(sessionmatchtime)
      {
        let intdate = parseInt(sessionmatchtime) * 1000;
        let ssecond = converttosecondnew(intdate,scurrenttimestamp);

        let timeLeftVar = secondsToTime(ssecond);
        let editStatus=((ssecond<0)?false:true);
        if(ssecond<0)
          {
            clearInterval(interval);
          }
        formthis.setState({
          seconds: ssecond,
          time: timeLeftVar,
          allowContestToEdit:editStatus
        }, () => {
          if (formthis.state.time.h < 0) {
            goBack();
          }
        })
    }
    else
    {
      if (sessionStorage.getItem("jwt")) {
        window.location.href =dashboardpage;
      }
    }

    }, 1000);
  }

  onChangeCheckbox = (e) => {
    let getjoinedteamlist = this.state.getjoinedteamlist;
    let currentId = parseInt(e.target.value);
    if (e.target.checked === false && !(getjoinedteamlist["uteamid"])) {
      getjoinedteamlist[currentId] = false;
      getjoinedteamlist["uteamid"] = currentId;
    }
    else
      if (e.target.checked === true && (getjoinedteamlist["uteamid"]) && !(getjoinedteamlist["switchteamid"])) {
        getjoinedteamlist[currentId] = true;
        getjoinedteamlist["switchteamid"] = currentId;
      }
      else
        if ((e.target.checked === false) && (currentId === getjoinedteamlist["switchteamid"])) {
          getjoinedteamlist[currentId] = false;
          delete getjoinedteamlist["switchteamid"];
        }
        this.setState({ getjoinedteamlist: getjoinedteamlist }, () => {
        
        });
    //this.setState({ checkid: teamid });
  }



  getJoinedTeam = () => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var poolid = this.props.match.params.poolid;
    var args1 = {
      matchid: matchid,
      poolcontestid: poolid
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }

    var pageno = this.state.pageno;
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getjoinedteam";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              let objjoinedteam = {};
              json.data.map(function (itemJT, indexJT) {
                objjoinedteam[itemJT.uteamid] = true;
              })

              formthis.setState({
                getjoinedteamlist: objjoinedteam
              })
            }
            else {
              formthis.setState({
                getjoinedteamlist: {}
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  onClickSaveSwitchTeam = () => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var poolid = this.props.match.params.poolid;
    let uteamid = this.state.getjoinedteamlist["uteamid"];
    let switchteamid = this.state.getjoinedteamlist["switchteamid"];

    if (uteamid && switchteamid) {
      var args1 = {
        matchid: matchid,
        poolcontestid: poolid,
        uteamid: uteamid,
        switchteamid: switchteamid
      };
      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        body: JSON.stringify(args1)
      }

      var pageno = this.state.pageno;
      var api_url = `${config.API_URL}`;

      var apiUrl = "";
      apiUrl = api_url + "/frontapi/switchteam";

      fetch(apiUrl, object)
        .then(function (response) {
          var chkresp = checkresponse("Wrong", response.status, response.message, 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                checkresponse("Switched", 200, json.msg, 1);
                formthis.goBack();
              }
              else {
                checkresponse("Warning", false, json.msg, 3);
              }
            })
          }
        }).catch(error => {
          checkresponse("Wrong", false, error.toString(), 0);
        });
    }
    else {
      checkresponse("Warning", false, "Please select switched team", 3);
    }
  }

  render() {
    var formthis = this;
    let matchid = this.props.match.params.matchid;
    return (
      <div className="fadeIn">
        <AvForm>
          <div className="left_logincontent profilepadding0">
            <div className="background-cover ng-scope">
              <div className="header_bg">
                <div className="hd_left">
                  <span onClick={goBack} className="hd_back"></span>
                  <span onClick={sendHome} className="hd_home"></span>
                </div>

                <div className="hd_center">{((this.props.location.pathname === "ChooseTeam")?"Choose Team":"Switch Team")} </div>
              </div>
              <div className="curremt_matchdetailbox">
                <div className="allover_ctcpart">
                  <div className="left_ctboxit">{sessionStorage.getItem("team1_" + matchid)}<span className="left_teamcurrent">vs</span>{sessionStorage.getItem("team2_" + matchid)} </div>
                  <div className="right_ctboxit pull-right">  {formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s </div>
                </div>
              </div>
              <div className="dress_area">
                <h3>Choose team to join the contest with</h3>

                {
                  formthis.state.userteam.map(function (item, index) {
                    return (
                      <div className={"caption_ctamod pointer " + ((formthis.state.getjoinedteamlist[item.id] === true) ? "contestteamselected" : "")} key={item.id}>
                        <h3><span className="intem_all pointern">
                          <input type="checkbox" value={item.id} checked={(formthis.state.getjoinedteamlist[item.id] === true) ? true : false} onChange={formthis.onChangeCheckbox} />
                        </span> {"Team: " + (index + 1)}</h3>
                        <div className="bdo_topends pointernone">
                          <div className="bdo_topendsright pointernone">	<p>Caption <span className="cpname_ecss pointernone">{item.cap}</span></p> </div>
                          <div className="bdo_topendsleft pointernone">	<p>Vice Caption <span className="cpname_ecss pointernone">{item.vcap}</span></p> </div>
                        </div>
                        <div className="edpri_clos">
                          <div className="col-sm-4 ">
                            <a className="edoxed01" id={item.id} onClick={() => formthis.onClickPreviw(item.id)}><i className="fa fa-eye pointernone"></i> Preview </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}

              </div>
              {/*------- fixed bottom section  ----------*/}
            </div>
          </div>
          {(this.props.location.pathname === "ChooseTeam") ? <a className="all_transaction up_bt"> <button className="savebtn_pencard pointer">JOIN</button> </a> : <div className="teamjoint_contestend">
            {((formthis.state.userteamcount === 6) ? (<a className="mytems_ategbox pointernone">6 Team Created</a>) : (<a href={HBRout+'/CreateTeams/' + matchid} className="mytems_ategbox"> Create Team ({formthis.state.userteamcount + 1})</a>))}
            <a className="joiendctox_ategbox" onClick={this.onClickSaveSwitchTeam}>Switch Team</a>
          </div>}

        </AvForm>
        <div className={"teampreview" + ((formthis.state.teamview === 0) ? " hidden" : "")}>

          <div className={ "innercontent " + (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="2" ? "football-ground-image " : "")+ (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="3" ? "kabaddi-ground-image " : "") + "" }>
            <div className="miniextra_groundbd">
              {
                Object.keys(formthis.state.getaddedplayeritems).map(function (keyAll, indexAll) {
                  return (
                    <div key={indexAll} className="wk_craditbox">

                      <h2>{formthis.state.playertypelist[keyAll]["name"]}</h2>
                      <div className="wkoals_main">
                        <ul>
                          {
                            Object.keys(formthis.state.getaddedplayeritems[keyAll]).map(function (keyOne, indexOne) {
                              return (
                                <li key={indexOne}>
                                  <div className="int_roundbd">
                                    <div className="circle_picmd">
                                      <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} className="flag_008b5" />
                                    </div>
                                    <p title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}> {formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
                                    <span className="val_incrpoint">{formthis.state.getaddedplayeritems[keyAll][keyOne]["credit"]} Cr</span>
                                  </div>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>

                    </div>
                  )
                })
              }
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default SwitchTeam;
