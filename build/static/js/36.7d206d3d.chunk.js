(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{599:function(e,t,a){"use strict";a.r(t);var n=a(63),c=a(64),o=a(66),s=a(65),i=a(67),r=a(62),l=a(0),d=a.n(l),m=a(199),u=a(212),h=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).termCondDetail=function(){var e=Object(r.a)(Object(r.a)(a)),t={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")},body:JSON.stringify({slug:"tandc"})},n=(a.props.match.params.ids,"".concat(m.a.API_URL));fetch(n+"/getcmspage",t).then(function(t){!0===Object(u.c)("Wrong",t.status,t.message,2)&&t.json().then(function(t){!1===t.error?e.setState({contentdetail:t.data.content}):e.setState({contentdetail:null})})}).catch(function(e){Object(u.c)("Wrong",!1,e.toString(),0)})},a.state={contentdetail:null},a}return Object(i.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.termCondDetail()}},{key:"render",value:function(){"".concat(m.a.PRODUCT_NAME);var e=this.state.contentdetail;return d.a.createElement("div",{className:"fadeIn"},d.a.createElement("div",{className:"left_logincontent"},d.a.createElement("div",{className:"background-cover ng-scope"},d.a.createElement("div",{className:"header_bg"+("/termscon"===this.props.location.pathname?" hidden":"")},d.a.createElement("div",{className:"hd_left"},d.a.createElement("span",{onClick:u.k,className:"hd_back"}),d.a.createElement("span",{onClick:u.t,className:"hd_home"})),d.a.createElement("div",{className:"hd_center"},"Terms & Conditions")),d.a.createElement("div",{className:"terms_conditionscontnt"},d.a.createElement("div",{className:"job_data_text"},d.a.createElement("div",{dangerouslySetInnerHTML:{__html:e}}))))))}}]),t}(l.Component);t.default=h}}]);
//# sourceMappingURL=36.7d206d3d.chunk.js.map