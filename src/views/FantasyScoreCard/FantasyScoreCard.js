import React, { Component } from 'react';
import config from './../../config';
import { goBack,sendHome,checkresponse ,sessioncheck, overrideLoaderCss, loaderColorCode, playerPointKeyConst} from './../../Comman';
import { ClipLoader } from 'react-spinners';

class FantasyScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabstatus:"tab1",
      teammatchlist:[],
      playrole:{"batting":{name:"Batting"},"bowling":{name:"Bowling"},"fielding":{name:"Fielding"}},
      team1name:"",
      team2name:"",
      teamselected:"",
      fantasypoints:{},
      isLoading: false,
      fantasyPointsConst:playerPointKeyConst[this.props.match.params.gameid] ? playerPointKeyConst[this.props.match.params.gameid] : {}
    };    
    sessioncheck();
  }

  componentDidMount() {    
    sessioncheck();
    this.readFileScore();
    // this.getPlayerScore();
    // this.getGlobalPoints();
  }

  readFileScore=()=>{
    var matchid = this.props.match.params.matchid;
    let formthis=this;
    formthis.setState({
      isLoading: true
    });
    var fantasyPointsConst = this.state.fantasyPointsConst;
    try{
          
          let API_NODE_URL=`${config.API_NODE_URL}`;
          var reqapi = "";
          if(this.props.match.params.gameid === "1"){
            delete fantasyPointsConst.sr;
            delete fantasyPointsConst.er;
            this.setState({
              fantasyPointsConst : fantasyPointsConst
            })
            // cricket
            reqapi =API_NODE_URL+"/getPlayerpoints?matchid="+matchid;
          } else if(this.props.match.params.gameid === "2"){
            // kabaddi
            reqapi =API_NODE_URL+"/getPlayerpoints/football?matchid="+matchid;
          } else if(this.props.match.params.gameid === "3"){
            // kabaddi
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
                  formthis.setState({fantasypoints:json.data,
                  team1:(json.teamname)?json.teamname.team1:"",
                  team2:(json.teamname)?json.teamname.team2:"",
                  matchStatus:(json.matchStatus)?json.matchStatus:""
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
  

  onClickActive=(e)=>{
    this.setState({
      tabstatus:e.target.id,
      teamselected:e.target.innerHTML
    });
  }

  render() {
    let checkMobile=(this.props.location.pathname.indexOf("fantscorcrd"));
    let showheader=(checkMobile<0)?false:true;
    const formthis = this;
    var matchData = [];
    let file = require("./../../images/1034809.json");
    
    var matchid = this.props.match.params.matchid;
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
          <div className={"header_bg"+ ((showheader===true)?" hidden":"")}>
            <div className="hd_left"> 
              <span onClick={goBack} className="hd_back" /> 
              <span onClick={sendHome} className="hd_home" />
            </div>
            <div className="hd_center">Fantasy Score Card</div>
          </div>
         

             <div className="ajx_edpatt ajteamvs_namesfix">
          <div className="brh_main">
            <div className="leftbrh_pts"><h4>{this.state.team1} <span className="nrntes_span">{this.state.team2}</span></h4></div>
            <div className="inpro_cessing"><a>{this.state.matchStatus}</a> </div>
          </div>	
        </div>
        {/*---- table part start ------*/}	
        <div className="fant_scorebtables score_scrolltablesnew">
          <div className="table-responsive">
            <table className="table table-bordered table-fixed">
              <thead className="score_tablehead_card">
                <tr>
                  {
                    (Object.keys(this.state.fantasyPointsConst)).map(function(item,index){
                      
                      matchData[index] = item; 
                      return(
                        <td key={index}> {(formthis.state.fantasyPointsConst[item]) ? formthis.state.fantasyPointsConst[item] : "0"} </td>
                      )})
                  }
                </tr>
              </thead>
              <tbody>
                {
                  (this.state.fantasypoints) ?
          (Object.values(this.state.fantasypoints)).map(function(itemPoints,indexPoints){
            return(
                    <tr key={indexPoints}>
                      {
                        (matchData).map(function(itme2,index2){
                          return (
                            <td key={index2}> {(itemPoints[itme2]) ? itemPoints[itme2] : "0"} </td>
                          )
                        })
                      }
                    </tr>
                 )}) : <tr>
                   <td colSpan="10" className="text-center">No record found</td>
                 </tr>
                 }
                
              </tbody>
            </table>	
          </div>	
        </div>


        </div>
      </div>	
    </div>
    );
  }
}

export default FantasyScoreCard;
