(window.webpackJsonp=window.webpackJsonp||[]).push([[22,26,56],{199:function(e,t,n){"use strict";t.a={API_URL:"https://fancy11.com/fancy11/public",API_NODE_URL:"https://score.fancy11.com",HOST_URL:"https://play.fancy11.com",FB_APP_ID:"327645271254958",GOOGLE_CLIENT_ID:"388697308986-lmtr069vvg1robbl17k11j9q0nktepfv.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw.paytm.in/theia/processTransaction",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"Fancy11",PRODUCT_SHORT_NAME:"Fancy11",APK_URL:"https://fancy11.com/apk/fancy11.apk",MAIN_URL:"https://www.fancy11.com",REFER_FRIEND:"https://play.fancy11.com/#/Register",SUPPORT_EMAIL:"support@fancy11.com",SUPPORT_CONTACT_NO:"+919555317790",PROJECT_CODE:"1"}},212:function(e,t,n){"use strict";n.d(t,"a",function(){return u}),n.d(t,"g",function(){return d}),n.d(t,"c",function(){return f}),n.d(t,"B",function(){return p}),n.d(t,"d",function(){return m}),n.d(t,"s",function(){return g}),n.d(t,"w",function(){return h}),n.d(t,"y",function(){return v}),n.d(t,"k",function(){return y}),n.d(t,"t",function(){return w}),n.d(t,"u",function(){return b}),n.d(t,"A",function(){return k}),n.d(t,"o",function(){return P}),n.d(t,"j",function(){return R}),n.d(t,"e",function(){return A}),n.d(t,"r",function(){return C}),n.d(t,"i",function(){return O}),n.d(t,"m",function(){return S}),n.d(t,"n",function(){return _}),n.d(t,"v",function(){return B}),n.d(t,"z",function(){return T}),n.d(t,"q",function(){return D}),n.d(t,"p",function(){return N}),n.d(t,"l",function(){return E}),n.d(t,"f",function(){return I}),n.d(t,"b",function(){return F}),n.d(t,"x",function(){return L}),n.d(t,"h",function(){return j});var a=n(272),r=n.n(a),s=n(404),o=n.n(s),c=n(405),i=n.n(c),l=n(199),u=(n(406),"/#"),d=u+"/matches",f=function(e,t,n,a){if(401===t||403===t)return window.location.href=u+"/login";if(500===t)return"";if(1===a)r()({title:e,text:n,icon:"success",className:"swall-custom-class"});else if(0===a)r()({title:e+"!",text:n||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==a)return!0;r()({title:e+"!",text:n||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},p={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},m=function(e){var t=new Date(e),n=new Date;return new o.a(t,n).seconds()},g=function(e){var t=e%3600,n=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(n)}},h=function(e){if(e){var t=1e3*parseInt(e),n=new Date(t);return i()(n,"yyyy-mm-dd")}return""},v=function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+("0"+t.getMonth()).slice(-2)+"-"+("0"+t.getDate()).slice(-2)+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)},y=function(){window.history.back()},w=function(){window.location.href=u+"/home"},b=function(){return!!sessionStorage.getItem("jwt")},k={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},P={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},R=function(){return new Promise(function(e,t){var n="".concat(l.a.API_URL);fetch(n+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(t){t.json().then(function(t){var n=t.data.time,a=1e3*parseInt(n);e(a)})})})},A=function(e,t){var n=new Date(e),a=new Date(t);return new o.a(n,a).seconds()-0},C={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},O=function(e){var t="";if(e){var n=parseInt(e).toString(),a="";if(6!=n.length&&7!=n.length||(a=" Lac"),n.length>7&&(a=" Cr"),n.length>=6&&n.length<=8)if(n.length%2===0){var r=n.substring(0,2);t=parseInt(r)/10+a}else{var s=n.substring(0,3);t=parseInt(s)/10+a}else if(n.length>8){var o=n.substring(0,n.length-6);t=parseInt(o)/10+a}else t=n;return t}return t="0"},S=function(e){var t={t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&t[e]?t[e]:""},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?t[e]:t},B={tax:"31.2",amount:"10,000"},T=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},D={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},N="display: block;margin: 0 auto;border-color: red;",E="#ea4c89",I=parseInt(Date.now()/1e3),F=30,L=function(e){var t=1e3*parseInt(e);return new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},j={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}}},603:function(e,t,n){"use strict";n.r(t);var a=n(63),r=n(64),s=n(66),o=n(65),c=n(67),i=n(62),l=n(0),u=n.n(l),d=n(199),f=n(212),p=n(274),m=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(s.a)(this,Object(o.a)(t).call(this,e))).contentDetail=function(){var e=Object(i.a)(Object(i.a)(n));e.setState({isLoading:!0});var t={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")},body:JSON.stringify({slug:"howtoplay"})},a=(n.props.match.params.ids,"".concat(d.a.API_URL));fetch(a+"/getcmspage",t).then(function(t){e.setState({isLoading:!1}),!0===Object(f.c)("Wrong",t.status,t.message,2)&&t.json().then(function(t){!1===t.error?e.setState({contentdetail:t.data.content}):e.setState({contentdetail:null})})}).catch(function(t){e.setState({isLoading:!1}),Object(f.c)("Wrong",!1,t.toString(),0)})},n.state={contentdetail:null,isLoading:!1},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.contentDetail()}},{key:"render",value:function(){var e=this.state.contentdetail;return u.a.createElement("div",{className:"fadeIn"},u.a.createElement("div",{className:"loaderdiv"+(!0===this.state.isLoading?"":" hidden")},u.a.createElement(p.ClipLoader,{css:f.p,sizeUnit:"px",size:60,color:f.l,loading:this.state.isLoading})),u.a.createElement("div",{className:"left_logincontent"},u.a.createElement("div",{className:"background-cover ng-scope"},u.a.createElement("div",{className:"header_bg"+("/hwtoply"===this.props.location.pathname?" hidden":"")},u.a.createElement("div",{className:"hd_left"},u.a.createElement("span",{onClick:f.k,className:"hd_back"}),u.a.createElement("span",{onClick:f.t,className:"hd_home"})),u.a.createElement("div",{className:"hd_center"},"How To Play")),u.a.createElement("div",{className:"terms_conditionscontnt"},u.a.createElement("div",{className:"job_data_text"},u.a.createElement("div",{dangerouslySetInnerHTML:{__html:e}}))))))}}]),t}(l.Component);t.default=m}}]);
//# sourceMappingURL=22.44d903d7.chunk.js.map