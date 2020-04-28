import React, { Component} from 'react';
import {Progress, Button,Modal, ModalBody, ModalFooter, ModalHeader,Row,Col } from 'reactstrap';
import swal from 'sweetalert';
import config from './../../config';
import { dashboardpage,getCurrentTime,converttosecondnew,goBack, sendHome, checkresponse, sessioncheck, converttosecond, secondsToTime,endtimeinsecond ,HBRout, overrideLoaderCss, loaderColorCode} from './../../Comman';
import { ClipLoader } from 'react-spinners';

let scurrenttimestamp=0;
let interval;

class JoinContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      seconds: 0,
      joinlist: [],
      allowContestToEdit:true,
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
      freeamount:0,
      score_result : {},
      isLoading: false
    };
    sessioncheck();
    this.startTimer = this.startTimer.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
  }

  

  componentDidMount() {
    sessioncheck();
    this.getScore();
    getCurrentTime().then(resultTimestamp=>{
      scurrenttimestamp=resultTimestamp;
      clearInterval(interval);
      this.listMyTeams();
      this.startTimer();
      this.getJoinList();
     
    })
  }


  toggleNotification() {
    this.setState({
      isNotify: !this.state.isNotify,
    });
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
        //console.log("ssecond--->>",ssecond);
        if(ssecond<0)
        {
          clearInterval(interval);
        }

        formthis.setState({
          seconds: ssecond,
          time: timeLeftVar,
          allowContestToEdit:editStatus
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
            if (json.error === false) {
              formthis.setState({ joinlist: json.data });
            }
            else {
              formthis.setState({ joinlist: [] });
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

  openContestDetails = (poolcontestid,iscancel) => {
    var matchid = this.props.match.params.matchid;
    let type = this.props.match.params.type;
    if(iscancel==="0")
    {
      if(type==="1")
      {
        window.location.href =HBRout+ "/ContestDetails/" + matchid + "/" + poolcontestid+"/1";    
      }
      else
      {
        window.location.href =HBRout+ "/ContestDetails/" + matchid + "/" + poolcontestid;  
      }
    }
    
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
                  //console.log("json-1-->>>",json);
                  if (json.error === false) {
                    //console.log("json-2-->>>",json);
                    resolve(json);
                  }
                  else {
                    checkresponse("Wrong", false, json.msg, 0);
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
 

  setCreateTeam = (event, joincost, poolid) => {
    event.stopPropagation();
    let formthis = this;
    let matchid = this.props.match.params.matchid;
    joincost=parseFloat(joincost);
    
    if (this.state.matchMyTeamListCount > 0) {
      this.balanceAmountDetailCheck(joincost,poolid).then(result=>{
        //console.log("joincost--->>",joincost);
       if(result)
       {
        if (joincost >= this.state.freeamount)//change
        {
          //console.log("joincost--in->>",joincost);
          //console.log('jjjjj', result.data);
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
      bnsdeduction:parseFloat(result.data.bnsdeduction)
    }
      this.setState({
        isNotify: true,
        walletdetail:walletdetail
      });
    }


  componentWillUnmount() {
    clearTimeout(interval);
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


  getScore = () => {
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
    
    apiUrl=API_URL+"/getmatchdata?matchid="+matchid+"&responsetype=score";

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
               //console.log("Score result",json.data);
              // return
                formthis.setState({
                  score_result: json.data,
                  inningsdetail: json.data.inningsdetail
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
    let matchid = this.props.match.params.matchid;
    let type = this.props.match.params.type;
      //console.log("type--->>>",type);
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
              {/* <div className="hd_right"><a className="hd_wallet" /></div> */}
              <div className="hd_center">Joined Contests</div>
            </div>
            <div className="curremt_matchdetailbox">
              <div className="allover_ctcpart">
                <div className="left_ctboxit">{sessionStorage.getItem("team1_" + matchid)}<span className="left_teamcurrent">vs</span>{sessionStorage.getItem("team2_" + matchid)} </div>
                {(this.state.allowContestToEdit===false)?(<div className="right_ctboxit pull-right">{(type==="1"?"Complete":"In Progress")}</div>):(<div className="right_ctboxit pull-right">  {formthis.state.time.h}h {formthis.state.time.m}m {formthis.state.time.s}s </div>)}
              </div>
            </div>
                  {/* Scores */}
            <div className="begings_mian">
                  <Row className={(formthis.state.allowContestToEdit===true)?"hidden":""}>
                  <Col xs="6">
                  { this.state.inningsdetail &&  sessionStorage.getItem('gameid') ? this.state.inningsdetail['team_a']['short_name']+" : "   : ""}  
                  { 
                    (this.state.inningsdetail && sessionStorage.getItem('gameid')) ? 
                     Object.values(this.state.inningsdetail['a']).map(function (scores, index_score) {
                      let comm=(index_score===0)?"":", ";
                      return (
                        <span key={'score_'+index_score}> {(scores) ? comm+scores:"0"}</span>
                      )  
                    })
                    : ""
                    }
                  </Col>
                  <Col xs="6">
                  { this.state.inningsdetail &&  sessionStorage.getItem('gameid') ? this.state.inningsdetail['team_b']['short_name']+" : "   : ""} 
                  { 
                    (this.state.inningsdetail && sessionStorage.getItem('gameid')) ? 
                      Object.values(this.state.inningsdetail['b']).map(function (scores, index_score) {
                        let comm=(index_score===0)?"":", ";
                        return (
                          <span key={'score_'+index_score}> {(scores) ? comm+scores:"0"}</span>
                        )  
                      }) 
                    : ""
                  }
                  </Col>
                  <Col xs="6">
                  {(this.state.score_result.status =="completed" && this.state.score_result['msg_info'])  ? this.state.score_result['msg_info']['completed'] : this.state.score_result.status}
                  </Col>
                  <Col xs="12">
                    <div className="view-full-score">
                      <a href={HBRout+"/FullScoreCard/"+sessionStorage.getItem('gameid')+"/"+matchid}>View Full Score</a>
                    </div>
                  </Col>
                    <Col xs="6">
                  
                <span> 
                        {((this.state.matchscorelist)?this.state.matchscorelist.team1.score:[]).map(function(itemSc,indexSc){ 
                          var comm="";
                          if(formthis.state.matchscorelist.team1.score.length>(indexSc+1))
                          {
                            comm=", ";
                          }
                          return(<span key={indexSc}>{itemSc.inningRun+" / "+itemSc.inningWicket +" ("+itemSc.inningOver+")"+comm}</span>
                          )})} 
                </span>
                </Col>
                <Col xs="6">
                <span> 
                        {((this.state.matchscorelist)?this.state.matchscorelist.team2.score:[]).map(function(itemSc,indexSc){ 
                          var comm="";
                          if(formthis.state.matchscorelist.team2.score.length>(indexSc+1))
                          {
                            comm=", ";
                          }
                          return(<span key={indexSc}>{itemSc.inningRun+" / "+itemSc.inningWicket +" ("+itemSc.inningOver+")"+comm}</span>
                          )})} 
                </span>
                </Col>
                </Row>

                </div>
            {/*------- fixed bottom section  ----------*/}

            <div id="contest1" className="panel-collapse in">
              <div className="panel-body contesttab_panelbody">
                {

                  this.state.joinlist.map(function (itemPools, indexPools) {
                    return (
                      <div key={indexPools} className="begings_mian pointer" onClick={() => formthis.openContestDetails(itemPools.poolcontestid,itemPools.iscancel)}>
                        <div className="bignest_boxpart">
                          <div className="prizepool_ed"><span className="left_prizpool">Prize Pool {(itemPools.iscancel==="1")?(<b className="cancelled">(Cancelled)</b>):null} <p>₹{itemPools.totalwining}</p></span> <span className="right_prizpool">
                          Entry 
                          {/* <span className="jontedbtn">₹{itemPools.joinfee}</span> */}
                          {((formthis.state.allowContestToEdit===true)?((itemPools.m==="1")?(<button className="jont_oldbtn pointerevent" onClick={(e) => {
                                                                            formthis.setCreateTeam(e, itemPools.joinfee, itemPools.poolcontestid)
                                                                        }}>₹{itemPools.joinfee}</button>):(<span className="win_inrsdto vale_ingrnind"><i className="fa fa-inr" aria-hidden="true" />{itemPools.joinfee}</span>)
                                                                        ): (<span className="win_inrsdto vale_ingrnind"><i className="fa fa-inr" aria-hidden="true" />{itemPools.joinfee}</span>))}

                          </span></div>
                          <div className="sport_leftmain"><div className="imgleft_main">
                            <Progress className="progress-xs" color="info" value={(((parseFloat(itemPools.maxteams) - parseFloat(itemPools.joinleft)) / parseFloat(itemPools.maxteams)) * 100)} />
                          </div>
                            <div className="towspr_left">{itemPools.joinleft} spots left <span className="bknext_ord">{itemPools.maxteams} spots</span></div>
                          </div>
                          <div className="tro_portecs"><span className="tp_witimgleft"><img src={require("./../../images/minitrophy.png")} alt="image" /> {itemPools.winners}</span> <span className="tp_withright">
                          
                          {((itemPools.m==="1")?<p>M</p>:null)} 
                          {((itemPools.s==="1")?<p>S</p>:null)} 
                          {((itemPools.c==="1")?<p>C</p>:null)} 
                          </span></div>
                        </div>
                      </div>
                    )
                  })
                }
                
                {
                  (this.state.joinlist.length>0)?null:(<div className="notification_nofounde">
                  <p>NO JOINED CONTEST AVAILABLE</p>	
                </div>)
                }
              </div>
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
        
      </div>
    );
  }
}

export default JoinContest;
