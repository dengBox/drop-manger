(function(e){function t(t){for(var r,o,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={"app~24120820":0},a={"app~24120820":0},c=[];function u(e){return i.p+"static/js/"+({}[e]||e)+"."+{"chunk-2d0cfa1d":"7e863d17","chunk-2d22dd4a":"90f91bda","chunk-009d9546":"e8cc2df4"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-009d9546":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0cfa1d":"31d6cfe0","chunk-2d22dd4a":"31d6cfe0","chunk-009d9546":"7efde5a9"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],f.parentNode.removeChild(f),n(c)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;c.push([0,"vendor~253ae210","vendor~d939e436","vendor~b58f7129","vendor~fdc6512a","vendor~5e287636","vendor~599f396b","vendor~136640b4","vendor~0605657e","vendor~d2305125","styles~4367464a"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"07ad":function(e,t,n){"use strict";n("acde")},"0bf6":function(e,t,n){},"328e":function(e,t,n){"use strict";n.r(t),t["default"]=[]},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("app-header"),n("router-view",{staticClass:"router-wrap"})],1)},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app-header"}},[n("router-link",{attrs:{to:"/home"}},[e._v("首页")])],1)},u=[],i={name:"AppHeader",components:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},s=i,l=(n("67f3"),n("2877")),d=Object(l["a"])(s,c,u,!1,null,"76bb2ea6",null),f=d.exports,p={name:"App",components:{AppHeader:f}},h=p,m=(n("5c0b"),Object(l["a"])(h,o,a,!1,null,null,null)),g=m.exports,v=(n("d3b7"),n("4de4"),n("ac1f"),n("5319"),n("159b"),n("bc3a")),b=n.n(v),y=n("f825"),j=n.n(y),E=n("a18c"),O=n("98b3"),S=n("5530"),w=(n("ddb0"),n("466d"),n("2f62"));r["default"].use(w["a"]);var _=function(){var e=n("d472"),t={};return e.keys().forEach((function(n){var r=n.match(/^\.\/(.*)\.js$/)[1];t[r]=e(n).default})),t},k=new w["a"].Store({state:{parent:!1},mutations:{SET_PARENT:function(e,t){e.parent=t}},actions:{},getters:{},modules:Object(S["a"])({},_())}),x="";switch("production"){case"development":x="";break;case"production":x="";break;case"test":x="";break}b.a.defaults.baseURL=x;var T=n("a925");r["default"].use(T["a"]);var C=new T["a"]({locale:"zh-cn",fallbackLocale:"en",messages:{}}),P=j.a.Message,N=(new Date).getTime(),A=[],M=null,L={router:"",isError:!0},D={timeout:6e5},I=b.a.create(D);function F(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A;e.length>0&&(e.forEach((function(e){e.cancel("频繁切换，中断请求")})),e=[])}I.interceptors.request.use((function(e){return sessionStorage.token&&(e.headers.shsctoken=sessionStorage.token),"get"===e.method&&(e.data=!0),e.cancelTag=++N,e.cancelToken=new b.a.CancelToken((function(e){A.push({cancel:e,cancelTag:N})})),e}),(function(e){return P({type:"error",message:C._t("common.message.requestTimeout",C.locale,C.messages)}),Promise.reject(e)})),I.interceptors.response.use((function(e){return A=A.filter((function(t){return t.cancelTag===e.config.cancelTag})),200!==e.data.status&&e.data.status?(P({type:"error",message:e.data.message}),Promise.reject(e)):"blob"===e.config.headers.responseType?e:e.data}),(function(e){return"频繁切换，中断请求"!==e.message&&(A=A.filter((function(t){return t.cancelTag===e.config.cancelTag}))),""!==L.router&&L.router===E["default"].history.current.fullPath||(L.isError=!0),L.isError?(clearTimeout(M),L.isError=!1,L.router=E["default"].history.current.fullPath,M=setTimeout((function(){L.isError=!0}),3e3),"频繁切换，中断请求"===e.message&&Promise.reject(e),e.response?401===e.response.status?(E["default"].replace("/403"),P({type:"error",message:C._t("common.message.error401",C.locale,C.messages)})):404===e.response.status?P({type:"error",message:e}):403===e.response.status?(P({type:"error",message:e.response.data.message}),Object(O["a"])("token",!0),k.commit("SAVE_TOKEN",""),E["default"].replace("/login")):P({type:"error",message:C._t("common.message.systemError",C.locale,C.messages)}):(E["default"].replace("/502"),P({type:"error",message:C._t("common.message.error502",C.locale,C.messages)})),Promise.reject(e)):Promise.reject(e)})),Plugin.install=function(e,t){e.prototype.$axiosCancel=F,e.axios=I},r["default"].use(Plugin);Plugin,n("1276"),n("a9e3"),n("b680"),n("25f0");var $={getBrowserEngine:function(){var e=navigator.userAgent;return-1!==e.indexOf("Trident")||-1!==e.indexOf("MSIE")||e.indexOf("Edge")>-1?"IE":-1!==e.indexOf("Firefox")?"Firefox":-1!==e.indexOf("Chrome")?"Chrome":-1!==e.indexOf("Safari")?"Safari":void 0},typeOf:function(e){var t=Object.prototype.toString,n={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regExp","[object Undefined]":"undefined","[object Null]":"null","[object Object]":"object"};return n[t.call(e)]},deepCopy:function(e){var t,n=this.typeOf(e);if("array"===n)t=[];else{if("object"!==n)return e;t={}}if("array"===n)for(var r=0;r<e.length;r++)t.push(this.deepCopy(e[r]));else if("object"===n)for(var o in e)t[o]=this.deepCopy(e[o]);return t},strIsEmpty:function(e){return void 0===e||null===e||"null"===e||""===e},removeSpace:function(e){return e.replace(/\s*/g,"")},checkcontractdocFileSuffix:function(e,t){var n=e.split("."),r=n[n.length-1],o=t,a=o.indexOf(r);return a>=0},toPercent:function(e,t){var n="";return t?(n=Number(100*e),n+="%"):n=Number(e).toFixed(2),n},stringSubStr:function(e,t){var n="";return n=""!==e&&null!==e&&e.length>t?"".concat(e.substring(0,t),"..."):null===e?"":e,n},addNum:function(e,t){var n="",r="",o="";try{n=e.toString().split(".")[1].length}catch(c){n=0}try{r=t.toString().split(".")[1].length}catch(c){r=0}o=Math.pow(10,Math.max(n,r));var a=(Number(e)*o+Number(t)*o)/o;return a=a.toFixed(2),a},enCodeRouter:function(e){var t=/[!'()*]/g,n=function(e){return"%"+e.charCodeAt(0).toString(16)},r=/%2C/g;return encodeURIComponent(e).replace(t,n).replace(r,",")},checkImageSuffix:function(e){var t=e.split("."),n=t[t.length-1],r="bmp,jpg,jpeg,png,gif",o=r.indexOf(n.toLocaleLowerCase());return o>=0},accSub:function(e,t){var n,r,o,a;try{n=e.toString().split(".")[1].length}catch(c){n=0}try{r=t.toString().split(".")[1].length}catch(c){r=0}return o=Math.pow(10,Math.max(n,r)),a=n>=r?n:r,((e*o-t*o)/o).toFixed(a)},accMul:function(e,t){var n=0,r=e.toString(),o=t.toString();try{n+=r.split(".")[1].length}catch(a){}try{n+=o.split(".")[1].length}catch(a){}return Number(r.replace(".",""))*Number(o.replace(".",""))/Math.pow(10,n)},accDiv:function(e,t){var n,r,o=0,a=0;try{o=e.toString().split(".")[1].length}catch(c){}try{a=t.toString().split(".")[1].length}catch(c){}return n=Number(e.toString().replace(".","")),r=Number(t.toString().replace(".","")),this.accMul(n/r,Math.pow(10,a-o))},debounce:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=null;return function(){var r=arguments,o=this;clearTimeout(n),n=setTimeout((function(){e.apply(o,r)}),t)}},throttle:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=!0;return function(){var r=arguments,o=this;n&&(n=!1,setTimeout((function(){e.apply(o,r),n=!0}),t))}}},B=n("5a0c"),U=n.n(B);n("f8ce"),n("a24a");r["default"].use(j.a),r["default"].config.productionTip=!1,r["default"].prototype.$dayjs=U.a,r["default"].prototype.$untils=$,new r["default"]({router:E["default"],store:k,i18n:C,render:function(e){return e(g)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"67f3":function(e,t,n){"use strict";n("0bf6")},"98b3":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return a}));n("d3b7"),n("159b"),n("fb6a"),n("d81d");var r=window.sessionStorage;function o(e){return r.getItem(e)}function a(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t?r.clear():r.removeItem(e)}},"9c0c":function(e,t,n){},"9e30":function(e,t,n){"use strict";n.r(t);var r={state:{childC:1},getters:{},actions:{},mutations:{SET_CHILD_C:function(e,t){e.childC=t}}};t["default"]={namespaced:!0,state:{childA:!1,childB:{s:1}},getters:{},actions:{},mutations:{SET_CHILD_A:function(e,t){e.childA=t},SET_CHILD_B:function(e,t){e.childB.s=t}},modules:{child:r}}},"9e9d":function(e,t,n){var r={"./common.js":"328e","./index.js":"a18c"};function o(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="9e9d"},"9f4d":function(e,t,n){"use strict";n.r(t);n("d3b7"),n("25f0"),n("ac1f"),n("1276"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861");var r=n("2b0e"),o=(n("98b3"),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r["default"].axios.post(e.url,e.body,t)});var a=function(e){return o({url:""})};t["default"]={state:{},getters:{},actions:{reportDelete:function(e,t){e.commit;return a(t)}},mutations:{}}},a18c:function(e,t,n){"use strict";n.r(t);var r=n("2909"),o=(n("d3b7"),n("159b"),n("ddb0"),n("99af"),n("ac1f"),n("3ca3"),n("2b0e")),a=n("8c4f"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"})},u=[],i={name:"Login",components:{},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},s=i,l=n("2877"),d=Object(l["a"])(s,c,u,!1,null,"2f9c8efc",null),f=d.exports,p=n("323e"),h=n.n(p),m=(n("a5d8"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",{staticClass:"menu"},e._l(e.menu,(function(t){return n("li",{key:t.path,staticClass:"menu-item"},[n("router-link",{attrs:{to:t.path}},[e._v(e._s(t.title))]),n("p",{staticClass:"item-desc"},[e._v(e._s(t.description))])],1)})),0)])}),g=[],v={name:"Home",data:function(){return{menu:[{path:"/editor",title:"设计器",description:"2D设计器"},{path:"/docs",title:"文档中心",description:"详细的文档说明"},{path:"/test",title:"测试页面",description:"一些测试页面"}]}}},b=v,y=(n("07ad"),Object(l["a"])(b,m,g,!1,null,"5ea25acd",null)),j=y.exports;h.a.configure({showSpinner:!1}),o["default"].use(a["a"]);var E=n("9e9d"),O=[];E.keys().forEach((function(e){"./index.js"!==e&&(O=[].concat(Object(r["a"])(O),Object(r["a"])(E(e).default)))}));var S=a["a"].prototype.push;a["a"].prototype.push=function(e){return S.call(this,e).catch((function(e){return e}))};var w=a["a"].prototype.replace;a["a"].prototype.replace=function(e){return w.call(this,e).catch((function(e){return e}))};var _=new a["a"]({routes:[{path:"/",redirect:"/home"},{path:"/login",name:"login",component:f},{path:"/home",component:j,children:[]},{path:"/test",name:"test",component:function(){return Promise.all([n.e("vendor~253ae210"),n.e("vendor~d939e436"),n.e("vendor~b58f7129"),n.e("vendor~fdc6512a"),n.e("vendor~5e287636"),n.e("vendor~599f396b"),n.e("vendor~136640b4"),n.e("vendor~0605657e"),n.e("vendor~d2305125"),n.e("chunk-009d9546")]).then(n.bind(null,"aa2e"))}},{path:"/docs",name:"docs",component:function(){return n.e("chunk-2d0cfa1d").then(n.bind(null,"6519"))}},{path:"/editor",name:"editor",component:function(){return n.e("chunk-2d22dd4a").then(n.bind(null,"f8bd"))}}].concat(Object(r["a"])(O),[{path:"*",name:"404",component:function(){return"找不到该页面！"}}])});_.beforeEach((function(e,t,n){h.a.start(),n()})),_.afterEach((function(){h.a.done()}));t["default"]=_},acde:function(e,t,n){},d472:function(e,t,n){var r={"./login copy.js":"9f4d","./login.js":"9e30"};function o(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="d472"}});