(window.webpackJsonp=window.webpackJsonp||[]).push([[16,26,40],{177:function(e,t,n){"use strict";n.r(t),n.d(t,"getScrollbarWidth",function(){return c}),n.d(t,"setScrollbarWidth",function(){return l}),n.d(t,"isBodyOverflowing",function(){return u}),n.d(t,"getOriginalBodyPadding",function(){return d}),n.d(t,"conditionallyUpdateScrollbar",function(){return p}),n.d(t,"setGlobalCssModule",function(){return f}),n.d(t,"mapToCssModules",function(){return m}),n.d(t,"omit",function(){return y}),n.d(t,"pick",function(){return g}),n.d(t,"warnOnce",function(){return h}),n.d(t,"deprecated",function(){return v}),n.d(t,"DOMElement",function(){return E}),n.d(t,"targetPropType",function(){return O}),n.d(t,"tagPropType",function(){return T}),n.d(t,"TransitionTimeouts",function(){return w}),n.d(t,"TransitionPropTypeKeys",function(){return k}),n.d(t,"TransitionStatuses",function(){return N}),n.d(t,"keyCodes",function(){return P}),n.d(t,"PopperPlacements",function(){return x}),n.d(t,"canUseDOM",function(){return _}),n.d(t,"isReactRefObj",function(){return j}),n.d(t,"findDOMElements",function(){return S}),n.d(t,"isArrayOrNodeList",function(){return C}),n.d(t,"getTarget",function(){return A}),n.d(t,"defaultToggleEvents",function(){return R}),n.d(t,"addMultipleEventListeners",function(){return I}),n.d(t,"focusableElements",function(){return F});var a,r=n(425),o=n.n(r),s=n(1),i=n.n(s);function c(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}function l(e){document.body.style.paddingRight=e>0?e+"px":null}function u(){return document.body.clientWidth<window.innerWidth}function d(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function p(){var e=c(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=t?parseInt(t.style.paddingRight||0,10):0;u()&&l(n+e)}function f(e){a=e}function m(e,t){return void 0===e&&(e=""),void 0===t&&(t=a),t?e.split(" ").map(function(e){return t[e]||e}).join(" "):e}function y(e,t){var n={};return Object.keys(e).forEach(function(a){-1===t.indexOf(a)&&(n[a]=e[a])}),n}function g(e,t){for(var n,a=Array.isArray(t)?t:[t],r=a.length,o={};r>0;)o[n=a[r-=1]]=e[n];return o}var b={};function h(e){b[e]||("undefined"!==typeof console&&console.error(e),b[e]=!0)}function v(e,t){return function(n,a,r){null!==n[a]&&"undefined"!==typeof n[a]&&h('"'+a+'" property of "'+r+'" has been deprecated.\n'+t);for(var o=arguments.length,s=new Array(o>3?o-3:0),i=3;i<o;i++)s[i-3]=arguments[i];return e.apply(void 0,[n,a,r].concat(s))}}function E(e,t,n){if(!(e[t]instanceof Element))return new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var O=i.a.oneOfType([i.a.string,i.a.func,E,i.a.shape({current:i.a.any})]),T=i.a.oneOfType([i.a.func,i.a.string,i.a.shape({$$typeof:i.a.symbol,render:i.a.func}),i.a.arrayOf(i.a.oneOfType([i.a.func,i.a.string,i.a.shape({$$typeof:i.a.symbol,render:i.a.func})]))]),w={Fade:150,Collapse:350,Modal:300,Carousel:600},k=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],N={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},P={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},x=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],_=!("undefined"===typeof window||!window.document||!window.document.createElement);function j(e){return!(!e||"object"!==typeof e)&&"current"in e}function S(e){if(j(e))return e.current;if(o()(e))return e();if("string"===typeof e&&_){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#"+e)),!t.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return t}return e}function C(e){return null!==e&&(Array.isArray(e)||_&&"number"===typeof e.length)}function A(e){var t=S(e);return C(t)?t[0]:t}var R=["touchstart","click"];function I(e,t,n,a){var r=e;C(r)||(r=[r]);var o=n;if("string"===typeof o&&(o=o.split(/\s+/)),!C(r)||"function"!==typeof t||!Array.isArray(o))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(o,function(e){Array.prototype.forEach.call(r,function(n){n.addEventListener(e,t,a)})}),function(){Array.prototype.forEach.call(o,function(e){Array.prototype.forEach.call(r,function(n){n.removeEventListener(e,t,a)})})}}var F=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},179:function(e,t,n){"use strict";function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}n.d(t,"a",function(){return a})},180:function(e,t,n){"use strict";function a(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}n.d(t,"a",function(){return a})},187:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n(403);function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){Object(a.a)(e,t,n[t])})}return e}},200:function(e,t,n){"use strict";t.a={API_URL:"https://11plays.com/11plays/public",API_NODE_URL:"https://score.11plays.com",HOST_URL:"https://play.11plays.com",APK_URL:"https://11plays.com/apk/11play.apk",MAIN_URL:"https://play.11plays.com",REFER_FRIEND:"https://play.11plays.com/#/Register",FB_APP_ID:"1829567023847369",GOOGLE_CLIENT_ID:"1069443540619-eilha28gu288dgforh0psrn7qefgmocc.apps.googleusercontent.com",PAYTM_TXN_URL:"https://securegw-stage.paytm.in/theia/processTransaction",RAZORPAY_KEY:"rzp_test_WTwazc7mLkdycg",SUPPORT_EMAIL:"support@11plays.com",SUPPORT_CONTACT_NO:"+91 8327302001",MATCHPOINT_URL:"./../../images",PRODUCT_NAME:"11Plays",PRODUCT_SHORT_NAME:"11Plays",PROJECT_CODE:"1",IS_PRIVATE_CONT:!0,IS_RAZORPAY:!0}},212:function(e,t,n){"use strict";n.d(t,"a",function(){return d}),n.d(t,"g",function(){return p}),n.d(t,"c",function(){return f}),n.d(t,"E",function(){return m}),n.d(t,"d",function(){return y}),n.d(t,"t",function(){return g}),n.d(t,"y",function(){return b}),n.d(t,"A",function(){return h}),n.d(t,"k",function(){return v}),n.d(t,"v",function(){return E}),n.d(t,"w",function(){return O}),n.d(t,"D",function(){return T}),n.d(t,"o",function(){return w}),n.d(t,"j",function(){return k}),n.d(t,"e",function(){return N}),n.d(t,"r",function(){return P}),n.d(t,"i",function(){return x}),n.d(t,"m",function(){return _}),n.d(t,"n",function(){return j}),n.d(t,"x",function(){return S}),n.d(t,"C",function(){return C}),n.d(t,"q",function(){return A}),n.d(t,"p",function(){return R}),n.d(t,"l",function(){return I}),n.d(t,"f",function(){return F}),n.d(t,"b",function(){return D}),n.d(t,"z",function(){return M}),n.d(t,"h",function(){return L}),n.d(t,"u",function(){return B}),n.d(t,"B",function(){return G}),n.d(t,"s",function(){return U});var a=n(272),r=n.n(a),o=n(405),s=n.n(o),i=n(406),c=n.n(i),l=n(200),u=(n(407),n(404)),d="/#",p=d+"/matches",f=function(e,t,n,a){if(401===t||403===t)return window.location.href=d+"/login";if(500===t)return"";if(1===a)r()({title:e,text:n,icon:"success",className:"swall-custom-class"});else if(0===a)r()({title:e+"!",text:n||"Something went wrong",icon:"error",className:"swall-custom-class"});else{if(3!==a)return!0;r()({title:e+"!",text:n||"Something went wrong",icon:"warning",className:"swall-custom-class"})}},m={username:"^[0-9]+$",email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,address:/^[a-zA-Z0-9\s,.'-]{1,}$/,percentage:/(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/,averagenumber:"^[0-9]{1}+$",password:/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,mobile10verify:/[0-9]/g,phneEmailid:/^((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))|([0-9]{9,}))\w+$/,pancard:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,ifsc:/^[A-Za-z]{4}\d{7}$/},y=function(e){var t=new Date(e),n=new Date;return new s.a(t,n).seconds()},g=function(e){var t=e%3600,n=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(n)}},b=function(e){if(e){var t=1e3*parseInt(e),n=new Date(t);return c()(n,"yyyy-mm-dd")}return""},h=function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+("0"+t.getMonth()).slice(-2)+"-"+("0"+t.getDate()).slice(-2)+" "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)},v=function(){window.history.back()},E=function(){window.location.href=d+"/home"},O=function(){return!!sessionStorage.getItem("jwt")},T={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},w={tab1:{name:"Fixtures",key:"fixtures"},tab2:{name:"Live",key:"live"},tab3:{name:"Results",key:"results"}},k=function(){return new Promise(function(e,t){var n="".concat(l.a.API_URL);fetch(n+"/gettime",{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(t){t.json().then(function(t){var n=t.data.time,a=1e3*parseInt(n);e(a)})})})},N=function(e,t){var n=new Date(e),a=new Date(t);return new s.a(n,a).seconds()-0},P={playing:"Playing 11",run:"Run",four:"Boundary Bonus",six:"Six Bonus",fifty:"Half-century Bonus",hundred:"Century Bonus",wicket:"Wicket",fourwhb:"4 wicket haul Bonus",fivewhb:"5 wicket haul Bonus ",mdnover:"Maiden over",catch:"Catch",stumped:"Stumping",runout:"Run-out(Direct)",duck:"Duck",thrower:"Thrower",catcher:"Catcher",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",srmball:"SR min balls",ermover:"ER min over"},x=function(e){var t="";if(e){var n=parseInt(e).toString(),a="";if(6!=n.length&&7!=n.length||(a=" Lac"),n.length>7&&(a=" Cr"),n.length>=6&&n.length<=8)if(n.length%2===0){var r=n.substring(0,2);t=parseInt(r)/10+a}else{var o=n.substring(0,3);t=parseInt(o)/10+a}else if(n.length>8){var s=n.substring(0,n.length-6);t=parseInt(s)/10+a}else t=n;return t}return t="0"},_=function(e){var t={t20:"T20",test:"Test","one-day":"ODI",ODI:"ODI",kabaddi:"Kabaddi"};return e&&t[e]?t[e]:""},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t={uc:"Upcomming",dc:"Completed",cm:"Under Review",cl:"Canceled"};return null!=e?t[e]:t},S={tax:"31.2",amount:"10,000"},C=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(e){return e.toUpperCase()})},A={1:{playername:"Player Name",playeingPoints:"Playing Points",run:"Runs",four:"4's",six:"6's",wicket:"Wickets",mdnover:"Maiden Overs",catch:"Catch",stumped:"Stumped",runout:"Run Out",fiftyBonus:"50's Bonus",hundredBonus:"100's Bonus",fourwhb:"4 Wkts",fivewhb:"5 Wkts",duck:"Duck",srone:"Between 60-70 runs per 100 balls",srtwo:"Between 50-59.9 runs per 100 balls",srthree:"Below 50 runs per 100 balls",erone:"Below 4 runs per over",ertwo:"Between 4-4.99 runs per over",erthree:"Between 5-6 runs per over",erfour:"Between 9-10 runs per over",erfive:"Between 10.1-11 runs per over",ersix:"Above 11 runs per over",er:"E/R",sr:"S/R",totalpoints:"Total Points"},2:{playername:"Player Name",role:"Role",playing:"Playing Points",goal:"Goal",assist:"Assist",owngoal:"Own Goal",goalsaved:"Shot saved",goalsconceded:"Goals Conceded",cleansheet:"Clean Sheet",penaltysave:"Penalty Save",yellowcard:"Yellow Card",redcard:"Red Card",penaltymissed:"Penalty Missed",passes:"Passes",tackles:"Tackles",shotontarget:"Shot On Target",totalpoints:"Total Points"},3:{playername:"Player Name",playeingPoints:"Playing Points",raidbonus:"Raid Bonus",unsuccessraid:"Unsuccess Raid",successtackle:"Success Tackle",touch:"Touch",supertackle:"Super Tackle",redcard:"Red Card",greencard:"Green Card",yellowcard:"Yellow Card",pushallout:"Push All Out",getallout:"Get All Out",totalpoints:"Total Points"}},R="display: block;margin: 0 auto;border-color: red;",I="#ea4c89",F=parseInt(Date.now()/1e3),D=30,M=function(e){var t=1e3*parseInt(e);return new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}).replace(/ /g," ")},L={football:{playfiftyfivemin:"Played 55 minutes or more",playlessfiftyfive:"Played less than 55 minutes",goalfor:"For every goal scored (Forward)",goalmid:"For every goal scored (Midfielder)",goalgk:"For every goal scored (GK)",goaldef:"For every goal scored (Defender)",assist:"For every assist",passes:"For every 10 passes completed",shotontarget:"For every 2 shots on target",cleansheetmid:"Clean sheet (Midfielder)",cleansheetgk:"Clean sheet (GK)",cleansheetdef:"Clean sheet (Defender)",goalsaved:"For every 3 shots saved(GK)",penaltysavegk:"For every penalty saved (GK)",tackles:"For every 3 successful tackles made",yellowcard:"Yellow card",redcard:"Red card",owngoal:"For every own goal",goalsconcededgk:"For every 2 goals conceded (GK)",goalsconcededdef:"For every 2 goals conceded (Defender)",penaltymissed:"For every penalty missed"},kabaddi:{playing:"In Starting 7",touch:"For every successful raid touch point",raidbonus:"Raid Bonus",successtackle:"For every successful tackle",unsuccessraid:"For every unsuccessful raid",supertackle:"Super tackle",pushallout:"Pushing all out (starting 7)",getallout:"Getting all out (starting 7)",greencard:"Green Card",yellowcard:"Yellow Card",redcard:"Red card",makesubstitute:"Substitute appearance"}},B=function(e){e.location!==e.top.location&&(e.top.location=e.location)},G=function(e,t){u.b.dismiss(),"success"===e?u.b.success(t,{position:u.b.POSITION.TOP_LEFT}):"error"===e?u.b.error(t,{position:u.b.POSITION.TOP_LEFT}):"warning"===e?u.b.warn(t,{position:u.b.POSITION.TOP_LEFT}):"info"===e?u.b.info(t,{position:u.b.POSITION.TOP_LEFT}):""===e&&Object(u.b)(t,{position:u.b.POSITION.TOP_LEFT,className:"foo-bar"})},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e*t)/100}},216:function(e,t,n){"use strict";var a,r=n(179),o=n(61),s=n(180),i=n(62),c=n(187),l=n(0),u=n.n(l),d=n(1),p=n.n(d),f=n(178),m=n.n(f),y=n(271),g=n(177),b=Object(c.a)({},y.Transition.propTypes,{isOpen:p.a.bool,children:p.a.oneOfType([p.a.arrayOf(p.a.node),p.a.node]),tag:g.tagPropType,className:p.a.node,navbar:p.a.bool,cssModule:p.a.object,innerRef:p.a.oneOfType([p.a.func,p.a.string,p.a.object])}),h=Object(c.a)({},y.Transition.defaultProps,{isOpen:!1,appear:!1,enter:!0,exit:!0,tag:"div",timeout:g.TransitionTimeouts.Collapse}),v=((a={})[g.TransitionStatuses.ENTERING]="collapsing",a[g.TransitionStatuses.ENTERED]="collapse show",a[g.TransitionStatuses.EXITING]="collapsing",a[g.TransitionStatuses.EXITED]="collapse",a);function E(e){return e.scrollHeight}var O=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={height:null},["onEntering","onEntered","onExit","onExiting","onExited"].forEach(function(e){n[e]=n[e].bind(Object(i.a)(Object(i.a)(n)))}),n}Object(s.a)(t,e);var n=t.prototype;return n.onEntering=function(e,t){this.setState({height:E(e)}),this.props.onEntering(e,t)},n.onEntered=function(e,t){this.setState({height:null}),this.props.onEntered(e,t)},n.onExit=function(e){this.setState({height:E(e)}),this.props.onExit(e)},n.onExiting=function(e){e.offsetHeight;this.setState({height:0}),this.props.onExiting(e)},n.onExited=function(e){this.setState({height:null}),this.props.onExited(e)},n.render=function(){var e=this,t=this.props,n=t.tag,a=t.isOpen,s=t.className,i=t.navbar,l=t.cssModule,d=t.children,p=(t.innerRef,Object(o.a)(t,["tag","isOpen","className","navbar","cssModule","children","innerRef"])),f=this.state.height,b=Object(g.pick)(p,g.TransitionPropTypeKeys),h=Object(g.omit)(p,g.TransitionPropTypeKeys);return u.a.createElement(y.Transition,Object(r.a)({},b,{in:a,onEntering:this.onEntering,onEntered:this.onEntered,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}),function(t){var a=function(e){return v[e]||"collapse"}(t),o=Object(g.mapToCssModules)(m()(s,a,i&&"navbar-collapse"),l),p=null===f?null:{height:f};return u.a.createElement(n,Object(r.a)({},h,{style:Object(c.a)({},h.style,p),className:o,ref:e.props.innerRef}),d)})},t}(l.Component);O.propTypes=b,O.defaultProps=h,t.a=O},232:function(e,t,n){"use strict";var a=n(179),r=n(61),o=n(0),s=n.n(o),i=n(1),c=n.n(i),l=n(178),u=n.n(l),d=n(177),p={tag:d.tagPropType,inverse:c.a.bool,color:c.a.string,block:Object(d.deprecated)(c.a.bool,'Please use the props "body"'),body:c.a.bool,outline:c.a.bool,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},f=function(e){var t=e.className,n=e.cssModule,o=e.color,i=e.block,c=e.body,l=e.inverse,p=e.outline,f=e.tag,m=e.innerRef,y=Object(r.a)(e,["className","cssModule","color","block","body","inverse","outline","tag","innerRef"]),g=Object(d.mapToCssModules)(u()(t,"card",!!l&&"text-white",!(!i&&!c)&&"card-body",!!o&&(p?"border":"bg")+"-"+o),n);return s.a.createElement(f,Object(a.a)({},y,{className:g,ref:m}))};f.propTypes=p,f.defaultProps={tag:"div"},t.a=f},403:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return a})},425:function(e,t,n){(function(t){var n="[object AsyncFunction]",a="[object Function]",r="[object GeneratorFunction]",o="[object Null]",s="[object Proxy]",i="[object Undefined]",c="object"==typeof t&&t&&t.Object===Object&&t,l="object"==typeof self&&self&&self.Object===Object&&self,u=c||l||Function("return this")(),d=Object.prototype,p=d.hasOwnProperty,f=d.toString,m=u.Symbol,y=m?m.toStringTag:void 0;function g(e){return null==e?void 0===e?i:o:y&&y in Object(e)?function(e){var t=p.call(e,y),n=e[y];try{e[y]=void 0;var a=!0}catch(o){}var r=f.call(e);a&&(t?e[y]=n:delete e[y]);return r}(e):function(e){return f.call(e)}(e)}e.exports=function(e){if(!function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}(e))return!1;var t=g(e);return t==a||t==r||t==n||t==s}}).call(this,n(47))},491:function(e,t,n){e.exports=n.p+"static/media/cricket.3e37c804.svg"},492:function(e,t,n){e.exports=n.p+"static/media/football.c21a0b07.svg"},493:function(e,t,n){e.exports=n.p+"static/media/kabaddi.496e8fc3.svg"},494:function(e,t,n){e.exports=n.p+"static/media/captain.410cfc80.svg"},495:function(e,t,n){e.exports=n.p+"static/media/vice_captain.17b4db92.svg"},603:function(e,t,n){"use strict";n.r(t);var a=n(64),r=n(65),o=n(67),s=n(66),i=n(68),c=n(62),l=n(0),u=n.n(l),d=n(212),p=n(216),f=n(232),m=n(200),y=n(275),g=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(s.a)(t).call(this,e))).onClickActive=function(e){"cricket"==n.state.gametype?("tab1"===e.target.id&&n.getFantasyPointes("cricket","Twenty20"),"tab2"===e.target.id&&n.getFantasyPointes("cricket","ODI"),"tab3"===e.target.id&&n.getFantasyPointes("cricket","Test"),n.setState({tabstatus:e.target.id})):"kabaddi"==n.state.gametype?n.getFantasyPointes(n.state.gametype,n.state.gametype):n.state.gametype},n.onClickGameType=function(e){e.currentTarget.dataset.gametype&&(n.setState({gametype:e.currentTarget.dataset.gametype}),"cricket"==e.currentTarget.dataset.gametype?n.getFantasyPointes(e.currentTarget.dataset.gametype,"Twenty20"):"kabaddi"==e.currentTarget.dataset.gametype?n.getFantasyPointes(e.currentTarget.dataset.gametype,e.currentTarget.dataset.gametype):"football"==e.currentTarget.dataset.gametype&&n.getFantasyPointes(e.currentTarget.dataset.gametype,e.currentTarget.dataset.gametype))},n.getFantasyPointes=function(e,t){var a=Object(c.a)(Object(c.a)(n));a.setState({isLoading:!0});var r,o={gametype:e,mtype:t},s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)};r="".concat(m.a.API_URL)+"/fantasyptssytm",a.setState({fantasypointslist:{}}),fetch(r,s).then(function(e){a.setState({isLoading:!1}),!0===Object(d.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){!1===e.error?a.setState({fantasypointslist:e.data[t],fantasytxt:e.details&&e.details.fantasytxt?e.details.fantasytxt:"<p></p>"}):a.setState({fantasypointslist:{},fantasytxt:""})})}).catch(function(e){a.setState({isLoading:!1}),Object(d.c)("Wrong",!1,e.toString(),0)})},n.state={collapse:[],tabstatus:"tab1",fantasypointslist:{},isLoading:!1,gametype:"cricket",fantasytxt:"<p></p>"},n.toggle=n.toggle.bind(Object(c.a)(Object(c.a)(n))),n.onClickGameType=n.onClickGameType.bind(Object(c.a)(Object(c.a)(n))),n}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getFantasyPointes("cricket","Twenty20")}},{key:"toggle",value:function(e){var t=this.state.collapse,n=!!this.state.collapse[e.target.id]&&this.state.collapse[e.target.id];t[e.target.id]=!n,this.setState({collapse:t})}},{key:"render",value:function(){var e=this,t=this.state.fantasytxt;return u.a.createElement("div",{className:"fadeIn"},u.a.createElement("div",{className:"loaderdiv"+(!0===this.state.isLoading?"":" hidden")},u.a.createElement(y.ClipLoader,{css:d.p,sizeUnit:"px",size:60,color:d.l,loading:this.state.isLoading})),u.a.createElement("div",{className:"left_logincontent profilepadding0"},u.a.createElement("div",{className:"background-cover ng-scope"},u.a.createElement("div",{className:"header_bg"+("/FantasyPointSystem/mobile"===this.props.location.pathname?" hidden":"")},u.a.createElement("div",{className:"hd_left"},u.a.createElement("span",{onClick:d.k,className:"hd_back"}),u.a.createElement("span",{onClick:d.v,className:"hd_home"})),u.a.createElement("div",{className:"hd_center"},"Fantasy Points System")),u.a.createElement("div",{className:"select_match_type section_cls"},u.a.createElement("div",{className:"fantcy_poisystem"},u.a.createElement("h2",null,"Here\u2019s how your team ",u.a.createElement("span",null,u.a.createElement("u",null,"earns points")))),u.a.createElement("div",{className:"tab_area"},u.a.createElement("ul",{className:"nav nav-pills fantasy_pointsystab"},u.a.createElement("li",{className:"cricket"===this.state.gametype?"active":""},u.a.createElement("span",{"data-toggle":"tab",className:"fant_systempointlist",id:"tab1",alt:"cricket","data-gametype":"cricket","data-id":"tab1",onClick:this.onClickGameType},u.a.createElement("img",{src:n(491)}),u.a.createElement("span",{className:"mt_namefanpoint"},"Cricket")," ")),u.a.createElement("li",{className:"football"===this.state.gametype?"active":""},u.a.createElement("a",{"data-toggle":"tab",id:"tab2",alt:"football","data-gametype":"football","data-id":"tab2",onClick:this.onClickGameType,className:"fant_systempointlist"},u.a.createElement("img",{src:n(492)}),u.a.createElement("span",{className:"mt_namefanpoint"},"Football")," ")),u.a.createElement("li",{className:"kabaddi"===this.state.gametype?"active":""},u.a.createElement("a",{"data-toggle":"tab",id:"tab1",alt:"kabaddi","data-gametype":"kabaddi","data-id":"tab3",onClick:this.onClickGameType,className:"fant_systempointlist"},u.a.createElement("img",{src:n(493)}),u.a.createElement("span",{className:"mt_namefanpoint"},"Kabaddi")," "))),u.a.createElement("div",{className:"tab-content clearfix"},u.a.createElement("div",{className:"tab-pane active",id:"match1"},u.a.createElement("div",{className:"caption_etionmain"},u.a.createElement("div",{className:"your_selectedbox"},u.a.createElement("figure",null,u.a.createElement("img",{src:n(494),alt:"captain"})),u.a.createElement("p",{className:"cap_text"},"Your selected Captain will be awarded ",u.a.createElement("b",null,"2x points")," for his on-field performance.")),u.a.createElement("div",{className:"your_selectedbox"},u.a.createElement("figure",null,u.a.createElement("img",{src:n(495),alt:"vice captain"})," "),u.a.createElement("p",{className:"cap_text"},"A player selected to be the Vice-captain of your team will be given ",u.a.createElement("b",null,"1.5x points")," for his on-field performance.")),u.a.createElement("div",{className:"tab_area home_nttabsbox matchboxes_intels"},this.state.fantasypointslist&&"cricket"==this.state.gametype?u.a.createElement("ul",{className:"nav nav-pills tabforfantasy_pointpage"},u.a.createElement("li",{className:"tab1"===this.state.tabstatus?"active":""},u.a.createElement("a",{id:"tab1",onClick:this.onClickActive,"data-toggle":"tab"},"T20 ")),u.a.createElement("li",{className:"tab2"===this.state.tabstatus?"active":""},u.a.createElement("a",{id:"tab2",onClick:this.onClickActive,"data-toggle":"tab"},"Odi ")),u.a.createElement("li",{className:"tab3"===this.state.tabstatus?"active":""},u.a.createElement("a",{id:"tab3",onClick:this.onClickActive,"data-toggle":"tab"},"Test "))):"",u.a.createElement("div",{className:"tab-content clearfix"},u.a.createElement("div",{className:"tab-pane active",id:"point1"},u.a.createElement("div",{className:"inner_bodyarea"},this.state.fantasypointslist&&"cricket"==this.state.gametype?u.a.createElement("div",{className:"faq_accordian_pg"},u.a.createElement("div",{className:"panel-group",id:"accordion"},this.state.fantasypointslist?Object.values(this.state.fantasypointslist).map(function(t,n){return u.a.createElement("div",{className:"panel panel-default",key:n},u.a.createElement("div",{id:n+1,onClick:e.toggle,className:"panel-heading pointer"},u.a.createElement("h4",{className:"panel-title pointernone text-cap"+(!0===e.state.collapse[n+1]?"":" collapsed"),"data-toggle":"collapse","data-parent":"#accordion",href:"#collapse1"},Object.keys(e.state.fantasypointslist)[n])),u.a.createElement(p.a,{isOpen:e.state.collapse[n+1]},u.a.createElement(f.a,null,u.a.createElement("div",{id:"collapse1",className:"panel-collapse in"},u.a.createElement("div",{className:"panel-body"},u.a.createElement("div",{className:"fan_innertablebt table-responsive"},u.a.createElement("table",{className:"table table-striped"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Type of points"),u.a.createElement("th",null))),u.a.createElement("tbody",null,Object.values(t).map(function(e,n){return u.a.createElement("tr",{key:n},u.a.createElement("td",{className:"text-cap"},d.r[Object.keys(t)[n]]),u.a.createElement("td",null,Object.values(t)[n]))})))))))))}):"")):"",!this.state.fantasypointslist||"kabaddi"!=this.state.gametype&&"football"!=this.state.gametype?"":u.a.createElement(f.a,null,u.a.createElement("div",{id:"collapse1",className:"panel-collapse in"},u.a.createElement("div",{className:"panel-body"},u.a.createElement("div",{className:"fan_innertablebt table-responsive"},u.a.createElement("table",{className:"table table-striped"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Action"),u.a.createElement("th",null,"Points"))),u.a.createElement("tbody",null,d.h?Object.keys(d.h[e.state.gametype]).map(function(t,n){return u.a.createElement("tr",{key:n},u.a.createElement("td",{className:"text-caps"}," ",d.h[e.state.gametype]&&d.h[e.state.gametype][t]?d.h[e.state.gametype][t]:""),u.a.createElement("td",null,e.state.fantasypointslist?e.state.fantasypointslist[t]:""))}):""))))))),u.a.createElement("div",{className:"footbal_point_text kabaddi_points",dangerouslySetInnerHTML:{__html:t}}))))))))))))}}]),t}(l.Component);t.default=g}}]);
//# sourceMappingURL=16.35023f18.chunk.js.map