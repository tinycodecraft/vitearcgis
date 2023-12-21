"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[4609],{72746:(e,t,r)=>{r.d(t,{ij:()=>$,cW:()=>Z});var n,a,u=r(20102),c=r(78286),o=r(35270),i=r(24881),l=(r(5732),r(29681)),s={exports:{}};a=function(){function e(t,r,n,a){var u=Error.call(this,t);return Object.setPrototypeOf&&Object.setPrototypeOf(u,e.prototype),u.expected=r,u.found=n,u.location=a,u.name="SyntaxError",u}function t(e,t,r){return r=r||" ",e.length>t?e:(t-=e.length,e+(r+=r.repeat(t)).slice(0,t))}return function(e,t){function r(){this.constructor=e}r.prototype=t.prototype,e.prototype=new r}(e,Error),e.prototype.format=function(e){var r="Error: "+this.message;if(this.location){var n,a=null;for(n=0;n<e.length;n++)if(e[n].source===this.location.source){a=e[n].text.split(/\r\n|\n|\r/g);break}var u=this.location.start,c=this.location.source&&"function"==typeof this.location.source.offset?this.location.source.offset(u):u,o=this.location.source+":"+c.line+":"+c.column;if(a){var i=this.location.end,l=t("",c.line.toString().length," "),s=a[u.line-1],f=(u.line===i.line?i.column:s.length+1)-u.column||1;r+="\n --\x3e "+o+"\n"+l+" |\n"+c.line+" | "+s+"\n"+l+" | "+t("",u.column-1," ")+t("",f,"^")}else r+="\n at "+o}return r},e.buildMessage=function(e,t){var r={literal:function(e){return'"'+a(e.text)+'"'},class:function(e){var t=e.parts.map((function(e){return Array.isArray(e)?u(e[0])+"-"+u(e[1]):u(e)}));return"["+(e.inverted?"^":"")+t.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(e){return e.description}};function n(e){return e.charCodeAt(0).toString(16).toUpperCase()}function a(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(e){return"\\x0"+n(e)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(e){return"\\x"+n(e)}))}function u(e){return e.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(e){return"\\x0"+n(e)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(e){return"\\x"+n(e)}))}function c(e){return r[e.type](e)}return"Expected "+function(e){var t,r,n=e.map(c);if(n.sort(),n.length>0){for(t=1,r=1;t<n.length;t++)n[t-1]!==n[t]&&(n[r]=n[t],r++);n.length=r}switch(n.length){case 1:return n[0];case 2:return n[0]+" or "+n[1];default:return n.slice(0,-1).join(", ")+", or "+n[n.length-1]}}(e)+" but "+function(e){return e?'"'+a(e)+'"':"end of input"}(t)+" found."},{SyntaxError:e,parse:function(t,r){var n,a={},u=(r=void 0!==r?r:{}).grammarSource,c={start:Ge},o=Ge,i="none",l=")",s=",",f="(",p="%",h="px",m="cm",g="mm",d="in",v="pt",y="pc",w="deg",x="rad",b="grad",A="turn",S="#",C=".",$="e",Z=/^[ \t\n\r]/,j=/^[a-z\-]/,F=/^[0-9a-fA-F]/,k=/^[+\-]/,E=/^[0-9]/,R=Le("none"),M=Ie("none",!1),N=Ie(")",!1),O=Ie(",",!1),_=Le("whitespace"),q=Te([" ","\t","\n","\r"],!1,!1),z=Le("function"),B=Ie("(",!1),I=Le("identifier"),T=Te([["a","z"],"-"],!1,!1),L=Le("percentage"),P=Ie("%",!1),W=Le("length"),J=Ie("px",!1),G=Ie("cm",!1),U=Ie("mm",!1),V=Ie("in",!1),D=Ie("pt",!1),H=Ie("pc",!1),K=Le("angle"),Q=Ie("deg",!1),X=Ie("rad",!1),Y=Ie("grad",!1),ee=Ie("turn",!1),te=Le("number"),re=Le("color"),ne=Ie("#",!1),ae=Te([["0","9"],["a","f"],["A","F"]],!1,!1),ue=Te(["+","-"],!1,!1),ce=Te([["0","9"]],!1,!1),oe=Ie(".",!1),ie=Ie("e",!1),le=function(){return[]},se=function(e,t){return{type:"function",name:e,parameters:t||[]}},fe=function(e,t){return t.length>0?function(e,t,r){return[e].concat(function(e,t){return e.map((function(e){return e[3]}))}(t))}(e,t):[e]},pe=function(e){return{type:"quantity",value:e.value,unit:e.unit}},he=function(e){return{type:"color",colorType:e.type,value:e.value}},me=function(e){return e},ge=function(){return Be()},de=function(e){return{value:e,unit:"%"}},ve=function(e){return{value:e,unit:"px"}},ye=function(e){return{value:e,unit:"cm"}},we=function(e){return{value:e,unit:"mm"}},xe=function(e){return{value:e,unit:"in"}},be=function(e){return{value:e,unit:"pt"}},Ae=function(e){return{value:e,unit:"pc"}},Se=function(e){return{value:e,unit:"deg"}},Ce=function(e){return{value:e,unit:"rad"}},$e=function(e){return{value:e,unit:"grad"}},Ze=function(e){return{value:e,unit:"turn"}},je=function(e){return{value:e,unit:null}},Fe=function(){return{type:"hex",value:Be()}},ke=function(e){return{type:"function",value:e}},Ee=function(){return{type:"named",value:Be()}},Re=function(){return parseFloat(Be())},Me=0,Ne=0,Oe=[{line:1,column:1}],_e=0,qe=[],ze=0;if("startRule"in r){if(!(r.startRule in c))throw new Error("Can't start parsing from rule \""+r.startRule+'".');o=c[r.startRule]}function Be(){return t.substring(Ne,Me)}function Ie(e,t){return{type:"literal",text:e,ignoreCase:t}}function Te(e,t,r){return{type:"class",parts:e,inverted:t,ignoreCase:r}}function Le(e){return{type:"other",description:e}}function Pe(e){var r,n=Oe[e];if(n)return n;for(r=e-1;!Oe[r];)r--;for(n={line:(n=Oe[r]).line,column:n.column};r<e;)10===t.charCodeAt(r)?(n.line++,n.column=1):n.column++,r++;return Oe[e]=n,n}function We(e,t,r){var n=Pe(e),a=Pe(t),c={source:u,start:{offset:e,line:n.line,column:n.column},end:{offset:t,line:a.line,column:a.column}};return r&&u&&"function"==typeof u.offset&&(c.start=u.offset(c.start),c.end=u.offset(c.end)),c}function Je(e){Me<_e||(Me>_e&&(_e=Me,qe=[]),qe.push(e))}function Ge(){var e;return(e=Ue())===a&&(e=function(){var e,t;if(e=[],(t=Ve())!==a)for(;t!==a;)e.push(t),t=Ve();else e=a;return e}()),e}function Ue(){var e,r;return ze++,e=Me,He(),t.substr(Me,4)===i?(r=i,Me+=4):(r=a,0===ze&&Je(M)),r!==a?(He(),Ne=e,e=le()):(Me=e,e=a),ze--,e===a&&0===ze&&Je(R),e}function Ve(){var e,r,n,u;return e=Me,He(),(r=function(){var e,r,n;return ze++,e=Me,(r=Ke())!==a?(40===t.charCodeAt(Me)?(n=f,Me++):(n=a,0===ze&&Je(B)),n!==a?(Ne=e,e=me(r)):(Me=e,e=a)):(Me=e,e=a),ze--,e===a&&(r=a,0===ze&&Je(z)),e}())!==a?(He(),(n=function(){var e,r,n,u,c,o,i,l;if(e=Me,(r=De())!==a){for(n=[],u=Me,c=He(),44===t.charCodeAt(Me)?(o=s,Me++):(o=a,0===ze&&Je(O)),o===a&&(o=null),i=He(),(l=De())!==a?u=c=[c,o,i,l]:(Me=u,u=a);u!==a;)n.push(u),u=Me,c=He(),44===t.charCodeAt(Me)?(o=s,Me++):(o=a,0===ze&&Je(O)),o===a&&(o=null),i=He(),(l=De())!==a?u=c=[c,o,i,l]:(Me=u,u=a);Ne=e,e=fe(r,n)}else Me=e,e=a;return e}())===a&&(n=null),He(),41===t.charCodeAt(Me)?(u=l,Me++):(u=a,0===ze&&Je(N)),u!==a?(He(),Ne=e,e=se(r,n)):(Me=e,e=a)):(Me=e,e=a),e}function De(){var e,t;return e=Me,(t=Qe())===a&&(t=Xe())===a&&(t=Ye())===a&&(t=function(){var e,t;return ze++,e=Me,He(),(t=tt())!==a?(Ne=e,e=je(t)):(Me=e,e=a),ze--,e===a&&0===ze&&Je(te),e}()),t!==a&&(Ne=e,t=pe(t)),(e=t)===a&&(e=Me,(t=et())!==a&&(Ne=e,t=he(t)),e=t),e}function He(){var e,r;for(ze++,e=[],Z.test(t.charAt(Me))?(r=t.charAt(Me),Me++):(r=a,0===ze&&Je(q));r!==a;)e.push(r),Z.test(t.charAt(Me))?(r=t.charAt(Me),Me++):(r=a,0===ze&&Je(q));return ze--,r=a,0===ze&&Je(_),e}function Ke(){var e,r,n;if(ze++,e=Me,r=[],j.test(t.charAt(Me))?(n=t.charAt(Me),Me++):(n=a,0===ze&&Je(T)),n!==a)for(;n!==a;)r.push(n),j.test(t.charAt(Me))?(n=t.charAt(Me),Me++):(n=a,0===ze&&Je(T));else r=a;return r!==a&&(Ne=e,r=ge()),ze--,(e=r)===a&&(r=a,0===ze&&Je(I)),e}function Qe(){var e,r,n;return ze++,e=Me,He(),(r=tt())!==a?(37===t.charCodeAt(Me)?(n=p,Me++):(n=a,0===ze&&Je(P)),n!==a?(Ne=e,e=de(r)):(Me=e,e=a)):(Me=e,e=a),ze--,e===a&&0===ze&&Je(L),e}function Xe(){var e,r,n;return ze++,e=Me,He(),(r=tt())!==a?(t.substr(Me,2)===h?(n=h,Me+=2):(n=a,0===ze&&Je(J)),n!==a?(Ne=e,e=ve(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,He(),(r=tt())!==a?(t.substr(Me,2)===m?(n=m,Me+=2):(n=a,0===ze&&Je(G)),n!==a?(Ne=e,e=ye(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,He(),(r=tt())!==a?(t.substr(Me,2)===g?(n=g,Me+=2):(n=a,0===ze&&Je(U)),n!==a?(Ne=e,e=we(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,He(),(r=tt())!==a?(t.substr(Me,2)===d?(n=d,Me+=2):(n=a,0===ze&&Je(V)),n!==a?(Ne=e,e=xe(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,He(),(r=tt())!==a?(t.substr(Me,2)===v?(n=v,Me+=2):(n=a,0===ze&&Je(D)),n!==a?(Ne=e,e=be(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,He(),(r=tt())!==a?(t.substr(Me,2)===y?(n=y,Me+=2):(n=a,0===ze&&Je(H)),n!==a?(Ne=e,e=Ae(r)):(Me=e,e=a)):(Me=e,e=a)))))),ze--,e===a&&0===ze&&Je(W),e}function Ye(){var e,r,n;return ze++,e=Me,(r=tt())!==a?(t.substr(Me,3)===w?(n=w,Me+=3):(n=a,0===ze&&Je(Q)),n!==a?(Ne=e,e=Se(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,(r=tt())!==a?(t.substr(Me,3)===x?(n=x,Me+=3):(n=a,0===ze&&Je(X)),n!==a?(Ne=e,e=Ce(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,(r=tt())!==a?(t.substr(Me,4)===b?(n=b,Me+=4):(n=a,0===ze&&Je(Y)),n!==a?(Ne=e,e=$e(r)):(Me=e,e=a)):(Me=e,e=a),e===a&&(e=Me,(r=tt())!==a?(t.substr(Me,4)===A?(n=A,Me+=4):(n=a,0===ze&&Je(ee)),n!==a?(Ne=e,e=Ze(r)):(Me=e,e=a)):(Me=e,e=a)))),ze--,e===a&&(r=a,0===ze&&Je(K)),e}function et(){var e,r,n,u;if(ze++,e=Me,35===t.charCodeAt(Me)?(r=S,Me++):(r=a,0===ze&&Je(ne)),r!==a){if(n=[],F.test(t.charAt(Me))?(u=t.charAt(Me),Me++):(u=a,0===ze&&Je(ae)),u!==a)for(;u!==a;)n.push(u),F.test(t.charAt(Me))?(u=t.charAt(Me),Me++):(u=a,0===ze&&Je(ae));else n=a;n!==a?(Ne=e,e=Fe()):(Me=e,e=a)}else Me=e,e=a;return e===a&&(e=Me,(r=Ve())!==a&&(Ne=e,r=ke(r)),(e=r)===a&&(e=Me,(r=Ke())!==a&&(Ne=e,r=Ee()),e=r)),ze--,e===a&&(r=a,0===ze&&Je(re)),e}function tt(){var e,r,n,u,c,o,i;for(e=Me,k.test(t.charAt(Me))?(t.charAt(Me),Me++):0===ze&&Je(ue),r=Me,n=[],E.test(t.charAt(Me))?(u=t.charAt(Me),Me++):(u=a,0===ze&&Je(ce));u!==a;)n.push(u),E.test(t.charAt(Me))?(u=t.charAt(Me),Me++):(u=a,0===ze&&Je(ce));if(46===t.charCodeAt(Me)?(u=C,Me++):(u=a,0===ze&&Je(oe)),u!==a){if(c=[],E.test(t.charAt(Me))?(o=t.charAt(Me),Me++):(o=a,0===ze&&Je(ce)),o!==a)for(;o!==a;)c.push(o),E.test(t.charAt(Me))?(o=t.charAt(Me),Me++):(o=a,0===ze&&Je(ce));else c=a;c!==a?r=n=[n,u,c]:(Me=r,r=a)}else Me=r,r=a;if(r===a)if(r=[],E.test(t.charAt(Me))?(n=t.charAt(Me),Me++):(n=a,0===ze&&Je(ce)),n!==a)for(;n!==a;)r.push(n),E.test(t.charAt(Me))?(n=t.charAt(Me),Me++):(n=a,0===ze&&Je(ce));else r=a;if(r!==a){if(n=Me,101===t.charCodeAt(Me)?(u=$,Me++):(u=a,0===ze&&Je(ie)),u!==a){if(k.test(t.charAt(Me))?(c=t.charAt(Me),Me++):(c=a,0===ze&&Je(ue)),c===a&&(c=null),o=[],E.test(t.charAt(Me))?(i=t.charAt(Me),Me++):(i=a,0===ze&&Je(ce)),i!==a)for(;i!==a;)o.push(i),E.test(t.charAt(Me))?(i=t.charAt(Me),Me++):(i=a,0===ze&&Je(ce));else o=a;o!==a?n=u=[u,c,o]:(Me=n,n=a)}else Me=n,n=a;n===a&&(n=null),Ne=e,e=Re()}else Me=e,e=a;return e}if((n=o())!==a&&Me===t.length)return n;throw n!==a&&Me<t.length&&Je({type:"end"}),function(t,r,n){return new e(e.buildMessage(t,r),t,r,n)}(qe,_e<t.length?t.charAt(_e):null,_e<t.length?We(_e,_e+1):We(_e,_e))}}},(n=s).exports&&(n.exports=a());var f=s.exports;function p(e){if(!e||0===e.length)return null;if("string"==typeof e){const t=h(e);return t&&0!==t.length?t:null}const t=e.map((e=>{if(!Number.isFinite(e.scale)||e.scale<=0)throw new u.Z("effect:invalid-scale","scale must be finite and greater than 0",{stop:e});return{scale:e.scale,effects:h(e.value)}}));t.sort(((e,t)=>t.effects.length-e.effects.length));for(let e=0;e<t.length-1;e++){if(!(0,l.AS)(t[e].effects,t[e+1].effects))throw new u.Z("effect:interpolation-impossible","Cannot interpolate by scale between 2 lists of mixed effects",{a:t[e].effects,b:t[e+1].effects});(0,l.uF)(t[e].effects,t[e+1].effects)}return t.sort(((e,t)=>t.scale-e.scale)),t}function h(e){let t;if(!e)return[];try{t=f.parse(e)}catch(t){throw new u.Z("effect:invalid-syntax","Invalid effect syntax",{value:e,error:t})}return t.map((e=>function(e){try{switch(e.name){case"grayscale":case"sepia":case"saturate":case"invert":case"brightness":case"contrast":return function(e){let t=1;return m(e.parameters,1),1===e.parameters.length&&(t=w(e.parameters[0])),new i.GI(e.name,t)}(e);case"opacity":return function(e){let t=1;return m(e.parameters,1),1===e.parameters.length&&(t=w(e.parameters[0])),new i.Zx(t)}(e);case"hue-rotate":return function(e){let t=0;return m(e.parameters,1),1===e.parameters.length&&(t=function(e){return function(e){if("quantity"!==e.type||!(0===e.value&&null===e.unit||e.unit&&null!=v[e.unit]))throw new u.Z("effect:type-error",`Expected <angle>, Actual: ${g(e)}`,{term:e})}(e),e.value*v[e.unit]||0}(e.parameters[0])),new i.Tq(t)}(e);case"blur":return function(e){let t=0;return m(e.parameters,1),1===e.parameters.length&&(t=x(e.parameters[0]),d(t,e.parameters[0])),new i.Tj(t)}(e);case"drop-shadow":return function(e){const t=[];let r=null;for(const n of e.parameters)if("color"===n.type){if(t.length&&Object.freeze(t),r)throw new u.Z("effect:type-error","Accepts only one color",{});r=b(n)}else{const e=x(n);if(Object.isFrozen(t))throw new u.Z("effect:type-error","<length> parameters not consecutive",{lengths:t});t.push(e),3===t.length&&d(e,n)}if(t.length<2||t.length>3)throw new u.Z("effect:type-error",`Expected <length>{2,3}, Actual: <length>{${t.length}}`,{lengths:t});return new i.CE(t[0],t[1],t[2]||0,r||A("black"))}(e);case"bloom":return function(e){let t=1,r=0,n=0;return m(e.parameters,3),e.parameters[0]&&(t=w(e.parameters[0])),e.parameters[1]&&(r=x(e.parameters[1]),d(r,e.parameters[1])),e.parameters[2]&&(n=w(e.parameters[2])),new i.rk(t,r,n)}(e)}}catch(t){throw t.details.filter=e,t}throw new u.Z("effect:unknown-effect",`Effect '${e.name}' is not supported`,{effect:e})}(e)))}function m(e,t){if(e.length>t)throw new u.Z("effect:type-error",`Function supports up to ${t} parameters, Actual: ${e.length}`,{parameters:e})}function g(e){if("color"===e.type)return"<color>";if(e.unit){if(e.unit in y)return"<length>";if(e.unit in v)return"<angle>";if("%"===e.unit)return"<percentage>"}return"<double>"}function d(e,t){if(e<0)throw new u.Z("effect:type-error",`Negative values are not allowed, Actual: ${e}`,{term:t})}const v={deg:1,grad:.9,rad:180/Math.PI,turn:360},y={px:1,cm:96/2.54,mm:96/2.54/10,in:96,pc:16,pt:96/72};function w(e){!function(e){if("quantity"!==e.type||null!==e.unit&&"%"!==e.unit)throw new u.Z("effect:type-error",`Expected <double> or <percentage>, Actual: ${g(e)}`,{term:e})}(e);const t=e.value;return d(t,e),"%"===e.unit?.01*t:t}function x(e){return function(e){if("quantity"!==e.type||!(0===e.value&&null===e.unit||e.unit&&null!=y[e.unit]))throw new u.Z("effect:type-error",`Expected <length>, Actual: ${g(e)}`,{term:e})}(e),e.value*y[e.unit]||0}function b(e){switch(e.colorType){case"hex":return(0,o.rW)(e.value);case"named":return A(e.value);case"function":return function(e){if(m(e.parameters,4),S.test(e.name))return[w(e.parameters[0]),w(e.parameters[1]),w(e.parameters[2]),e.parameters[3]?w(e.parameters[3]):1];if(C.test(e.name))return(0,o.B7)(function(e){return function(e){if("quantity"!==e.type||null!==e.unit)throw new u.Z("effect:type-error",`Expected <double>, Actual: ${g(e)}`,{term:e})}(e),d(e.value,e),e.value}(e.parameters[0]),w(e.parameters[1]),w(e.parameters[2]),e.parameters[3]?w(e.parameters[3]):1);throw new u.Z("effect:syntax-error",`Invalid color function '${e.name}'`,{colorFunction:e})}(e.value)}}function A(e){if(!(0,o.St)(e))throw new u.Z("effect:unknown-color",`color '${e}' isn't valid`,{namedColor:e});return(0,o.VL)(e)}const S=/^rgba?/i,C=/^hsla?/i;function $(e,t,r){try{return function(e){if(!e||0===e.length)return null;if(function(e){const t=e[0];return!!t&&"scale"in t}(e)){const t=[];for(const r of e)t.push({scale:r.scale,value:j(r.value)});return t}return j(e)}(e)}catch(e){r?.messages?.push(e)}return null}function Z(e,t,r,n){try{const n=function(e){const t=p(e);return t?(0,l.Cb)(t)?t.map((e=>e.toJSON())):t.map((({scale:e,effects:t})=>({scale:e,value:t.map((e=>e.toJSON()))}))):null}(e);(0,c.RB)(r,n,t)}catch(e){n.messages&&n.messages.push(e)}}function j(e){if(!e?.length)return"";const t=[];for(const r of e){let e=[];switch(r.type){case"grayscale":case"sepia":case"saturate":case"invert":case"brightness":case"contrast":case"opacity":e=[F(r,"amount")];break;case"blur":e=[F(r,"radius","pt")];break;case"hue-rotate":e=[F(r,"angle","deg")];break;case"drop-shadow":e=[F(r,"xoffset","pt"),F(r,"yoffset","pt"),F(r,"blurRadius","pt"),k(r,"color")];break;case"bloom":e=[F(r,"strength"),F(r,"radius","pt"),F(r,"threshold")]}const n=`${r.type}(${e.filter(Boolean).join(" ")})`;p(n),t.push(n)}return t.join(" ")}function F(e,t,r){if(null==e[t])throw new u.Z("effect:missing-parameter",`Missing parameter '${t}' in ${e.type} effect`,{effect:e});return r?e[t]+r:""+e[t]}function k(e,t){if(null==e[t])throw new u.Z("effect:missing-parameter",`Missing parameter '${t}' in ${e.type} effect`,{effect:e});const r=e[t];return`rgba(${r[0]||0}, ${r[1]||0}, ${r[2]||0}, ${r[3]/255||0})`}},71612:(e,t,r)=>{r.d(t,{h:()=>i});var n=r(43697),a=r(5600),u=(r(75215),r(67676),r(80442),r(52011)),c=r(72746);const o={read:{reader:c.ij},write:{allowNull:!0,writer:c.cW}},i=e=>{let t=class extends e{constructor(){super(...arguments),this.blendMode="normal",this.effect=null}};return(0,n._)([(0,a.Cb)({type:["average","color-burn","color-dodge","color","darken","destination-atop","destination-in","destination-out","destination-over","difference","exclusion","hard-light","hue","invert","lighten","lighter","luminosity","minus","multiply","normal","overlay","plus","reflect","saturation","screen","soft-light","source-atop","source-in","source-out","vivid-light","xor"],nonNullable:!0,json:{read:!1,write:!1,origins:{"web-map":{read:!0,write:!0},"portal-item":{read:!0,write:!0}}}})],t.prototype,"blendMode",void 0),(0,n._)([(0,a.Cb)({json:{read:!1,write:!1,origins:{"web-map":o,"portal-item":o}}})],t.prototype,"effect",void 0),t=(0,n._)([(0,u.j)("esri.layers.mixins.BlendLayer")],t),t}},72965:(e,t,r)=>{r.d(t,{M:()=>c});var n=r(43697),a=r(5600),u=(r(75215),r(67676),r(80442),r(52011));const c=e=>{let t=class extends e{constructor(){super(...arguments),this.minScale=0,this.maxScale=0}get effectiveScaleRange(){const e={minScale:this.minScale,maxScale:this.maxScale},t=this.parent;t&&"effectiveScaleRange"in t&&function(e,t){e.minScale=e.minScale>0?t.minScale>0?Math.min(e.minScale,t.minScale):e.minScale:t.minScale,e.maxScale=e.maxScale>0?t.maxScale>0?Math.max(e.maxScale,t.maxScale):e.maxScale:t.maxScale}(e,t.effectiveScaleRange);const r=this._get("effectiveScaleRange");return r&&r.minScale===e.minScale&&r.maxScale===e.maxScale?r:e}};return(0,n._)([(0,a.Cb)({type:Number,nonNullable:!0,json:{write:!0}})],t.prototype,"minScale",void 0),(0,n._)([(0,a.Cb)({type:Number,nonNullable:!0,json:{write:!0}})],t.prototype,"maxScale",void 0),(0,n._)([(0,a.Cb)({readOnly:!0})],t.prototype,"effectiveScaleRange",null),t=(0,n._)([(0,u.j)("esri.layers.mixins.ScaleRangeLayer")],t),t}}}]);