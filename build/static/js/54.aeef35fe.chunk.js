(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{461:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",function(){return n})},682:function(e,t,a){"use strict";a.r(t);var n=a(461),i=a(63),o=a(64),c=a(66),s=a(65),l=a(67),r=a(62),d=a(0),u=a.n(d),f=a(199),m=a(212),g=a(272),h=a.n(g),p=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(s.a)(t).call(this,e)))._isMounted=!1,a.scrollMore=function(){a._isMounted=!0;var e=Object(r.a)(Object(r.a)(a)),t=(e.notificationDetail,e.state),n=t.error,i=t.isLoading,o=t.hasMore;if(!n&&!i&&o&&window.innerHeight+document.documentElement.scrollTop===document.documentElement.offsetHeight){var c=a.state.page;c=parseInt(c)+1,a._isMounted&&(a.notificationDetail(c),a.setState({page:c}))}},a.notificationDetail=function(e){a._isMounted=!0;var t=Object(r.a)(Object(r.a)(a)),i={page:e,limit:10},o={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")},body:JSON.stringify(i)},c=(a.props.match.params.ids,"".concat(f.a.API_URL));fetch(c+"/frontapi/getnotification",o).then(function(e){!0===Object(m.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){if(!1===e.error){var a=e.data.list;t._isMounted&&t.setState({totallength:e.data.total,hasMore:t.state.notificationdetail.length<e.data.total,isLoading:!1,notificationdetail:[].concat(Object(n.a)(t.state.notificationdetail),Object(n.a)(a))})}})}).catch(function(e){Object(m.c)("Wrong",!1,e.toString(),0)})},a.readStatusUpdate=function(e,t,n){a._isMounted=!0;var i=Object(r.a)(Object(r.a)(a)),o="",c=a.state.notificationdetail;if("read"===n?o="statusUpdate":"delete"===n?o="delete":"deleteAll"===n&&(o="deleteAll"),Object.getOwnPropertyNames(t).length>0&&"deleteAll"!=o){c[e].userid=1;var s={sendAll:t.sendAll,id:t._id.$oid,atype:o}}else s={atype:o};var l,d={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("jwt")},body:JSON.stringify(s)},u=(a.props.match.params.ids,"".concat(f.a.API_URL));l=u+"/frontapi/notificationupdate","statusUpdate"===o?fetch(l,d).then(function(e){!0===Object(m.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){!1===e.error?("delete"===n&&(c=c.filter(function(e){return e._id!==t._id})),i._isMounted&&i.setState({notificationdetail:c})):i._isMounted&&i.setState({notificationdetail:[]})})}).catch(function(e){Object(m.c)("Wrong",!1,e.toString(),0)}):h()({html:!0,title:"Are you sure?",text:"You want to delete",icon:"warning",buttons:["No, cancel it!","Yes, Delete!"],dangerMode:!0}).then(function(e){e&&fetch(l,d).then(function(e){!0===Object(m.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){!1===e.error?("delete"===n&&(c=c.filter(function(e){return e._id!==t._id})),i._isMounted&&i.setState({notificationdetail:c}),"deleteAll"===n&&i.setState({notificationdetail:[],totallength:0}),h()({title:"Deleted",text:"Notification deleted successfully",icon:"success"})):i._isMounted&&i.setState({notificationdetail:[]})})}).catch(function(e){Object(m.c)("Wrong",!1,e.toString(),0)})})},a.state={notificationdetail:[],descShow:-1,totalpage:0,selectedPage:0,error:!1,hasMore:!0,isLoading:!1,page:1,totallength:0},Object(m.u)(),a.toggleMsgDesc=a.toggleMsgDesc.bind(Object(r.a)(Object(r.a)(a))),a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this._isMounted&&(Object(m.u)(),this.notificationDetail(1),window.addEventListener("scroll",this.scrollMore,!0))}},{key:"toggleMsgDesc",value:function(e,t,a){this.setState({descShow:e}),0==t.userid||"delete"===a?this.readStatusUpdate(e,t,a):"deleteAll"===a&&this.readStatusUpdate(-1,[],a)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.hasMore,i=t.isLoading;t.notificationdetail;return u.a.createElement("div",{className:"fadeIn"},u.a.createElement("div",{className:"left_logincontent profilepadding0 scroll-height"},u.a.createElement("div",{className:"background-cover ng-scope"},u.a.createElement("div",{className:"header_bg"},u.a.createElement("div",{className:"hd_left"},u.a.createElement("span",{onClick:m.k,className:"hd_back"}),u.a.createElement("span",{onClick:m.t,className:"hd_home"})),u.a.createElement("div",{className:"hd_center"},"Notification"),u.a.createElement("span",{className:"delete-all-notification "+(this.state.totallength>0?"":"hidden")},u.a.createElement("i",{title:"Delete All",onClick:function(){return e.toggleMsgDesc(-1,[],"deleteAll")},className:"fa fa-trash"}))),u.a.createElement("div",{id:"contest1",className:"panel-collapse in noadject_main"},u.a.createElement("div",{className:"panel-body contesttab_panelbody"},this.state.notificationdetail&&this.state.totallength>0?this.state.notificationdetail.map(function(t,a){return u.a.createElement("div",{className:"ntifi_detialsa",key:a},u.a.createElement("h3",{className:0==t.userid?" unread":"notify_title_head",onClick:function(){return e.toggleMsgDesc(a,t,"read")}},t.title," ",u.a.createElement("br",null),u.a.createElement("span",{className:"notify-date"},t.created?Object(m.y)(t.created):"")),u.a.createElement("div",{id:"desc_"+a,className:"messcontent msg-content"+(a==e.state.descShow?"":" hidden")},u.a.createElement("p",null,t.message," "),u.a.createElement("span",{className:"notify_trash"}," ",u.a.createElement("i",{title:"Delete",onClick:function(){return e.toggleMsgDesc(a,t,"delete")},className:"fa fa-trash"})," "),t.img?u.a.createElement("img",{src:t.img}):""))}):u.a.createElement("div",{className:"notification_nofounde"},u.a.createElement("p",null,"NO NOTIFICATION AVAILABLE CURRENTLY.")),u.a.createElement("hr",null),a&&u.a.createElement("p",{style:{color:"#900"}},a),i&&u.a.createElement("p",null,"Loading..."),!n&&u.a.createElement("p",null))))))}}]),t}(d.Component);t.default=p}}]);
//# sourceMappingURL=54.aeef35fe.chunk.js.map