import React, { Component } from 'react';
import {
  Col, Row
} from 'reactstrap';
import config from './../../config';
import {goBack,sendHome, checkresponse,sessioncheck ,HBRout,overrideLoaderCss,loaderColorCode,securityCall} from './../../Comman';
import { AvForm } from 'availity-reactstrap-validation';
import { ClipLoader } from 'react-spinners';

let swindow=window;
securityCall(swindow);

class MyTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getaddedplayeritems: [],
      userteamcount: 0,
      teamview: 0,
      teamcountfixed:6,
      userteam:[],
      playertypelist:[],
      arrayplayertype:{},
      checkplayerlist:[],
      isLoading :false
    };
    sessioncheck();
    this.closeModel=this.closeModel.bind();
  }

  componentDidMount() {    
    sessioncheck();
    this.getUserTeam();
    this.getPlayerType();
    
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
    if(this.state.userteamcount<this.state.teamcountfixed)
    {
      let matchid = this.props.match.params.matchid;
      window.location.href =HBRout+ '/CreateTeams/' + matchid;
    }
    else
    {
      checkresponse("Warning", false, "Your limit is "+this.state.teamcountfixed+" team to create", 3);
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
    formthis.setState({
      getaddedplayeritems: []
    })
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
              let arrayplayertype={};
              json.data.list.map(function(item,index){
                arrayplayertype[item.id]=item;
              })
              
              formthis.setState({
                teamcountfixed:json.data.maxteam,
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

  onClickEdit=(teamid)=>{
    let matchid = this.props.match.params.matchid;
    window.location.href =HBRout+ '/UpdateTeams/' + matchid+'/'+teamid;
    //this.setState({teamview:1});
    //this.getTeamDetail(teamid);
  }

  onClickClone=(teamid)=>{
    if(this.state.userteamcount<this.state.teamcountfixed)
    {
      let matchid = this.props.match.params.matchid;
      window.location.href =HBRout+ '/CloneTeam/' + matchid+'/'+teamid;
    }
    else
    {
      checkresponse("Warning", false, "Your limit is "+this.state.teamcountfixed+" team to create", 3);
    }

  }

  goBack=()=>{
    window.history.back();
  }

  sendHome= () => {
    window.location.href =HBRout+ '/Home';
  }

  closeModel=()=>{
    this.setState({teamview:0})
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
        <AvForm >
          <div className="left_logincontent profilepadding0">
            <div className={"background-cover ng-scope" + ((formthis.state.displaynext === 0) ? "" : " hidden")}>
              <a className={"all_transaction up_bt "} > CONTINUE </a>
            </div>

            <div className={"background-cover ng-scope" + ((formthis.state.displaynext === 0) ? " hidden" : "")}>
              <div className="header_bg">
                <div className="hd_left">
                  <span onClick={goBack} className="hd_back"></span>
                  <span onClick={sendHome} className="hd_home"></span>
                </div>
                <div className="hd_center"><div className="timer_3d48d">My Teams</div></div>
              </div>
             



                <div className="dress_area">
                <h3>You can create up to {formthis.state.teamcountfixed} teams for a single contest</h3>

                {
                  formthis.state.userteam.map(function (item, index) {
                    return (
                      <div className={"caption_ctamod pointer"} key={item.id}>
                        <h3><span className="intem_all pointern">
                        </span> {"Team: " + (index + 1)}</h3>
                        <div className="bdo_topends pointernone">
                          <div className="bdo_topendsright pointernone">	<p>Captain <span className="cpname_ecss pointernone">{item.cap}</span></p> </div>
                          <div className="bdo_topendsleft pointernone">	<p>Vice Captain <span className="cpname_ecss pointernone">{item.vcap}</span></p> </div>
                        </div>
                        <div className="edpri_clos">
                         
                          <Row>
                            <Col>
                            <a className="edoxed01" id={item.id} onClick={() => formthis.onClickEdit(item.id)}><i className="fa fa-pencil pointernone"></i> EDIT </a>
                            </Col>
                            <Col>
                            <a className="edoxed01" id={item.id} onClick={() => formthis.onClickPreviw(item.id)}><i className="fa fa-eye pointernone"></i> PREVIEW </a>
                            </Col>
                            <Col>
                            <a className="edoxed01" id={item.id} onClick={() => formthis.onClickClone(item.id)}><i className="fa fa-copy pointernone"></i> CLONE </a>
                            </Col>
                            </Row>
                         
                        </div>
                      </div>
                    )
                  })}

              </div>













{((formthis.state.userteamcount===formthis.state.teamcountfixed)?null:(
 <div className="teamjoint_contestend">
 <a className="mytems_ategbox" onClick={this.onClickCreateTeam}>{((formthis.state.userteamcount===formthis.state.teamcountfixed)?""+formthis.state.teamcountfixed+" TEAM CREATED":"CREATE TEAM")}{((formthis.state.userteamcount===formthis.state.teamcountfixed)?"":("("+ (formthis.state.userteamcount + 1)+")"))}</a>
 <a href={HBRout + "/JoinContest/" + matchid} className="joiendctox_ategbox">Joined Contests <span className="myteam_dinivalue"></span></a>
</div>
))}
              
              
            </div>

          </div>
        </AvForm>

        
        <div className={"teampreview" + ((formthis.state.teamview === 0) ? " hidden" : "")}>
			<div className="teampreviewclosebtn" onClick={formthis.closeModel}> X </div>
          <div className={ "innercontent " + (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="2" ? "football-ground-image " : "") + (sessionStorage.getItem('gameid') && sessionStorage.getItem("gameid")==="3" ? "kabaddi-ground-image " : "") + "" }>
          <div className="miniextra_groundbd"> 
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
      </div>
    );
  }
}

export default MyTeams;
