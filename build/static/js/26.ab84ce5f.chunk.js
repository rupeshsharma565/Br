(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{199:function(e,n,r){"use strict";n.a={API_URL:"https://11plays.com/11plays/public",API_NODE_URL:"https://score.11plays.com",HOST_URL:"https://play.11plays.com",APK_URL:"https://11plays.com/apk/11play.apk",MAIN_URL:"https://play.11plays.com",REFER_FRIEND:"https://play.11plays.com/#/Register",FB_APP_ID:"",GOOGLE_CLIENT_ID:"",PAYTM_TXN_URL:"https://securegw-stage.paytm.in/theia/processTransaction",RAZORPAY_KEY:"rzp_live_EBSVqhdSfYQZBp",SUPPORT_EMAIL:"support@11plays.com",SUPPORT_CONTACT_NO:"+91 8327302001",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"11Plays",PRODUCT_SHORT_NAME:"11Plays",PROJECT_CODE:"1",IS_PRIVATE_CONT:!1,IS_RAZORPAY:!0}},212:function(e,n,r){"use strict";r.d(n,"a",function(){return c}),r.d(n,"g",function(){return d}),r.d(n,"c",function(){return p}),r.d(n,"B",function(){return f}),r.d(n,"d",function(){return g}),r.d(n,"s",function(){return y}),r.d(n,"w",function(){return h}),r.d(n,"y",function(){return w}),r.d(n,"k",function(){return v}),r.d(n,"t",function(){return m}),r.d(n,"u",function(){return k}),r.d(n,"A",function(){return P}),r.d(n,"o",function(){return R}),r.d(n,"j",function(){return b}),r.d(n,"e",function(){return A}),r.d(n,"r",function(){return B}),r.d(n,"i",function(){return C}),r.d(n,"m",function(){return T}),r.d(n,"n",function(){return S}),r.d(n,"v",function(){return _}),r.d(n,"z",function(){return I}),r.d(n,"q",function(){return D}),r.d(n,"p",function(){return O}),r.d(n,"l",function(){return F}),r.d(n,"f",function(){return E}),r.d(n,"b",function(){return N}),r.d(n,"x",function(){return Z}),r.d(n,"h",function(){return $});var t=r(272),a=r.n(t),s=r(404),o=r.n(s),u=r(405),l=r.n(u),i=r(199),c=(r(406),"/#"),d=c+"/matches",p=function(e,n,r,t){if(401===n||403===n)return window.location.href=c+"/login";if(500===n)return"";if(1===t)a()({title:e,text:r,icon:"success",className:"swall-custom-class"});else if(0===t)a()({title:e+"!",text:r||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==t)return!0;a()({title:e+"!",text:r||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},f={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},g=function(e){var n=new Date(e),r=new Date;return new o.a(n,r).seconds()},y=function(e){var n=e%3600,r=n%60;return{h:Math.floor(e/3600),m:Math.floor(n/60),s:Math.ceil(r)}},h=function(e){if(e){var n=1e3*parseInt(e),r=new Date(n);return l()(r,"yyyy-mm-dd")}return""},w=function(e){var n=new Date(1e3*e);return n.getFullYear()+"-"+("0"+n.getMonth()).slice(-2)+"-"+("0"+n.getDate()).slice(-2)+" "+("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2)+":"+("0"+n.getSeconds()).slice(-2)},v=function(){window.history.back()},m=function(){window.location.href=c+"/home"},k=function(){return!!sessionStorage.getItem("jwt")},P={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},R={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},b=function(){return new Promise(function(e,n){var r="".concat(i.a.API_URL);fetch(r+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(n){n.json().then(function(n){var r=n.data.time,t=1e3*parseInt(r);e(t)})})})},A=function(e,n){var r=new Date(e),t=new Date(n);return new o.a(r,t).seconds()-0},B={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},C=function(e){var n="";if(e){var r=parseInt(e).toString(),t="";if(6!=r.length&&7!=r.length||(t=" Lac"),r.length>7&&(t=" Cr"),r.length>=6&&r.length<=8)if(r.length%2===0){var a=r.substring(0,2);n=parseInt(a)/10+t}else{var s=r.substring(0,3);n=parseInt(s)/10+t}else if(r.length>8){var o=r.substring(0,r.length-6);n=parseInt(o)/10+t}else n=r;return n}return n="0"},T=function(e){var n={t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&n[e]?n[e]:""},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?n[e]:n},_={tax:"31.2",amount:"10,000"},I=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},D={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},O="display: block;margin: 0 auto;border-color: red;",F="#ea4c89",E=parseInt(Date.now()/1e3),N=30,Z=function(e){var n=1e3*parseInt(e);return new Date(n).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},$={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}}}}]);
//# sourceMappingURL=26.ab84ce5f.chunk.js.map