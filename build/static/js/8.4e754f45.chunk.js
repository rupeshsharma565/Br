(window.webpackJsonp=window.webpackJsonp||[]).push([[8,26],{199:function(e,n,t){"use strict";n.a={API_URL:"https://fancy11.com/fancy11/public",API_NODE_URL:"https://score.fancy11.com",HOST_URL:"https://play.fancy11.com",FB_APP_ID:"327645271254958",GOOGLE_CLIENT_ID:"388697308986-lmtr069vvg1robbl17k11j9q0nktepfv.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw.paytm.in/theia/processTransaction",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"Fancy11",PRODUCT_SHORT_NAME:"Fancy11",APK_URL:"https://fancy11.com/apk/fancy11.apk",MAIN_URL:"https://www.fancy11.com",REFER_FRIEND:"https://play.fancy11.com/#/Register",SUPPORT_EMAIL:"support@fancy11.com",SUPPORT_CONTACT_NO:"+919555317790",PROJECT_CODE:"1"}},212:function(e,n,t){"use strict";t.d(n,"a",function(){return u}),t.d(n,"g",function(){return m}),t.d(n,"c",function(){return d}),t.d(n,"B",function(){return p}),t.d(n,"d",function(){return h}),t.d(n,"s",function(){return f}),t.d(n,"w",function(){return y}),t.d(n,"y",function(){return g}),t.d(n,"k",function(){return v}),t.d(n,"t",function(){return b}),t.d(n,"u",function(){return w}),t.d(n,"A",function(){return P}),t.d(n,"o",function(){return C}),t.d(n,"j",function(){return k}),t.d(n,"e",function(){return z}),t.d(n,"r",function(){return T}),t.d(n,"i",function(){return R}),t.d(n,"m",function(){return F}),t.d(n,"n",function(){return S}),t.d(n,"v",function(){return A}),t.d(n,"z",function(){return D}),t.d(n,"q",function(){return B}),t.d(n,"p",function(){return M}),t.d(n,"l",function(){return O}),t.d(n,"f",function(){return E}),t.d(n,"b",function(){return I}),t.d(n,"x",function(){return N}),t.d(n,"h",function(){return _});var a=t(272),r=t.n(a),o=t(404),l=t.n(o),i=t(405),s=t.n(i),c=t(199),u=(t(406),"/#"),m=u+"/matches",d=function(e,n,t,a){if(401===n||403===n)return window.location.href=u+"/login";if(500===n)return"";if(1===a)r()({title:e,text:t,icon:"success",className:"swall-custom-class"});else if(0===a)r()({title:e+"!",text:t||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==a)return!0;r()({title:e+"!",text:t||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},p={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},h=function(e){var n=new Date(e),t=new Date;return new l.a(n,t).seconds()},f=function(e){var n=e%3600,t=n%60;return{h:Math.floor(e/3600),m:Math.floor(n/60),s:Math.ceil(t)}},y=function(e){if(e){var n=1e3*parseInt(e),t=new Date(n);return s()(t,"yyyy-mm-dd")}return""},g=function(e){var n=new Date(1e3*e);return n.getFullYear()+"-"+("0"+n.getMonth()).slice(-2)+"-"+("0"+n.getDate()).slice(-2)+" "+("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2)+":"+("0"+n.getSeconds()).slice(-2)},v=function(){window.history.back()},b=function(){window.location.href=u+"/home"},w=function(){return!!sessionStorage.getItem("jwt")},P={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},C={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},k=function(){return new Promise(function(e,n){var t="".concat(c.a.API_URL);fetch(t+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(n){n.json().then(function(n){var t=n.data.time,a=1e3*parseInt(t);e(a)})})})},z=function(e,n){var t=new Date(e),a=new Date(n);return new l.a(t,a).seconds()-0},T={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},R=function(e){var n="";if(e){var t=parseInt(e).toString(),a="";if(6!=t.length&&7!=t.length||(a=" Lac"),t.length>7&&(a=" Cr"),t.length>=6&&t.length<=8)if(t.length%2===0){var r=t.substring(0,2);n=parseInt(r)/10+a}else{var o=t.substring(0,3);n=parseInt(o)/10+a}else if(t.length>8){var l=t.substring(0,t.length-6);n=parseInt(l)/10+a}else n=t;return n}return n="0"},F=function(e){var n={t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&n[e]?n[e]:""},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?n[e]:n},A={tax:"31.2",amount:"10,000"},D=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},B={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},M="display: block;margin: 0 auto;border-color: red;",O="#ea4c89",E=parseInt(Date.now()/1e3),I=30,N=function(e){var n=1e3*parseInt(e);return new Date(n).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},_={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}}},689:function(e,n,t){"use strict";t.r(n);var a=t(63),r=t(64),o=t(66),l=t(65),i=t(67),s=t(0),c=t.n(s),u=t(691),m=t(648),d=t(688),p=t(269),h=t(500),f=c.a.lazy(function(){return Promise.all([t.e(0),t.e(28)]).then(t.bind(null,690))}),y=c.a.lazy(function(){return Promise.all([t.e(2),t.e(65),t.e(29)]).then(t.bind(null,658))}),g=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(30)]).then(t.bind(null,596))}),v=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(31)]).then(t.bind(null,665))}),b=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(32)]).then(t.bind(null,666))}),w=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(33)]).then(t.bind(null,667))}),P=c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(34)]).then(t.bind(null,668))}),C=c.a.lazy(function(){return t.e(35).then(t.bind(null,669))}),k=c.a.lazy(function(){return t.e(36).then(t.bind(null,599))}),z=c.a.lazy(function(){return Promise.all([t.e(0),t.e(37)]).then(t.bind(null,604))}),T=c.a.lazy(function(){return t.e(38).then(t.bind(null,600))}),R=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(39)]).then(t.bind(null,670))}),F=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(40)]).then(t.bind(null,597))}),S=c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(41)]).then(t.bind(null,671))}),A=c.a.lazy(function(){return Promise.all([t.e(0),t.e(42)]).then(t.bind(null,672))}),D=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(3),t.e(43)]).then(t.bind(null,673))}),B=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(44)]).then(t.bind(null,674))}),M=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(45)]).then(t.bind(null,675))}),O=c.a.lazy(function(){return Promise.all([t.e(0),t.e(46)]).then(t.bind(null,676))}),E=c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(47)]).then(t.bind(null,677))}),I=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(66),t.e(48)]).then(t.bind(null,678))}),N=c.a.lazy(function(){return Promise.all([t.e(0),t.e(49)]).then(t.bind(null,605))}),_=c.a.lazy(function(){return t.e(50).then(t.bind(null,679))}),x=c.a.lazy(function(){return t.e(51).then(t.bind(null,680))}),U=c.a.lazy(function(){return t.e(52).then(t.bind(null,681))}),L=c.a.lazy(function(){return Promise.all([t.e(0),t.e(53)]).then(t.bind(null,601))}),$=c.a.lazy(function(){return t.e(54).then(t.bind(null,682))}),G=c.a.lazy(function(){return Promise.all([t.e(0),t.e(55)]).then(t.bind(null,602))}),Z=c.a.lazy(function(){return Promise.all([t.e(0),t.e(56)]).then(t.bind(null,603))}),j=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(57)]).then(t.bind(null,683))}),H=c.a.lazy(function(){return t.e(58).then(t.bind(null,684))}),J=c.a.lazy(function(){return t.e(59).then(t.bind(null,685))}),K=c.a.lazy(function(){return t.e(60).then(t.bind(null,598))}),W=c.a.lazy(function(){return Promise.all([t.e(0),t.e(61)]).then(t.bind(null,606))}),q=[{path:"/",exact:!0,name:"Home",component:X},{path:"/matches",name:"Matches",component:f},{path:"/refer",name:"Refer",component:y},{path:"/Faq",name:"Faq",component:z},{path:"/MyProfile",name:"MyProfile",component:P},{path:"/Verifyotp/:username",name:"Verifyotp",component:g},{path:"/Contests/:matchid",name:"Contests",component:v},{path:"/CreateTeams/:matchid",name:"CreateTeams",component:b},{path:"/UpdateTeams/:matchid/:teamid",name:"CreateTeams",component:b},{path:"/CloneTeam/:matchid/:teamid",name:"CreateTeams",component:b},{path:"/MyTeams/:matchid",name:"MyTeams",component:w},{path:"/MyAccount",name:"MyAccount",component:C},{path:"/Refer",name:"Refer",component:y},{path:"/TermsCondition",name:"TermsCondition",component:k},{path:"/Faq",name:"Faq",component:z},{path:"/Support",name:"Support",component:T},{path:"/WithdrawlVerify",name:"WithdrawlVerify",component:R},{path:"/FantasyPointSystem",name:"FantasyPointSystem",component:F},{path:"/AddCash",name:"AddCash",component:S},{path:"/PaytmCheckout/:orderid/:amount",name:"PaytmCheckout",component:A},{path:"/JoinContest/:matchid/:type",name:"JoinContestType",component:D},{path:"/JoinContest/:matchid",name:"JoinContest",component:D},{path:"/ChooseTeam/:matchid/:poolid/:joincost",name:"ChooseTeam",component:B},{path:"/SwitchTeam/:matchid/:poolid",name:"SwitchTeam",component:E},{path:"/ContestDetails/:matchid/:poolcontestid/:type",name:"ContestDetailsType",component:M},{path:"/ContestDetails/:matchid/:poolcontestid",name:"ContestDetails",component:M},{path:"/ContestDetailsForJoin/:matchid/:poolcontestid",name:"ContestDetailsJoin",component:M},{path:"/MyMatches",name:"MyMatches",component:O},{path:"/LiveScore",name:"LiveScore",component:I},{path:"/FullScoreCard/1/:matchid",name:"FullScoreCard",component:N},{path:"/FullScoreCard/2/:matchid",name:"FootballFullScoreCard",component:c.a.lazy(function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,656))})},{path:"/FullScoreCard/3/:matchid",name:"KabaddiFullScoreCard",component:W},{path:"/PaytmRedirect/:orderid/:amount/:promocode",name:"PaytmRedirect",component:_},{path:"/PaytmResponse/:orderid/:txid",name:"PaytmResponse",component:x},{path:"/TransactionHistory",name:"TransactionHistory",component:U},{path:"/FantasyScoreCard/:gameid/:matchid",name:"FantasyScoreCard",component:L},{path:"/Notification",name:"Notification",component:$},{path:"/AboutUs",name:"AboutUs",component:G},{path:"/HowToPlay",name:"HowToPlay",component:Z},{path:"/WithdrawCash",name:"WithdrawCash",component:j},{path:"/PrintTeam",name:"PrintTeam",component:H},{path:"/More",name:"More",component:J},{path:"/PrivacyPolicy",name:"Privacy Policy",component:K},{path:"/CreatePrivateContest/:matchid/",name:"Create Private Contest",component:c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(62)]).then(t.bind(null,686))})}],Y=(t(101),t(212),c.a.lazy(function(){return t.e(27).then(t.bind(null,657))})),V=function(e){function n(){var e,t;Object(a.a)(this,n);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(t=Object(o.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(i)))).loading=function(){return c.a.createElement("div",{className:"animated fadeIn pt-1 text-center lod11"},"Loading...")},t}return Object(i.a)(n,e),Object(r.a)(n,[{key:"signOut",value:function(e){e.preventDefault(),this.props.history.push("/login")}},{key:"render",value:function(){return c.a.createElement("div",{className:"app"},c.a.createElement("div",{className:"app-body"},c.a.createElement("main",{id:"main",className:"main"},c.a.createElement(p.a,{fluid:!0},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(u.a,null,q.map(function(e,n){return e.component?c.a.createElement(m.a,{key:n,path:e.path,exact:e.exact,name:e.name,render:function(n){return c.a.createElement(e.component,n)}}):null}),c.a.createElement(d.a,{from:"/",to:"/matches"}))))),c.a.createElement(h.a,{fixed:!0},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(Y,null)))))}}]),n}(s.Component),X=n.default=V}}]);
//# sourceMappingURL=8.4e754f45.chunk.js.map