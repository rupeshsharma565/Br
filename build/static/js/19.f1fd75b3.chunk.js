(window.webpackJsonp=window.webpackJsonp||[]).push([[19,26,38],{200:function(e,t,n){"use strict";t.a={API_URL:"https://11plays.com/11plays/public",API_NODE_URL:"https://score.11plays.com",HOST_URL:"https://play.11plays.com",APK_URL:"https://11plays.com/apk/11play.apk",MAIN_URL:"https://play.11plays.com",REFER_FRIEND:"https://play.11plays.com/#/Register",FB_APP_ID:"1829567023847369",GOOGLE_CLIENT_ID:"1069443540619-eilha28gu288dgforh0psrn7qefgmocc.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw-stage.paytm.in/theia/processTransaction",RAZORPAY_KEY:"rzp_test_WTwazc7mLkdycg",SUPPORT_EMAIL:"support@11plays.com",SUPPORT_CONTACT_NO:"+91 8327302001",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"11Plays",PRODUCT_SHORT_NAME:"11Plays",PROJECT_CODE:"1",IS_PRIVATE_CONT:!0,IS_RAZORPAY:!0}},212:function(e,t,n){"use strict";n.d(t,"a",function(){return d}),n.d(t,"g",function(){return p}),n.d(t,"c",function(){return f}),n.d(t,"E",function(){return m}),n.d(t,"d",function(){return g}),n.d(t,"t",function(){return h}),n.d(t,"y",function(){return v}),n.d(t,"A",function(){return y}),n.d(t,"k",function(){return w}),n.d(t,"v",function(){return b}),n.d(t,"w",function(){return O}),n.d(t,"D",function(){return P}),n.d(t,"o",function(){return k}),n.d(t,"j",function(){return _}),n.d(t,"e",function(){return T}),n.d(t,"r",function(){return E}),n.d(t,"i",function(){return D}),n.d(t,"m",function(){return R}),n.d(t,"n",function(){return S}),n.d(t,"x",function(){return A}),n.d(t,"C",function(){return N}),n.d(t,"q",function(){return I}),n.d(t,"p",function(){return C}),n.d(t,"l",function(){return B}),n.d(t,"f",function(){return F}),n.d(t,"b",function(){return L}),n.d(t,"z",function(){return M}),n.d(t,"h",function(){return j}),n.d(t,"u",function(){return U}),n.d(t,"B",function(){return z}),n.d(t,"s",function(){return x});var a=n(272),r=n.n(a),s=n(405),o=n.n(s),c=n(406),i=n.n(c),l=n(200),u=(n(407),n(404)),d="/#",p=d+"/matches",f=function(e,t,n,a){if(401===t||403===t)return window.location.href=d+"/login";if(500===t)return"";if(1===a)r()({title:e,text:n,icon:"success",className:"swall-custom-class"});else if(0===a)r()({title:e+"!",text:n||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==a)return!0;r()({title:e+"!",text:n||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},m={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},g=function(e){var t=new Date(e),n=new Date;return new o.a(t,n).seconds()},h=function(e){var t=e%3600,n=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(n)}},v=function(e){if(e){var t=1e3*parseInt(e),n=new Date(t);return i()(n,"yyyy-mm-dd")}return""},y=function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+("0"+t.getMonth()).slice(-2)+"-"+("0"+t.getDate()).slice(-2)+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)},w=function(){window.history.back()},b=function(){window.location.href=d+"/home"},O=function(){return!!sessionStorage.getItem("jwt")},P={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},k={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},_=function(){return new Promise(function(e,t){var n="".concat(l.a.API_URL);fetch(n+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(t){t.json().then(function(t){var n=t.data.time,a=1e3*parseInt(n);e(a)})})})},T=function(e,t){var n=new Date(e),a=new Date(t);return new o.a(n,a).seconds()-0},E={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},D=function(e){var t="";if(e){var n=parseInt(e).toString(),a="";if(6!=n.length&&7!=n.length||(a=" Lac"),n.length>7&&(a=" Cr"),n.length>=6&&n.length<=8)if(n.length%2===0){var r=n.substring(0,2);t=parseInt(r)/10+a}else{var s=n.substring(0,3);t=parseInt(s)/10+a}else if(n.length>8){var o=n.substring(0,n.length-6);t=parseInt(o)/10+a}else t=n;return t}return t="0"},R=function(e){var t={t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&t[e]?t[e]:""},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?t[e]:t},A={tax:"31.2",amount:"10,000"},N=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},I={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},C="display: block;margin: 0 auto;border-color: red;",B="#ea4c89",F=parseInt(Date.now()/1e3),L=30,M=function(e){var t=1e3*parseInt(e);return new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},j={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}},U=function(e){e.location!==e.top.location&&(e.top.location=e.location)},z=function(e,t){u.b.dismiss(),"success"===e?u.b.success(t,{position:u.b.POSITION.TOP_LEFT}):"error"===e?u.b.error(t,{position:u.b.POSITION.TOP_LEFT}):"warning"===e?u.b.warn(t,{position:u.b.POSITION.TOP_LEFT}):"info"===e?u.b.info(t,{position:u.b.POSITION.TOP_LEFT}):""===e&&Object(u.b)(t,{position:u.b.POSITION.TOP_LEFT,className:"foo-bar"})},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e*t)/100}},470:function(e,t,n){e.exports=n.p+"static/media/support_icon.46e9560d.png"},606:function(e,t,n){"use strict";n.r(t);var a=n(64),r=n(65),s=n(67),o=n(66),c=n(68),i=n(62),l=n(0),u=n.n(l),d=n(212),p=n(200),f=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(s.a)(this,Object(o.a)(t).call(this,e)))._isMounted=!1,n.getSupportData=function(){n._isMounted=!0;var e,t=Object(i.a)(Object(i.a)(n)),a={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")}};e="".concat(p.a.API_URL)+"/frontapi/appsettings",t.setState({supportData:{}}),fetch(e,a).then(function(e){!0===Object(d.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){!1===e.error?t._isMounted&&t.setState({supportData:e.data}):t._isMounted&&t.setState({supportData:{}})})}).catch(function(e){Object(d.c)("Wrong",!1,e.toString(),0)})},n.state={collapse:[],supportData:{}},n.toggle=n.toggle.bind(Object(i.a)(Object(i.a)(n))),n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getSupportData()}},{key:"toggle",value:function(e){var t=this.state.collapse,n=!!this.state.collapse[e.target.id]&&this.state.collapse[e.target.id];t[e.target.id]=!n,this.setState({collapse:t})}},{key:"render",value:function(){return u.a.createElement("div",{className:"fadeIn"},u.a.createElement("div",{className:"left_logincontent profilepadding0"},u.a.createElement("div",{className:"background-cover ng-scope"},u.a.createElement("div",{className:"header_bg"+("/suprt"===this.props.location.pathname?" hidden":"")},u.a.createElement("div",{className:"hd_left"},u.a.createElement("span",{onClick:d.k,className:"hd_back"}),u.a.createElement("span",{onClick:d.v,className:"hd_home"})),u.a.createElement("div",{className:"hd_center"},"Support")),u.a.createElement("div",{className:"support_pagecss"},u.a.createElement("div",{className:"bank"},u.a.createElement("img",{src:n(470)})),u.a.createElement("div",{className:"support_info"},u.a.createElement("h2",null,"Our Customer Support is Available 24*7")),u.a.createElement("div",{className:"support_info"},u.a.createElement("p",null,"Email: ",this.state.supportData&&this.state.supportData.config?this.state.supportData.config.common.supportemail:""),u.a.createElement("div",{className:"col-12 text-center"},u.a.createElement("a",{className:"g_button marTB30",target:"_top",href:this.state.supportData&&this.state.supportData.config?"mailto:"+this.state.supportData.config.common.supportemail:""},"TAP HERE TO E-MAIL US")))),this.state.supportData&&this.state.supportData.config&&this.state.supportData.config.common.supportphone?u.a.createElement("div",{className:"bt_fix"},u.a.createElement("div",{className:"w_bt"},u.a.createElement("a",{className:"g_button",href:!0},"Call US ON : ",this.state.supportData.config.common.supportphone))):"")))}}]),t}(l.Component);t.default=f}}]);
//# sourceMappingURL=19.f1fd75b3.chunk.js.map