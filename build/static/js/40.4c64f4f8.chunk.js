(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{187:function(e,t,a){"use strict";a.d(t,"a",function(){return s});var n=a(403);function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},s=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),s.forEach(function(t){Object(n.a)(e,t,a[t])})}return e}},216:function(e,t,a){"use strict";var n,s=a(179),i=a(61),c=a(180),l=a(62),o=a(187),r=a(0),m=a.n(r),p=a(1),d=a.n(p),b=a(178),u=a.n(b),g=a(271),y=a(177),f=Object(o.a)({},g.Transition.propTypes,{isOpen:d.a.bool,children:d.a.oneOfType([d.a.arrayOf(d.a.node),d.a.node]),tag:y.tagPropType,className:d.a.node,navbar:d.a.bool,cssModule:d.a.object,innerRef:d.a.oneOfType([d.a.func,d.a.string,d.a.object])}),E=Object(o.a)({},g.Transition.defaultProps,{isOpen:!1,appear:!1,enter:!0,exit:!0,tag:"div",timeout:y.TransitionTimeouts.Collapse}),h=((n={})[y.TransitionStatuses.ENTERING]="collapsing",n[y.TransitionStatuses.ENTERED]="collapse show",n[y.TransitionStatuses.EXITING]="collapsing",n[y.TransitionStatuses.EXITED]="collapse",n);function v(e){return e.scrollHeight}var N=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={height:null},["onEntering","onEntered","onExit","onExiting","onExited"].forEach(function(e){a[e]=a[e].bind(Object(l.a)(Object(l.a)(a)))}),a}Object(c.a)(t,e);var a=t.prototype;return a.onEntering=function(e,t){this.setState({height:v(e)}),this.props.onEntering(e,t)},a.onEntered=function(e,t){this.setState({height:null}),this.props.onEntered(e,t)},a.onExit=function(e){this.setState({height:v(e)}),this.props.onExit(e)},a.onExiting=function(e){e.offsetHeight;this.setState({height:0}),this.props.onExiting(e)},a.onExited=function(e){this.setState({height:null}),this.props.onExited(e)},a.render=function(){var e=this,t=this.props,a=t.tag,n=t.isOpen,c=t.className,l=t.navbar,r=t.cssModule,p=t.children,d=(t.innerRef,Object(i.a)(t,["tag","isOpen","className","navbar","cssModule","children","innerRef"])),b=this.state.height,f=Object(y.pick)(d,y.TransitionPropTypeKeys),E=Object(y.omit)(d,y.TransitionPropTypeKeys);return m.a.createElement(g.Transition,Object(s.a)({},f,{in:n,onEntering:this.onEntering,onEntered:this.onEntered,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}),function(t){var n=function(e){return h[e]||"collapse"}(t),i=Object(y.mapToCssModules)(u()(c,n,l&&"navbar-collapse"),r),d=null===b?null:{height:b};return m.a.createElement(a,Object(s.a)({},E,{style:Object(o.a)({},E.style,d),className:i,ref:e.props.innerRef}),p)})},t}(r.Component);N.propTypes=f,N.defaultProps=E,t.a=N},233:function(e,t,a){"use strict";var n=a(179),s=a(61),i=a(0),c=a.n(i),l=a(1),o=a.n(l),r=a(178),m=a.n(r),p=a(177),d={tag:p.tagPropType,inverse:o.a.bool,color:o.a.string,block:Object(p.deprecated)(o.a.bool,'Please use the props "body"'),body:o.a.bool,outline:o.a.bool,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},b=function(e){var t=e.className,a=e.cssModule,i=e.color,l=e.block,o=e.body,r=e.inverse,d=e.outline,b=e.tag,u=e.innerRef,g=Object(s.a)(e,["className","cssModule","color","block","body","inverse","outline","tag","innerRef"]),y=Object(p.mapToCssModules)(m()(t,"card",!!r&&"text-white",!(!l&&!o)&&"card-body",!!i&&(d?"border":"bg")+"-"+i),a);return c.a.createElement(b,Object(n.a)({},g,{className:y,ref:u}))};b.propTypes=d,b.defaultProps={tag:"div"},t.a=b},403:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",function(){return n})},488:function(e,t,a){e.exports=a.p+"static/media/cricket.3e37c804.svg"},489:function(e,t,a){e.exports=a.p+"static/media/football.c21a0b07.svg"},490:function(e,t,a){e.exports=a.p+"static/media/kabaddi.496e8fc3.svg"},491:function(e,t,a){e.exports=a.p+"static/media/captain.410cfc80.svg"},492:function(e,t,a){e.exports=a.p+"static/media/vice_captain.17b4db92.svg"},597:function(e,t,a){"use strict";a.r(t);var n=a(63),s=a(64),i=a(66),c=a(65),l=a(67),o=a(62),r=a(0),m=a.n(r),p=a(212),d=a(216),b=a(233),u=a(199),g=a(274),y=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).onClickActive=function(e){"cricket"==a.state.gametype?("tab1"===e.target.id&&a.getFantasyPointes("cricket","Twenty20"),"tab2"===e.target.id&&a.getFantasyPointes("cricket","ODI"),"tab3"===e.target.id&&a.getFantasyPointes("cricket","Test"),a.setState({tabstatus:e.target.id})):"kabaddi"==a.state.gametype?a.getFantasyPointes(a.state.gametype,a.state.gametype):a.state.gametype},a.onClickGameType=function(e){e.currentTarget.dataset.gametype&&(a.setState({gametype:e.currentTarget.dataset.gametype}),"cricket"==e.currentTarget.dataset.gametype?a.getFantasyPointes(e.currentTarget.dataset.gametype,"Twenty20"):"kabaddi"==e.currentTarget.dataset.gametype?a.getFantasyPointes(e.currentTarget.dataset.gametype,e.currentTarget.dataset.gametype):"football"==e.currentTarget.dataset.gametype&&a.getFantasyPointes(e.currentTarget.dataset.gametype,e.currentTarget.dataset.gametype))},a.getFantasyPointes=function(e,t){var n=Object(o.a)(Object(o.a)(a));n.setState({isLoading:!0});var s,i={gametype:e,mtype:t},c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)};s="".concat(u.a.API_URL)+"/fantasyptssytm",n.setState({fantasypointslist:{}}),fetch(s,c).then(function(e){n.setState({isLoading:!1}),!0===Object(p.c)("Wrong",e.status,e.message,2)&&e.json().then(function(e){!1===e.error?n.setState({fantasypointslist:e.data[t],fantasytxt:e.details&&e.details.fantasytxt?e.details.fantasytxt:"<p></p>"}):n.setState({fantasypointslist:{},fantasytxt:""})})}).catch(function(e){n.setState({isLoading:!1}),Object(p.c)("Wrong",!1,e.toString(),0)})},a.state={collapse:[],tabstatus:"tab1",fantasypointslist:{},isLoading:!1,gametype:"cricket",fantasytxt:"<p></p>"},a.toggle=a.toggle.bind(Object(o.a)(Object(o.a)(a))),a.onClickGameType=a.onClickGameType.bind(Object(o.a)(Object(o.a)(a))),a}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getFantasyPointes("cricket","Twenty20")}},{key:"toggle",value:function(e){var t=this.state.collapse,a=!!this.state.collapse[e.target.id]&&this.state.collapse[e.target.id];t[e.target.id]=!a,this.setState({collapse:t})}},{key:"render",value:function(){var e=this,t=this.state.fantasytxt;return m.a.createElement("div",{className:"fadeIn"},m.a.createElement("div",{className:"loaderdiv"+(!0===this.state.isLoading?"":" hidden")},m.a.createElement(g.ClipLoader,{css:p.p,sizeUnit:"px",size:60,color:p.l,loading:this.state.isLoading})),m.a.createElement("div",{className:"left_logincontent profilepadding0"},m.a.createElement("div",{className:"background-cover ng-scope"},m.a.createElement("div",{className:"header_bg"+("/FantasyPointSystem/mobile"===this.props.location.pathname?" hidden":"")},m.a.createElement("div",{className:"hd_left"},m.a.createElement("span",{onClick:p.k,className:"hd_back"}),m.a.createElement("span",{onClick:p.t,className:"hd_home"})),m.a.createElement("div",{className:"hd_center"},"Fantasy Points System")),m.a.createElement("div",{className:"select_match_type section_cls"},m.a.createElement("div",{className:"fantcy_poisystem"},m.a.createElement("h2",null,"Here\u2019s how your team ",m.a.createElement("span",null,m.a.createElement("u",null,"earns points")))),m.a.createElement("div",{className:"tab_area"},m.a.createElement("ul",{className:"nav nav-pills fantasy_pointsystab"},m.a.createElement("li",{className:"cricket"===this.state.gametype?"active":""},m.a.createElement("span",{"data-toggle":"tab",className:"fant_systempointlist",id:"tab1",alt:"cricket","data-gametype":"cricket","data-id":"tab1",onClick:this.onClickGameType},m.a.createElement("img",{src:a(488)}),m.a.createElement("span",{className:"mt_namefanpoint"},"Cricket")," ")),m.a.createElement("li",{className:"football"===this.state.gametype?"active":""},m.a.createElement("a",{"data-toggle":"tab",id:"tab2",alt:"football","data-gametype":"football","data-id":"tab2",onClick:this.onClickGameType,className:"fant_systempointlist"},m.a.createElement("img",{src:a(489)}),m.a.createElement("span",{className:"mt_namefanpoint"},"Football")," ")),m.a.createElement("li",{className:"kabaddi"===this.state.gametype?"active":""},m.a.createElement("a",{"data-toggle":"tab",id:"tab1",alt:"kabaddi","data-gametype":"kabaddi","data-id":"tab3",onClick:this.onClickGameType,className:"fant_systempointlist"},m.a.createElement("img",{src:a(490)}),m.a.createElement("span",{className:"mt_namefanpoint"},"Kabaddi")," "))),m.a.createElement("div",{className:"tab-content clearfix"},m.a.createElement("div",{className:"tab-pane active",id:"match1"},m.a.createElement("div",{className:"caption_etionmain"},m.a.createElement("div",{className:"your_selectedbox"},m.a.createElement("figure",null,m.a.createElement("img",{src:a(491),alt:"captain"})),m.a.createElement("p",{className:"cap_text"},"Your selected Captain will be awarded ",m.a.createElement("b",null,"2x points")," for his on-field performance.")),m.a.createElement("div",{className:"your_selectedbox"},m.a.createElement("figure",null,m.a.createElement("img",{src:a(492),alt:"vice captain"})," "),m.a.createElement("p",{className:"cap_text"},"A player selected to be the Vice-captain of your team will be given ",m.a.createElement("b",null,"1.5x points")," for his on-field performance.")),m.a.createElement("div",{className:"tab_area home_nttabsbox matchboxes_intels"},this.state.fantasypointslist&&"cricket"==this.state.gametype?m.a.createElement("ul",{className:"nav nav-pills tabforfantasy_pointpage"},m.a.createElement("li",{className:"tab1"===this.state.tabstatus?"active":""},m.a.createElement("a",{id:"tab1",onClick:this.onClickActive,"data-toggle":"tab"},"T20 ")),m.a.createElement("li",{className:"tab2"===this.state.tabstatus?"active":""},m.a.createElement("a",{id:"tab2",onClick:this.onClickActive,"data-toggle":"tab"},"Odi ")),m.a.createElement("li",{className:"tab3"===this.state.tabstatus?"active":""},m.a.createElement("a",{id:"tab3",onClick:this.onClickActive,"data-toggle":"tab"},"Test "))):"",m.a.createElement("div",{className:"tab-content clearfix"},m.a.createElement("div",{className:"tab-pane active",id:"point1"},m.a.createElement("div",{className:"inner_bodyarea"},this.state.fantasypointslist&&"cricket"==this.state.gametype?m.a.createElement("div",{className:"faq_accordian_pg"},m.a.createElement("div",{className:"panel-group",id:"accordion"},this.state.fantasypointslist?Object.values(this.state.fantasypointslist).map(function(t,a){return m.a.createElement("div",{className:"panel panel-default",key:a},m.a.createElement("div",{id:a+1,onClick:e.toggle,className:"panel-heading pointer"},m.a.createElement("h4",{className:"panel-title pointernone text-cap"+(!0===e.state.collapse[a+1]?"":" collapsed"),"data-toggle":"collapse","data-parent":"#accordion",href:"#collapse1"},Object.keys(e.state.fantasypointslist)[a])),m.a.createElement(d.a,{isOpen:e.state.collapse[a+1]},m.a.createElement(b.a,null,m.a.createElement("div",{id:"collapse1",className:"panel-collapse in"},m.a.createElement("div",{className:"panel-body"},m.a.createElement("div",{className:"fan_innertablebt table-responsive"},m.a.createElement("table",{className:"table table-striped"},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",null,"Type of points"),m.a.createElement("th",null))),m.a.createElement("tbody",null,Object.values(t).map(function(e,a){return m.a.createElement("tr",{key:a},m.a.createElement("td",{className:"text-cap"},p.r[Object.keys(t)[a]]),m.a.createElement("td",null,Object.values(t)[a]))})))))))))}):"")):"",!this.state.fantasypointslist||"kabaddi"!=this.state.gametype&&"football"!=this.state.gametype?"":m.a.createElement(b.a,null,m.a.createElement("div",{id:"collapse1",className:"panel-collapse in"},m.a.createElement("div",{className:"panel-body"},m.a.createElement("div",{className:"fan_innertablebt table-responsive"},m.a.createElement("table",{className:"table table-striped"},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",null,"Action"),m.a.createElement("th",null,"Points"))),m.a.createElement("tbody",null,p.h?Object.keys(p.h[e.state.gametype]).map(function(t,a){return m.a.createElement("tr",{key:a},m.a.createElement("td",{className:"text-caps"}," ",p.h[e.state.gametype]&&p.h[e.state.gametype][t]?p.h[e.state.gametype][t]:""),m.a.createElement("td",null,e.state.fantasypointslist?e.state.fantasypointslist[t]:""))}):""))))))),m.a.createElement("div",{className:"footbal_point_text kabaddi_points",dangerouslySetInnerHTML:{__html:t}}))))))))))))}}]),t}(r.Component);t.default=y}}]);
//# sourceMappingURL=40.4c64f4f8.chunk.js.map