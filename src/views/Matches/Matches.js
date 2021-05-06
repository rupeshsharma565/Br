import React, { Component } from 'react';
import config from './../../config';
import {getCurrentTime, checkresponse,converttosecond, converttosecondnew, secondsToTime, sessioncheck,upcomingmatchs ,HBRout,matchFormatTypes, matchStatusTypes, timestampToDate, overrideLoaderCss, loaderColorCode,currentTimestamp, matchCountDown,unCamelCase,timestampToDateString, statusColorCode,securityCall} from './../../Comman';
import { ClipLoader } from 'react-spinners';

var pushtime = {};
var pushseconds = {};
let scurrenttimestamp=0;
let interval;
//const Example = () => <UncontrolledCarousel items={itemslist} />;
let swindow=window;
securityCall(swindow);

class Matches extends Component {
  //timer = 0;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      matchlist: [],
      time: {},
      seconds: {},
      leftmenuopenstatus: false,
      leftmenuopenclass: "",
      slideimages: "",//require("./../../images/home-banner01.jpg"),
      slideimagenumber: 0,
      slideimageclass: { 0: "slidebuttonselected" },
      tabstatus:"tab1",
      itemslist:[],
      currentdatetime:0,
      currenttype:"",
      gameid:"1",
      isLoading :false,
      idFullyLoaded : false,
      gameTypeList:[],
      notificationData:{},
      onHover:false,
      error: false,
      hasMore: true,
      page:1,
      atype:"fixtures"
    };
    sessioncheck();
    this.onclickGame = this.onclickGame.bind(this);
    this.getNotifications();
    this.onHoverSlider = this.onHoverSlider.bind(this)
    this.onHoverOutSlider = this.onHoverOutSlider.bind(this);
    window.addEventListener('scroll', this.scrollMore, true);
    
  }

  componentWillMount() {
    this._isMounted = true;
    let formthis=this;
    let gameid=(sessionStorage.getItem("gameid"))?sessionStorage.getItem("gameid"):"1";
    sessionStorage.setItem("gameid",gameid);
    if(this._isMounted){
      this.setState({gameid:gameid,idFullyLoaded:true},()=>{
      getCurrentTime().then(resultTimestamp=>{
          scurrenttimestamp=resultTimestamp
          formthis.listMatchesFront(upcomingmatchs["tab1"].key);
          formthis.onClickSlider();
          formthis.sliderImages();
          formthis.getGameTypes();
        })
      })
    }
    // get notification every sec
    try {
      if(this._isMounted){
        
      this.timernotif = setInterval(async () => {
        if(sessionStorage.getItem('jwt')){
         this.getNotifications();
        }
        
      }, 10000 *30);
      }
    } catch(e) {
      console.log(e);
    }
  }

  // Binds our scroll event handler
  scrollMore = () => {
    this._isMounted = true;
    let forthis=this;
    const {
      matchlist,
      state: {
        error,
        isLoading,
        hasMore,
      },
    } = this;
    
    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (error || isLoading || !hasMore) return;

    // Checks that the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
    ) {

      var page_no = this.state.page;
      page_no     = parseInt(page_no)+1;
      if(this._isMounted){
        this.setState({
          page:page_no
        },()=>{
          forthis.listMatchesFront(forthis.state.atype,page_no);
        })
      }
    }
  }


  sliderImages = () => {
    this._isMounted = true;
    var formthis = this;
    formthis.setState({
      isLoading: true
    });
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  
    }
    
    var api_url = `${config.API_URL}`;
    var apiUrl = "";
    apiUrl = api_url + "/slider";
    fetch(apiUrl, object)
      .then(function (response) {
        formthis.setState({
          isLoading: false
        });
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({itemslist:json.data});
              }
            }
            else {
              if(formthis._isMounted){
                formthis.setState({
                  itemslist: []
                })
              }
            }
          })
        }
      }).catch(error => {
        if(formthis._isMounted){
          formthis.setState({
            isLoading: false
          });
        }
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  startTimer=(matchid)=>{
    this._isMounted = true;
    let formthis = this;
    this.timerupcom= setInterval(function () {
    scurrenttimestamp=scurrenttimestamp+1000;
      if(formthis.state.matchlist && formthis.state.matchlist.length) {
        formthis.state.matchlist.map(function (itemseconds, index) {
          let intdate = parseInt(itemseconds["mdategmt"]) * 1000;
          let ssecond = converttosecondnew(intdate,scurrenttimestamp);
          let timeLeftVar = secondsToTime(ssecond);
          pushseconds[itemseconds["matchid"]] = ssecond;
          pushtime[itemseconds["matchid"]] = timeLeftVar;
        }, () => {
        })
      }
      if(formthis._isMounted){
        formthis.setState({
          seconds: pushseconds,
          time: pushtime
        })
      }
    }, 1000);
  }




  listMatchesFront = (atype,page_no=1) => {
    this._isMounted = true;
    var formthis = this;
    if(formthis._isMounted){
      formthis.setState({
        isLoading: true
      });
    }
    let args1={};
    args1={
      atype:atype,//"fixtures",
      gameid:sessionStorage.getItem("gameid"),
      page: (page_no && page_no > 1) ? page_no : 1
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
        if(formthis._isMounted){
          formthis.setState({
            isLoading: false
          });
        }
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              json.data.map(async function (itemseconds, index) {

                let intdate = parseInt(itemseconds["mdategmt"]) * 1000;
                let dd = new Date(intdate);
               // let currentdate=await getCurrentTime();
                let ssecond = converttosecond(dd,formthis.state.currentdatetime);
                let timeLeftVar = secondsToTime(ssecond);
                pushseconds[itemseconds["matchid"]] = ssecond;
                pushtime[itemseconds["matchid"]] = timeLeftVar;
              })

              if (json && json.data && json.data.length > 0 && atype==="fixtures") {
                clearInterval(formthis.timer);
                formthis.startTimer();
              }
              if(formthis._isMounted){
                formthis.setState({
                  //matchlist: json.data,
                  seconds: pushseconds,
                  time: pushtime
                })
              }
              // Creates a massaged array of user data
              const nextPageRecord = json.data;
              // Merges the next record into our existing record
              if(formthis._isMounted && formthis.state.matchlist){
                formthis.setState({
                  // Note: Depending on the API you're using, this value may be
                  // returned as part of the payload to indicate that there is no
                  // additional data to be loaded
                  hasMore: (formthis.state.matchlist.length < json.total),
                  isLoading: false,
                  matchlist: [
                    ...formthis.state.matchlist,
                    ...nextPageRecord,
                  ],
                });
              }
            }
            else {
              // formthis.setState({
              //   matchlist: []
              // })
              if(formthis._isMounted){
                formthis.setState({
                  hasMore: false,
                  isLoading: false
                });
              }
            }
          })
        }
      }).catch(error => {
        if(formthis._isMounted){
          formthis.setState({
            isLoading: false
          });
        }
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  CreateTeam = (matchid, endtime, team1, team2,tabstatus,seriesid) => {
    sessionStorage.setItem("endtime_" + matchid, endtime);
    sessionStorage.setItem("team1_" + matchid, team1);
    sessionStorage.setItem("team2_" + matchid, team2);
    sessionStorage.setItem("seriesid_" + matchid, seriesid);
    
    clearInterval(this.timer);
    if(tabstatus==="tab2")
    {
      window.location.href =HBRout+ "/JoinContest/" + matchid;
    }

    if(tabstatus==="tab3")
    {
      window.location.href =HBRout+ "/JoinContest/" + matchid+"/"+1;
    }
    if(tabstatus==="tab1")
    {
      if(currentTimestamp > endtime){
        return
      }
      window.location.href =HBRout+ "/Contests/" + matchid;
      
    }
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  leftMenuOpen = () => {
    //leftmenuopenstatus
    let leftmenuopenclass = ((this.state.leftmenuopenstatus === false) ? " left-menu-open" : "");
    this.setState({
      leftmenuopenstatus: !this.state.leftmenuopenstatus,
      leftmenuopenclass: leftmenuopenclass
    });

  }

  onClickSlider = () => {
    let formthis = this;
    
    this.timerslider= setInterval(function () {
      // to stop slider on hover
      if(formthis.state.onHover === true){
        return
      }

      let slideimagenumber = parseInt(formthis.state.slideimagenumber);
      slideimagenumber = (formthis.state.itemslist && (slideimagenumber === (formthis.state.itemslist.length-1))) ? 0 : slideimagenumber + 1;

      let slideimageclass = {};
      slideimageclass[slideimagenumber] = "slidebuttonselected";
      formthis.setState({
        slideimages:((formthis.state.itemslist && formthis.state.itemslist[slideimagenumber])?formthis.state.itemslist[slideimagenumber].img:"") ,
        slideimagenumber: slideimagenumber,
        slideimageclass: slideimageclass
      });

    }, 4000);
  }

  onClickSliderOne = (e) => {
    let formthis = this;
    let onclickId = parseInt(e.target.id);
    let slideimageclass = {};
    slideimageclass[onclickId] = "slidebuttonselected";

    formthis.setState({
      slideimages: formthis.state.itemslist[onclickId].img,
      slideimagenumber: onclickId,
      slideimageclass: slideimageclass
    });
  }

  logout = (gresponse,kjj) => {
    
  }

  onClickActive=(e)=>{
    clearInterval(this.timerupcom);
    let formthis=this;
    var atype = "fixtures";
    this.listMatchesFront(upcomingmatchs[e.target.id].key);
    this.setState({tabstatus:e.target.id,matchlist:[]},()=>{
      if(formthis.state.tabstatus==="tab1")
      {
        atype = "fixtures";
        clearInterval(this.timerupcom);
        formthis.startTimer();
      } else if(formthis.state.tabstatus==="tab2"){
        atype = "live";
        clearInterval(this.timerupcom);
      } else if(formthis.state.tabstatus==="tab3"){
        atype = "results";
        clearInterval(this.timerupcom);
      }
      this.setState({ atype: atype },()=>{
        clearInterval(this.timerupcom);
      })
    });
  }

  onclickGame(e){
    clearInterval(this.timerupcom);
    let formthis=this;
    sessionStorage.setItem("gameid",e);
    this.setState({gameid:e,tabstatus:"tab1",matchlist:[]},()=>{
      formthis.listMatchesFront(upcomingmatchs["tab1"].key);
    });
  }

  onHoverSlider = ()=>{
    var formthis = this;
    formthis.setState({
      onHover : true
    })
  }

  onHoverOutSlider = ()=>{
    var formthis = this;
    formthis.setState({
      onHover : false
    })
  }

  getGameTypes = () => {
    this._isMounted = true;
    var formthis = this;
    if(formthis._isMounted){
      formthis.setState({
        isLoading: true
      });
    }
    
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/getgametype";

    formthis.setState({
      gameTypeList: []
    })

    fetch(apiUrl, object)
      .then(function (response) {
        if(formthis._isMounted){
          formthis.setState({
            isLoading: false
          });
        }
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({
                  gameTypeList: json.data
                })
              }

            }
            else {
              if(formthis._isMounted){
                formthis.setState({
                  gameTypeList: []
                })
              }
            }
          })
        }
      }).catch(error => {
        if(formthis._isMounted){
          formthis.setState({
            isLoading: false
          });
        }
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }

  getNotifications = () => {
    this._isMounted = true;
    var formthis = this;
    
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      
    }
    var api_url = `${config.API_URL}`;

    var apiUrl = "";
    apiUrl = api_url + "/frontapi/appsettings";

    formthis.setState({
      notificationData: {}
    })

    fetch(apiUrl, object)
      .then(function (response) {
        var chkresp = checkresponse("Wrong", response.status, response.message, 2);
        if (chkresp === true) {
          response.json().then(json => {
            if (json.error === false) {
              if(formthis._isMounted){
                formthis.setState({
                  notificationData: json.data
                })
              }

            }
            else {
              if(formthis._isMounted){
                formthis.setState({
                  notificationData: {}
                })
              }
            }
          })
        }
      }).catch(error => {
        checkresponse("Wrong", false, error.toString(), 0);
      });
  }
  componentWillUnmount() {
    this.state = {}
    clearInterval(this.timernotif);
    clearInterval(this.timerupcom);
    clearInterval(this.timerslider)
    this._isMounted = false;
    

  }

  render() {
    const formthis = this;
    const {
      error,
      hasMore,
      isLoading,
      matchlist,
    } = this.state;

    let PRODUCT_NAME = `${config.PRODUCT_NAME}`;
    var api_url = `${config.API_URL}`;
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

        {/* <LeftMenu /> */}
        <div className={(this.state.leftmenuopenstatus === true)?" leftnav_body":""} onClick={this.leftMenuOpen}>
        <div className={"menu_navleftpart" + this.state.leftmenuopenclass}>
          <div className="user_namnbg">
          <div className="userimgleod_ag"> <span className="cameraicon_minads"> 
                <img src={sessionStorage.getItem("profilepic")?sessionStorage.getItem("profilepic"):api_url+"/uploads/icons/dummy-user.png"} alt="icon" /> </span> 
                <span className="idusrimgv"> 
                  
                </span>  
                <span className="input_filedis">  </span>   
            </div> 
            <a href={HBRout+ "/MyProfile"}>{sessionStorage.getItem("username")}</a>
            <span className="close_iconnav menubtn" onClick={this.leftMenuOpen}><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
          </div>
          <div className="nav_listingptbilist">
            <ul>
              
              <li> <a href={HBRout+ "/MyMatches"}> <span className="m_profileicons"><img src={require("./../../images/navmatch.png")} alt="icon" /></span>  My Matches</a></li>
              <li> <a href={HBRout+ "/MyProfile"}> <span className="m_profileicons"><img src={require("./../../images/nav1.png")} alt="icon" /></span> My Profile</a></li>
              <li> <a href={HBRout+ "/MyAccount"}> <span className="m_profileicons"><img src={require("./../../images/nav2.png")} alt="icon" /></span>  My Account</a></li>
              <li> <a href={HBRout+ "/TransactionHistory"}> <span className="m_profileicons"><img src={require("./../../images/navtrans.png")} alt="icon" /></span>  Transaction History</a></li>
              <li> <a href={HBRout+ "/Refer"}> <span className="m_profileicons"><img src={require("./../../images/nav3.png")} alt="icon" /></span>  Refer Friends</a></li>
              <li> <a href={HBRout+ "/WithdrawlVerify"}> <span className="m_profileicons"><img src={require("./../../images/nav6.png")} alt="icon" /></span>  Verify</a></li>
              {/* <li> <a href={HBRout+ "/Notification"}> <span className="m_profileicons"><img src={require("./../../images/notification_icon.png")} alt="icon" /> { (formthis.state.notificationData && formthis.state.notificationData.unread_count > 0) ? <span className="notification_count"><i className="fa fa-certificate" aria-hidden="true"></i></span> : "" } </span>  Notification</a></li> */}
              <li> <a href={HBRout+ "/LiveScore"}> <span className="m_profileicons"><img src={require("./../../images/nav9.png")} alt="icon" /></span> 	 Live Score</a></li>
              <li> <a href={HBRout+ "/More"}> <span className="m_profileicons"><img src={require("./../../images/nav8.png")} alt="icon" /></span>  More</a></li>
              
              <li>
              <a href={HBRout+ "/login"}> <span className="m_profileicons">
              <img src={require("./../../images/navlog.png")} alt="icon" /></span>  Logout</a>
              {/* {(sessionStorage.getItem("logintype")==="G" || (sessionStorage.getItem("logintype")==="F") ? <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.logout}>
              </GoogleLogout> :  (<a href="/"> <span className="m_profileicons">
              <img src={require("./../../images/nav11.png")} alt="icon" /></span>  Logout</a>))
              } */}
              </li>

            </ul>
            <div className="app_storepart">
              <a className="btn btn_pre_cls andi_clas" href={(formthis.state.notificationData && formthis.state.notificationData.config) ? formthis.state.notificationData.config.mailconfig.android : "#"} target="_blank">
                <img src={require("./../../images/green-android.png")} />
                <span><span className="small">{PRODUCT_NAME} App</span> Android</span></a>
              <a className="btn btn_pre_cls" href={(formthis.state.notificationData && formthis.state.notificationData.config) ? formthis.state.notificationData.config.mailconfig.ios : "#"}>
                <img src={require("./../../images/ios.png")} />
                <span><span className="small">Download on the</span> App Store</span></a>
            </div>
          </div>
        </div>
        </div>


        <div className="left_logincontent home_leftptfix scroll-height">

          <div className="background-cover ng-scope">
            <div className="header_bg">

              <div className="hd_left">
                <button id="toggle" className="s_nav hd_nav menubtn pointer" onClick={this.leftMenuOpen} />

              </div>
              <div className="hd_center">
                Home
              </div>
              <div className="hd_right">
              {/* <a href={HBRout +"/MyAccount"} className="hd_wallet" /> */}
              <a className="notify-icon" href={HBRout +"/Notification"}> <span><i className="fa fa-bell fa-lg" aria-hidden="true"></i></span> { (formthis.state.notificationData && formthis.state.notificationData.unread_count > 0) ? <span className="notification_count"><i className="fa fa-certificate" aria-hidden="true"></i></span> : "" }</a>
              </div>
            </div>
            <div className="home_threetabspart">
              {/*Horizontal Tab*/}
              <div className="tab_area home_nttabsbox">
                <ul className="nav nav-pills">
                  { (formthis.state.gameTypeList && formthis.state.gameTypeList.length ) ? 
                      formthis.state.gameTypeList.map(function(item,index){
                        return(<li key={index} className={(formthis.state.gameid===item.id)?"active":""} onClick={()=>formthis.onclickGame(item.id)}>
                            <a data-toggle="tab">{(item.gname) ? unCamelCase(item.gname) : ""} 
                              <span className="img_iconssport">
                                <img src={item.icon} alt="image" />
                              </span>
                            </a>
                          </li>
                        )
                      })
                    : ""

                  }
                </ul>

                <div className="tab-content clearfix">
                  <div className="tab-pane active" id="menu1">
                    {/* Slider part start */}
                    <div className="ads_homebanner">
                      <div className="slider autoplay">
                        <div onMouseOver={()=>this.onHoverSlider()} onMouseOut={()=>this.onHoverOutSlider()}>
                          <div className="slickfirst_imgs"> {(formthis.state.slideimages)?<img src={formthis.state.slideimages} alt="image" />:null}
                            <li className="slick-dots">
                              {
                                formthis.state.itemslist.map(function(imgItem,indexImage){
                                  return(
                                      <button key={indexImage} id={indexImage} className={formthis.state.slideimageclass[indexImage]} onClick={formthis.onClickSliderOne}></button>
                                  )
                                })
                              }
                              
                              {/* <button id="1" className={formthis.state.slideimageclass[1]} onClick={this.onClickSliderOne}></button>
                              <button id="2" className={formthis.state.slideimageclass[2]} onClick={this.onClickSliderOne}></button> */}
                              </li>
                          </div>


                        </div>
                      </div>
                    </div>
                    {/* Slider part End */}
                    <div className="tab_area home_nttabsbox matchboxes_intels">
                      <ul className="nav nav-pills uprelive_tab">
                        <li className={(("tab1"===this.state.tabstatus)?"active":"")} ><span id="tab1" onClick={this.onClickActive} data-toggle="tab pointernone">{upcomingmatchs["tab1"].name} </span></li>
                        <li className={(("tab2"===this.state.tabstatus)?"active":"")} ><span id="tab2" onClick={this.onClickActive} data-toggle="tab pointernone">{upcomingmatchs["tab2"].name} </span></li>
                        <li className={(("tab3"===this.state.tabstatus)?"active":"")} ><span id="tab3" onClick={this.onClickActive} data-toggle="tab pointernone">{upcomingmatchs["tab3"].name} </span></li> 
                        {/* <li><a data-toggle="tab">Live </a></li>
                        <li><a data-toggle="tab">Results </a></li>           */}
                      </ul>
                      <div className="tab-content clearfix">
                        <div className={"tab-pane active"} id="match1">
                          <div className="main_matchesallover">
                            <ul className="almt_uplivex">
                              {
                                this.state.matchlist.map(function (itemmatch, index) {
                                  
                                  return (
                                    <li key={itemmatch.matchid} onClick={() => formthis.CreateTeam(itemmatch.matchid, itemmatch.mdategmt, itemmatch.team1, itemmatch.team2,formthis.state.tabstatus,itemmatch.seriesid)} className="pointer">
                                      <span className="match_series_name">{(itemmatch.seriesname) ? itemmatch.seriesname : ""}</span>
                                      {(!itemmatch.lineup) ? <span className="match_lineup">Line up out</span> : ""}
                                      <div className="mt_starnamen pointernone"><div className="fir_country pointernone">
                                       <div className="mtlogcont"> <img src={itemmatch.team1logo} alt="img" /> </div><strong className="contryname_tit pointernone">{itemmatch.team1}</strong> </div></div>
                                      <div className="details_mtover pointernone"><div className="teams_f_center_panel pointernone">
                                      {/* <p className="leage_ntname">{itemmatch.matchname}</p>  */}
                                      <p className="leage_ntname">{matchFormatTypes(itemmatch.mtype)}  </p>
                                      <p className="match-date">{ (itemmatch.mstatus !== "uc" && itemmatch.mstatus !== "li") ? timestampToDateString(itemmatch.mdategmt) : <strong className="vs_textpt pointernone">VS1</strong>}</p>
                                      
                                        {/* {(("tab2"===formthis.state.tabstatus)?(<span className="timebo_mtc">In progress</span>):(<span className="timebo_mtc">{((formthis.state.time[itemmatch.matchid].h<0)?"00h 00m 00s":""+formthis.state.time[itemmatch.matchid].h+"h " +formthis.state.time[itemmatch.matchid].m+"m " +formthis.state.time[itemmatch.matchid].s+"s")}  </span>)) } */}
                                        {(("tab1"==formthis.state.tabstatus)?(<span className="timebo_mtc">{((formthis.state.time[itemmatch.matchid].h<0)?"00h 00m 00s":""+formthis.state.time[itemmatch.matchid].h+"h " +formthis.state.time[itemmatch.matchid].m+"m " +formthis.state.time[itemmatch.matchid].s+"s")}  left</span>) :null) } 
                                        {/* {(("tab1"==formthis.state.tabstatus)?(<span className="timebo_mtc" id={'live_match_'+index}>{(formthis.state.idFullyLoaded === true) ? matchCountDown(itemmatch.mdategmt,'live_match_'+index) : ""}  </span>):null) } */}
                                        {(("tab2"==formthis.state.tabstatus)?(<span className="timebo_mtc">In progress</span>):null) }
                                        {(("tab3"==formthis.state.tabstatus)?(<span className="timebo_mtc" style={{color:statusColorCode(itemmatch.mstatus)}}>{matchStatusTypes(itemmatch.mstatus)}</span>):null) }
                                        </div></div>
                                      <div className="vs_contflenox pointernone"><div className="fir_country pointernone">
                                        <div className="mtlogcont"> <img src={itemmatch.team2logo} alt="img" /> </div> <strong className="contryname_tit pointernone">{itemmatch.team2}</strong> </div></div>
                                    </li>
                                  )
                                })
                              }
                              {
                               (("tab1" === this.state.tabstatus)?((this.state.matchlist && this.state.matchlist.length)?null:( <li>There is no match currently.</li>)):null)
                              }
                              {
                               (("tab2" === this.state.tabstatus)?((this.state.matchlist && this.state.matchlist.length)?null:( <li>No match live now. Please try with new fixtures.</li>)):null)
                              }
                              {
                               (("tab3" === this.state.tabstatus)?((this.state.matchlist && this.state.matchlist.length)?null:( <li>No result. Please try with new fixtures.</li>)):null)
                              }

                                <hr />
                                {error &&
                                  <li style={{ color: '#900' }}>
                                    {error}
                                  </li>
                                }
                                {isLoading &&
                                  <li>Loading...</li>
                                }

                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* end */}
                  
                  {/*------- end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Matches;
