(window.webpackJsonp=window.webpackJsonp||[]).push([[8,26],{200:function(e,n,t){"use strict";n.a={API_URL:"https://11plays.com/11plays/public",API_NODE_URL:"https://score.11plays.com",HOST_URL:"https://play.11plays.com",APK_URL:"https://11plays.com/apk/11play.apk",MAIN_URL:"https://play.11plays.com",REFER_FRIEND:"https://play.11plays.com/#/Register",FB_APP_ID:"1829567023847369",GOOGLE_CLIENT_ID:"1069443540619-eilha28gu288dgforh0psrn7qefgmocc.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw-stage.paytm.in/theia/processTransaction",RAZORPAY_KEY:"rzp_test_WTwazc7mLkdycg",SUPPORT_EMAIL:"support@11plays.com",SUPPORT_CONTACT_NO:"+91 8327302001",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"11Plays",PRODUCT_SHORT_NAME:"11Plays",PROJECT_CODE:"1",IS_PRIVATE_CONT:!0,IS_RAZORPAY:!0}},212:function(e,n,t){"use strict";t.d(n,"a",function(){return d}),t.d(n,"g",function(){return m}),t.d(n,"c",function(){return p}),t.d(n,"F",function(){return h}),t.d(n,"d",function(){return f}),t.d(n,"t",function(){return y}),t.d(n,"z",function(){return g}),t.d(n,"B",function(){return b}),t.d(n,"k",function(){return P}),t.d(n,"v",function(){return v}),t.d(n,"w",function(){return w}),t.d(n,"E",function(){return C}),t.d(n,"o",function(){return T}),t.d(n,"j",function(){return z}),t.d(n,"e",function(){return k}),t.d(n,"r",function(){return R}),t.d(n,"i",function(){return S}),t.d(n,"m",function(){return O}),t.d(n,"n",function(){return F}),t.d(n,"y",function(){return A}),t.d(n,"D",function(){return I}),t.d(n,"q",function(){return E}),t.d(n,"p",function(){return D}),t.d(n,"l",function(){return _}),t.d(n,"f",function(){return B}),t.d(n,"b",function(){return N}),t.d(n,"A",function(){return M}),t.d(n,"h",function(){return L}),t.d(n,"s",function(){return x}),t.d(n,"C",function(){return U}),t.d(n,"x",function(){return Z}),t.d(n,"u",function(){return $});var a=t(272),r=t.n(a),o=t(406),l=t.n(o),i=t(407),s=t.n(i),c=t(200),u=(t(408),t(405)),d=(t(404),"/#"),m=d+"/matches",p=function(e,n,t,a){if(401===n||403===n)return window.location.href=d+"/login";if(500===n)return"";if(1===a)r()({title:e,text:t,icon:"success",className:"swall-custom-class"});else if(0===a)r()({title:e+"!",text:t||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==a)return!0;r()({title:e+"!",text:t||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},h={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},f=function(e){var n=new Date(e),t=new Date;return new l.a(n,t).seconds()},y=function(e){var n=e%3600,t=n%60;return{h:Math.floor(e/3600),m:Math.floor(n/60),s:Math.ceil(t)}},g=function(e){if(e){var n=1e3*parseInt(e),t=new Date(n);return s()(t,"yyyy-mm-dd")}return""},b=function(e){var n=new Date(1e3*e),t=n.getMonth();return t+=1,n.getFullYear()+"-"+("0"+t).slice(-2)+"-"+("0"+n.getDate()).slice(-2)+" "+("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2)+":"+("0"+n.getSeconds()).slice(-2)},P=function(){window.history.back()},v=function(){window.location.href=d+"/home"},w=function(){return!!sessionStorage.getItem("jwt")},C={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},T={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},z=function(){return new Promise(function(e,n){var t="".concat(c.a.API_URL);fetch(t+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(n){n.json().then(function(n){var t=n.data.time,a=1e3*parseInt(t);e(a)})})})},k=function(e,n){var t=new Date(e),a=new Date(n);return new l.a(t,a).seconds()-0},R={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},S=function(e){var n="";if(e){var t=parseInt(e).toString(),a="";if(6!=t.length&&7!=t.length||(a=" Lac"),t.length>7&&(a=" Cr"),t.length>=6&&t.length<=8)if(t.length%2===0){var r=t.substring(0,2);n=parseInt(r)/10+a}else{var o=t.substring(0,3);n=parseInt(o)/10+a}else if(t.length>8){var l=t.substring(0,t.length-6);n=parseInt(l)/10+a}else n=t;return n}return n="0"},O=function(e){var n={t10:"T10",t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&n[e]?n[e]:""},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?n[e]:n},A={tax:"31.2",amount:"10,000"},I=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},E={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",thrower:"Thrower",catcher:"Catcher",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},D="display: block;margin: 0 auto;border-color: red;",_="#ea4c89",B=parseInt(Date.now()/1e3),N=30,M=function(e){var n=1e3*parseInt(e);return new Date(n).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},L={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e*n)/100},U=function(e,n){u.b.dismiss(),"success"===e?u.b.success(n,{position:u.b.POSITION.TOP_LEFT}):"error"===e?u.b.error(n,{position:u.b.POSITION.TOP_LEFT}):"warning"===e?u.b.warn(n,{position:u.b.POSITION.TOP_LEFT}):"info"===e?u.b.info(n,{position:u.b.POSITION.TOP_LEFT}):""===e&&Object(u.b)(n,{position:u.b.POSITION.TOP_LEFT,className:"foo-bar"})},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!=e?{uc:"#23282c",dc:"#08c308",cm:"#c7c70f",cl:"#d21818"}[e]:"#23282c"},$=function(e){e.location!==e.top.location&&(e.top.location=e.location)}},696:function(e,n,t){"use strict";t.r(n);var a=t(64),r=t(65),o=t(67),l=t(66),i=t(68),s=t(0),c=t.n(s),u=t(697),d=t(653),m=t(695),p=t(269),h=t(506),f=c.a.lazy(function(){return Promise.all([t.e(0),t.e(28)]).then(t.bind(null,698))}),y=c.a.lazy(function(){return Promise.all([t.e(2),t.e(67),t.e(29)]).then(t.bind(null,663))}),g=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(30)]).then(t.bind(null,602))}),b=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(31)]).then(t.bind(null,670))}),P=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(32)]).then(t.bind(null,671))}),v=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(33)]).then(t.bind(null,672))}),w=c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(34)]).then(t.bind(null,673))}),C=c.a.lazy(function(){return t.e(35).then(t.bind(null,674))}),T=c.a.lazy(function(){return t.e(36).then(t.bind(null,605))}),z=c.a.lazy(function(){return Promise.all([t.e(0),t.e(37)]).then(t.bind(null,610))}),k=c.a.lazy(function(){return t.e(38).then(t.bind(null,606))}),R=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(39)]).then(t.bind(null,675))}),S=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(40)]).then(t.bind(null,603))}),O=c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(41)]).then(t.bind(null,676))}),F=c.a.lazy(function(){return Promise.all([t.e(0),t.e(42)]).then(t.bind(null,677))}),A=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(3),t.e(43)]).then(t.bind(null,678))}),I=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(44)]).then(t.bind(null,679))}),E=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(45)]).then(t.bind(null,680))}),D=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(46)]).then(t.bind(null,681))}),_=c.a.lazy(function(){return Promise.all([t.e(0),t.e(47)]).then(t.bind(null,682))}),B=c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(48)]).then(t.bind(null,683))}),N=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(68),t.e(49)]).then(t.bind(null,684))}),M=c.a.lazy(function(){return Promise.all([t.e(0),t.e(50)]).then(t.bind(null,611))}),L=c.a.lazy(function(){return t.e(51).then(t.bind(null,685))}),x=c.a.lazy(function(){return t.e(52).then(t.bind(null,686))}),U=c.a.lazy(function(){return t.e(53).then(t.bind(null,687))}),Z=c.a.lazy(function(){return Promise.all([t.e(0),t.e(54)]).then(t.bind(null,607))}),$=c.a.lazy(function(){return t.e(55).then(t.bind(null,688))}),G=c.a.lazy(function(){return Promise.all([t.e(0),t.e(56)]).then(t.bind(null,608))}),j=c.a.lazy(function(){return Promise.all([t.e(0),t.e(57)]).then(t.bind(null,609))}),H=c.a.lazy(function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(58)]).then(t.bind(null,689))}),J=c.a.lazy(function(){return t.e(59).then(t.bind(null,690))}),K=c.a.lazy(function(){return t.e(60).then(t.bind(null,691))}),W=c.a.lazy(function(){return t.e(61).then(t.bind(null,604))}),Y=c.a.lazy(function(){return Promise.all([t.e(0),t.e(62)]).then(t.bind(null,612))}),q=[{path:"/",exact:!0,name:"Home",component:Q},{path:"/matches",name:"Matches",component:f},{path:"/refer",name:"Refer",component:y},{path:"/Faq",name:"Faq",component:z},{path:"/MyProfile",name:"MyProfile",component:w},{path:"/Verifyotp/:username",name:"Verifyotp",component:g},{path:"/Contests/:matchid",name:"Contests",component:b},{path:"/CreateTeams/:matchid",name:"CreateTeams",component:P},{path:"/UpdateTeams/:matchid/:teamid",name:"CreateTeams",component:P},{path:"/CloneTeam/:matchid/:teamid",name:"CreateTeams",component:P},{path:"/MyTeams/:matchid",name:"MyTeams",component:v},{path:"/MyAccount",name:"MyAccount",component:C},{path:"/Refer",name:"Refer",component:y},{path:"/TermsCondition",name:"TermsCondition",component:T},{path:"/Faq",name:"Faq",component:z},{path:"/Support",name:"Support",component:k},{path:"/WithdrawlVerify",name:"WithdrawlVerify",component:R},{path:"/FantasyPointSystem",name:"FantasyPointSystem",component:S},{path:"/AddCash",name:"AddCash",component:O},{path:"/Checkout/:payment_method/:orderid/:amount",name:"Checkout",component:F},{path:"/JoinContest/:matchid/:type",name:"JoinContestType",component:A},{path:"/JoinContest/:matchid",name:"JoinContest",component:A},{path:"/ChooseTeam/:matchid/:poolid/:joincost",name:"ChooseTeam",component:I},{path:"/ChoosePrivateTeam/:matchid/:responsejoin",name:"ChoosePrivateTeam",component:E},{path:"/SwitchTeam/:matchid/:poolid",name:"SwitchTeam",component:B},{path:"/ContestDetails/:matchid/:poolcontestid/:type",name:"ContestDetailsType",component:D},{path:"/ContestDetails/:matchid/:poolcontestid",name:"ContestDetails",component:D},{path:"/ContestDetailsForJoin/:matchid/:poolcontestid",name:"ContestDetailsJoin",component:D},{path:"/MyMatches",name:"MyMatches",component:_},{path:"/LiveScore",name:"LiveScore",component:N},{path:"/FullScoreCard/1/:matchid",name:"FullScoreCard",component:M},{path:"/FullScoreCard/2/:matchid",name:"FootballFullScoreCard",component:c.a.lazy(function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,661))})},{path:"/FullScoreCard/3/:matchid",name:"KabaddiFullScoreCard",component:Y},{path:"/PaytmRedirect/:orderid/:amount/:promocode",name:"PaytmRedirect",component:L},{path:"/PaytmResponse/:orderid/:txid",name:"PaytmResponse",component:x},{path:"/TransactionHistory",name:"TransactionHistory",component:U},{path:"/FantasyScoreCard/:gameid/:matchid",name:"FantasyScoreCard",component:Z},{path:"/Notification",name:"Notification",component:$},{path:"/AboutUs",name:"AboutUs",component:G},{path:"/HowToPlay",name:"HowToPlay",component:j},{path:"/WithdrawCash",name:"WithdrawCash",component:H},{path:"/PrintTeam",name:"PrintTeam",component:J},{path:"/More",name:"More",component:K},{path:"/PrivacyPolicy",name:"Privacy Policy",component:W},{path:"/CreatePrivateContest/:matchid/",name:"Create Private Contest",component:c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(63)]).then(t.bind(null,692))})},{path:"/RazorpayCheckout/:type/:amount/:promocode",name:"RazorpayCheckout",component:c.a.lazy(function(){return Promise.all([t.e(1),t.e(2),t.e(3),t.e(5),t.e(64)]).then(t.bind(null,693))})}],V=(t(101),t(212),c.a.lazy(function(){return t.e(27).then(t.bind(null,662))})),X=function(e){function n(){var e,t;Object(a.a)(this,n);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return(t=Object(o.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(i)))).loading=function(){return c.a.createElement("div",{className:"animated fadeIn pt-1 text-center lod11"},"Loading...")},t}return Object(i.a)(n,e),Object(r.a)(n,[{key:"signOut",value:function(e){e.preventDefault(),this.props.history.push("/login")}},{key:"render",value:function(){return c.a.createElement("div",{className:"app"},c.a.createElement("div",{className:"app-body"},c.a.createElement("main",{id:"main",className:"main"},c.a.createElement(p.a,{fluid:!0},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(u.a,null,q.map(function(e,n){return e.component?c.a.createElement(d.a,{key:n,path:e.path,exact:e.exact,name:e.name,render:function(n){return c.a.createElement(e.component,n)}}):null}),c.a.createElement(m.a,{from:"/",to:"/matches"}))))),c.a.createElement(h.a,{fixed:!0},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(V,null)))))}}]),n}(s.Component),Q=n.default=X}}]);
//# sourceMappingURL=8.676db12f.chunk.js.map