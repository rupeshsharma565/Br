(window.webpackJsonp=window.webpackJsonp||[]).push([[20,26,54],{200:function(e,t,a){"use strict";t.a={API_URL:"https://11plays.com/11plays/public",API_NODE_URL:"https://score.11plays.com",HOST_URL:"https://play.11plays.com",APK_URL:"https://11plays.com/apk/11play.apk",MAIN_URL:"https://play.11plays.com",REFER_FRIEND:"https://play.11plays.com/#/Register",FB_APP_ID:"1829567023847369",GOOGLE_CLIENT_ID:"1069443540619-eilha28gu288dgforh0psrn7qefgmocc.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw-stage.paytm.in/theia/processTransaction",RAZORPAY_KEY:"rzp_test_WTwazc7mLkdycg",SUPPORT_EMAIL:"support@11plays.com",SUPPORT_CONTACT_NO:"+91 8327302001",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"11Plays",PRODUCT_SHORT_NAME:"11Plays",PROJECT_CODE:"1",IS_PRIVATE_CONT:!0,IS_RAZORPAY:!0}},212:function(e,t,a){"use strict";a.d(t,"a",function(){return d}),a.d(t,"g",function(){return m}),a.d(t,"c",function(){return p}),a.d(t,"F",function(){return h}),a.d(t,"d",function(){return f}),a.d(t,"t",function(){return y}),a.d(t,"z",function(){return v}),a.d(t,"B",function(){return g}),a.d(t,"k",function(){return w}),a.d(t,"v",function(){return b}),a.d(t,"w",function(){return P}),a.d(t,"E",function(){return k}),a.d(t,"o",function(){return I}),a.d(t,"j",function(){return O}),a.d(t,"e",function(){return E}),a.d(t,"r",function(){return T}),a.d(t,"i",function(){return S}),a.d(t,"m",function(){return _}),a.d(t,"n",function(){return A}),a.d(t,"y",function(){return C}),a.d(t,"D",function(){return R}),a.d(t,"q",function(){return N}),a.d(t,"p",function(){return x}),a.d(t,"l",function(){return B}),a.d(t,"f",function(){return F}),a.d(t,"b",function(){return L}),a.d(t,"A",function(){return D}),a.d(t,"h",function(){return M}),a.d(t,"s",function(){return j}),a.d(t,"C",function(){return U}),a.d(t,"x",function(){return z}),a.d(t,"u",function(){return G});var n=a(272),s=a.n(n),r=a(406),o=a.n(r),c=a(407),l=a.n(c),i=a(200),u=(a(408),a(405)),d=(a(404),"/#"),m=d+"/matches",p=function(e,t,a,n){if(401===t||403===t)return window.location.href=d+"/login";if(500===t)return"";if(1===n)s()({title:e,text:a,icon:"success",className:"swall-custom-class"});else if(0===n)s()({title:e+"!",text:a||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==n)return!0;s()({title:e+"!",text:a||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},h={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},f=function(e){var t=new Date(e),a=new Date;return new o.a(t,a).seconds()},y=function(e){var t=e%3600,a=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(a)}},v=function(e){if(e){var t=1e3*parseInt(e),a=new Date(t);return l()(a,"yyyy-mm-dd")}return""},g=function(e){var t=new Date(1e3*e),a=t.getMonth();return a+=1,t.getFullYear()+"-"+("0"+a).slice(-2)+"-"+("0"+t.getDate()).slice(-2)+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)},w=function(){window.history.back()},b=function(){window.location.href=d+"/home"},P=function(){return!!sessionStorage.getItem("jwt")},k={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},I={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},O=function(){return new Promise(function(e,t){var a="".concat(i.a.API_URL);fetch(a+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(t){t.json().then(function(t){var a=t.data.time,n=1e3*parseInt(a);e(n)})})})},E=function(e,t){var a=new Date(e),n=new Date(t);return new o.a(a,n).seconds()-0},T={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},S=function(e){var t="";if(e){var a=parseInt(e).toString(),n="";if(6!=a.length&&7!=a.length||(n=" Lac"),a.length>7&&(n=" Cr"),a.length>=6&&a.length<=8)if(a.length%2===0){var s=a.substring(0,2);t=parseInt(s)/10+n}else{var r=a.substring(0,3);t=parseInt(r)/10+n}else if(a.length>8){var o=a.substring(0,a.length-6);t=parseInt(o)/10+n}else t=a;return t}return t="0"},_=function(e){var t={t10:"T10",t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&t[e]?t[e]:""},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?t[e]:t},C={tax:"31.2",amount:"10,000"},R=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},N={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",thrower:"Thrower",catcher:"Catcher",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},x="display: block;margin: 0 auto;border-color: red;",B="#ea4c89",F=parseInt(Date.now()/1e3),L=30,D=function(e){var t=1e3*parseInt(e);return new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},M={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e*t)/100},U=function(e,t){u.b.dismiss(),"success"===e?u.b.success(t,{position:u.b.POSITION.TOP_LEFT}):"error"===e?u.b.error(t,{position:u.b.POSITION.TOP_LEFT}):"warning"===e?u.b.warn(t,{position:u.b.POSITION.TOP_LEFT}):"info"===e?u.b.info(t,{position:u.b.POSITION.TOP_LEFT}):""===e&&Object(u.b)(t,{position:u.b.POSITION.TOP_LEFT,className:"foo-bar"})},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!=e?{uc:"#23282c",dc:"#08c308",cm:"#c7c70f",cl:"#d21818"}[e]:"#23282c"},G=function(e){e.location!==e.top.location&&(e.top.location=e.location)}},498:function(e){e.exports={8917:{matchId:"1034809",playerId:"8917",totalPoints:691,run:117,four:520,six:0,mdovers:48,wktss:6,catchs:0,stumped:0,playername:"MM Ali"},10617:{matchId:"1034809",playerId:"10617",totalPoints:52,run:6,four:0,six:0,mdovers:44,wktss:2,catchs:0,stumped:0,playername:"SCJ Broad"},11728:{matchId:"1034809",playerId:"11728",totalPoints:755,run:151,four:600,six:0,mdovers:0,wktss:0,catchs:4,stumped:0,playername:"AN Cook (c)"},26421:{matchId:"1034809",playerId:"26421",totalPoints:656,run:102,four:520,six:0,mdovers:28,wktss:6,catchs:0,stumped:0,playername:"R Ashwin"},28763:{matchId:"1034809",playerId:"28763",totalPoints:189,run:29,four:160,six:0,mdovers:0,wktss:0,catchs:0,stumped:0,playername:"G Gambhir"},31107:{matchId:"1034809",playerId:"31107",totalPoints:22,run:0,four:0,six:0,mdovers:12,wktss:6,catchs:4,stumped:0,playername:"A Mishra"},32540:{matchId:"1034809",playerId:"32540",totalPoints:902,run:142,four:760,six:0,mdovers:0,wktss:0,catchs:0,stumped:0,playername:"CA Pujara"},234675:{matchId:"1034809",playerId:"234675",totalPoints:320,run:44,four:240,six:6,mdovers:20,wktss:6,catchs:4,stumped:0,playername:"RA Jadeja"},237095:{matchId:"1034809",playerId:"237095",totalPoints:781,run:157,four:600,six:24,mdovers:0,wktss:0,catchs:0,stumped:0,playername:"M Vijay"},244497:{matchId:"1034809",playerId:"244497",totalPoints:71,run:5,four:40,six:0,mdovers:8,wktss:14,catchs:4,stumped:0,playername:"AU Rashid"},247235:{matchId:"1034809",playerId:"247235",totalPoints:74,run:4,four:40,six:0,mdovers:28,wktss:2,catchs:0,stumped:0,playername:"CR Woakes"},253802:{matchId:"1034809",playerId:"253802",totalPoints:529,run:89,four:440,six:0,mdovers:0,wktss:0,catchs:0,stumped:0,playername:"V Kohli (c)"},277916:{matchId:"1034809",playerId:"277916",totalPoints:58,run:14,four:40,six:0,mdovers:0,wktss:0,catchs:4,stumped:0,playername:"AM Rahane"},279810:{matchId:"1034809",playerId:"279810",totalPoints:226,run:44,four:160,six:6,mdovers:0,wktss:0,catchs:16,stumped:0,playername:"WP Saha \u2020"},297433:{matchId:"1034809",playerId:"297433",totalPoints:262,run:46,four:200,six:12,mdovers:0,wktss:0,catchs:4,stumped:0,playername:"JM Bairstow \u2020"},303669:{matchId:"1034809",playerId:"303669",totalPoints:582,run:128,four:440,six:6,mdovers:0,wktss:0,catchs:8,stumped:0,playername:"JE Root"},311158:{matchId:"1034809",playerId:"311158",totalPoints:907,run:157,four:720,six:12,mdovers:12,wktss:2,catchs:4,stumped:0,playername:"BA Stokes"},349853:{matchId:"1034809",playerId:"349853",totalPoints:170,run:32,four:120,six:0,mdovers:8,wktss:6,catchs:4,stumped:0,playername:"ZS Ansari"},376116:{matchId:"1034809",playerId:"376116",totalPoints:77,run:5,four:40,six:0,mdovers:20,wktss:4,catchs:8,stumped:0,playername:"UT Yadav"},481896:{matchId:"1034809",playerId:"481896",totalPoints:42,run:8,four:0,six:6,mdovers:24,wktss:4,catchs:0,stumped:0,playername:"Mohammed Shami"},521637:{matchId:"1034809",playerId:"521637",totalPoints:133,run:13,four:120,six:0,mdovers:0,wktss:0,catchs:0,stumped:0,playername:"BM Duckett"},632172:{matchId:"1034809",playerId:"632172",totalPoints:655,run:113,four:520,six:6,mdovers:0,wktss:0,catchs:16,stumped:0,playername:"H Hameed"}}},607:function(e,t,a){"use strict";a.r(t);var n=a(64),s=a(65),r=a(67),o=a(66),c=a(68),l=a(62),i=a(0),u=a.n(i),d=a(200),m=a(212),p=a(275),h=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).readFileScore=function(){var e=a.props.match.params.matchid,t=Object(l.a)(Object(l.a)(a));t.setState({isLoading:!0});var n=a.state.fantasyPointsConst;try{var s="".concat(d.a.API_NODE_URL),r="";"1"===a.props.match.params.gameid?(delete n.sr,delete n.er,a.setState({fantasyPointsConst:n}),r=s+"/getPlayerpoints?matchid="+e):"2"===a.props.match.params.gameid?r=s+"/getPlayerpoints/football?matchid="+e:"3"===a.props.match.params.gameid&&(r=s+"/getPlayerpoints/kabaddi?matchid="+e);fetch(r,{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(e){t.setState({isLoading:!1}),!0===Object(m.c)("Wrong",e.status,"",2)&&e.json().then(function(e){!0!==e.error&&t.setState({fantasypoints:e.data,team1:e.teamname?e.teamname.team1:"",team2:e.teamname?e.teamname.team2:"",matchStatus:e.matchStatus?e.matchStatus:""})})}).catch(function(e){t.setState({isLoading:!1})})}catch(o){t.setState({isLoading:!1})}},a.onClickActive=function(e){a.setState({tabstatus:e.target.id,teamselected:e.target.innerHTML})},a.state={tabstatus:"tab1",teammatchlist:[],playrole:{batting:{name:"Batting"},bowling:{name:"Bowling"},fielding:{name:"Fielding"}},team1name:"",team2name:"",teamselected:"",fantasypoints:{},isLoading:!1,fantasyPointsConst:m.q[a.props.match.params.gameid]?m.q[a.props.match.params.gameid]:{}},Object(m.w)(),a}return Object(c.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){Object(m.w)(),this.readFileScore()}},{key:"render",value:function(){var e=!(this.props.location.pathname.indexOf("fantscorcrd")<0),t=this,n=[];a(498),this.props.match.params.matchid;return u.a.createElement("div",{className:"fadeIn"},u.a.createElement("div",{className:"loaderdiv"+(!0===this.state.isLoading?"":" hidden")},u.a.createElement(p.ClipLoader,{css:m.p,sizeUnit:"px",size:60,color:m.l,loading:this.state.isLoading})),u.a.createElement("div",{className:"left_logincontent profilepadding0"},u.a.createElement("div",{className:"background-cover ng-scope"},u.a.createElement("div",{className:"header_bg"+(!0===e?" hidden":"")},u.a.createElement("div",{className:"hd_left"},u.a.createElement("span",{onClick:m.k,className:"hd_back"}),u.a.createElement("span",{onClick:m.v,className:"hd_home"})),u.a.createElement("div",{className:"hd_center"},"Fantasy Score Card")),u.a.createElement("div",{className:"ajx_edpatt ajteamvs_namesfix"},u.a.createElement("div",{className:"brh_main"},u.a.createElement("div",{className:"leftbrh_pts"},u.a.createElement("h4",null,this.state.team1," ",u.a.createElement("span",{className:"nrntes_span"},this.state.team2))),u.a.createElement("div",{className:"inpro_cessing"},u.a.createElement("a",null,this.state.matchStatus)," "))),u.a.createElement("div",{className:"fant_scorebtables score_scrolltablesnew"},u.a.createElement("div",{className:"table-responsive"},u.a.createElement("table",{className:"table table-bordered table-fixed"},u.a.createElement("thead",{className:"score_tablehead_card"},u.a.createElement("tr",null,Object.keys(this.state.fantasyPointsConst).map(function(e,a){return n[a]=e,u.a.createElement("td",{key:a}," ",t.state.fantasyPointsConst[e]?t.state.fantasyPointsConst[e]:"0"," ")}))),u.a.createElement("tbody",null,this.state.fantasypoints?Object.values(this.state.fantasypoints).map(function(e,t){return u.a.createElement("tr",{key:t},n.map(function(t,a){return u.a.createElement("td",{key:a}," ",e[t]?e[t]:"0"," ")}))}):u.a.createElement("tr",null,u.a.createElement("td",{colSpan:"10",className:"text-center"},"No record found")))))))))}}]),t}(i.Component);t.default=h}}]);
//# sourceMappingURL=20.195da93b.chunk.js.map