(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{622:function(e,t,a){e.exports=a.p+"static/media/refer.524e1923.png"},658:function(e,t,a){"use strict";a.r(t);var n=a(63),r=a(64),o=a(66),s=a(65),c=a(67),l=a(62),i=a(0),d=a.n(i),m=a(199),f=a(212),u=a(659),h=a(660),g=a(661),E=a(662),p=a(663),b=a(664),R=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).getReferCode=function(){var e=Object(l.a)(Object(l.a)(a)),t={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")}},n="".concat(m.a.API_URL);fetch(n+"/frontapi/getrefercode",t).then(function(t){!0===Object(f.c)("Wrong",t.status,t.message,2)&&t.json().then(function(t){t&&t.data?e.setState({getReferCodeDetail:t.data}):e.setState({getReferCodeDetail:{}})})}).catch(function(e){Object(f.c)("Wrong",!1,e.toString(),0)})},a.copyToClipboard=function(e,t){var a=document.createElement("textarea");a.innerText=e;var n=document.getElementById(t);n.appendChild(a),a.select(),document.execCommand("copy"),n.removeChild(a),document.getElementById("myTooltip").innerHTML="Copied: "+e},a.state={getReferCodeDetail:{}},Object(f.u)(),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){Object(f.u)(),this.getReferCode()}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:"fadeIn"},d.a.createElement("div",{className:"left_logincontent profilepadding0"},d.a.createElement("div",{className:"background-cover ng-scope"},d.a.createElement("div",{className:"header_bg"},d.a.createElement("div",{className:"hd_left"},d.a.createElement("span",{onClick:f.k,className:"hd_back"}),d.a.createElement("span",{onClick:f.t,className:"hd_home"})),d.a.createElement("div",{className:"hd_center"},"Refer Friend")),d.a.createElement("div",{className:"refer_friend"},d.a.createElement("img",{src:a(622),className:"refer_imgbox"}),d.a.createElement("h2",{className:"font-bold"},"Refer & Earn"),d.a.createElement("p",{className:"font-bold"},"You will get ",d.a.createElement("i",{className:"fa fa-inr","aria-hidden":"true"}),this.state.getReferCodeDetail.refbns," & your friend will also get ",d.a.createElement("i",{className:"fa fa-inr","aria-hidden":"true"}),this.state.getReferCodeDetail.refbnsfrnd," for every successful referral."),d.a.createElement("div",{className:"shere_viasoial toplogin_innercontbox"},d.a.createElement("button",{type:"button",className:"btn btn-default link_btn",id:"btncopy",onClick:function(){return e.copyToClipboard(e.state.getReferCodeDetail.refercode,"btncopy")}},d.a.createElement("span",{id:"myTooltip"},this.state.getReferCodeDetail.refercode)),d.a.createElement("ul",{className:"shere_idlsocial"},d.a.createElement("li",null,d.a.createElement(u.a,{url:m.a.REFER_FRIEND+"?referrer="+this.state.getReferCodeDetail.refercode,quote:"Think you can challenge me on "+m.a.PRODUCT_NAME+"? Tap "+m.a.MAIN_URL+" to download the app & use my invite code "+this.state.getReferCodeDetail.refercode+" to get a Cash Bonus of Rs."+this.state.getReferCodeDetail.refbnsfrnd+"! Let the game begin",className:"Demo__some-network__share-button"},d.a.createElement(h.a,{size:32,round:!0}))),d.a.createElement("li",null,d.a.createElement(g.a,{url:m.a.REFER_FRIEND+"?referrer="+this.state.getReferCodeDetail.refercode,quote:"Think you can challenge me on "+m.a.PRODUCT_NAME+"? Tap "+m.a.MAIN_URL+" to download the app & use my invite code "+this.state.getReferCodeDetail.refercode+" to get a Cash Bonus of Rs."+this.state.getReferCodeDetail.refbnsfrnd+"! Let the game begin",className:"Demo__some-network__share-button"},d.a.createElement(E.a,{size:32,round:!0}))),d.a.createElement("li",null,d.a.createElement(p.a,{url:m.a.REFER_FRIEND,subject:m.a.PRODUCT_NAME+"- Refer Code",body:"Think you can challenge me on "+m.a.PRODUCT_NAME+"? Tap "+m.a.MAIN_URL+" to download the app & use my invite code "+this.state.getReferCodeDetail.refercode+" to get a Cash Bonus of Rs."+this.state.getReferCodeDetail.refbnsfrnd+"! Let the game begin",className:"Demo__some-network__share-button"},d.a.createElement(b.a,{size:32,round:!0})))),d.a.createElement("h6",{className:"font-bold"},"Tap on social icon to share your referral"),d.a.createElement("a",{className:"font-bold",href:f.a+"/TermsCondition"},"Refer Terms & Conditions"))))))}}]),t}(i.Component);t.default=R}}]);
//# sourceMappingURL=29.90c6cf9a.chunk.js.map