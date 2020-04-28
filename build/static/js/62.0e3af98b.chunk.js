(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{228:function(e,t,n){"use strict";var r=n(433),a=n(444),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return null!==e&&"object"===typeof e}function c(e){return"[object Function]"===o.call(e)}function u(e,t){if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:a,isFormData:function(e){return"undefined"!==typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"===typeof e},isNumber:function(e){return"number"===typeof e},isObject:i,isUndefined:function(e){return"undefined"===typeof e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return i(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!==typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!==typeof window&&"undefined"!==typeof document},forEach:u,merge:function e(){var t={};function n(n,r){"object"===typeof t[r]&&"object"===typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,a=arguments.length;r<a;r++)u(arguments[r],n);return t},extend:function(e,t,n){return u(t,function(t,a){e[a]=n&&"function"===typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},432:function(e,t,n){"use strict";(function(t){var r=n(228),a=n(446),o={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i={adapter:function(){var e;return"undefined"!==typeof XMLHttpRequest?e=n(434):"undefined"!==typeof t&&(e=n(434)),e}(),transformRequest:[function(e,t){return a(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"===typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],function(e){i.headers[e]={}}),r.forEach(["post","put","patch"],function(e){i.headers[e]=r.merge(o)}),e.exports=i}).call(this,n(102))},433:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},434:function(e,t,n){"use strict";var r=n(228),a=n(447),o=n(449),s=n(450),i=n(451),c=n(435),u="undefined"!==typeof window&&window.btoa&&window.btoa.bind(window)||n(452);e.exports=function(e){return new Promise(function(t,f){var l=e.data,p=e.headers;r.isFormData(l)&&delete p["Content-Type"];var d=new XMLHttpRequest,m="onreadystatechange",h=!1;if("undefined"===typeof window||!window.XDomainRequest||"withCredentials"in d||i(e.url)||(d=new window.XDomainRequest,m="onload",h=!0,d.onprogress=function(){},d.ontimeout=function(){}),e.auth){var v=e.auth.username||"",g=e.auth.password||"";p.Authorization="Basic "+u(v+":"+g)}if(d.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d[m]=function(){if(d&&(4===d.readyState||h)&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?s(d.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:1223===d.status?204:d.status,statusText:1223===d.status?"No Content":d.statusText,headers:n,config:e,request:d};a(t,f,r),d=null}},d.onerror=function(){f(c("Network Error",e,null,d)),d=null},d.ontimeout=function(){f(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",d)),d=null},r.isStandardBrowserEnv()){var y=n(453),w=(e.withCredentials||i(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;w&&(p[e.xsrfHeaderName]=w)}if("setRequestHeader"in d&&r.forEach(p,function(e,t){"undefined"===typeof l&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)}),e.withCredentials&&(d.withCredentials=!0),e.responseType)try{d.responseType=e.responseType}catch(b){if("json"!==e.responseType)throw b}"function"===typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"===typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){d&&(d.abort(),f(e),d=null)}),void 0===l&&(l=null),d.send(l)})}},435:function(e,t,n){"use strict";var r=n(448);e.exports=function(e,t,n,a,o){var s=new Error(e);return r(s,t,n,a,o)}},436:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},437:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},439:function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},442:function(e,t,n){e.exports=n(443)},443:function(e,t,n){"use strict";var r=n(228),a=n(433),o=n(445),s=n(432);function i(e){var t=new o(e),n=a(o.prototype.request,t);return r.extend(n,o.prototype,t),r.extend(n,t),n}var c=i(s);c.Axios=o,c.create=function(e){return i(r.merge(s,e))},c.Cancel=n(437),c.CancelToken=n(459),c.isCancel=n(436),c.all=function(e){return Promise.all(e)},c.spread=n(460),e.exports=c,e.exports.default=c},444:function(e,t){function n(e){return!!e.constructor&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"===typeof e.readFloatLE&&"function"===typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},445:function(e,t,n){"use strict";var r=n(432),a=n(228),o=n(454),s=n(455);function i(e){this.defaults=e,this.interceptors={request:new o,response:new o}}i.prototype.request=function(e){"string"===typeof e&&(e=a.merge({url:arguments[0]},arguments[1])),(e=a.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},a.forEach(["delete","get","head","options"],function(e){i.prototype[e]=function(t,n){return this.request(a.merge(n||{},{method:e,url:t}))}}),a.forEach(["post","put","patch"],function(e){i.prototype[e]=function(t,n,r){return this.request(a.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=i},446:function(e,t,n){"use strict";var r=n(228);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},447:function(e,t,n){"use strict";var r=n(435);e.exports=function(e,t,n){var a=n.config.validateStatus;n.status&&a&&!a(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},448:function(e,t,n){"use strict";e.exports=function(e,t,n,r,a){return e.config=t,n&&(e.code=n),e.request=r,e.response=a,e}},449:function(e,t,n){"use strict";var r=n(228);function a(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var o;if(n)o=n(t);else if(r.isURLSearchParams(t))o=t.toString();else{var s=[];r.forEach(t,function(e,t){null!==e&&"undefined"!==typeof e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(a(t)+"="+a(e))}))}),o=s.join("&")}return o&&(e+=(-1===e.indexOf("?")?"?":"&")+o),e}},450:function(e,t,n){"use strict";var r=n(228),a=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,o,s={};return e?(r.forEach(e.split("\n"),function(e){if(o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t){if(s[t]&&a.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},451:function(e,t,n){"use strict";var r=n(228);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function a(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=a(window.location.href),function(t){var n=r.isString(t)?a(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},452:function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function a(){this.message="String contains an invalid character"}a.prototype=new Error,a.prototype.code=5,a.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,o=String(e),s="",i=0,c=r;o.charAt(0|i)||(c="=",i%1);s+=c.charAt(63&t>>8-i%1*8)){if((n=o.charCodeAt(i+=.75))>255)throw new a;t=t<<8|n}return s}},453:function(e,t,n){"use strict";var r=n(228);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,a,o,s){var i=[];i.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),r.isString(a)&&i.push("path="+a),r.isString(o)&&i.push("domain="+o),!0===s&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},454:function(e,t,n){"use strict";var r=n(228);function a(){this.handlers=[]}a.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},a.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},a.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=a},455:function(e,t,n){"use strict";var r=n(228),a=n(456),o=n(436),s=n(432),i=n(457),c=n(458);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!i(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=a(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return u(e),t.data=a(t.data,t.headers,e.transformResponse),t},function(t){return o(t)||(u(e),t&&t.response&&(t.response.data=a(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},456:function(e,t,n){"use strict";var r=n(228);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},457:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},458:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},459:function(e,t,n){"use strict";var r=n(437);function a(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}a.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},a.source=function(){var e;return{token:new a(function(t){e=t}),cancel:e}},e.exports=a},460:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},686:function(e,t,n){"use strict";n.r(t);var r=n(403),a=n(63),o=n(64),s=n(66),i=n(65),c=n(67),u=n(62),f=n(0),l=n.n(f),p=n(275),d=n(199),m=n(212),h=n(442),v=n.n(h),g=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(s.a)(this,Object(i.a)(t).call(this,e)))._isMounted=!1,n.getPrivateContestInfo=function(){n._isMounted=!0;var e,t=Object(u.a)(Object(u.a)(n)),r={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")},body:JSON.stringify({atype:"pvtcontest"})};e="".concat(d.a.API_URL)+"/frontapi/appsettings",t.setState({privateContestInfo:{}}),fetch(e,r).then(function(e){!0===Object(m.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){!1===e.error?t._isMounted&&t.setState({privateContestInfo:e.data,minWinPrize:e.data.pvtcontest?e.data.pvtcontest.winprize.min:0,maxWinPrize:e.data.pvtcontest?e.data.pvtcontest.winprize.max:1e3,minContestSize:e.data.pvtcontest?e.data.pvtcontest.cnstsize.min:2,maxContestSize:e.data.pvtcontest?e.data.pvtcontest.cnstsize.max:100,admincommission:e.data.pvtcontest?e.data.pvtcontest.adminchrg:0}):t._isMounted&&t.setState({privateContestInfo:{}})})}).catch(function(e){Object(m.c)("Wrong",!1,e.toString(),0)})},n.chooseWinningPrize=function(){var e=Object(u.a)(Object(u.a)(n)),t=(n.props.match.params.matchid,e.state.contestName?e.state.contestName:""),r=new FormData;r.append("name",t),r.append("contestsize",e.state.contestSize),r.append("tolwinprize",e.state.totalPrizePool),r.append("type",e.state.isMultipleTeam);var a;a="".concat(d.a.API_URL)+"/frontapi/pvtcnstprzbrk";var o={headers:{"content-type":"multipart/form-data",Authorization:"Bearer "+sessionStorage.getItem("jwt")}};v.a.post(a,r,o).then(function(t){!1===t.data.error?(t.data.data&&e.setState({winPrizeBrkUpData:t.data.data,winnerSlabs:t.data.data.winnerslabs}),Object(m.c)("Save",200,t.data.msg,1)):Object(m.c)("Warning",!1,t.data.msg,3)}).catch(function(e){})},n.onChange=function(e){var t=Object(u.a)(Object(u.a)(n)),a=e.target,o=a.name,s=a.value;t.setState(Object(r.a)({},o,s))},n.handleCheckBox=function(e){var t;t=!0===e.target.checked,n.setState({isMultipleTeam:t})},n.calculateEntryFees=function(){var e=0,t=n.state.contestSize>0?parseInt(n.state.contestSize):0,r=n.state.totalPrizePool>0?parseInt(n.state.totalPrizePool):0,a=n.state.admincommission>0?parseFloat(n.state.admincommission):0;if(r>0&&t>0){var o;o=r/t,e=(e=parseFloat(o)+parseFloat(o*a/100))>1?Math.ceil(e):0,n.setState({entryFees:e})}else n.setState({entryFees:0})},n.state={contestName:"",contestSize:"",totalPrizePool:"",privateContestInfo:{},minWinPrize:0,maxWinPrize:1e3,minContestSize:2,maxContestSize:100,admincommission:0,entryFees:0,isPrizeBreakUp:!1,isMultipleTeam:!1,winPrizeBrkUpData:{},winnerSlabs:[]},Object(m.u)(),n.onChange=n.onChange.bind(Object(u.a)(Object(u.a)(n))),n.handleCheckBox=n.handleCheckBox.bind(Object(u.a)(Object(u.a)(n))),n}return Object(c.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){Object(m.u)(),this.getPrivateContestInfo()}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"fadeIn"},l.a.createElement("div",{className:"left_logincontent profilepadding0"},l.a.createElement("div",{className:"background-cover ng-scope"},l.a.createElement("div",{className:"header_bg"},l.a.createElement("div",{className:"hd_left"},l.a.createElement("span",{onClick:m.k,className:"hd_back"}),l.a.createElement("span",{onClick:m.t,className:"hd_home"})),l.a.createElement("div",{className:"hd_center"},"Create Private Contest")),l.a.createElement(p.AvForm,{onValidSubmit:this.chooseWinningPrize},l.a.createElement("div",{className:"my_profilepage"},l.a.createElement("div",{className:"myprofile_details"},l.a.createElement("div",{className:"profile_titalhead"}),l.a.createElement("div",{className:"profile_fieldsdetails"},l.a.createElement("div",{className:"form-group"},l.a.createElement(p.AvField,{name:"contestName",label:"Give your contest name",placeholder:"(optional)",type:"text"})),l.a.createElement("div",{className:"form-group"},l.a.createElement(p.AvField,{type:"number",label:"Total Prize Pool",className:"form-control",name:"totalPrizePool",onKeyUp:this.calculateEntryFees,onChange:e.onChange,value:e.state.totalPrizePool,placeholder:"min "+this.state.minWinPrize+" & max "+this.state.maxWinPrize,validate:{required:{value:!0,errorMessage:"Please enter total prize pool"},min:{value:this.state.minWinPrize,errorMessage:"Mininmum prize pool should be "+this.state.minWinPrize},max:{value:this.state.maxWinPrize,errorMessage:"Maximum prize pool should be "+this.state.maxWinPrize}}})),l.a.createElement("div",{className:"form-group"},l.a.createElement(p.AvField,{type:"number",label:"Contest Size",className:"form-control",name:"contestSize",onKeyUp:this.calculateEntryFees,onChange:e.onChange,value:e.state.contestSize,placeholder:"min "+this.state.minContestSize+" & max "+this.state.maxContestSize,validate:{required:{value:!0,errorMessage:"Please enter contest size"},min:{value:this.state.minContestSize,errorMessage:"Mininmum contest size should be "+this.state.minContestSize},max:{value:this.state.maxContestSize,errorMessage:"Maximum contest size should be "+this.state.maxContestSize}}})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null," ",l.a.createElement("input",{type:"checkbox",name:"isMultipleTeam",value:"1",checked:!0===e.state.isMultipleTeam,onChange:function(t){return e.handleCheckBox(t)}}),"Allow friends to join multiple teams")),l.a.createElement("div",{className:"privateContestFeePerTeam"},l.a.createElement("div",{className:"privateContestFee"},"Entry Per Team:",l.a.createElement("span",{className:"privateContestFeeAmount"},this.state.entryFees?this.state.entryFees:0)),l.a.createElement("div",{className:"privateContestFeeMessage"},"Entry is calculated based on total prize amount & contest size"))),l.a.createElement("button",{className:"all_transaction up_bt pointer"},"CHOOSE WINNING BREAKUP")))))))}}]),t}(f.Component);t.default=g}}]);
//# sourceMappingURL=62.0e3af98b.chunk.js.map