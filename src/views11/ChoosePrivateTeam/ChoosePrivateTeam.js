import React, { Component } from 'react';
import { Button,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import config from './../../config';
import {dashboardpage,getCurrentTime,converttosecondnew,goBack,sendHome, checkresponse,sessioncheck,converttosecond,secondsToTime ,HBRout, overrideLoaderCss, loaderColorCode,securityCall} from './../../Comman';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ClipLoader } from 'react-spinners';

let scurrenttimestamp=0;
let interval;
let swindow=window;
securityCall(swindow);

class ChoosePrivateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getaddedplayeritems: [],
      userteamcount: 0,
      teamview: 0,
      userteam:[],
      playertypelist:[],
      arrayplayertype:{},
      checkplayerlist:[],
      time: 0, 
      seconds:0,
      checkid:0,
      getjoinedteamlist:[],
      isNotify:false,
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
      isDisable:false,
      isLoading :false,
      alreadyJoinedFull:0,
      totalJoinedTeams:0
    };
    sessioncheck();
    this.startTimer = this.startTimer.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
  }

  componentDidMount() {    
    let responsejoin= JSON.parse(atob(this.props.match.params.responsejoin));
    sessioncheck();
    getCurrentTime().then(resultTimestamp=>{
      scurrenttimestamp=resultTimestamp;
      clearInterval(interval);
      this.listMyTeams();
      this.startTimer();
      this.getUserTeam();
      this.getPlayerType();
      this.getJoinedTeam();
    });
  }

  toggleNotification() {
    this.setState({
      isNotify: !this.state.isNotify,
    });
  }

  getUserTeam = () => {
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
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  onClickCreateTeam = () => {
    if(this.state.userteamcount<6)
    {
      let matchid = this.props.match.params.matchid;
      window.location.href =HBRout+ '/CreateTeams/' + matchid;
    }
    else
    {
      checkresponse("Warning", false, "Your limit is 6 team to create", 3);
    }
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

              let getaddedplayeritems={};
              Object.keys(formthis.state.playertypelist).map(function(keyPT,indexPT){
                let teamlist=json.data.filter(itemTeam=>itemTeam.playertype==keyPT)
                getaddedplayeritems[keyPT]=teamlist;
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

  onClickPreviw=(teamid)=>{
    this.setState({teamview:1});
    this.getTeamDetail(teamid);
  }

  getPlayerType = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var args1 = {
      gameid: sessionStorage.getItem('gameid')
    };
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
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
              let arrayplayertype={};
              json.data.list.map(function(item,index){
                arrayplayertype[item.id]=item;
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

  goBack=()=>{
    window.history.back();
  }

  sendHome= () => {
    window.location.href =dashboardpage;
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
            window.location.href =dashboardpage;
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

  onChangeCheckbox=(teamid)=>{
    this.setState({checkid:teamid});
  }


balanceAmountDetailCheck() {
  let formthis=this;
  // formthis.setState({
  //   isLoading: true
  // });
  return new Promise(function (resolve, reject) {
    let responsejoin= JSON.parse(atob(formthis.props.match.params.responsejoin));
    var matchid = formthis.props.match.params.matchid;
   // var poolid = poolid;
    //var joincost= joinamount;
    //let teamid =0;  //formthis.state.checkid;
    var api_url = `${config.API_URL}`;
    var reqapi = "";
    

    // var args1 = {
    //   matchid: matchid,
    //   poolcontestid: poolid,
    //   //uteamid: teamid,
    //   fees: joinamount,
    //   atype: "prejoin"///"prejoin"
    // };

    
    responsejoin["atype"]="prejoin";

    reqapi = api_url + "/frontapi/createpvtcntst";

    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(responsejoin)
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
                  let baldetail=json.data;
                  //responsejoin.data= baldetail;

                  // responsejoin["fees"]= baldetail.fees;
                  // responsejoin["paybalwlt"]= baldetail.paybalwlt;
                  // responsejoin["paybnswlt"]= baldetail.paybnswlt;
                  // responsejoin["paywinwlt"]= baldetail.paywinwlt;
                  // responsejoin["wallet"]= baldetail.wallet;
                 
                  
                 return resolve(baldetail)
                }
                else {
                  return resolve(false)
                  checkresponse("Warning", true, json.msg, 3);
                }
              })
            }

          }).catch(error => {
            
            formthis.setState({
              isLoading: false
            });
            checkresponse("Wrong", false, error.toString(), 0);
            return resolve(false);
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


// callnotification=(result)=>{
//   console.log("callnotificationresult======>>>",result);
//   result=JSON.stringify(result);
//   result=JSON.parse(result);
  
  
//   let walletdetail={
//     btnname:result.btnname,
//     eventtype:result.eventtype,
//     fees:parseFloat(result.joinfees),
//     paybalwlt:parseFloat(result.paybalwlt),
//     paybnswlt:parseFloat(result.paybnswlt),
//     paywinwlt:parseFloat(result.paywinwlt),
//     walletbalance:parseFloat(result.wallet.walletbalance),
//     wltbns:parseFloat(result.wallet.wltbns),
//     wltwin:parseFloat(result.wallet.wltwin),
//     entryfees:parseFloat(result.entryfees),
//     bnsdeduction:parseFloat(result.bnsdeduction),
//   }
//     this.setState({
//       isNotify: true,
//       walletdetail:walletdetail
//     });
//   }

callnotification=(result)=>{

  let walletdetail={
    btnname:result.btnname,
    eventtype:result.eventtype,
    fees:parseFloat(result.fees),
    paybalwlt:parseFloat(result.paybalwlt),
    paybnswlt:parseFloat(result.paybnswlt),
    paywinwlt:parseFloat(result.paywinwlt),
    walletbalance:parseFloat(result.wallet.walletbalance),
    wltbns:parseFloat(result.wallet.wltbns),
    wltwin:parseFloat(result.wallet.wltwin),
    entryfees:parseFloat(result.fees),
    bnsdeduction:parseFloat(result.bnsdeduction),
    entryfees:parseFloat(result.entryfees),
  }
  
    this.setState({
      isNotify: true,
      walletdetail:walletdetail
    });
  }


onSubmit=()=>{
  let formthis=this;
  var matchid = this.props.match.params.matchid;
  var poolid = this.props.match.params.poolid;
  //var joincost= atob(this.props.match.params.joincost);
  let teamid = this.state.checkid;
  //console.log("=joincost=",joincost);
  if(teamid)
  {
      var api_url = `${config.API_URL}`;
      var reqapi = "";
      //let joinamount=parseFloat(joincost);     

      if (this.state.matchMyTeamListCount > 0) {
        this.balanceAmountDetailCheck().then(result=>{
          
         if(result){
          let responsejoin= JSON.parse(atob(formthis.props.match.params.responsejoin));
          result.data=responsejoin;
          
          if (result && result.fees>0) {    

            result.eventtype="addbalance";
            result.btnname="Add Balance";
            result.entryfees=result.entryfees;
            formthis.setState({eventtype:"addbalanceAddCash",
            selectpoolid:poolid,
                selectjoincost:result.entryfees
            });
            formthis.callnotification(result);
          }
            else
            {
              result.eventtype="join_contest";
              result.btnname="Join Contest";
              result.entryfees=result.entryfees;
              formthis.setState({
                eventtype:"join_contest",
                //selectpoolid:poolid,
                selectjoincost:result.entryfees
              });
              
              formthis.callnotification(result);

          }
         }
        })
        }
      }
else
{
  checkresponse("Warning", false, "Please select team first", 3);
}
}

joiningcontest=()=>{
  let formthis=this;
  formthis.setState({
    isLoading: true
  });
   //var matchid = this.props.match.params.matchid;
  // var poolid = this.props.match.params.poolid;
  // var joincost= atob(this.props.match.params.joincost);
  // let teamid = this.state.checkid;
   var api_url = `${config.API_URL}`;
  // let joinamount=parseFloat(joincost);
  // this.setState({isDisable: true});

  // var args1 = {
  //   matchid: matchid,
  //   poolcontestid:poolid,
  //   uteamid: teamid,
  //   fees:joinamount,
  //   atype:"join"///"prejoin"
  // };
  let responsejoin= JSON.parse(atob(this.props.match.params.responsejoin));
  
  responsejoin["uteamid"]=formthis.state.checkid;
  var object = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
    },
    body: JSON.stringify(responsejoin)
  }
  let reqapi = api_url + "/frontapi/createpvtcntst";      
    fetch(reqapi, object)
        .then(function (response) {
          formthis.setState({
            isLoading: false
          });
          var chkresp = checkresponse("Wrong", response.status, "", 2);
          if (chkresp === true) {
            response.json().then(json => {
              if (json.error === false) {
                checkresponse("Joined", 200, json.msg, 1);
                window.location.href =HBRout+ "/JoinContest/" + responsejoin.matchid;
              }
              else {
                formthis.setState({isDisable: false});
                checkresponse("Warning", false, json.msg, 3);
              }
            })
          }

        }).catch(error => {
          formthis.setState({isDisable: false,isLoading: false});
          checkresponse("Wrong", false, error.toString(), 0);
        });
}


getJoinedTeam = () => {
  var formthis = this;
  formthis.setState({
    isLoading: true
  });
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
      formthis.setState({
        isLoading: false
      });
      var chkresp = checkresponse("Wrong", response.status, response.message, 2);
      if (chkresp === true) {
        response.json().then(json => {
          if (json.error === false) {
            let objjoinedteam = {};
            let alreadyJoinedFull = 0;
            json.data.map(function (itemJT, indexJT) {
              objjoinedteam[itemJT.uteamid] = true;
            })

            // for displaying create team button
            if(Object.entries(objjoinedteam).length !== 0){
              Object.keys(objjoinedteam).forEach(function(key) {
                if(objjoinedteam[key] == true){
                }else{
                  alreadyJoinedFull++;
                }
              });
            }

            formthis.setState({
              getjoinedteamlist: objjoinedteam,
              getmyjoinedteam: json.data,
              alreadyJoinedFull:alreadyJoinedFull,
              totalJoinedTeams:Object.entries(objjoinedteam).length
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

btnNotification=()=>{
  let matchid = this.props.match.params.matchid;
  let poolid= this.state.selectpoolid;
  let joincost= this.state.selectjoincost;

  //console.log("btnNotification this.state.eventtype--->>>",this.state.eventtype);
  
  if(this.state.eventtype==="addbalanceAddCash")
  {
    window.location.href = HBRout + '/AddCash';
  }

  if(this.state.eventtype==="addbalanceChooseTeam")
  {
    window.location.href = HBRout + '/ChoosePrivateTeam/' + matchid + '/' + poolid + '/' + btoa(joincost);
  }

  if(this.state.eventtype==="join_contest")
  {
    //window.location.href = HBRout + '/ChooseTeam/' + matchid + '/' + poolid + '/' + btoa(joincost);
    this.joiningcontest();
  }
}

onClickCreateTeam = ()=>{
  let matchid = this.props.match.params.matchid;
  window.location.href =HBRout+ '/CreateTeams/' + matchid;
}

  render() {
    var formthis = this;
    let matchid = this.props.match.params.matchid;
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
              <span onClick={goBack} className="hd_back"></span>
                  <span onClick={sendHome} className="hd_home"></span>
              </div>
              
              <div className="hd_center">Choose Team</div>
            </div>
            <div className="curremt_matchdetailbox">
              <div className="allover_ctcpart">
                <div className="left_ctboxit">{sessionStorage.getItem("team1_"+matchid)}<span className="left_teamcurrent">vs</span>{sessionStorage.getItem("team2_"+matchid)} </div>
                <div className="right_ctboxit pull-right">  {formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s </div>
              </div>
            </div>
            <div className="dress_area">
              {
                formthis.state.userteam.map(function (item, index) {
                  return (
              <div className={"caption_ctamod pointer"+((formthis.state.getjoinedteamlist[item.id]===true)?" contestteamselected pointernone":"")} onClick={()=>formthis.onChangeCheckbox(item.id)} key={index}>
                <h3><span className="intem_all pointernone">
                <input type="checkbox" checked={((formthis.state.checkid===item.id)?true:false)} /> 
                </span> {"Team: "+(index+1)} <span className="alry-joined">{((formthis.state.getjoinedteamlist[item.id]===true)?"( ALREADY JOINED )":"")}</span></h3> 
                <div className="bdo_topends pointernone">
                  <div className="bdo_topendsright pointernone">	<p>Captain <span className="cpname_ecss pointernone">{item.cap}</span></p> </div>
                  <div className="bdo_topendsleft pointernone">	<p>Vice Captain <span className="cpname_ecss pointernone">{item.vcap}</span></p> </div>
                </div>
                <div className="edpri_clos">
                  <div className="col-sm-4 ">
                    <a className="edoxed01" id={item.id} onClick={()=>formthis.onClickPreviw(item.id)}><i className="fa fa-eye pointernone"></i> Preview </a>
                  </div>
                </div>
              </div>
             )
            })}

            </div>
            {/*------- fixed bottom section  ----------*/}
          </div>
        </div>
        <a className="all_transaction up_bt"> <button className="savebtn_pencard pointer">JOIN</button> </a>
        </AvForm>
        {
          (this.state.totalJoinedTeams == formthis.state.userteamcount) ? 
            <a className="all_transaction up_bt" onClick={this.onClickCreateTeam}> <button className="savebtn_pencard pointer">CREATE TEAM</button> </a>
           : ""
        }

        <div className={"teampreview" + ((formthis.state.teamview === 0) ? " hidden" : "")}>

          <div className={ "innercontent " + (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="2" ? "football-ground-image " : "")  + (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="3" ? "kabaddi-ground-image " : "") + "" }>
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
                            {(formthis.state.getaddedplayeritems[keyAll][keyOne]["iscap"]==="1")?(<div className="player_vicac">C</div>):null}
                            {(formthis.state.getaddedplayeritems[keyAll][keyOne]["isvcap"]==="1")?(<div className="player_vicac advicacap">VC</div>):null}
                            <div className="circle_picmd">
                              <img src={formthis.state.getaddedplayeritems[keyAll][keyOne]["pimg"]} className="flag_008b5" />
                            </div>
                             <p className={(formthis.state.getaddedplayeritems[keyAll][keyOne]["teamname"]===sessionStorage.getItem("team1_" + matchid))?"player-name":""} title={formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]}> {formthis.state.getaddedplayeritems[keyAll][keyOne]["pname"]} </p>
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
                        <Button className="btncustom-md" disabled={this.state.isDisable} color="primary" onClick={this.btnNotification}>{formthis.state.walletdetail.btnname}</Button>
                      
                      </ModalFooter>
                  
                </Modal>

      </div>
    );
  }
}

export default ChoosePrivateTeam;
