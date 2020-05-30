import React, { Component } from 'react';
import config from './../../config';
import { getCurrentTime, converttosecondnew, checkresponse, converttosecond, secondsToTime, sessioncheck, goBack, sendHome, mymatchs, HBRout, overrideLoaderCss, loaderColorCode, matchFormatTypes,unCamelCase,upcomingmatchs, timestampToDateString } from './../../Comman';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

var pushtime = {};
var pushseconds = {};
let scurrenttimestamp = 0;
// let interval;

//const Example = () => <UncontrolledCarousel items={itemslist} />;


class MyMatches extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      matchlist: [],
      time: {},
      seconds: {},
      leftmenuopenclass: "",
      slideimages: require("./../../images/home-banner01.jpg"),
      slideimagenumber: 0,
      slideimageclass: { 0: "slidebuttonselected" },
      tabstatus: "tab1",
      loading: false,
      gameTypeList:[],
      gameid:"1",
      error: false,
      hasMore: true,
      isLoading: false,
      page:1,
      atype:"fixtures"
    };
    sessioncheck();
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.onclickGame = this.onclickGame.bind(this);
    window.addEventListener('scroll', this.scrollMore, true);

  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted){
      sessioncheck();
      this.setState({ loading: true });
      let gameid=(sessionStorage.getItem("gameid"))?sessionStorage.getItem("gameid"):"1";
      sessionStorage.setItem("gameid",gameid);
      getCurrentTime().then(resultTimestamp => {
        scurrenttimestamp = resultTimestamp
        this.listMatchesFront(mymatchs["tab1"].key);
      })
      this.getGameTypes();
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

  startTimer = () => {
    this._isMounted = true;
    let formthis = this;
    this.interval = setInterval(function () {
      scurrenttimestamp = scurrenttimestamp + 1000;
      formthis.state.matchlist.map(function (itemseconds, index) {
        let intdate = parseInt(itemseconds["mdategmt"]) * 1000;
        let ssecond = converttosecondnew(intdate, scurrenttimestamp);
        let timeLeftVar = secondsToTime(ssecond);
        pushseconds[itemseconds["matchid"]] = ssecond;
        pushtime[itemseconds["matchid"]] = timeLeftVar;
      }, () => {
      })
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
    formthis.setState({ isLoading: true });
    let args1 = {};
    args1 = {
      atype: atype,//"fixtures",
      gameid: sessionStorage.getItem("gameid"),
      page: (page_no && page_no > 1) ? page_no : 1
    }
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
    apiUrl = api_url + "/frontapi/mymatches";

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
            if(formthis._isMounted){
              formthis.setState({ loading: false });
            }
            if (json.error === false) {
              json.data.map(function (itemseconds, index) {

                let intdate = parseInt(itemseconds["mdategmt"]) * 1000;
                let dd = new Date(intdate);
                let ssecond = converttosecond(dd);
                let timeLeftVar = secondsToTime(ssecond);
                pushseconds[itemseconds["matchid"]] = ssecond;
                pushtime[itemseconds["matchid"]] = timeLeftVar;
              })

              if (json && json.data && json.data.length > 0) {
                clearInterval(formthis.interval);
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
              if(formthis._isMounted){
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

  CreateTeam = (matchid, endtime, team1, team2, tabstatus) => {
    sessionStorage.setItem("endtime_" + matchid, endtime);
    sessionStorage.setItem("team1_" + matchid, team1);
    sessionStorage.setItem("team2_" + matchid, team2);
    //window.location.href =HBRout+ "/JoinContest/" + matchid;

    if (tabstatus === "tab2") {
      window.location.href = HBRout + "/JoinContest/" + matchid;
    }

    if (tabstatus === "tab3") {
      window.location.href = HBRout + "/JoinContest/" + matchid + "/" + 1;
    }
    if (tabstatus === "tab1") {
      window.location.href = HBRout + "/Contests/" + matchid;
    }
  }

  onClickActive = (e) => {
    let formthis=this;
    var atype = "fixtures";
    this.listMatchesFront(mymatchs[e.target.id].key);
    this.setState({ tabstatus: e.target.id,matchlist:[] },()=>{
      if(formthis.state.tabstatus==="tab1")
      {
        atype = "fixtures";
        clearInterval(formthis.interval);
        formthis.startTimer();
      } else if(formthis.state.tabstatus==="tab2"){
        atype = "live";
        clearInterval(formthis.interval);
      } else if(formthis.state.tabstatus==="tab3"){
        atype = "results";
        clearInterval(formthis.interval);
      }
      this.setState({ atype: atype })
    });
  }
  onclickGame(e){
    let formthis=this;
    sessionStorage.setItem("gameid",e);
    this.setState({gameid:e,tabstatus:"tab1",matchlist:[]},()=>{
      formthis.listMatchesFront(mymatchs["tab1"].key);
    });
  }

  getGameTypes = () => {
    this._isMounted = true;
    var formthis = this;
    if(this._isMounted){
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

    if(formthis._isMounted){
      formthis.setState({
        gameTypeList: []
      })
    }

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
  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.interval);
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
    return (

      <div className="fadeIn">
        {/* <LeftMenu /> */}

        <div className={"loaderdiv" + ((this.state.loading === true) ? "" : " hidden")}>
          <ClipLoader
            css={overrideLoaderCss}
            sizeUnit={"px"}
            size={60}
            color={loaderColorCode}
            loading={this.state.loading}
          />
        </div>

        <div className="left_logincontent home_leftptfix scroll-height">

          <div className="background-cover ng-scope">
            <div className="header_bg">

              <div className="hd_left">
                <span onClick={goBack} className="hd_back" />
                <span onClick={sendHome} className="hd_home" />
              </div>
              <div className="hd_center">
                My Matches
              </div>
              {/* <div className="hd_right"><a className="hd_notification" style={{}} />

              </div> */}
                <div className="hd_right">
              <a href={HBRout +"/MyAccount"} className="hd_wallet" />
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

                    {/* Slider part End */}
                    <div className="tab_area home_nttabsbox matchboxes_intels">
                      <ul className="nav nav-pills">
                        <li className={(("tab1" === this.state.tabstatus) ? "active" : "")} ><a id="tab1" onClick={this.onClickActive} data-toggle="tab pointernone">{mymatchs["tab1"].name} </a></li>
                        <li className={(("tab2" === this.state.tabstatus) ? "active" : "")} ><a id="tab2" onClick={this.onClickActive} data-toggle="tab pointernone">{mymatchs["tab2"].name} </a></li>
                        <li className={(("tab3" === this.state.tabstatus) ? "active" : "")} ><a id="tab3" onClick={this.onClickActive} data-toggle="tab pointernone">{mymatchs["tab3"].name} </a></li>
                        {/* <li><a href="#match2" data-toggle="tab">Live </a></li>
                        <li><a href="#match3" data-toggle="tab">Results </a></li>           */}
                      </ul>
                      <div className="tab-content clearfix">
                        <div className="tab-pane active" id="match1">
                          <div className="main_matchesallover">
                            <ul>
                              {
                                this.state.matchlist.map(function (itemmatch, index) {
                                  return (
                                    <li key={index} onClick={() => formthis.CreateTeam(itemmatch.matchid, itemmatch.mdategmt, itemmatch.team1, itemmatch.team2, formthis.state.tabstatus)} className="pointer">
                                      <span className="match_series_name">{(itemmatch.seriesname) ? itemmatch.seriesname : ""}</span>
                                      <div className="mt_starnamen pointernone"><div className="fir_country pointernone">
                                        <img src={itemmatch.team1logo} alt="img" /> <strong className="contryname_tit pointernone">{itemmatch.team1}</strong> </div></div>
                                      <div className="details_mtover pointernone"><div className="teams_f_center_panel pointernone"><p className="leage_ntname">{matchFormatTypes(itemmatch.mtype)}</p> 
                                      {/* <strong className="vs_textpt pointernone">VS</strong> */}
                                      <p className="match-date">{ (itemmatch.mstatus !== "uc" && itemmatch.mstatus !== "li") ? timestampToDateString(itemmatch.mdategmt) : <strong className="vs_textpt pointernone">VS</strong>}</p>
                                        {(("tab1" === formthis.state.tabstatus) ? (<span className="timebo_mtc">{((formthis.state.time[itemmatch.matchid].h < 0) ? "00h 00m 00s" : "" + formthis.state.time[itemmatch.matchid].h + "h " + formthis.state.time[itemmatch.matchid].m + "m " + formthis.state.time[itemmatch.matchid].s + "s")}  </span>) : null)}
                                        {(("tab2" === formthis.state.tabstatus) ? (<span className="timebo_mtc">In progress</span>) : null)}
                                        {(("tab3" === formthis.state.tabstatus) ? (<span className="timebo_mtc">Completed</span>) : null)}
                                      </div></div>
                                      <div className="vs_contflenox pointernone"><div className="fir_country pointernone">
                                        <img src={itemmatch.team2logo} alt="img" /> <strong className="contryname_tit pointernone">{itemmatch.team2}</strong> </div></div>
                                    </li>
                                  )
                                })
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

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyMatches;
