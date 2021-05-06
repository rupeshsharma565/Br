import React, { Component } from 'react';
import config from './../../config';
import { dashboardpage, getCurrentTime, converttosecondnew, goBack, sendHome, checkresponse, converttosecond, secondsToTime, sessioncheck, HBRout } from './../../Comman';
import { AvForm } from 'availity-reactstrap-validation';
//import { resolve } from 'dns';
// import { ClipLoader } from 'react-spinners';
// import { css } from '@emotion/core';
// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

let scurrenttimestamp = 0;
let interval;


class CreateTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      playertypelist: [],
      objplayertypelist: {},
      getaddedplayer: {},
      playerlist: [],
      totalplayerselect: 0,
      team1select: 0,
      team2select: 0,
      singlematchlist: [],
      totalcreditleft: 100,
      activeplayertype: 1,
      arrtotalplayerselect: [],
      addsubcredit: {},
      team1name: "",
      team2name: "",
      getaddedplayeritems: { "1": {}, "2": {}, "3": {}, "4": {} },
      getalladdedplayeritems: [],
      captionClassC: "",
      captionClassVC: "",
      displaynext: 0,
      time: 0,
      seconds: 0,
      checkstatus: false,
      playerdetailevent: false,
      playerdetail:{},
      minimumcal: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      summinfixeedremaining: 0,
      loading: false,
      saveOnClickOne:true
    };
    sessioncheck();
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  componentWillMount() {
    if (sessioncheck() === true) {
      this.getPlayerType();
    }
  }

  componentDidMount() {
    sessioncheck();
    getCurrentTime().then(resultTimestamp => {
      scurrenttimestamp = resultTimestamp;
      clearInterval(interval);
      this.startTimer();
      let playertype=0;
      if(sessionStorage.getItem("gameid")==="1"){
        playertype=1;
      }else if(sessionStorage.getItem("gameid")==="3"){
        playertype=5;
      }

      this.getPlayers(playertype);
      this.getSingleMatch();
      this.getTeamDetail();
    })
  }


  getPlayerType = () => {
    var formthis = this;
    var args1 = {
      gameid: sessionStorage.getItem("gameid")
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args1)
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
              let pushPY = {};
              let minimumcal = {};
              if (json && json.data && json.data.list.length) {
                json.data.list.map(function (itemPY, indexPY) {
                  //itemPY["name"] = itemPY.fullname;
                  itemPY["title"] = "Pick " + itemPY.min + "-" + itemPY.max + " " + itemPY.fullname;
                  pushPY[itemPY.id] = itemPY;
                  minimumcal[itemPY.id] = parseInt(itemPY.min);
                })
              }

              formthis.setState({
                playertypelist: json.data.list,
                objplayertypelist: pushPY,
                minimumcal: minimumcal
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


  getPlayers = (playertype) => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var args1 = {
      matchid: matchid,
      playertype: playertype
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
    apiUrl = api_url + "/frontapi/getmatchteamfront";
    //////GET//////
    // if(this.props.pending ) {
    //   return <Loader />;
    // }
    formthis.setState({
      playerlist: []
    })
    fetch(apiUrl, object)
      .then(function (response) {

        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.setState({
                playerlist: json.data,
                //getaddedplayer:pushPY
              }, () => {
                //formthis.getTeamDetail();
              })
            }
            else {
              formthis.setState({
                playerlist: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  getSingleMatch = () => {
    var formthis = this;
    var matchid = this.props.match.params.matchid;
    var args1 = {
      matchid: matchid
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
    apiUrl = api_url + "/frontapi/getsinglematch";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.setState({
                singlematchlist: json.data,
                team1name: json.data.team1,
                team2name: json.data.team2
              })
            }
            else {
              formthis.setState({
                singlematchlist: []
              })
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  sendBack = () => {
    let matchid = this.props.match.params.matchid;
    //window.location.href =HBRout+ '/Contests/' + matchid;
    window.history.back();
  }

  sendHome = () => {
    window.location.href = HBRout + '/Home';
  }

  onClickPlayerType = (ptid) => {

    this.setState({ activeplayertype: ptid });
    this.getPlayers(ptid);
  }



  addPlayer = (playerid, playertypeid, credit, itemPlayer, eventhit) => {
    let formthis = this;
    let scredit = parseFloat(itemPlayer["credit"]);
    let statescrit = parseFloat(formthis.state.totalcreditleft);
    if (eventhit === 1) {//if eventhit=1, unselect
      let chkcredit = (statescrit + scredit).toFixed(1);
      if (formthis.state.totalplayerselect > 0 && chkcredit <= 100) {
        ////////////////
        eventhit = (!eventhit || eventhit == 0) ? 1 : 0;
        let addsubcredit = formthis.state.addsubcredit;
        addsubcredit[playerid] = eventhit;
        formthis.setState({ addsubcredit: addsubcredit });
        /////////////////

        let team1select = (itemPlayer["teamname"] === formthis.state.team1name) ? (formthis.state.team1select - 1) : formthis.state.team1select;
        let team2select = (itemPlayer["teamname"] === formthis.state.team2name) ? (formthis.state.team2select - 1) : formthis.state.team2select;
        let getaddedplayer = this.state.getaddedplayer;
        let asplayer = (getaddedplayer[formthis.state.activeplayertype]) ? getaddedplayer[formthis.state.activeplayertype] : 0;
        getaddedplayer[formthis.state.activeplayertype] = (formthis.state.activeplayertype.toString() == itemPlayer["playertype"]) ? (asplayer - 1) : asplayer;

        let getaddedplayeritems = formthis.state.getaddedplayeritems;
        let getpt = getaddedplayeritems[formthis.state.activeplayertype];
        delete getpt[playerid];

        getaddedplayeritems[formthis.state.activeplayertype] = getpt;

        let getalladdedplayeritems = formthis.state.getalladdedplayeritems;
        //delete getalladdedplayeritems[playerid];
        let index = getalladdedplayeritems.findIndex(x => x.pid == playerid);
        getalladdedplayeritems.splice(index, 1);

        let minimumcal = formthis.state.minimumcal;
        //console.log("minimumcal===========>",minimumcal);
        //let jhjh=()
        let minfixed = parseInt(formthis.state.objplayertypelist[formthis.state.activeplayertype]["min"]);
        let remainingminfixedplayer = (minimumcal[playertypeid]);
        if ((asplayer - minfixed) <= 0) {
          remainingminfixedplayer = (minimumcal[playertypeid]) + 1;
        }


        minimumcal[playertypeid] = (remainingminfixedplayer < 0) ? 0 : remainingminfixedplayer;

        formthis.setState({
          totalplayerselect: (formthis.state.totalplayerselect - 1),
          totalcreditleft: chkcredit,
          team1select: team1select,
          team2select: team2select,
          getaddedplayer: getaddedplayer,
          getaddedplayeritems: getaddedplayeritems,
          getalladdedplayeritems: getalladdedplayeritems,
          minimumcal: minimumcal,
          summinfixeedremaining: (minimumcal[1] + minimumcal[2] + minimumcal[3] + minimumcal[4])
        },
          () => {
            //this.calculationCheck();
            let arrtotalplayerselect = [];
            let n = formthis.state.totalplayerselect;
            for (var j = 1; j <= n; j++) {
              arrtotalplayerselect.push(j);
            }
            formthis.setState({ arrtotalplayerselect: arrtotalplayerselect });
          },
        );
      }
    }
    else {//if eventhit=0 or undefined, select
      let chkcredit = (formthis.state.totalcreditleft - scredit).toFixed(1);
      if (formthis.state.totalplayerselect < 11 && chkcredit >= 0) {
        //////////////
        eventhit = (!eventhit || eventhit == 0) ? 1 : 0;
        let addsubcredit = formthis.state.addsubcredit;
        addsubcredit[playerid] = eventhit;
        formthis.setState({ addsubcredit: addsubcredit })
        ////////////////
        let team1select = (itemPlayer["teamname"] === formthis.state.team1name) ? (formthis.state.team1select + 1) : formthis.state.team1select;
        let team2select = (itemPlayer["teamname"] === formthis.state.team2name) ? (formthis.state.team2select + 1) : formthis.state.team2select;
        let getaddedplayer = this.state.getaddedplayer;
        let asplayer = (getaddedplayer[formthis.state.activeplayertype]) ? getaddedplayer[formthis.state.activeplayertype] : 0;
        getaddedplayer[formthis.state.activeplayertype] = (formthis.state.activeplayertype.toString() == itemPlayer["playertype"]) ? (asplayer + 1) : asplayer;


        let getaddedplayeritems = formthis.state.getaddedplayeritems;
        let arrItemPlayer = {};
        let ckgetaddedplayeritems = (formthis.state.getaddedplayeritems[formthis.state.activeplayertype]) ? formthis.state.getaddedplayeritems[formthis.state.activeplayertype] : {};
        arrItemPlayer = ckgetaddedplayeritems;
        arrItemPlayer[playerid] = itemPlayer;
        getaddedplayeritems[formthis.state.activeplayertype] = arrItemPlayer;


        itemPlayer["pts"] = parseFloat(itemPlayer["pts"]);
        let getalladdedplayeritems = formthis.state.getalladdedplayeritems;
        getalladdedplayeritems.push(itemPlayer);
        getalladdedplayeritems.sort(function (a, b) { return b.pts - a.pts; });

        let minimumcal = formthis.state.minimumcal;
        //console.log("minimumcal==========>",minimumcal);
        let remainingminfixedplayer = minimumcal[playertypeid] - 1;// minimumcal[playertypeid] - 1;//
        minimumcal[playertypeid] = (remainingminfixedplayer < 0) ? 0 : remainingminfixedplayer;

        formthis.setState({
          totalplayerselect: (formthis.state.totalplayerselect + 1),
          totalcreditleft: chkcredit,
          team1select: team1select,
          team2select: team2select,
          getaddedplayer: getaddedplayer,
          getaddedplayeritems: getaddedplayeritems,
          getalladdedplayeritems: getalladdedplayeritems,
          minimumcal: minimumcal,
          summinfixeedremaining: (minimumcal[1] + minimumcal[2] + minimumcal[3] + minimumcal[4])
        },
          () => {
            //this.calculationCheck();
            let arrtotalplayerselect = [];
            let n = formthis.state.totalplayerselect;
            for (var j = 1; j <= n; j++) {
              arrtotalplayerselect.push(j);
            }
            formthis.setState({ arrtotalplayerselect: arrtotalplayerselect });
          },
        );
      }
    }
  }

  plusMinusClassNewMore = (itemPlayer) => {
    let formthis = this;

    let totalcreditleft=parseFloat(formthis.state.totalcreditleft);
    //console.log("cal----->>>",formthis.state.totalplayerselect,formthis.state.team1select,formthis.state.team2select,totalcreditleft);
    let ckcredit = parseFloat(itemPlayer["credit"]);
    let ckcreditminus = totalcreditleft - ckcredit;
    
    let steam7ck = "pointernone";

    let asplayer = (formthis.state.getaddedplayer[formthis.state.activeplayertype]) ? formthis.state.getaddedplayer[formthis.state.activeplayertype] : 0;

    let remplayer = 11 - formthis.state.totalplayerselect;


    if (formthis.state.objplayertypelist[formthis.state.activeplayertype]) {

      let minfixed = parseInt(formthis.state.objplayertypelist[formthis.state.activeplayertype]["min"]);
      let maxfixed=parseInt(formthis.state.objplayertypelist[formthis.state.activeplayertype]["max"]);
      //console.log("minfixed=",minfixed,"maxfixed=",maxfixed,"summinfixeedremaining=",formthis.state.summinfixeedremaining);
      // if(formthis.state.totalplayerselect < 11)
      // {
      //   steam7ck = " pointer ";
      //   console.log(itemPlayer.pid,"---------5----------");
      // }
      if ((formthis.state.addsubcredit[itemPlayer.pid] === 1) || (asplayer < minfixed && ((formthis.state.team1select < 7 && itemPlayer["teamname"] === formthis.state.team1name) || (formthis.state.team2select < 7 && itemPlayer["teamname"] === formthis.state.team2name)))) {
        steam7ck = " pointer ";
        //console.log(itemPlayer.pid,"---------1----------");
      }
      if ((formthis.state.addsubcredit[itemPlayer.pid] === 1) || (formthis.state.totalplayerselect < 11 && ckcreditminus >= 0 && ((formthis.state.totalplayerselect + formthis.state.summinfixeedremaining) < 11) && asplayer < maxfixed && ((formthis.state.team1select < 7 && itemPlayer["teamname"] === formthis.state.team1name) || (formthis.state.team2select < 7 && itemPlayer["teamname"] === formthis.state.team2name)))) {
        steam7ck = " pointer ";
        //console.log(itemPlayer.pid,"---------2----------");
      }
      if (ckcreditminus < 0) {
        steam7ck = " pointernone ";
        //console.log(itemPlayer.pid,"---------3----------");
      }
      if ((formthis.state.addsubcredit[itemPlayer.pid] === 1)) {
        steam7ck = " pointer ";
        //console.log(itemPlayer.pid,"---------4----------");
      }

      return steam7ck + " addintuicon_intboxde ";
    }
    else {
      return "";
    }
  }



  buttoncotinue = () => {
    let steam11ck = "pointer";
    if (this.state.totalplayerselect < 11) {
      steam11ck = "pointernone continuebutton";
    }
    return steam11ck;
  }

  buttonSaveClass = () => {
    let steam11ck = "pointernone continuebutton";
    if (this.state.captionClassVC && this.state.captionClassC) {
      steam11ck = "pointer";
    }
    return steam11ck;
  }

  onClickContinue = () => {
    this.setState({ displaynext: 1 });
  }

  onClickC = (e) => {
    let formthis = this;
    let cksimilar = formthis.state.captionClassVC;
    if (e.target.id == formthis.state.captionClassVC) {
      cksimilar = "";
    }
    this.setState({
      captionClassC: e.target.id,
      captionClassVC: cksimilar
    });


  }

  onClickVC = (e) => {
    let formthis = this;
    let cksimilar = formthis.state.captionClassC;
    if (formthis.state.captionClassC == e.target.id) {
      cksimilar = "";
    }
    this.setState({
      captionClassVC: e.target.id,
      captionClassC: cksimilar
    });
  }

  checkPlayerTeam(array2, scap, svcap) {
    var formthis = this;
    return new Promise(function (resolve, reject) {
      var matchid = formthis.props.match.params.matchid;
      var args1 = {
        matchid: matchid
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
      apiUrl = api_url + "/frontapi/getuserteamcheckvali";

      fetch(apiUrl, object)
        .then(function (response) {
          var chkresp = checkresponse("Wrong", response.status, response.message, 2);
          if (chkresp === true) {
            response.json().then(json => {
              let arrteamchk = [];
              if (json.error === false) {
                let checkplayerlist = json.data;
                checkplayerlist.map(function (itemTeam, indexTeam) {
                  /*Check player*/
                  let arritemTeam = Array.prototype.map.call(itemTeam, s => s.pid);
                  let array1 = arritemTeam;
                  let comparearry = (array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] }));

                  /*Check cap*/
                  let itemCaptin = (itemTeam.find(x => x.iscap == 1)).pid;
                  /*Check vcap*/
                  let itemVCaptin = (itemTeam.find(x => x.isvcap == 1)).pid;
                  let ck1 = (comparearry === true) ? 1 : 0;
                  let ck2 = (itemCaptin == scap) ? 1 : 0;
                  let ck3 = (itemVCaptin == svcap) ? 1 : 0;

                  let ckk = ck1 + ck2 + ck3;
                  arrteamchk.push(ckk);
                  if (checkplayerlist.length === (indexTeam + 1)) {
                    return resolve(arrteamchk);
                    // formthis.setState({checkstatus:true},()=>{

                    // });
                  }
                  // else
                  // {
                  //   return resolve(0);
                  //   // formthis.setState({checkstatus:false},()=>{

                  //   // });
                  // }
                })
              }
              else {
                return resolve(arrteamchk);
                // return resolve(false);
                // formthis.setState({checkstatus:false},()=>{

                // });
              }
            })
          }
        }).catch(error => {
          checkresponse("Wrong", false, error.toString(), 0);
        });
    })
  }

  onClickSave() {
    let formthis = this;
    if (formthis.state.saveOnClickOne === true) {
      formthis.setState({ saveOnClickOne: false }, () => {
        //formthis.setState({loading:true});
        var matchid = this.props.match.params.matchid;
        let teamid = this.props.match.params.teamid;
        let iscap = this.state.captionClassC;
        let isvcap = this.state.captionClassVC;

        let chkURLCloneTeam = ((this.props.location.pathname).toString().indexOf("CloneTeam"));
        let userteamplayers = this.state.getalladdedplayeritems.map(a => a.pid);

        this.checkPlayerTeam(userteamplayers, iscap, isvcap).then(result => {
        let checkalready = result.indexOf(3);
        if (checkalready > -1) {
          formthis.setState({ saveOnClickOne: true });
          checkresponse("Warning", false, "This team already created", 3);
        }
        else 
        {
          var api_url = `${config.API_URL}`;
          var reqapi = "";

          var args1 = {
            matchid: matchid,
            userteamplayers: userteamplayers,
            iscap: iscap,
            isvcap: isvcap
          };


          if (chkURLCloneTeam > 0) {
            reqapi = api_url + "/frontapi/createteamuser";
          }
          else
            if (teamid) {
              reqapi = api_url + "/frontapi/updateteamuser";
              args1["userteamid"] = teamid;
            }
            else {
              reqapi = api_url + "/frontapi/createteamuser";
            }
          var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
            },
            body: JSON.stringify(args1)
          }

          fetch(reqapi, object)
            .then(function (response) {
              var chkresp = checkresponse("Wrong", response.status, "", 2);
              if (chkresp === true) {
                response.json().then(json => {
                  //formthis.setState({loading:false});
                  if (json.error === false) {
                    let headername = (chkURLCloneTeam > 0) ? "Created" : ((teamid) ? "Updated" : "Created");
                    checkresponse(headername, 200, json.msg, 1);
                    window.location.href = HBRout + '/MyTeams/' + matchid;
                  }
                  else {
                    formthis.setState({ saveOnClickOne: true });
                    checkresponse("Warning", false, json.msg, 3);
                  }
                })
              }

            }).catch(error => {
              formthis.setState({ saveOnClickOne: true });
              checkresponse("Wrong", false, error.toString(), 0);
            });
        }

        });
      });
    }
  }

  startTimer() {
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    interval = setInterval(function () {
      scurrenttimestamp = scurrenttimestamp + 1000;
      let sessionmatchtime = sessionStorage.getItem("endtime_" + matchid);
      if (sessionmatchtime) {
        let intdate = parseInt(sessionmatchtime) * 1000;
        let ssecond = converttosecondnew(intdate, scurrenttimestamp);

        let timeLeftVar = secondsToTime(ssecond);
        let editStatus = ((ssecond < 0) ? false : true);
        if (ssecond < 0) {
          clearInterval(interval);
        }
        formthis.setState({
          seconds: ssecond,
          time: timeLeftVar,
          allowContestToEdit: editStatus
        }, () => {
          if (formthis.state.time.h < 0) {
            window.location.href = dashboardpage;
          }
        })
      }
      else {
        if (sessionStorage.getItem("jwt")) {
          window.location.href = dashboardpage;
        }
      }

    }, 1000);
  }

  getTeamDetail = () => {
    let teamid = this.props.match.params.teamid;
    if (teamid) {
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

      var pageno = this.state.pageno;
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
                let getaddedplayer = {};
                let addsubcredit = {};
                let totalplayerselect = 0;
                let team1select = 0;
                let team2select = 0;
                let totalcreditleft = formthis.state.totalcreditleft;
                let getalladdedplayeritems = [];
                let captionClassC = "0";
                let captionClassVC = "0";
                formthis.state.playertypelist.forEach(function (keyPT, indexPT) {
                  let teamlist = json.data.filter(itemTeam => itemTeam.playertype == keyPT.id);
                  let objPlayers = {};
                  let addgetaddedplayer = 0;


                  teamlist.map(function (itemPlayer, indexPlayer) {
                    objPlayers[itemPlayer.pid] = itemPlayer;
                    addsubcredit[itemPlayer.pid] = 1;
                    addgetaddedplayer++;
                    totalplayerselect++;
                    totalcreditleft = totalcreditleft - parseFloat(itemPlayer.credit);
                    team1select = (itemPlayer["teamname"] === formthis.state.team1name) ? (team1select + 1) : team1select;
                    team2select = (itemPlayer["teamname"] === formthis.state.team2name) ? (team2select + 1) : team2select;
                    itemPlayer.credit = parseFloat(itemPlayer.credit);
                    getalladdedplayeritems.push(itemPlayer);
                    if (itemPlayer.iscap === "1") {
                      captionClassC = itemPlayer.pid;
                    }
                    if (itemPlayer.isvcap === "1") {
                      captionClassVC = itemPlayer.pid;
                    }
                  })

                  getaddedplayeritems[keyPT.id] = objPlayers;
                  getaddedplayer[keyPT.id] = addgetaddedplayer;
                })
                getalladdedplayeritems.sort(function (a, b) { return b.pts - a.pts; });
                totalcreditleft = totalcreditleft.toFixed(1);
                //formthis.state.addsubcredit
                formthis.setState({
                  getaddedplayeritems: getaddedplayeritems,
                  addsubcredit: addsubcredit,
                  getaddedplayer: getaddedplayer,
                  totalplayerselect: totalplayerselect,
                  totalcreditleft: totalcreditleft,
                  team1select: team1select,
                  team2select: team2select,
                  getalladdedplayeritems: getalladdedplayeritems,
                  captionClassC: captionClassC,
                  captionClassVC: captionClassVC,
                  minimumcal: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  }
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
  }

  sendHome = () => {
    window.location.href = HBRout + '/Home';
  }

  playerDeailEvent = (playerdetail) => {
    //console.log("playerdetail--->>.",playerdetail);
    let formthis=this;    

    if(!this.state.playerdetailevent)
    {
    //////////////
    let args1={
      pid:playerdetail.pid,
      seriesid:"1"
    }
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
    apiUrl = api_url + "/frontapi/getplayerpoints";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            
                    if (json.error === false) {
                      playerdetail.matchs=json.data;
                      let tselplayer=0;
                      let ttplayer=0;
                      let gtotalpoints=0;
                      json.data.forEach(function(itemDetail){
                        tselplayer=tselplayer+itemDetail.selectedplayer;
                        
                        ttplayer=ttplayer+itemDetail.totalplayer;
                        gtotalpoints=gtotalpoints+itemDetail.totalpoints;
                        console.log("itemDetail.selectedplayer--->>",itemDetail.selectedplayer,itemDetail.totalplayer);
                      })
                      console.log("tselplayer,gtotalpoints--->>",tselplayer,ttplayer);
                      playerdetail.tselplayer=tselplayer;
                      playerdetail.ttplayer=ttplayer;
                      playerdetail.gtotalpoints=gtotalpoints;
                      console.log("json--->>>",playerdetail);
                      
                    }
                    formthis.setState({playerdetail:playerdetail});
                })
              }

               
              })
    /////////////
    }
    this.setState({ playerdetailevent: !this.state.playerdetailevent})
  }

  calculationCheck = () => {
    let formthis = this;
    let getaddedplayer = this.state.getaddedplayer;
    let sumremaining = 0;
    let sumcurrent = 0;
    // Object.keys(getaddedplayer).map(function(remainingKey,remainingIndex){
    //   let chkvalue= getaddedplayer[remainingKey];
    //   if(remainingKey!=formthis.state.activeplayertype)
    //   {
    //     sumremaining=sumremaining+chkvalue;
    //   }

    //   if(remainingKey===formthis.state.activeplayertype)
    //   {
    //     sumcurrent=sumcurrent+chkvalue;
    //   }
    // })


    let summin = 0
    let totalplayerselect = 0;

    Object.keys(getaddedplayer).map(function (remainingKey, remainingIndex) {
      let chkvalue = getaddedplayer[remainingKey];
      totalplayerselect = totalplayerselect + formthis.state.getaddedplayer[formthis.state.activeplayertype];
      if (remainingKey != formthis.state.activeplayertype) {
        let mincount = parseInt(formthis.state.objplayertypelist[formthis.state.activeplayertype]["min"]);
        if (formthis.state.getaddedplayer[formthis.state.activeplayertype] >= mincount) {
          summin = summin + chkvalue;
        }
      }
    })

    let checkvalidation = totalplayerselect + summin;
    if (checkvalidation > 11) {
      console.log("Don't exceed");
      return " pointernone"
    }
    else {
      return "";
    }
    //let sumcurrentrem=sumremaining+parseInt(formthis.state.objplayertypelist[formthis.state.activeplayertype]["min"]);
    // if(sumcurrentrem>11)
    // {
    //   console.log("Don't exceed")
    // }
  }


  render() {
    var formthis = this;
    return (
      <div className="fadeIn">
        {/* <div className={"loaderdiv" + ((this.state.loading === true) ? "" : " hidden")}>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={60}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div> */}
        <AvForm >
          <div className="left_logincontent profilepadding0">
            <div className={"background-cover ng-scope" + ((formthis.state.displaynext === 0) ? "" : " hidden")}>
              <div className="header_bg">
                <div className="hd_left">
                  <span onClick={goBack} className="hd_back" />
                  <span onClick={sendHome} className="hd_home" />
                </div>
                <div className="hd_center"><div className="timer_3d48d">{formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s</div></div>
              </div>
              <div className="my_accountpage">
                <div className="topmax_players">
                  <div className="max_titleplay">Max 7 players from a team</div>
                  <div className="fourth_mtboxdeall">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="max_innerboxets">
                          <div className="playxmin_tital">Players</div>
                          <div className="squadText_mts">
                            <div className="creditsText_a4625">{formthis.state.totalplayerselect}</div>
                            <div className="totalCount_text">/11</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="max_innerboxets">
                          <div className="flex_contryimg"><img src={formthis.state.singlematchlist.team1logo} className="flag_008b5" /></div>

                          <div className="squadText_mts">
                            <div className="selectedCount_text">{formthis.state.team1select}</div>
                          </div>
                          <div className="playxmin_tital newdesign_tites">{formthis.state.singlematchlist.team1}</div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="max_innerboxets">
                          <div className="play_intsboxsna">
                            <div className="squadText_mts">
                              <div className="selectedCount_text">{formthis.state.team2select}</div>
                            </div>

                          </div>
                          <div className="flex_contryimgrightbox"><img src={formthis.state.singlematchlist.team2logo} className="flag_008b5" /></div>
                          <div className="playxmin_tital newdesign_tites">{formthis.state.singlematchlist.team2}</div>
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="max_innerboxets text-right">
                          <div className="playxmin_tital">Credits Left</div>
                          <div className="creditsText_a4625">{formthis.state.totalcreditleft}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="progressContainer_00657">
                    <div className="stepperContainer_b9ae4">
                      <ul>

                        <li className={formthis.state.totalplayerselect >= 1 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 1) ? (<span className="value_detailsnu">1</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 2 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 2) ? (<span className="value_detailsnu">2</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 3 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 3) ? (<span className="value_detailsnu">3</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 4 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 4) ? (<span className="value_detailsnu">4</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 5 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 5) ? (<span className="value_detailsnu">5</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 6 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 6) ? (<span className="value_detailsnu">6</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 7 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 7) ? (<span className="value_detailsnu">7</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 8 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 8) ? (<span className="value_detailsnu">8</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 9 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 9) ? (<span className="value_detailsnu">9</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 10 ? "active" : ""}><div className="progress_intesterbox">{(formthis.state.totalplayerselect === 10) ? (<span className="value_detailsnu">10</span>) : ""} </div></li>
                        <li className={formthis.state.totalplayerselect >= 11 ? "active" : ""}><div className="progress_intesterbox"><span className="value_detailsnu">11</span></div></li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="verify_pgcsmain">
                  <div className="tab_area home_nttabsbox creat_magteam matchboxes_intels">
                    <div className="tabsMainContainer_e2849">
                      <ul className="nav nav-pills">
                        {
                          this.state.playertypelist.map(function (itemplayertype, indexpt) {
                            let intno = formthis.state.activeplayertype.toString();
                            return (
                              <li key={indexpt} className={(itemplayertype.id === intno) ? "active" : ""} onClick={() => formthis.onClickPlayerType(itemplayertype.id)}>
                                <a data-toggle="tab pointernone">
                                  {itemplayertype.name}
                                  <span className="member_numbers1 pointernone">
                                    ({(formthis.state.getaddedplayer[itemplayertype.id]) ? formthis.state.getaddedplayer[itemplayertype.id] : 0})
                              </span> </a></li>
                            )
                          })
                        }

                      </ul>
                      {/* <ul className="nav nav-pills crenewtemulist">
                      {
                          this.state.playertypelist.map(function (itemplayertype, indexpt) {
                            let intno = formthis.state.activeplayertype.toString();
                            return (
                        <li key={indexpt} className={"createteamactve "+((itemplayertype.id === intno) ? "active" : "")} onClick={() => formthis.onClickPlayerType(itemplayertype.id)}>
                          <a data-toggle="tab" className="playertypeactive">
                            <div className="crenewtm_tabliimg">
                              <img src={itemplayertype.icon} alt="image" />
                              <span>{itemplayertype.name}</span>
                              </div> 
                              <div className="crenotification_value">{(formthis.state.getaddedplayer[itemplayertype.id]) ? formthis.state.getaddedplayer[itemplayertype.id] : 0}</div>
                          </a>
                        </li>
                         )
                        })
                      }
                      </ul> */}

                      {/* <ul className="nav nav-pills crenewtemulist">
        <li className="active"><a href="#match1" data-toggle="tab"><div className="crenewtm_tabliimg"><img src={require("./../../images/wk.png")} alt="image" /><span>WK</span></div> <div className="crenotification_value">0</div> </a></li>
        <li><a href="#match2" data-toggle="tab"><div className="crenewtm_tabliimg"><img src={require("./../../images/bat.png")} alt="image" /><span>BAT</span></div> <div className="crenotification_value">0</div></a></li> 
        <li><a href="#match3" data-toggle="tab"><div className="crenewtm_tabliimg"><img src={require("./../../images/ar.png")} alt="image" /><span>AR</span></div><div className="crenotification_value">0</div> </a></li>
        <li><a href="#match4" data-toggle="tab"><div className="crenewtm_tabliimg"><img src={require("./../../images/bow.png")} alt="image" /><span>BOW</span></div> <div className="crenotification_value">0</div></a></li>
      </ul> */}
                      <div className="createTeamTabsHelpContainer_ce9c9">{(formthis.state.objplayertypelist[formthis.state.activeplayertype]) ? formthis.state.objplayertypelist[formthis.state.activeplayertype]["title"] : ""}</div>
                      <div className="ctSortingHeader_a6515">
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="cerat_innertemctp"><b>PLAYERS</b></div>
                          </div>
                          <div className="col-sm-3 pointsboxes_ed">
                            <div className="cerat_innertemctp points_textlemin"><b>POINTS</b></div>
                          </div>
                          <div className="col-sm-2 cdets_sob">
                            <div className="cerat_innertemctp textforsodce"><b>CREDITS</b></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content clearfix">
                      <div className="tab-pane active" id="match1">
                        <div className="player_checkaddbbox">
                          <ul className="fot_creatmostaddt">
                            {
                              this.state.playerlist.map(function (itemPlayer, indexPlayer) {
                                return (
                                  <li key={indexPlayer} className={(itemPlayer.isplaying==="0")?"bg-notplaying":""}>
                                    <div className="add_teamcreateleftbox">
                                      <div className="img_areaaddtem"><img className="pointer" src={itemPlayer.pimg} alt="image" onClick={()=>formthis.playerDeailEvent(itemPlayer)} /></div>
                                      <div className="imgdiscription_rightde"> <div className="playername_textcreate">{itemPlayer.pname}</div> <div className="playerteam_namebts">{itemPlayer.teamname + "-" + itemPlayer.ptype}</div></div>
                                    </div>
                                    <div className="add_teamcreaterightbox">
                                <div className="points_intbox">{itemPlayer.pts} <br/> 
                                    {(itemPlayer.isplaying==="0")?(<span className="bg-notplayingfont">Not Playing</span>):(itemPlayer.isplaying==="1"?(<span className="bg-playingfont">Playing</span>):null)} </div>
                                      <div className="cradits_intboxde">{itemPlayer.credit}</div>
                                      <div className={formthis.plusMinusClassNewMore(itemPlayer)} onClick={() => formthis.addPlayer(itemPlayer.pid, formthis.state.activeplayertype, itemPlayer.credit, itemPlayer, formthis.state.addsubcredit[itemPlayer.pid])}><a className="pointernone"><i className={(!(formthis.state.addsubcredit[itemPlayer.pid]) || formthis.state.addsubcredit[itemPlayer.pid] === 0) ? "fa fa-plus-circle pointernone" : "fa fa-minus-circle pointernone"} aria-hidden="true" /></a></div>
                                    </div>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>



                    </div>
                  </div>
                </div></div>
              <a className={"all_transaction up_bt " + formthis.buttoncotinue()} onClick={formthis.onClickContinue}> <button className={"savebtn_pencard pointer"}>CONTINUE</button> </a>
            </div>

            {/* -----------------Selected Team---------------- */}

            <div className={"background-cover ng-scope" + ((formthis.state.displaynext === 0) ? " hidden" : "")}>
              <div className="header_bg">
                <div className="hd_left">
                  <span onClick={goBack} className="hd_back" />
                  <span onClick={sendHome} className="hd_home" />
                </div>
                <div className="hd_center"><div className="timer_3d48d">{formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s</div></div>
              </div>
              {/* <div className="my_accountpage">
                <span>
                  <Row>Choose your captain & vice captain</Row>
                  <Row>
                    <Col><span className="roleIcon">C</span></Col>
                    <Col>get 2X Points</Col>
                    <Col><span className="roleIcon">VC</span></Col>
                    <Col>get 1.5X Points</Col></Row>  </span>


                <Row>
                  <Col></Col>
                  <Col>PLAYERS</Col>
                  <Col>POINTS</Col>
                  <Col></Col>
                  <Col></Col>
                </Row>

                {
                  formthis.state.getalladdedplayeritems.map(function (itemAPI, indexAPI) {
                    return (
                      <Row key={indexAPI}>
                        <Col><img src={itemAPI.pimg} alt="image" /></Col>
                        <Col>{itemAPI.pname}<br />{itemAPI.teamname}-{itemAPI.ptype}</Col>
                        <Col>{itemAPI.pts}</Col>
                        <Col><div id={itemAPI.pid} className={"roleCV pointer " + ((itemAPI.pid === formthis.state.captionClassC) ? " roleCVSelect" : "")} onClick={formthis.onClickC}>C</div></Col>
                        <Col><div id={itemAPI.pid} className={"roleCV pointer " + ((itemAPI.pid === formthis.state.captionClassVC) ? " roleCVSelect" : "")} onClick={formthis.onClickVC}>VC</div></Col>

                      </Row>
                    )
                  })}
              </div> */}



              <div className="my_accountpage">
                <div className="captonvc_topbox">
                  <h4>Choose Your captain and vice captain</h4>
                  <div className="get2_point"> <span>C</span>Gets 2x points </div>
                  <div className="get2_point"> <span>VC</span>	 Gets 1.5x points </div>
                </div>
                <div className="verify_pgcsmain">
                  <div className="tab_area home_nttabsbox creat_magteam matchboxes_intels">
                    <div className="tabsMainContainer_e2849">
                      <div className="ctSortingHeader_a6515">
                        <div className="row">
                          <div className="col-sm-5">
                            <div className="cerat_innertemctp">PLAYERS</div>
                          </div>
                          <div className="col-sm-5 pointsboxes_ed">
                            <div className="cerat_innertemctp points_textlemin">POINTS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="player_checkaddbbox">
                      <ul className="fot_creatmostaddt">

                        {
                          formthis.state.getalladdedplayeritems.map(function (itemAPI, indexAPI) {
                            return (
                              <li key={indexAPI}>
                                <div className="chooscaption_part">
                                  <div className="img_areaaddtem"><img src={itemAPI.pimg} alt="image" /></div>
                                  <div className="imgdiscription_rightde"> <div className="playername_textcreate">{itemAPI.pname}</div> <div className="playerteam_namebts">{itemAPI.teamname}-{itemAPI.ptype}</div></div>
                                </div>
                                <div className="choos_viceacption">
                                  <div className="cradits_intboxde">{itemAPI.pts}</div>
                                  <div className="candvc_caption">
                                    <span id={itemAPI.pid} className={"roleCV pointer " + ((itemAPI.pid === formthis.state.captionClassC) ? " roleCVSelect" : "")} onClick={formthis.onClickC}>c</span>
                                    <span id={itemAPI.pid} className={"roleCV pointer " + ((itemAPI.pid === formthis.state.captionClassVC) ? " roleCVSelect" : "")} onClick={formthis.onClickVC}>vc</span></div>
                                </div>
                              </li>

                            )
                          })}

                      </ul>
                    </div>
                  </div>
                  <a className="all_transaction up_bt"> <button className="savebtn_pencard">CONTINUE</button> </a>
                </div>
              </div>





              <a className={"all_transaction up_bt " + ((formthis.state.saveOnClickOne === false) ? " pointernone " : "") + formthis.buttonSaveClass()} onClick={formthis.onClickSave}> SAVE TEAM </a>
            </div>

          </div>


          {/*-- player details part start --*/}
          <div className={"playerdetail player_selectedbyin" + ((this.state.playerdetailevent === true) ? "" : " playerdetailclose")}>
            <i className="fa fa-times-circle-o closebutton pointer" onClick={formthis.playerDeailEvent}></i>
            <div className="player_topboxpartd">
              <div className="row">
                <div className="col-sm-4">
                <div className="plyer_innerdbxp"><img src={formthis.state.playerdetail.pimg} alt="image" /><span className="playerwk_detils">{formthis.state.playerdetail.ptype}</span></div></div>
                <div className="col-sm-4"><div className="playertowboxods"><h5>SELECTED BY</h5><span className="player_typered">{(this.state.playerdetail.tselplayer && this.state.playerdetail.ttplayer)?(this.state.playerdetail.tselplayer*100/this.state.playerdetail.ttplayer).toFixed(2):0}%</span></div></div>
                <div className="col-sm-4"><div className="playertowboxods"><h5>TOTAL POINTS</h5><span className="player_typered">{(this.state.playerdetail.gtotalpoints)?this.state.playerdetail.gtotalpoints:0}</span></div></div>
              </div>
            </div>
            <div className="teamand_playermainbds">
              <div className="pnametname_part"><p>Player Name :<span className="pinner_teamname">{this.state.playerdetail.pname}</span></p></div>
              <div className="pnametname_part"><p>Team Name :<span className="pinner_teamname"> {this.state.playerdetail.teamname}</span></p></div>
            </div>
            <div className="playdeatil_tableboxind">
              <div className="table_titleheadplayer"><h5>MATCHWISE FANTASY STATS</h5></div>
              <div className="match_poinplayerd">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th> MATCH </th>
                        <th>POINTS </th>
                        <th> SELECTED </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        ((this.state.playerdetail.matchs)?this.state.playerdetail.matchs:[]).map(function(item,index){
                          return(
                      <tr>
                        <td> <div className="matchnme_plydetable"> {item.team1} vs {item.team2} 
                        {/* <span>30-12-2018 13:44:59</span> */}
                        </div> </td>
                        <td> {item.totalpoints} </td>
                        <td> {item.selectplyrper}% </td>
                      </tr>
                        )})
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/*-- player details part start --*/}

        </AvForm>
        <div className="teampreview">

          <div className="innercontent">
            <div className="miniextra_groundbd">




              <div className="wk_craditbox">

                <h2>{(formthis.state.objplayertypelist[1]) ? formthis.state.objplayertypelist[1]["fullname"] : ""}</h2>
                <div className="wkoals_main">
                  <ul>
                    {
                      Object.keys(formthis.state.getaddedplayeritems[1]).map(function (keyOne, indexOne) {
                        let keyAll = 1;
                        return (
                          <li key={indexOne}>
                            <div className="int_roundbd">
                              <div className="circle_picmd">
                                <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} alt="image" />
                              </div>
                              <p className={(formthis.state.singlematchlist.team1===formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"])?"":"val_incrpointwhite"} title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}>{formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
                              <span className="val_incrpoint">{formthis.state.getaddedplayeritems[keyAll][keyOne]["credit"]} Cr</span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>





              <div className="wk_craditbox">

                <h2>{(formthis.state.objplayertypelist[2]) ? formthis.state.objplayertypelist[2]["fullname"] : ""}</h2>
                <div className="wkoals_main">
                  <ul>
                    {
                      Object.keys(formthis.state.getaddedplayeritems[2]).map(function (keyOne, indexOne) {
                        let keyAll = 2;
                        return (
                          <li key={indexOne}>
                            <div className="int_roundbd">
                              <div className="circle_picmd">
                                <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} alt="image" />
                              </div>
                              <p className={(formthis.state.singlematchlist.team1===formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"])?"":"val_incrpointwhite"} title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}>{formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
                              <span className="val_incrpoint">{formthis.state.getaddedplayeritems[keyAll][keyOne]["credit"]} Cr</span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>




              <div className="wk_craditbox">

                <h2>{(formthis.state.objplayertypelist[3]) ? formthis.state.objplayertypelist[3]["fullname"] : ""}</h2>
                <div className="wkoals_main">
                  <ul>
                    {
                      Object.keys(formthis.state.getaddedplayeritems[3]).map(function (keyOne, indexOne) {
                        let keyAll = 3;
                        return (
                          <li key={indexOne}>
                            <div className="int_roundbd">
                              <div className="circle_picmd">
                                <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} alt="image" />
                              </div>
                              <p className={(formthis.state.singlematchlist.team1===formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"])?"":"val_incrpointwhite"} title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}>{formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
                              <span className="val_incrpoint">{formthis.state.getaddedplayeritems[keyAll][keyOne]["credit"]} Cr</span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>



              <div className="wk_craditbox">

                <h2>{(formthis.state.objplayertypelist[4]) ? formthis.state.objplayertypelist[4]["fullname"] : ""}</h2>
                <div className="wkoals_main">
                  <ul>
                    {
                      Object.keys(formthis.state.getaddedplayeritems[4]).map(function (keyOne, indexOne) {
                        let keyAll = 4;
                        return (
                          <li key={indexOne}>
                            <div className="int_roundbd">
                              <div className="circle_picmd">
                                <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} alt="image" />
                              </div>
                              <p className={(formthis.state.singlematchlist.team1===formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"])?"":"val_incrpointwhite"} title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}>{formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
                              <span className="val_incrpoint">{formthis.state.getaddedplayeritems[keyAll][keyOne]["credit"]} Cr</span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>


              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTeams;

