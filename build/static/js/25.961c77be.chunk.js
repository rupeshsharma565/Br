(window.webpackJsonp=window.webpackJsonp||[]).push([[25,26,61],{199:function(e,t,a){"use strict";t.a={API_URL:"https://fancy11.com/fancy11/public",API_NODE_URL:"https://score.fancy11.com",HOST_URL:"https://play.fancy11.com",FB_APP_ID:"327645271254958",GOOGLE_CLIENT_ID:"388697308986-lmtr069vvg1robbl17k11j9q0nktepfv.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw.paytm.in/theia/processTransaction",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"Fancy11",PRODUCT_SHORT_NAME:"Fancy11",APK_URL:"https://fancy11.com/apk/fancy11.apk",MAIN_URL:"https://www.fancy11.com",REFER_FRIEND:"https://play.fancy11.com/#/Register",SUPPORT_EMAIL:"support@fancy11.com",SUPPORT_CONTACT_NO:"+919555317790",PROJECT_CODE:"1"}},212:function(e,t,a){"use strict";a.d(t,"a",function(){return o}),a.d(t,"g",function(){return u}),a.d(t,"c",function(){return d}),a.d(t,"B",function(){return h}),a.d(t,"d",function(){return p}),a.d(t,"s",function(){return g}),a.d(t,"w",function(){return f}),a.d(t,"y",function(){return v}),a.d(t,"k",function(){return y}),a.d(t,"t",function(){return E}),a.d(t,"u",function(){return b}),a.d(t,"A",function(){return _}),a.d(t,"o",function(){return w}),a.d(t,"j",function(){return k}),a.d(t,"e",function(){return N}),a.d(t,"r",function(){return P}),a.d(t,"i",function(){return S}),a.d(t,"m",function(){return C}),a.d(t,"n",function(){return R}),a.d(t,"v",function(){return A}),a.d(t,"z",function(){return O}),a.d(t,"q",function(){return B}),a.d(t,"p",function(){return T}),a.d(t,"l",function(){return I}),a.d(t,"f",function(){return D}),a.d(t,"b",function(){return F}),a.d(t,"x",function(){return x}),a.d(t,"h",function(){return L});var n=a(272),s=a.n(n),l=a(404),r=a.n(l),c=a(405),i=a.n(c),m=a(199),o=(a(406),"/#"),u=o+"/matches",d=function(e,t,a,n){if(401===t||403===t)return window.location.href=o+"/login";if(500===t)return"";if(1===n)s()({title:e,text:a,icon:"success",className:"swall-custom-class"});else if(0===n)s()({title:e+"!",text:a||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==n)return!0;s()({title:e+"!",text:a||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},h={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},p=function(e){var t=new Date(e),a=new Date;return new r.a(t,a).seconds()},g=function(e){var t=e%3600,a=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(a)}},f=function(e){if(e){var t=1e3*parseInt(e),a=new Date(t);return i()(a,"yyyy-mm-dd")}return""},v=function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+("0"+t.getMonth()).slice(-2)+"-"+("0"+t.getDate()).slice(-2)+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)},y=function(){window.history.back()},E=function(){window.location.href=o+"/home"},b=function(){return!!sessionStorage.getItem("jwt")},_={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},w={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},k=function(){return new Promise(function(e,t){var a="".concat(m.a.API_URL);fetch(a+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(t){t.json().then(function(t){var a=t.data.time,n=1e3*parseInt(a);e(n)})})})},N=function(e,t){var a=new Date(e),n=new Date(t);return new r.a(a,n).seconds()-0},P={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},S=function(e){var t="";if(e){var a=parseInt(e).toString(),n="";if(6!=a.length&&7!=a.length||(n=" Lac"),a.length>7&&(n=" Cr"),a.length>=6&&a.length<=8)if(a.length%2===0){var s=a.substring(0,2);t=parseInt(s)/10+n}else{var l=a.substring(0,3);t=parseInt(l)/10+n}else if(a.length>8){var r=a.substring(0,a.length-6);t=parseInt(r)/10+n}else t=a;return t}return t="0"},C=function(e){var t={t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&t[e]?t[e]:""},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?t[e]:t},A={tax:"31.2",amount:"10,000"},O=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},B={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},T="display: block;margin: 0 auto;border-color: red;",I="#ea4c89",D=parseInt(Date.now()/1e3),F=30,x=function(e){var t=1e3*parseInt(e);return new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},L={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}}},403:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",function(){return n})},440:function(e,t,a){e.exports=a.p+"static/media/trophy.9d2ed750.png"},606:function(e,t,a){"use strict";a.r(t);var n=a(403),s=a(63),l=a(64),r=a(66),c=a(65),i=a(67),m=a(62),o=a(0),u=a.n(o),d=a(212),h=a(199),p=a(274),g=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this,e))).onClickActive=function(e){a.setState({tabstatus:e.target.id,teamselected:e.target.innerHTML}),"tab1"==e.target.id?a.setState({team_key:"a",opponent_team_key:"b"}):a.setState({team_key:"b",opponent_team_key:"a"})},a.getPlayerScore=function(){var e=Object(m.a)(Object(m.a)(a));e.setState({isLoading:!0});var t=a.props.match.params.matchid,n="".concat(h.a.API_URL);fetch(n+"/getmatchdata?matchid="+t+"&responsetype=fullscore",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(t){e.setState({isLoading:!1}),!0===Object(d.c)("Wrong",t.status,t.message,2)&&t.json().then(function(t){t.error||e.setState({match:t.data.match,team1name:t.data.inningsdetail.team_a.full_name,team2name:t.data.inningsdetail.team_b.full_name,teamselected:t.data.inningsdetail.team_a.full_name,matchtype:t.data.type,matchstatus:t.data.status,inningsdetail:t.data.inningsdetail,results:t.data,innings:t.data.innings})})}).catch(function(t){e.setState({isLoading:!1})})};var n=a.props.location.pathname.split("/",2);return a.state={tabstatus:"tab1",team1name:"",team2name:"",teamselected:"",results:{},match:{},teamAInningCount:{},teamBInningCount:{},team_key:"a",opponent_team_key:"b",innings:{},secondUrlIndex:n[1],isLoading:!1},Object(d.u)(),a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){Object(d.u)(),this.getPlayerScore()}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"fadeIn"},u.a.createElement("div",{className:"loaderdiv"+(!0===this.state.isLoading?"":" hidden")},u.a.createElement(p.ClipLoader,{css:d.p,sizeUnit:"px",size:60,color:d.l,loading:this.state.isLoading})),u.a.createElement("div",{className:"left_logincontent profilepadding0"},u.a.createElement("div",{className:"background-cover ng-scope"},u.a.createElement("div",{className:"header_bg"+("fullscorecardmb"===this.state.secondUrlIndex?" hidden":"")},u.a.createElement("div",{className:"hd_left"},u.a.createElement("span",{onClick:d.k,className:"hd_back"}),u.a.createElement("span",{onClick:d.t,className:"hd_home"})),u.a.createElement("div",{className:"hd_center"},"Full Scorecard")),u.a.createElement("div",{className:"fullscore_cardmainpage"},u.a.createElement("div",{className:"jointhe_leadge"},u.a.createElement("p",null," ",u.a.createElement("span",{className:"trophy_iconjoin"},u.a.createElement("img",{src:a(440),alt:"image"}))," Join the league by selecting your favourite 7 players from the match and earn money.")),u.a.createElement("div",{className:"full_scorddiffetbox"},u.a.createElement("div",{className:"live_scmaininnerbox"},u.a.createElement("div",{className:"ltest_divbox"}," ",u.a.createElement("h5",null,this.state.matchtype?Object(d.m)(this.state.matchtype):"")),this.state.inningsdetail?u.a.createElement("div",{className:"live_teamscore"},u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement("div",{className:"teamvs_icon"},u.a.createElement("img",{src:this.state.inningsdetail.team_a.logo,alt:"image"})),u.a.createElement("div",{className:"teamvs_name"}," ",u.a.createElement("span",{className:"teamname_dinamic"}," ",this.state.team1name?this.state.team1name:""," ")),u.a.createElement("span",null,this.state.match&&this.state.inningsdetail.a&&this.state.inningsdetail.a[1]?u.a.createElement("span",null," (",this.state.inningsdetail.a[1],")"):"(0)")),u.a.createElement("li",null,u.a.createElement("div",{className:"teamvs_icon"},u.a.createElement("img",{src:this.state.inningsdetail.team_b.logo,alt:"image"})),u.a.createElement("div",{className:"teamvs_name"}," ",u.a.createElement("span",{className:"teamname_dinamic"}," ",this.state.team2name?this.state.team2name:""," ")),u.a.createElement("span",null,this.state.match&&this.state.inningsdetail.b&&this.state.inningsdetail.b[1]?u.a.createElement("span",null," (",this.state.inningsdetail.b[1],")"):"(0)")))):"","completed"==this.state.results.status?u.a.createElement("p",null,this.state.results.msg_info?this.state.results.msg_info.completed:this.state.results.msg_info.info):"",u.a.createElement("span",Object(n.a)({className:"plaustatus_box"},"className","matchliver_status"),this.state.matchstatus))),u.a.createElement("div",{className:"full_scorebgstatusmain"},u.a.createElement("h4",null,"Full Scorecard")),u.a.createElement("div",{className:"tab_area home_nttabsbox matchboxes_intels"},u.a.createElement("ul",{className:"nav nav-pills"},u.a.createElement("li",{className:"tab1"===this.state.tabstatus?"active":""},u.a.createElement("a",{id:"tab1",onClick:this.onClickActive,"data-toggle":"tab pointernone"},this.state.team1name," ")),u.a.createElement("li",{className:"tab2"===this.state.tabstatus?"active":""},u.a.createElement("a",{id:"tab2",onClick:this.onClickActive,"data-toggle":"tab pointernone"},this.state.team2name," "))),u.a.createElement("div",{className:"tab-content clearfix"},u.a.createElement("div",{className:"tab-pane active",id:"match1"},u.a.createElement("div",{className:"main_matchesallover"},u.a.createElement("ul",null,this.state.inningsdetail&&this.state.inningsdetail[this.state.team_key]?u.a.createElement("li",null,u.a.createElement("div",{className:"inning-card-header"},u.a.createElement("span",{className:""},this.state.teamselected),u.a.createElement("span",{className:"pull-right"},"(",this.state.inningsdetail[this.state.team_key]&&this.state.inningsdetail[this.state.team_key][1]?this.state.inningsdetail[this.state.team_key][1]:0,")")),u.a.createElement("div",{className:"full_scorealldetatable"},u.a.createElement("div",{className:"table-responsive batting-div"},u.a.createElement("table",{className:"table table-hovered batting-table"},u.a.createElement("thead",null,u.a.createElement("tr",{className:"td-bg-gray"},u.a.createElement("th",null," Player"),u.a.createElement("th",null," Raid"),u.a.createElement("th",null," Tackle"),u.a.createElement("th",null," Bonus"),u.a.createElement("th",null," Total"))),u.a.createElement("tbody",null,this.state.match&&this.state.match.teams?this.state.match.teams[this.state.team_key].match.starters.concat(this.state.match.teams[this.state.team_key].match.bench).map(function(t,a){return u.a.createElement("tr",{key:a},u.a.createElement("td",null," ",e.state.match.players[t].name," ",!0===e.state.match.players[t].match.captain?"(c)":""," "),u.a.createElement("td",null," ",e.state.match.players[t].match.points?e.state.match.players[t].match.points.raid_points.touch:0," "),u.a.createElement("td",null," ",e.state.match.players[t].match.points?e.state.match.players[t].match.points.tackle_points.tackle:0," "),u.a.createElement("td",null," ",e.state.match.players[t].match.points?e.state.match.players[t].match.points.tackle_points.bonus+e.state.match.players[t].match.points.raid_points.bonus:0," "),u.a.createElement("td",null," ",e.state.match.players[t].match.points?e.state.match.players[t].match.points.total:0," "))}):"")))),u.a.createElement("br",null)):""))))),u.a.createElement("br",null),0!==Object.entries(this.state.match).length?u.a.createElement("div",{className:"match-info-block"},u.a.createElement("div",{className:"inning-card-header"},"Match Info"),u.a.createElement("div",{className:"full_scorealldetatable"},u.a.createElement("div",{className:"table-responsive match-div"},u.a.createElement("table",{className:"table table-hovered match-table"},u.a.createElement("tbody",null,u.a.createElement("tr",null,u.a.createElement("td",null,"Match"),u.a.createElement("td",null,this.state.match.name?this.state.match.name:"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Date"),u.a.createElement("td",null,this.state.match.start_date?this.state.match.start_date.str:"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Toss"),u.a.createElement("td",null,this.state.match.toss?this.state.match.toss.str:"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Venue"),u.a.createElement("td",null,this.state.match.venue?this.state.match.venue.name:"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Round"),u.a.createElement("td",null,this.state.match.round?this.state.match.round.name:"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Group"),u.a.createElement("td",null,this.state.match.group?this.state.match.group.name:"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Season"),u.a.createElement("td",null,this.state.match.season?this.state.match.season.name:"")),u.a.createElement("tr",null,u.a.createElement("td",{colSpan:"2"},this.state.inningsdetail&&this.state.inningsdetail.team_a.full_name?this.state.inningsdetail.team_a.full_name:""," Squad")),u.a.createElement("tr",null,u.a.createElement("td",null,"Starters"),u.a.createElement("td",null,this.state.match.teams&&this.state.match.teams.a?e.state.match.teams.a.match.starters.map(function(t,a){var n=0===a?"":", ";return u.a.createElement("span",{key:a},n+e.state.match.players[t].name,!0===e.state.match.players[t].match.captain?"(c)":"")}):"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Bench"),u.a.createElement("td",null,this.state.match.teams&&this.state.match.teams.a?e.state.match.teams.a.match.bench.map(function(t,a){var n=0===a?"":", ";return u.a.createElement("span",{key:a},n+e.state.match.players[t].name,!0===e.state.match.players[t].match.captain?"(c)":"")}):"")),u.a.createElement("tr",null,u.a.createElement("td",{colSpan:"2"},this.state.inningsdetail&&this.state.inningsdetail.team_b.full_name?this.state.inningsdetail.team_b.full_name:""," Squad")),u.a.createElement("tr",null,u.a.createElement("td",null,"Starters"),u.a.createElement("td",null,this.state.match.teams&&this.state.match.teams.b?e.state.match.teams.b.match.starters.map(function(t,a){var n=0===a?"":", ";return u.a.createElement("span",{key:a},n+e.state.match.players[t].name,!0===e.state.match.players[t].match.captain?"(c)":"")}):"")),u.a.createElement("tr",null,u.a.createElement("td",null,"Bench"),u.a.createElement("td",null,this.state.match.teams&&this.state.match.teams.b?e.state.match.teams.b.match.bench.map(function(t,a){var n=0===a?"":", ";return u.a.createElement("span",{key:a},n+e.state.match.players[t].name,!0===e.state.match.players[t].match.captain?"(c)":"")}):""))))))):""))))}}]),t}(o.Component);t.default=g}}]);
//# sourceMappingURL=25.961c77be.chunk.js.map