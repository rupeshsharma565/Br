import React, { Component } from 'react';
import { Button,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  Progress
} from 'reactstrap';
import swal from 'sweetalert';
import config from './../../config';
import { dashboardpage, getCurrentTime, converttosecondnew, checkresponse, secondsToTime, goBack, sendHome, sessioncheck, HBRout,getConvertoWord,overrideLoaderCss,loaderColorCode,toastMessage } from './../../Comman';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let scurrenttimestamp = 0;
//let interval;


class Contests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      matchlist: [],
      collapse: [],
      time: 0,
      seconds: 0,
      matchMyTeamListCount: 0,
      getblance: 0,
      freeamount: 0,
      joinlist: {},
      myjoinedpool: {},
      totaljoin:"0",
      isNotify:false,
      isNotifyPriv:false,
      eventtype:"",
      selectpoolid:0,
      selectjoincost:0,
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
        entryfees:0
      },
      isLoading :false,
      contestcode:"",
      isOpenModal:false
    };
    sessioncheck();
    this.timer = 0;
    this.toggle = this.toggle.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.toggleNotificationPriv = this.toggleNotificationPriv.bind(this);
    this.onChange = this.onChange.bind(this)
    this.toggleContestCodeModal = this.toggleContestCodeModal.bind(this);
    this.openPrivateModal = this.openPrivateModal.bind(this);
  }

  componentDidMount() {
    sessioncheck();
    getCurrentTime().then(resultTimestamp => {
      scurrenttimestamp = resultTimestamp;
      clearInterval(this.interval);
      this.startTimer();
      this.listMatchesFront();
      this.listMyTeams();
      this.getBalance();
      this.getJoinList();
    });
  }

  toggleNotification() {
    this.setState({
      isNotify: !this.state.isNotify,
    });
  }
  
  toggleNotificationPriv() {
    this.setState({
      isNotifyPriv: !this.state.isNotifyPriv
    });
  }


  listMatchesFront = () => {
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
    apiUrl = api_url + "/frontapi/matchcontestlistfront";

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
                matchlist: json.data,
                totaljoin:json.details.totaljc
              })
            }
            else {
              formthis.setState({
                matchlist: []
              })
              checkresponse("Not assigned", false, "Contest is not assigned yet.", 0);
              window.location.href = HBRout + "/Home";
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



  balanceAmountDetailCheck(joinamount,poolid) {
    var formthis = this;
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
      
      let ccode=(formthis.state.ccode)?formthis.state.ccode:"";

      var args1 = {
        matchid: matchid,
        poolcontestid: poolid,
        //uteamid: teamid,
        fees: joinamount,
        atype: "prejoin",
        ccode:formthis.state.contestcode//"MPH18lx4HgTZ"//ccode
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
              var chkresp = checkresponse("Wrong", response.status, "", 2);
              if (chkresp === true) {
                response.json().then(json => {
                  if (json.error === false) {
                    resolve(json)
                    formthis.setState({
                      isOpenModal:false,
                      contest_code:""
                    })
                  }
                  else {
                    toastMessage("error",json.msg);
                    resolve(false)
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
       
      })

   

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
  entryfees:parseFloat(result.data.entryfees),//parseFloat(result.entryfees),
  bnsdeduction:parseFloat(result.data.bnsdeduction),
  poolcontestid:result.data.poolcontestid
}
  this.setState({
    isNotify: true,
    walletdetail:walletdetail
  });
}


btnNotification=()=>{
  let matchid = this.props.match.params.matchid;
  let poolid=this.state.walletdetail.poolcontestid; //this.state.selectpoolid;
  let joincost=this.state.walletdetail.entryfees; //this.state.selectjoincost;
  
  if(this.state.eventtype==="addbalanceAddCash")
  {
    window.location.href = HBRout + '/AddCash';
  }

  if(this.state.eventtype==="addbalanceChooseTeam")
  {
    window.location.href = HBRout + '/ChooseTeam/' + matchid + '/' + poolid + '/' +btoa(joincost);
  }

  if(this.state.eventtype==="join_contest")
  {
    window.location.href = HBRout + '/ChooseTeam/' + matchid + '/' + poolid + '/' +btoa(joincost);
  }
}


  setCreateTeam = (event,joincost, poolid) => {
    if(event)
    {
      event.stopPropagation();
    }
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    
    if (this.state.matchMyTeamListCount > 0) {
      console.log("setCreateTeamresult------>>>",joincost,poolid);
      this.balanceAmountDetailCheck(joincost,poolid).then(result=>{
        if(result)
        {
        if (joincost > this.state.freeamount)//change
        {
          //if (joincost <= this.state.getblance) {
            if (result.data && result.data.fees>0) {    

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

  goBackHome = () => {
    window.location.href = HBRout + '/Home';
  }

  onClickCreateTeam = () => {
    let matchid = this.props.match.params.matchid;
    if (this.state.matchMyTeamListCount > 0) {
      window.location.href = HBRout + '/MyTeams/' + matchid;
    }
    else {
      window.location.href = HBRout + '/CreateTeams/' + matchid;
    }

  }

  toggle(e) {
    let collapse = this.state.collapse;
    let status = (this.state.collapse[e.target.id]) ? this.state.collapse[e.target.id] : false;
    collapse[e.target.id] = !status;
    this.setState({ collapse: collapse });
  }


  startTimer() {
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    this.interval = setInterval(function () {
      scurrenttimestamp = scurrenttimestamp + 1000;
      let sessionmatchtime = sessionStorage.getItem("endtime_" + matchid);
      if (sessionmatchtime) {
        let intdate = parseInt(sessionmatchtime) * 1000;
        //let dd = new Date(intdate);
        //let ssecond = converttosecond(dd);
        
        let ssecond = converttosecondnew(intdate, scurrenttimestamp);

        let timeLeftVar = secondsToTime(ssecond);
        let editStatus = ((ssecond < 0) ? false : true);
        if (ssecond < 0) {
          clearInterval(this.interval);
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


  getBalance = () => {
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
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

  openContestDetails = (e) => {
    //e.stopPropagation();
    var matchid = this.props.match.params.matchid;
    let poolcontestid = e.target.id;
    window.location.href = HBRout + "/ContestDetailsForJoin/" + matchid + "/" + poolcontestid

  }


  getJoinList = () => {
    let formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var api_url = `${config.API_URL}`;
    var reqapi = "";

    var args1 = {
      matchid: matchid
    };

    reqapi = api_url + "/frontapi/getjoinedcontest";

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
            let myjoinedpool = {};
            if (json.error === false) {
              json.data.map(function (itemPool, indexPool) {
                myjoinedpool[itemPool.contestid + "," + itemPool.poolcontestid] = true;

              })
            }
            formthis.setState({ joinlist: myjoinedpool });
          })
        }

      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        checkresponse("Wrong", false, error.toString(), 0);
      });


  }


  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.interval);
  }

  toggleContestCodeModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      contest_code:""
    });
  }
  openPrivateModal= (e)=>{
    this.setState({
      isOpenModal:true
    })
  }
  onChange= (e)=>{
    const formthis = this;
    let {name, value} = e.target;
    
    formthis.setState({
      [name]: value
    });
  }

  applyContestCode =() =>{
    const formthis = this;
    if(formthis.state.contest_code){
      let formthis = this;
    formthis.setState({
      isLoading: true
    });
    var matchid = this.props.match.params.matchid;
    var api_url = `${config.API_URL}`;
    var reqapi = "";

    var args1 = {
      matchid: matchid,
      ccode:formthis.state.contest_code
    };

    reqapi = api_url + "/frontapi/pvtcntstcheck";

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
              formthis.setState({
                contestcode: formthis.state.contest_code
              },()=>{
                formthis.setCreateTeam(null,1,1);
              });
            }else{
              toastMessage("error",json.msg);
            }
          })
        }

      }).catch(error => {
        formthis.setState({
          isLoading: false
        });
        toastMessage("error",error.toString());
      });
    }else{
      toastMessage("error","Please enter contest code");
    }
  }

  createPrivateContest = () =>{
    var formthis = this;
    let matchid = this.props.match.params.matchid;
    if(formthis.state.matchMyTeamListCount > 0){
      window.location.href = HBRout + "/createPrivateContest/"+matchid;
    }else{
      toastMessage("error","Please create team first");
    }
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
        <div className="left_logincontent profilepadding0">
        
          <div className="background-cover ng-scope">
            <div className="header_bg">
              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">Contests</div>
              <div className="hd_right">
              <a href={HBRout +"/MyAccount"} className="hd_wallet" />
              </div>
            </div>
            <div className="curremt_matchdetailbox">
              <div className="allover_ctcpart">
                <div className="left_ctboxit">{sessionStorage.getItem("team1_" + matchid)}<span className="left_teamcurrent">vs</span>{sessionStorage.getItem("team2_" + matchid)} </div>
                <div className="right_ctboxit pull-right">  {formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s </div>
              </div>
            </div>
            
            <div className="contest_tabsmainbd">
              <div className="innerx_bodyarea">
                <div className="faq_accordian_pg">
                  <div className="panel-group" id="accordion">
                  <div className={"topcreate_privatemain "+((config.IS_PRIVATE_CONT===false)?"hidden":"")} >
                  <span className="pull-left">
                    <a className="createprivate_contbtn" onClick={(e)=>{formthis.openPrivateModal()}} >Enter Contest Code
                    <i className="fa fa-sign-in"></i>
                    </a>
                    </span>
                    <span className="pull-right">
                  <a href="javascript:void(0)" onClick={(e)=>{formthis.createPrivateContest()}} className="createprivate_contbtn" >Create a Contest 
                  <i className="fa fa-plus-circle"></i></a>
                  </span>
              </div>
                    {
                      formthis.state.matchlist.map(function (itemcontest, index) {
                        return (
                          <div className="begings_mian" key={index}>
                            <div className="bgtop_nos fixed_bgnos">
                            {/* <div className="teamvs_icon"><img src={itemcontest.contestlogo} alt="image" /></div> */}
                              <h3>{itemcontest.title}</h3>
                              <p>{itemcontest.subtitle}</p>
                            </div>

                            {

                              itemcontest.contestPools.map(function (itemPools, indexPools) {
                                return (

                                  <div key={indexPools} onClick={formthis.openContestDetails} id={itemPools.id} className="bignest_boxpart pointer">
                                    <div className="prizepool_ed pointernone">
                                      <span className="left_prizpool">Prize Pool <p title={itemPools.totalwining}>₹{getConvertoWord(itemPools.totalwining)}</p></span>
                                      <span className="right_prizpool">Entry Fees
                                    {((formthis.state.joinlist[itemPools.contestid + "," + itemPools.contestmetaid] === true) && itemPools.s === "1") ? (<span className="win_inrsdto vale_ingrnind"><i className="fa fa-inr" aria-hidden="true" />{itemPools.joinfee}</span>) : (<button className="jont_oldbtn pointerevent" 
                                    onClick={(e) => {formthis.setCreateTeam(e, itemPools.joinfee, itemPools.id)}}>{(config.PROJECT_CODE === "3") ? "Join " : ""}₹{itemPools.joinfee}</button>)}
                                      </span></div>
                                    <div className="sport_leftmain pointernone"><div className="imgleft_main">
                                      <Progress animated className="progress-xs" color="info" value={(((parseFloat(itemPools.maxteams) - parseFloat(itemPools.joinleft)) / parseFloat(itemPools.maxteams)) * 100)} />
                                    </div>
                                      <div className="towspr_left">{itemPools.joinleft} spots left <span className="bknext_ord">{itemPools.maxteams} spots</span></div>
                                    </div>
                                    <div className="tro_portecs pointernone"><span className="tp_witimgleft"><img src={require("./../../images/minitrophy.png")} alt="image" /> {itemPools.winners}</span>
                                      <span className="tp_withright">
                                        {((itemPools.m === "1") ? <p>M</p> : null)}
                                        {((itemPools.s === "1") ? <p>S</p> : null)}
                                        {((itemPools.c === "1") ? <p>C</p> : null)}
                                      </span></div>
                                  </div>

                                )
                              })
                            }

                          </div>
                        )
                      })}


                  </div>
                </div>
              </div>
            </div>

            {/*--------- fixed bottom section  ------------ */}

            <div className="teamjoint_contestend">
              <a className="mytems_ategbox" onClick={this.onClickCreateTeam}>{(formthis.state.matchMyTeamListCount > 0) ? "My Team" : "Create Teams"}<span className="myteam_dinivalue">{" (" + formthis.state.matchMyTeamListCount + ")"}</span></a>
              <a href={HBRout + "/JoinContest/" + matchid} className="joiendctox_ategbox">Joined Contests ({this.state.totaljoin}) <span className="myteam_dinivalue"></span></a>
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
                        <Button className="btncustom-md" color="primary" onClick={this.btnNotification}>{formthis.state.walletdetail.btnname}</Button>
                      
                      </ModalFooter>
                  
                </Modal>

                <Modal isOpen={this.state.isOpenModal} toggle={this.toggleContestCodeModal}
                       className={'modal-sm verfypop_enter forconfir_md contest_codepopupmain' + this.props.className}>
                       
                      <ModalHeader toggle={this.toggleContestCodeModal}>Private Contest Code</ModalHeader>
                      <ModalBody>
                        <div className="iconlogi_call">
                        <div className="entr_mdconi">
                          <input type="text" name="contest_code" value={formthis.state.contest_code} onChange={formthis.onChange} placeholder="Code" autoFocus={true}/>
                        </div>
                        
                      </div>
                  
                      </ModalBody>
                      <ModalFooter>
                        <Button className="btncustom-md" color="primary" onClick={this.applyContestCode}>Apply Code</Button>
                      
                      </ModalFooter>
                  
                </Modal>
                <ToastContainer />
      </div>
    );
  }
}

export default Contests;
