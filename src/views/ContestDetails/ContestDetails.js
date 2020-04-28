import React, { Component } from 'react';
import {Progress, Button,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  Col, Card,
  Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import swal from 'sweetalert';
import {
  AppAside,
} from '@coreui/react';
import config from './../../config';
import { dashboardpage,getCurrentTime,converttosecondnew,checkresponse, sessioncheck, converttosecond, secondsToTime, goBack, sendHome, endtimeinsecond ,HBRout, taxRegulation, unCamelCase, playerPointKeyConst,getConvertoWord, overrideLoaderCss, loaderColorCode} from './../../Comman';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import jsPDF from 'jspdf';
import axios from "axios"
import configurl from './../../config';
//import PrintTeam from './../PrintTeam/PrintTeam';
//const PrintTeam = React.lazy(() => import('./../PrintTeam/PrintTeam'));
import $ from 'jquery';
import { ClipLoader } from 'react-spinners';

let scurrenttimestamp=0;
let interval;

class ContestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      seconds: 0,
      contestdetail: [],
      contestteamdetailList: [],
      contestteamdetailMyTeams: [],
      teamview: 0,
      getaddedplayeritems: [],
      playertypelist: [],
      getjoinedteamlist: [],
      matchMyTeamListCount: 0,
      getblance: 0,
      freeamount: 0,
      fantasypoints: [],
      getmyjoinedteam: [],
      allowContestToEdit: true,
      walletdetail:{
        btnname:"",
        eventtype:"",
        fees:0,
        paybalwlt:0,
        paybnswlt:0,
        paywinwlt:0,
        walletbalance:0,
        wltbns:0,
        wltwin:0,
        entryfees:0,
        bnsdeduction:0
      },
      isNotify:false,
      isBreakPoint:false,
      fantasyPlayersPoints : {},
      playerPoints : {},
      isPlayerPoint : false,
      isLoading: false,
      selectedTeamTotalPoints : 0,
      selectedTeamName : "",
      isplaying:0,
      selectedElement:null,
      teamColor:""
    };
    sessioncheck();
    this.startTimer = this.startTimer.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.toggleBreakPoint=this.toggleBreakPoint.bind(this);
    this.togglePlayerPoint=this.togglePlayerPoint.bind(this);
  }

  componentDidMount() {
    sessioncheck();
    getCurrentTime().then(resultTimestamp=>{
      scurrenttimestamp=resultTimestamp;
      clearInterval(interval);
      this.startTimer();
      this.getContestDetails();
      this.getContestTeamDetails();
      this.getPlayerType();
      this.getJoinedTeam();

      this.getPlayerScore();
      this.getTotalMatchTeam();
      this.listMyTeams();
      if ((this.props.location.pathname).toString().indexOf("ContestDetailsForJoin") > -1) {
        
        this.getBalance();
      }

  });
  }

  toggleNotification() {
    this.setState({
      isNotify: !this.state.isNotify,
    });
  }
  toggleBreakPoint() {
    this.setState({
      isBreakPoint: !this.state.isBreakPoint,
    });
  }
  dropBreakPoint=(event)=>{
    event.stopPropagation();
    this.setState({
      isBreakPoint: true
    });
  }
  pdfdownload=()=>{
    this.getTeamPlayer();
  }


  getTeamPlayer(){
    let formthis = this;
    formthis.setState({
      isLoading: true
    });
    return new Promise(function(resolve,reject){
      var matchid = formthis.props.match.params.matchid;
      let poolcontestid = formthis.props.match.params.poolcontestid;
  
      
      var reqapi = "";
      const formData = new FormData();
      formData.append('matchid', matchid);
      formData.append('poolcontestid', poolcontestid);
      const config = {
        headers: {
          //'content-disposition':'attachment; filename="AfghanistanV/SIreland-MzM=.pdf"',
          'content-type': 'application/force-download',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
        },
        responseType: 'blob',
      };
      var api_url = `${configurl.API_URL}`;
      var url = api_url + "/leaderboarddownload/"+matchid+"/"+poolcontestid;
  

      axios.get(url, formData, config)
      .then((response) => {
        formthis.setState({
          isLoading: false
        });
          //console.log("response--->>>",response.data.error);
        
        if(response.data.error===true)
        {
          //checkresponse("Warning", false, response.msg, 3);
        }
        else
        {
          //Create a Blob from the PDF Stream
          // const file = new Blob(
          //     [response.data], 
          //     {type: 'application/pdf'});
          // //Build a URL from the file
          //   const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(api_url+"/leaderboarddownload/"+matchid+"/"+poolcontestid);

          // call the api for leaderboardcount increment
          if(formthis.state.contestdetail && formthis.state.contestdetail.mstatus === 'li'){
            formthis.leaderboardcount(matchid,poolcontestid);
          }
        }
      }).catch((error) => {
        formthis.setState({
          isLoading: true
        });
        if (error.response) {
          var chkresp = checkresponse("Wrong", error.response.status, "eeee", 2);
          if (chkresp === true) {
            if (error.response.data.error === true) {
              checkresponse("Warning", false, error.response.data.msg, 3);
            }
          }

        } else if (error.request) {
          checkresponse("Wrong", false, error.toString(), 0);
        } else {
          checkresponse("Wrong", false, error.toString(), 0);
        }
      });
   
    })
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
              //window.location.href =dashboardpage;
            }
          })
      }
      else
      {
        if (sessionStorage.getItem("jwt")) {
          window.location.href = dashboardpage;
        }
      }

    }, 1000);
  }

  getContestDetails = () => {
    let formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    let poolcontestid = this.props.match.params.poolcontestid;

    var api_url = `${config.API_URL}`;
    var reqapi = "";

    var args1 = {
      matchid: matchid,
      poolcontestid: poolcontestid
    };

    reqapi = api_url + "/frontapi/getcontestdetails";

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
            if (json.error === false) {
              formthis.setState({ contestdetail: json.data });
            }
            else {
              formthis.setState({ contestdetail: [] });
            }
          })
        }
        formthis.setState({
          isLoading: false
        });

      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  leaderboardcount = (matchId,poolcontestid) => {
    let formthis = this;
    formthis.setState({
      isLoading: true
    });
    var api_url = `${config.API_URL}`;
    var reqapi = "";

    var args1 = {
      matchid: matchId,
      poolcontestid: poolcontestid
    };

    reqapi = api_url + "/frontapi/leaderboardcount";

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
            if (json.error === false) {
              
            }
            else {
            }
          })
        }
        formthis.setState({
          isLoading: false
        });

      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  getContestTeamDetails = () => {
    let formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    let poolcontestid = this.props.match.params.poolcontestid;

    var api_url = `${config.API_URL}`;
    var reqapi = "";

    var args1 = {
      matchid: matchid,
      poolcontestid: poolcontestid
    };

    reqapi = api_url + "/frontapi/getcontestjoinedteamsall";

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
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, "", 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              formthis.setState({ contestteamdetailList: json.data.list,
                contestteamdetailMyTeams: json.data.myteams });
            }
            else {
              formthis.setState({ contestteamdetailList: [],
                contestteamdetailMyTeams:[] });
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

  getTeamDetail = (teamid) => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
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
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              
              let getaddedplayeritems = {};
              Object.keys(formthis.state.playertypelist).map(function (keyPT, indexPT) {
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
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  onClickPreviw = (teamItem,index) => {
    
    this.setState({ teamview: 1,selectedTeamTotalPoints: teamItem.ptotal,selectedTeamName: teamItem.teamname,selectedElement:index });
    this.getTeamDetail(teamItem.uteamid);
  }

  getPlayerType = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var args1 = {
      gameid: sessionStorage.getItem("gameid")
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(args1)
    }

    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/getplayertype";

    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
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
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  getJoinedTeam = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var poolid = this.props.match.params.poolcontestid;
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
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              let objjoinedteam = {};
              json.data.map(function (itemJT, indexJT) {
                objjoinedteam[itemJT.uteamid] = true;
              })

              formthis.setState({
                getjoinedteamlist: objjoinedteam,
                getmyjoinedteam: json.data
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
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  // setCreateTeam = (joincost, poolid) => {
  //   let formthis = this;
  //   let matchid = this.props.match.params.matchid;
  //   if (this.state.matchMyTeamListCount > 0) {
  //     if (joincost > this.state.freeamount)//change
  //     {
  //       if (joincost <= this.state.getblance) {
  //         swal({
  //           title: "Are you sure?",
  //           text: "Your current balance is ₹" + this.state.getblance + " and joining amount is " + joincost + "",
  //           icon: "warning",
  //           buttons: [
  //             'No, cancel it!',
  //             'Yes, Join Contest!'
  //           ],
  //           dangerMode: true,
  //         }).then(function (isConfirm) {
  //           if (isConfirm) {
  //             window.location.href =HBRout+ '/ChooseTeam/' + matchid + '/' + poolid + '/' + btoa(joincost);
  //           }
  //         })
  //       }
  //       else {
  //         swal({
  //           title: "Are you sure?",
  //           text: "Your current balance is ₹" + this.state.getblance + ", for joining contest you have to add balance",
  //           icon: "warning",
  //           buttons: [
  //             'No, cancel it!',
  //             'Yes, Add Balance!'
  //           ],
  //           dangerMode: true,
  //         }).then(function (isConfirm) {
  //           if (isConfirm) {
  //             window.location.href =HBRout+ '/AddCash'
  //           }
  //         })

  //       }
  //     }
  //     else {
  //       swal({
  //         title: "Are you sure?",
  //         text: "Your current balance is ₹" + this.state.getblance + " and joining amount is " + joincost + "",
  //         icon: "warning",
  //         buttons: [
  //           'No, cancel it!',
  //           'Yes, Join Contest!'
  //         ],
  //         dangerMode: true,
  //       }).then(function (isConfirm) {
  //         if (isConfirm) {
  //           window.location.href =HBRout+ '/ChooseTeam/' + matchid + '/' + poolid + '/' + btoa(joincost);
  //         }
  //       })
  //     }

  //   }
  //   else {
  //     swal({
  //       title: "Are you sure?",
  //       text: "For joining, you have to create team.",
  //       icon: "warning",
  //       buttons: [
  //         'No, cancel it!',
  //         'Yes, Create Team!'
  //       ],
  //       dangerMode: true,
  //     }).then(function (isConfirm) {
  //       if (isConfirm) {
  //         let matchid = formthis.props.match.params.matchid;
  //         window.location.href =HBRout+ '/CreateTeams/' + matchid;
  //       }
  //     })

  //   }


  // }

  setCreateTeam = (event, joincost, poolid) => {
    event.stopPropagation();
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    
    if (this.state.matchMyTeamListCount > 0) {
      this.balanceAmountDetailCheck(joincost,poolid).then(result=>{
        if(result && result.error === false){
          if (joincost > this.state.freeamount)//change
          {
              if (result.data.fees>0) {    
                result.eventtype="addbalance";
                result.btnname="Add Balance";
                result.entryfees=joincost;
                formthis.setState({eventtype:"addbalanceAddCash",
                selectpoolid:poolid,
                selectjoincost:joincost
            });
                formthis.callnotification(result);
            }
            else {
              result.eventtype="join_contest";
              result.btnname="Join Contest";
              result.entryfees=joincost;
              formthis.setState({
                eventtype:"addbalanceChooseTeam",
                selectpoolid:poolid,
                selectjoincost:joincost
              });
              formthis.callnotification(result);
            }
          }
          else {
            result.eventtype="join_contest";
            result.btnname="Join Contest";
            result.entryfees=joincost;
            formthis.setState({eventtype:"join_contest",
                selectpoolid:poolid,
                selectjoincost:joincost});
            formthis.callnotification(result);
          }
        }
      });

    }
    else {

      swal({
        title: "Are you sure?",
        text: "For joining, you have to create team.",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, Create Team!'
        ],
        dangerMode: true,
      }).then(function (isConfirm) {
        if (isConfirm) {
          let matchid = formthis.props.match.params.matchid;
          window.location.href = HBRout + '/CreateTeams/' + matchid;
        }
      })

    }


  }

  callnotification=(result)=>{
    let walletdetail={
      btnname:result.btnname,
      eventtype:result.eventtype,
      fees:parseFloat(result.data.fees),
      paybalwlt:parseFloat(result.data.paybalwlt),
      paybnswlt:parseFloat(result.data.paybnswlt),
      paywinwlt:parseFloat(result.data.paywinwlt),
      walletbalance:parseFloat(result.data.wallet.walletbalance),
      wltbns:parseFloat(result.data.wallet.wltbns),
      wltwin:parseFloat(result.data.wallet.wltwin),
      entryfees:parseFloat(result.entryfees),
      bnsdeduction:parseFloat(result.data.bnsdeduction),
    }
      this.setState({
        isNotify: true,
        walletdetail:walletdetail
      });
    }

  balanceAmountDetailCheck(joinamount,poolid) {
    let formthis=this;
    formthis.setState({
      isLoading: true
    });
    return new Promise(function (resolve, reject) {

      var matchid = formthis.props.match.params.matchid;
     // var poolid = poolid;
      var joincost= joinamount;
      //let teamid =0;  //formthis.state.checkid;
      var api_url = `${config.API_URL}`;
      var reqapi = "";
      

      var args1 = {
        matchid: matchid,
        poolcontestid: poolid,
        //uteamid: teamid,
        fees: joinamount,
        atype: "prejoin"///"prejoin"
      };

      reqapi = api_url + "/frontapi/joincontest";

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
              formthis.setState({
                isLoading: false
              });
              var chkresp = checkresponse("Wrong", response.status, "", 2);
              if (chkresp === true) {
                response.json().then(json => {
                  if (json.error === false) {
                    resolve(json);
                  }
                  else {
                    resolve(false);
                  }
                })
              }

            }).catch(error => {
              formthis.setState({
                isLoading: false
              });
              checkresponse("Wrong", false, error.toString(), 0);
            });
       
      })

   

  }


  listMyTeams = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
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

    var pageno = this.state.pageno;
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/getuserteam";

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
                matchMyTeamListCount: json.data.total
              })
            }
            else {
              formthis.setState({
                matchMyTeamListCount: 0
              })
              // checkresponse("Not assigned", false, "Contest is not assigned yet.", 0);
              // window.location.href =HBRout+ "/Home";
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


  getBalance = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var args1 = {};
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
    apiUrl = api_url + "/frontapi/getuserbalance";

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
                getblance: parseFloat(json.data.walletbalance)
              })
            }
            else {
              formthis.setState({
                getblance: 0
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

/*
  getPlayerScore = () => {
    var formthis = this;
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
    apiUrl = "https://cricapi.com/api/fantasySummary?apikey=iOSnsZbuhgMXyy5gSL4N4kzDGGC3&unique_id=1145001" //api_url + "/frontapi/getsinglematch";

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
           formthis.setState({ matchtype: json.type });

            //////////////
            // let team1 = json.data.team[0].players;
            // let team2 = json.data.team[1].players;

            // let allteamids = team1.concat(team2);

            // let battingteam = json.data.batting;

            // let allteamplayer = [];
            // battingteam.map(function (itemBatting, indexBatting) {
            //   allteamplayer = allteamplayer.concat(itemBatting.scores);
            // })

            // let bowlingteam = json.data.bowling;
            // bowlingteam.map(function (itemBowling, indexBowling) {
            //   allteamplayer = allteamplayer.concat(itemBowling.scores);
            // })

            // let fieldingteam = json.data.fielding;
            // fieldingteam.map(function (itemFielding, indexFielding) {
            //   allteamplayer = allteamplayer.concat(itemFielding.scores);
            // })


            // let arrayAllTeamIds = {};
            // allteamids.map(function (itemAllTeam, indexAllTeam) {
            //   arrayAllTeamIds[itemAllTeam.pid] = allteamplayer.filter(x => x.pid == itemAllTeam.pid);
            // })
            // ////////////

            // if (arrayAllTeamIds) {
            //   formthis.calculatePointEarn(allteamplayer, arrayAllTeamIds)
            // }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }
  */

  /*
  calculatePointEarn = (allteamplayer, arrayAllTeamIds) => {
    let formthis = this;

    if (arrayAllTeamIds) {
      let fantasypoints = (formthis.state.fantasypoints["cricket"])?formthis.state.fantasypoints["cricket"][formthis.state.matchtype]:[];
      let totalrun = 0;
      let pointList = {};
      Object.values(arrayAllTeamIds).map(function (itemPerPlayer, indexResult) {
        let totalpoints = 0;
        itemPerPlayer.map(function (itemResult, indexPerPlayer) {

          if (itemResult["batsman"]) {
            totalpoints = totalpoints + (itemResult["R"] * parseFloat(fantasypoints.run));
            totalpoints = totalpoints + (itemResult["4s"] * parseFloat(fantasypoints.four));
            totalpoints = totalpoints + (itemResult["6s"] * parseFloat(fantasypoints.six));
            totalrun = totalrun + itemResult["R"];
          }
          if (itemResult["bowler"]) {
            totalpoints = totalpoints + (itemResult["W"] * parseFloat(fantasypoints.wicket));
            totalpoints = totalpoints + (itemResult["M"] * parseFloat(fantasypoints.mdnover));
          }
          if (itemResult["name"]) {
            totalpoints = totalpoints + (itemResult["catch"] * parseFloat(fantasypoints.catch));
            //totalpoints=totalpoints + (itemResult["stumped"]*formthis.state.fantasypoints.stumped);
          }

        })

        if (totalrun === 0) {
          totalpoints = totalpoints - 2;
        }
        //console.log("kkkkkkkkkkk---->>",(Object.keys(arrayAllTeamIds))[indexResult]);
        let playerid = (Object.keys(arrayAllTeamIds))[indexResult];
        pointList[playerid] = totalpoints;
      })

      console.log("pointList=================>>>", pointList);

    }

  }
  */



  getTotalMatchTeam = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    let poolcontestid = this.props.match.params.poolcontestid;
    var args1 = {
      matchid: matchid,
      poolcontestid: poolcontestid
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
    apiUrl = api_url + "/frontapi/getcontestteamandplayer";

    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            formthis.setState({ totalmatchteam: json.data });


          })
        }
      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }


  btnNotification=()=>{
    let matchid = this.props.match.params.matchid;
    let poolid= this.state.selectpoolid;
    let joincost= this.state.selectjoincost;
    
    if(this.state.eventtype==="addbalanceAddCash")
    {
      window.location.href = HBRout + '/AddCash';
    }
  
    if(this.state.eventtype==="addbalanceChooseTeam")
    {
      window.location.href = HBRout + '/ChooseTeam/' + matchid + '/' + poolid + '/' + btoa(joincost);
    }
  
    if(this.state.eventtype==="join_contest")
    {
      window.location.href = HBRout + '/ChooseTeam/' + matchid + '/' + poolid + '/' + btoa(joincost);
    }
  }
  
  getPlayerScore=()=>{
    var matchid = this.props.match.params.matchid;
    let formthis=this;
    formthis.setState({
      isLoading: true
    });
    try{
          
          let API_NODE_URL=`${config.API_NODE_URL}`;
          var reqapi = "";
          if(sessionStorage.getItem('gameid') === "1"){
            reqapi =API_NODE_URL+"/getPlayerpoints?matchid="+matchid; 
          } else if(sessionStorage.getItem('gameid') === "2"){
            reqapi =API_NODE_URL+"/getPlayerpoints/football?matchid="+matchid; 
          } else if(sessionStorage.getItem('gameid') === "3"){
            reqapi =API_NODE_URL+"/getPlayerpoints/kabaddi?matchid="+matchid; 
          }
      
        var object = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
      
          fetch(reqapi, object)
            .then(function(response) {
              formthis.setState({
                isLoading: false
              });
              var chkresp=checkresponse("Wrong",response.status,"",2);
              if(chkresp===true)
              {  
              response.json().then(json => {
                if (json.error!==true) {                  
                  formthis.setState({
                    fantasyPlayersPoints:json.data
                });
                }
                else {
                  //checkresponse("Warning",false,json.msg,3);
                }
              })
            }
      
            }).catch(error => {
              formthis.setState({
                isLoading: false
              });
              //checkresponse("Wrong",false,error.toString(),0);
            });
          
    }
    catch (ex)
    {
      formthis.setState({
        isLoading: false
      });
    }
    //let readjson=this.readTextFile(file);
  }

  togglePlayerPoint() {
    $("body").removeClass("isPlayerPoint")
    this.setState({
      isPlayerPoint: !this.state.isPlayerPoint,
      playerModalClass : false
    });
  }
  dropPlayerPoint=(player_name,isplaying,teamColor)=>{
    $("body").addClass("isPlayerPoint")
    this.setState({
      playerModalClass : true,
      isplaying:isplaying,
      teamColor:teamColor
    });
    let playerPoints = {};
    playerPoints = this.state.fantasyPlayersPoints[player_name];
    if(playerPoints){
      this.setState({
        playerName : playerPoints.playername
      });
      delete playerPoints.playername;
      delete playerPoints.pid;
      delete playerPoints.matchId;
      if(sessionStorage.getItem('gameid') === "1"){
       playerPoints.sr=((!isNaN(playerPoints.srone) ? parseFloat(playerPoints.srone) : 0) + (!isNaN(playerPoints.srtwo) ? parseFloat(playerPoints.srtwo) : 0) + (!isNaN(playerPoints.srthree) ? parseFloat(playerPoints.srthree) : 0))
      }
      delete playerPoints.srone;
      delete playerPoints.srtwo;
      delete playerPoints.srthree;
      if(sessionStorage.getItem('gameid') === "1"){
        playerPoints.er= (!isNaN(playerPoints.erone) ? parseFloat(playerPoints.erone) :0) + (!isNaN(playerPoints.ertwo) ? parseFloat(playerPoints.ertwo) : 0) + (!isNaN(playerPoints.erthree) ? parseFloat(playerPoints.erthree) : 0) + (!isNaN(playerPoints.erfour) ? parseFloat(playerPoints.erfour) : 0) + (!isNaN(playerPoints.erfive) ? parseFloat(playerPoints.erfive) : 0) + (!isNaN(playerPoints.ersix) ? parseFloat(playerPoints.ersix) : 0)
      }
      delete playerPoints.erone;
      delete playerPoints.ertwo;
      delete playerPoints.erthree;
      delete playerPoints.erfour;
      delete playerPoints.erfive;
      delete playerPoints.ersix;
    }
    this.setState({
      playerPoints: playerPoints
    });
    
    //event.stopPropagation();
    this.setState({
      isPlayerPoint: true
    });
  }
  
  componentWillUnmount() {
    clearInterval(interval);
    clearTimeout(interval);
  }

  render() {

    // var arr = [79, 18, 18, 5, 32, 1, 16, 1, 82, 13];
    // var sorted = arr.slice().sort(function(a,b){return b-a})
    // var ranks = arr.slice().map(function(v){ return sorted.indexOf(v)+1 });

    var formthis = this;
    let matchid = this.props.match.params.matchid;
    let poolcontestid = this.props.match.params.poolcontestid;
    let type = this.props.match.params.type;
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
        <AvForm onValidSubmit={this.onSubmit}>
          <div className="left_logincontent profilepadding0">
            <div className="background-cover ng-scope">
              <div className="header_bg">
                <div className="hd_left">
                  <span onClick={goBack} className="hd_back" />
                  <span onClick={sendHome} className="hd_home" />
                </div>
                <div className="hd_center">Contests Details</div>
              </div>
              <div className="curremt_matchdetailbox">
                <div className="allover_ctcpart">
                  <div className="left_ctboxit">{sessionStorage.getItem("team1_" + matchid)}<span className="left_teamcurrent">vs</span>{sessionStorage.getItem("team2_" + matchid)} </div>
                  {(this.state.allowContestToEdit===false)?(<div className="right_ctboxit pull-right">{(type==="1"?"Complete":"In Progress")}</div>):(<div className="right_ctboxit pull-right">  {formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s </div>)}
                </div>
              </div>
              <div className="choose_contdetailsout">
                <div className="chooteam_joincontital"><h2>CHOOSE TEAMS TO JOIN THIS CONTEST WITH</h2>
                 {(formthis.state.allowContestToEdit === false)?(<a className="score_nmds" href={HBRout+"/FantasyScoreCard/"+sessionStorage.getItem('gameid')+"/"+matchid}>SCORE</a>):null} 
                </div>
                <div className="winlt_outmainbox">
                  <div className="topthewin_list">
                    <ul>
                      <li><h5>Total Winnings <span className="win_inrsdto">Win <i className="fa fa-inr" aria-hidden="true" />{getConvertoWord(this.state.contestdetail.totalwining)}</span></h5></li>
                      <li><h5>Winners <a data-toggle="modal" data-target="#myModal01"> <span className="win_inrsdto" onClick={this.dropBreakPoint}>{this.state.contestdetail.winners}<i className="fa fa-angle-down" aria-hidden="true" /></span></a></h5></li>
                      <li><h5><span className="ent_feestx">Entry Fees </span>
                        <div className="extrntm_forjoin">
                        
                          {/* {((this.state.getmyjoinedteam.length === 0)) ? 
                          (<a className="jont_oldbtn" onClick={() => formthis.setCreateTeam(this.state.contestdetail.joinfee, poolcontestid)}>₹{this.state.contestdetail.joinfee}</a>) : 
                          (<span className="win_inrsdto vale_ingrnind"><i className="fa fa-inr" aria-hidden="true" />{this.state.contestdetail.joinfee}</span>)} */}

                          {((formthis.state.allowContestToEdit===true)?((this.state.contestdetail.m==="1")?(<a className="jont_oldbtn" onClick={(e) => formthis.setCreateTeam(e,this.state.contestdetail.joinfee, poolcontestid)}>{(config.PROJECT_CODE === "3") ? "Join " : ""}₹{this.state.contestdetail.joinfee}</a>):(<span className="win_inrsdto vale_ingrnind"><i className="fa fa-inr" aria-hidden="true" />{this.state.contestdetail.joinfee}</span>)
                                                                        ): (<span className="win_inrsdto vale_ingrnind"><i className="fa fa-inr" aria-hidden="true" />{this.state.contestdetail.joinfee}</span>))}
                        
                        </div>
                      </h5></li>
                    </ul>
                    <br></br>
                    {/* <div className="ads_mainlks">
                      <h3 className="pri_titleds">Prize Pool Breakup</h3>
                      <div className="pricerank_box">
                        {
                          ((this.state.contestdetail.brkprize) ? this.state.contestdetail.brkprize : []).map(function (itemPoints, indexPoints) {
                            if (indexPoints === 0) {
                              return (
                                <div className="scorl_boxrank" key={indexPoints}>
                                  <span className="ruoopri_cl"><i className="fa fa-inr" aria-hidden="true" /><p className="blue">{itemPoints.pamount}</p></span>
                                  <span className="ranknumb_od">
                                  Rank {((itemPoints.pmin === itemPoints.pmax) ? itemPoints.pmin : (itemPoints.pmin + "-" + itemPoints.pmax))} 
                                  <img src={require("./../../images/bluetrophy.png")} alt="image" />
                                  </span>
                                </div>
                                )
                            }
                            else
                              return (<div className="scorl_boxrank" key={indexPoints}>
                                <span className="ruoopri_cl"><i className="fa fa-inr" aria-hidden="true" /><p>{itemPoints.pamount}</p></span>
                                <span className="ranknumb_od">#{(itemPoints.pmin === itemPoints.pmax)?itemPoints.pmin:itemPoints.pmin + "-" + itemPoints.pmax}</span>
                              </div>)
                          })

                        }
                      </div>
                    </div> */}
                    <div className="progress_contestbar detel_oudcheck">
                      <Progress className="progress-xs" color="info" value={(((parseFloat(this.state.contestdetail.maxteams) - parseFloat(this.state.contestdetail.joinleft)) / parseFloat(this.state.contestdetail.maxteams)) * 100)} />
                    </div>
                    <div className="contest_mtfootervaluend"> <p>{this.state.contestdetail.joinleft} left  <span className="totalteams_footered pull-right">{this.state.contestdetail.maxteams} Teams</span></p> </div>
                  

                  </div>


                  <div className="wont_innerboxid">
                   {((this.state.contestdetail.m==="1")?(<div className="these_contindeds"><span className="cpicture_img">M</span>In this multi-entry contest, join with up to 6 teams</div>):null)}
                   {((this.state.contestdetail.s==="1")?(<div className="these_contindeds"><span className="cpicture_img">S</span>Single team join</div>):null)}
                   {((this.state.contestdetail.c==="1")?(<div className="these_contindeds"><span className="cpicture_img">C</span>Prize pool is confirmed even if this contest doesn't fill up</div>):null)}
                    
                    
                    </div>
                  <div className="switchand_joinbox" >
                    {/* {((formthis.state.allowContestToEdit === false) || (this.props.location.pathname).toString().indexOf("ContestDetailsForJoin") > -1 || (this.state.getmyjoinedteam.length === 0)) ? null : (<a className="join_contestbtn">Invite</a>)} */}
                    {((formthis.state.allowContestToEdit === false) || ((this.props.location.pathname).toString().indexOf("ContestDetailsForJoin") > -1) || (this.state.getmyjoinedteam.length === 0)) ? null : (<a className="join_contestbtn" href={HBRout+"/SwitchTeam/" + matchid + "/" + poolcontestid}>Switch Team</a>)}
                  </div>
                </div>
                <div className="leaderbord_mainboxid"><h3>LEADERBOARD</h3> <a className={"join_contestbtn pull-right "+(formthis.state.allowContestToEdit===true?"hidden":"")} onClick={this.pdfdownload}>Download</a></div>
                <div className="leader_indtablepart">
                  <div className="table-responsive">
                    <table className="table table-bordered header-contdetail">
                      <thead>
                        {(formthis.state.allowContestToEdit === false) ?
                          (<tr>
                            <th> TEAM NAME </th>
                            <th> POINTS </th>
                            <th> RANK </th>
                          </tr>) :
                          (<tr>
                            <th> TEAM NAME </th>
                            <th> RANK </th>
                          </tr>)
                        }
                      </thead>
                      <tbody>
                        {
                          this.state.contestteamdetailMyTeams.map(function (itemTeam, indexTeam) {
                            if (formthis.state.allowContestToEdit === false) {
                                return (
                                  <tr key={indexTeam} className={"pointer myteam" + ((formthis.state.selectedElement === "myteam-"+indexTeam) ? " selectedTeam" : "")} id={itemTeam.uteamid} onClick={() => formthis.onClickPreviw(itemTeam,"myteam-"+indexTeam)}>
                                    <td>
                                      <span> {itemTeam.teamname}</span>
                                      <br/>
                                      <span className={(itemTeam.winbal==="0.00")?"hidden":" win-amount"}>₹{itemTeam.winbal}</span>
                                     </td>
                                    <td> {itemTeam.ptotal} </td>
                                    <td> {itemTeam.rank} </td>
                                  </tr>
                                )
                            }
                            else {
                                return (
                                  <tr key={indexTeam} className={"pointer myteam" + ((formthis.state.selectedElement === indexTeam) ? " selectedTeam" : "")} id={itemTeam.uteamid} onClick={() => formthis.onClickPreviw(itemTeam,indexTeam)}>
                                    <td><span > {itemTeam.teamname}</span> </td>
                                    <td> - </td>
                                  </tr>
                                )
                            }
                          })

                          
                        }


                        {
                             this.state.contestteamdetailList.map(function (itemTeam, indexTeam) {
                              if (formthis.state.allowContestToEdit === false) {
                                  return (
                                    <tr key={indexTeam} className={"pointer"+((formthis.state.getjoinedteamlist[itemTeam.uteamid] === true)?" myteam":"")+" "+ ((formthis.state.selectedElement === indexTeam) ? " selectedTeam" : "") } id={itemTeam.uteamid} onClick={() => formthis.onClickPreviw(itemTeam,indexTeam)}>
                                      <td><span > {itemTeam.teamname}</span>
                                      <br/>
                                      <span className={(itemTeam.winbal==="0.00")?"hidden":" win-amount"}>₹{itemTeam.winbal}</span>
                                       </td>
                                      <td> {itemTeam.ptotal} </td>
                                      <td> {itemTeam.rank} </td>
                                    </tr>
                                  )
                              }
                              else {                                
                                  return (
                                    <tr key={indexTeam} className={((formthis.state.selectedElement === indexTeam) ? " selectedTeam" : "") } id={itemTeam.uteamid}>
                                      <td><span > {itemTeam.teamname}</span> </td>
                                      <td> - </td>
                                    </tr>
                                  )
                              }
                            })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"teampreview" + ((formthis.state.teamview === 0) ? " hidden" : "")}>
            <div className="team-ground-strip">
              
              <Row>
              <Col xs="4"><h3>{(this.state.selectedTeamName) ? this.state.selectedTeamName : ""}</h3> </Col>
              <Col xs="5" className="total_divpoint_pre">
              <span className="leftteampre_totalpoints"> Total Points</span>  ({(this.state.selectedTeamTotalPoints) ? this.state.selectedTeamTotalPoints : 0})   </Col>
                <Col xs="3">
                  <ul className="match_vsnames_pre">
                    <li> {sessionStorage.getItem("team1_" + matchid)}</li>
                    <li> <span className="mtvs_toppreview"> VS </span> </li>
                    <li>{sessionStorage.getItem("team2_" + matchid)}</li>
                  </ul>
                  </Col>
              </Row>
            </div>
            <div className={ "innercontent " + (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="2" ? "football-ground-image " : "")+ (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="3" ? "kabaddi-ground-image " : "") + "" }>
             
            <div className={"add_palyer_modal" + ((formthis.state.playerModalClass && formthis.state.playerModalClass == true) ? " onload_player_modal" : "")}> </div>
              <div className="miniextra_groundbd nd">
                {
                  Object.keys(formthis.state.getaddedplayeritems).map(function (keyAll, indexAll) {
                    return (
                      <div key={indexAll} className="wk_craditbox">

                        <h2>{formthis.state.playertypelist[keyAll]["fullname"]}</h2>
                        <div className="wkoals_main">
                          <ul>
                            {
                              Object.keys(formthis.state.getaddedplayeritems[keyAll]).map(function (keyOne, indexOne) {
                                return (
                                  <li key={indexOne}>
                                    <div className="int_roundbd" onClick={()=>formthis.dropPlayerPoint(formthis.state.getaddedplayeritems[keyAll][keyOne]["pid"],formthis.state.getaddedplayeritems[keyAll][keyOne]["isplaying"],(formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"]===sessionStorage.getItem("team1_" + matchid))?" team1_color":"team2_color")}>
                                      {(formthis.state.getaddedplayeritems[keyAll][keyOne]["iscap"] === "1") ? (<div className="player_vicac">C</div>) : null}
                                      {(formthis.state.getaddedplayeritems[keyAll][keyOne]["isvcap"] === "1") ? (<div className="player_vicac advicacap">VC</div>) : null}
                                      <div className="circle_picmd">
                                        <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} className="flag_008b5" />
                                      </div>
                                      <p className={(formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"]===sessionStorage.getItem("team1_" + matchid))?"player-name team1_color":"team2_color"} title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}> {formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
                                      <span className="val_incrpoint">{formthis.state.getaddedplayeritems[keyAll][keyOne]["points"]} Pts</span>
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

        </AvForm>

         <Modal isOpen={this.state.isNotify} toggle={this.toggleNotification}
              className={'modal-sm verfypop_enter forconfir_md' + this.props.className}>
              
            <ModalHeader toggle={this.toggleNotification}>CONFIRMATION</ModalHeader>
            <ModalBody>
              <div className="iconlogi_call">
              <div className="entr_mdconi">
                <p><i className="fa  fa-inr giftfs"></i> Entry Fees <span className="pull-right"> ₹ {formthis.state.walletdetail.entryfees}</span> </p>
              </div>
              <div className="entr_mdconi">
                <p><i className="fa  fa-money giftfs"></i> Unutilized Balance <span className="pull-right"> ₹ {formthis.state.walletdetail.walletbalance}</span> </p>
              </div>
              <div className="entr_mdconi">
                <p><i className="fa fa-trophy giftfs"></i> Winning <span className="pull-right"> ₹ {formthis.state.walletdetail.wltwin}</span></p>
              </div>
              <div className="entr_mdconi">
              <p><i className="fa fa-gift giftfs"></i> Cash Bonus <span className="pull-right">   ₹ {formthis.state.walletdetail.wltbns} </span> </p>
              </div>
              <div className="entr_mdconi fottopauy">
              {(formthis.state.walletdetail.paybalwlt>0)?(<p>From balance <span className="pull-right"> - ₹ {formthis.state.walletdetail.paybalwlt} </span> </p>):null}
              {(formthis.state.walletdetail.paybnswlt>0)?(<p>From bonus <span className="pull-right"> - ₹ {formthis.state.walletdetail.paybnswlt} </span> </p>):null}
              {(formthis.state.walletdetail.paywinwlt>0)?(<p>From winning <span className="pull-right"> - ₹ {formthis.state.walletdetail.paywinwlt} </span> </p>):null}
              <p className="byjoingebd">
              {formthis.state.walletdetail.bnsdeduction}% of entry fees will be deducted from Cash Bonus wallet, if available!
                  By joining this contest you accept {config.PRODUCT_SHORT_NAME}'s T&C.
              </p>
              </div>
            </div>
        
            </ModalBody>
            <ModalFooter>
              <Button className="btncustom-md" color="primary" onClick={this.btnNotification}>{formthis.state.walletdetail.btnname}</Button>
            
            </ModalFooter>
        
          </Modal>

            <Modal isOpen={this.state.isBreakPoint} toggle={this.toggleBreakPoint}
                    className={'modal-sm verfypop_enter forconfir_md' + this.props.className}>
                    
                  <ModalHeader toggle={this.toggleBreakPoint}>WINNING PRIZE BREAK-UP</ModalHeader>
                  <ModalBody>
                    <div className="iconlogi_call">
                    {
                      ((this.state.contestdetail.brkprize) ? this.state.contestdetail.brkprize : []).map(function (itemPoints, indexPoints) {
                      
                        return (
                    <div key={"price_bkp_"+indexPoints} className="entr_mdconi">
                      <p> {((itemPoints.pmin === itemPoints.pmax) ? itemPoints.pmin : (itemPoints.pmin + "-" + itemPoints.pmax))}
                        <span className="pull-right"> <i className="fa  fa-inr giftfs"></i>{itemPoints.pamount}</span> </p>
                    </div>
                        )
                      
                      })
                    }
                    
                    <div className="entr_mdconi fottopauy">
                    <p className="byjoingebd">
                        Note: In case of a tie or if the contest does not fill up, the actual prizes will be different. As per the government regulations, a tax of {(taxRegulation.tax) ? taxRegulation.tax : ""}% will be deducted if net winnings of an individual is more than Rs. {(taxRegulation.amount) ? taxRegulation.amount : ""}.  
                    </p>
                    </div>
                  </div>
              
                  </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isPlayerPoint}  toggle={this.togglePlayerPoint}
                    className={'modal-sm forconfir_md ' + this.props.className+' player-points-modal'}>
                    
                  <ModalHeader className={formthis.state.teamColor ? formthis.state.teamColor : ""} toggle={this.togglePlayerPoint}> {(this.state.playerPoints && this.state.playerName ? this.state.playerName : "Player Points" )} </ModalHeader>
                  <ModalBody>
                    <div className="iconlogi_call">
                    {
                      ((this.state.playerPoints) ? Object.keys(this.state.playerPoints) : []).map(function (itemPoints, indexPoints) {
                      
                        return (
                          <div key={indexPoints} className="entr_mdconi">
                            <p> { (itemPoints) ? playerPointKeyConst[sessionStorage.getItem('gameid')][itemPoints] : "" }
                              <span className="pull-right">{formthis.state.playerPoints[itemPoints]}</span> </p>
                          </div>
                        )
                      
                      })
                    }
                    
                    <p>{(formthis.state.isplaying) && formthis.state.isplaying ==="0" ? "Not in playing XI" : ""}</p>
                    
                  </div>
              
                  </ModalBody>
            </Modal>
      </div>
    );
  }
}

export default ContestDetails;
