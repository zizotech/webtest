/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:42
*/
KISSY.add("combobox/combobox-tpl",function(){return'<div id="ks-combobox-invalid-el-{{id}}" class="{{getBaseCssClasses "invalid-el"}}"> <div class="{{getBaseCssClasses "invalid-inner"}}"></div> </div> {{#if hasTrigger}} <div id="ks-combobox-trigger-{{id}}" class="{{getBaseCssClasses "trigger"}}"> <div class="{{getBaseCssClasses "trigger-inner"}}">&#x25BC;</div> </div> {{/if}} <div class="{{getBaseCssClasses "input-wrap"}}"> <input id="ks-combobox-input-{{id}}" aria-haspopup="true" aria-autocomplete="list" aria-haspopup="true" role="autocomplete" aria-expanded="false" {{#if disabled}} disabled {{/if}} autocomplete="off" class="{{getBaseCssClasses "input"}}" value="{{inputValue}}" /> <label id="ks-combobox-placeholder-{{id}}" for="ks-combobox-input-{{id}}" style=\'display:{{#if inputValue}}none{{else}}block{{/if}};\' class="{{getBaseCssClasses "placeholder"}}"> {{placeholder}} </label> </div>'});
KISSY.add("combobox/render",function(f,h,l){var e=h.Render.extend({initializer:function(){var c=this.get("childrenElSelectors");f.mix(c,{input:"#ks-combobox-input-{id}",trigger:"#ks-combobox-trigger-{id}",invalidEl:"#ks-combobox-invalid-el-{id}",placeholderEl:"#ks-combobox-placeholder-{id}"})},getKeyEventTarget:function(){return this.get("input")},_onSetCollapsed:function(c){this.get("input").attr("aria-expanded",!c)},_onSetInputValue:function(c,e){e.causeByTimer||this.get("input").val(c)},_onSetDisabled:function(c){e.superclass._onSetDisabled.apply(this,
arguments);this.get("input").attr("disabled",c)}},{ATTRS:{collapsed:{value:!0,sync:0},hasTrigger:{value:!0,sync:0},inputValue:{sync:0},input:{},disabled:{sync:0},trigger:{},placeholder:{},placeholderEl:{},invalidEl:{},contentTpl:{value:l}},HTML_PARSER:{input:function(c){return c.one("."+this.getBaseCssClass("input"))},trigger:function(c){return c.one("."+this.getBaseCssClass("trigger"))},invalidEl:function(c){return c.one("."+this.getBaseCssClass("invalid-el"))},placeholderEl:function(c){return c.one("."+
this.getBaseCssClass("placeholder"))}}});return e},{requires:["component/base","./combobox-tpl"]});
KISSY.add("combobox/base",function(f,h,l,e,c,n){function i(m){for(var a=0;a<m.length;a++)if(!m[a].get("disabled"))return m[a];return null}function a(m){var a=this,k;k=a.get("menu");m.target==k&&(m=k.get("el"),k=k.get("contentEl"),m.on("focusout",function(){t(a)}),m.on("focusin",function(){setTimeout(function(){r(a)},0)}),k.on("mouseover",g,a),k.on("mousedown",function(){a.setValueInternal(a.getValueInternal())}))}function b(m){m=m.target;m.isMenuItem&&(m=m.get("textContent"),this.setValueInternal(m),
this._savedInputValue=m,this.set("collapsed",!0))}function g(){this.focus();r(this)}function d(m,a){var k=m.get("el"),b=m.get("view").getBaseCssClasses("invalid"),d=m.get("invalidEl");a?(k.addClass(b),d.attr("title",a),d.show()):(k.removeClass(b),d.hide())}function j(a,b){var k=a.get("menu");if(k&&!k.isController)if(b)k=a.createChild(k),a.setInternal("menu",k);else return null;return k}function u(){var a=j(this);a&&a.get("visible")&&this.alignInternal()}function t(a){a._focusoutDismissTimer||(a._focusoutDismissTimer=
setTimeout(function(){a._focusoutDismissTimer&&a.set("collapsed",!0)},50))}function r(a){var b;if(b=a._focusoutDismissTimer)clearTimeout(b),a._focusoutDismissTimer=null}function s(){this.set("inputValue",this.get("input").val(),{data:{causeByTimer:1}})}function q(a){var b,k=[],d,c,g=j(this,1),a=this.normalizeData(a);g.removeChildren(!0);(c=g.get("highlightedItem"))&&c.set("highlighted",!1);if(a&&a.length){for(c=0;c<a.length;c++)b=a[c],k.push(g.addChild(b));a=this.getValueInternal();if(this.get("highlightMatchItem"))for(c=
0;c<k.length;c++)if(k[c].get("textContent")==a){k[c].set("highlighted",!0);d=!0;break}if(!d&&this.get("autoHighlightFirst"))for(c=0;c<k.length;c++)if(!k[c].get("disabled")){k[c].set("highlighted",!0);break}this.set("collapsed",!1);u.call(this)}else this.set("collapsed",!0)}var o,c=h.all,p=h.KeyCode,w={points:["bl","tl"],overflow:{adjustX:1,adjustY:1}},v=c(f.Env.host);return o=l.Controller.extend({_savedInputValue:null,normalizeData:function(a){var b,k,c;if(a&&a.length){a=a.slice(0,this.get("maxItemCount"));
b=this.get("format")?this.get("format").call(this,this.getValueInternal(),a):[];for(c=0;c<a.length;c++)k=a[c],b[c]=f.mix({content:k,textContent:k,value:k},b[c])}return b},bindUI:function(){this.get("input").on("valuechange",s,this);this.on("click",b,this);v.on("resize",this.__repositionBuffer=f.buffer(u,50),this);this.on("afterRenderUI",a,this)},getValueInternal:function(){return this.get("input").val()},setValueInternal:function(a){this.set("inputValue",a)},_onSetInputValue:function(a,b){if(b.causeByTimer){var c;
c=this.getValueInternal();c===n?this.set("collapsed",!0):(this._savedInputValue=c,this.sendRequest(c))}},alignInternal:function(){var a=this.get("menu"),b=a.get("align");delete b.node;b=f.clone(b);b.node=this.get("el");f.mix(b,w,!1);a.set("align",b)},handleFocus:function(){var a;this.get("invalidEl")&&d(this,!1);(a=this.get("placeholderEl"))&&a.hide()},handleBlur:function(){var a=this,b=a.get("placeholderEl"),c=a.get("input");o.superclass.handleBlur.apply(a,arguments);t(a);a.get("invalidEl")&&a.validate(function(b,
g){b?!a.get("focused")&&g==c.val()&&d(a,b):d(a,!1)});b&&!c.val()&&b.show()},handleMouseDown:function(a){var b,c;o.superclass.handleMouseDown.apply(this,arguments);b=a.target;if((c=this.get("trigger"))&&(c[0]==b||c.contains(b)))this.get("input"),this.get("collapsed")?(this.focus(),this.sendRequest("")):this.set("collapsed",!0),a.preventDefault()},handleKeyEventInternal:function(a){var b,c=a.keyCode,d,g=j(this);this.get("input");b=this.get("updateInputOnDownUp");if(g&&g.get("visible")){d=g.get("highlightedItem");
if(b&&d){var e=g.get("children");if(c==p.DOWN&&d==i(e.concat().reverse())||c==p.UP&&d==i(e))return this.setValueInternal(this._savedInputValue),d.set("highlighted",!1),!0}a=g.handleKeydown(a);d=g.get("highlightedItem");if(c==p.ESC)return this.set("collapsed",!0),b&&this.setValueInternal(this._savedInputValue),!0;b&&f.inArray(c,[p.DOWN,p.UP])&&this.setValueInternal(d.get("textContent"));return c==p.TAB&&d&&(d.performActionInternal(),this.get("multiple"))?!0:a}if(c==p.DOWN||c==p.UP)b=this.getValueInternal(),
b!==n&&this.sendRequest(b);return n},validate:function(a){var b=this.get("validator"),c=this.getValueInternal();b?b(c,function(b){a(b,c)}):a(!1,c)},sendRequest:function(a){this.get("dataSource").fetchData(a,q,this)},_onSetCollapsed:function(a){if(a)(a=j(this))&&a.hide();else{var a=this.get("el"),b=j(this,1);r(this);if(b&&!b.get("visible")){if(this.get("matchElWidth")){b.render();var c=b.get("el"),c=(parseInt(c.css("borderLeftWidth"))||0)+(parseInt(c.css("borderRightWidth"))||0);b.set("width",a[0].offsetWidth-
c)}b.show();this.get("input").attr("aria-owns",b.get("el").attr("id"))}}},destructor:function(){var a=this.__repositionBuffer;a&&(v.detach("resize",a,this),a.stop())}},{ATTRS:{input:{view:1},inputValue:{value:"",sync:0,view:1},trigger:{view:1},placeholder:{view:1},placeholderEl:{view:1},validator:{},invalidEl:{view:1},allowTextSelection:{value:!0},hasTrigger:{view:1},menu:{value:{},setter:function(a){a&&a.isController&&a.setInternal("parent",this)}},defaultChildCfg:{value:{xclass:"popupmenu"}},collapsed:{view:1,
sync:0},dataSource:{},maxItemCount:{value:99999},matchElWidth:{value:!0},format:{},updateInputOnDownUp:{value:!0},autoHighlightFirst:{},highlightMatchItem:{value:!0},xrender:{value:e}}},{xclass:"combobox"})},{requires:["node","component/base","./render","menu"]});
KISSY.add("combobox/cursor",function(f,h){function l(a){var b=n;b||(b=e(c));"textarea"==""+a.type?b.css("width",a.css("width")):b.css("width",9999);f.each(i,function(c){b.css(c,a.css(c))});n||b.insertBefore(a[0].ownerDocument.body.firstChild);return n=b}var e=h.all,c="<div style='z-index:-9999;overflow:hidden;position: fixed;left:-9999px;top:-9999px;opacity:0;white-space:pre-wrap;word-wrap:break-word;'></div>",n,i="paddingLeft,paddingTop,paddingBottom,paddingRight,marginLeft,marginTop,marginBottom,marginRight,borderLeftStyle,borderTopStyle,borderBottomStyle,borderRightStyle,borderLeftWidth,borderTopWidth,borderBottomWidth,borderRightWidth,line-height,outline,height,fontFamily,fontSize,fontWeight,fontVariant,fontStyle".split(",");
return function(a){var b=e(a),a=b[0],c=a.ownerDocument,d=e(c),j=a.scrollTop,i=a.scrollLeft;if(c.selection)return a=c.selection.createRange(),{left:a.boundingLeft+i+d.scrollLeft(),top:a.boundingTop+j+a.boundingHeight+d.scrollTop()};d=b.offset();if("textarea"!=a.type)return d.top+=a.offsetHeight,d;c=l(b);b=a.selectionStart;c.html(f.escapeHTML(a.value.substring(0,b-1))+"<span>x</span>");c.offset(d);d=c.last();a=d.offset();a.top+=d.height();0<b&&(a.left+=d.width());a.top-=j;a.left-=i;return a}},{requires:["node"]});
KISSY.add("combobox/multi-value-combobox",function(f,h,l){function e(a,b){return b&&-1!=a.indexOf(b)}function c(a){var b=a.get("input"),c=b.val(),d=[],j=[],h=a.get("literal"),l=a.get("separator"),a=a.get("separatorType"),f=!1,s=a!=n,b=b.prop("selectionStart"),q,o,p=-1;for(q=0;q<c.length;q++)(o=c.charAt(q),h&&o==h&&(f=!f),f)?j.push(o):(q==b&&(p=d.length),s&&i.test(o))?(j.length&&d.push(j.join("")),j=[],j.push(o)):e(l,o)?a==n?(j.push(o),j.length&&d.push(j.join("")),j=[]):(j.length&&d.push(j.join("")),
j=[],j.push(o)):j.push(o);j.length&&d.push(j.join(""));d.length||d.push("");-1==p&&(a==n&&e(l,o)&&d.push(""),p=d.length-1);return{tokens:d,cursorPosition:b,tokenIndex:p}}var n="suffix",i=/\s|\xa0/;return l.extend({getValueInternal:function(){this.get("input");var a=c(this),b=a.tokens,g=a.tokenIndex,a=this.get("separator"),d=this.get("separatorType"),b=b[g],g=b.length-1;if(d!=n)if(e(a,b.charAt(0)))b=b.slice(1);else return;else d==n&&e(a,b.charAt(g))&&(b=b.slice(0,g));return b},setValueInternal:function(a){var b=
this.get("input"),g=c(this),d=g.tokens,g=Math.max(0,g.tokenIndex),j=this.get("separator"),h=this.get("separatorType"),l=d[g+1]||"",f=d[g];if(h!=n){if(d[g]=f.charAt(0)+a,!l||!i.test(l.charAt(0)))d[g]+=" "}else d[g]=a,a=f.length-1,e(j,f.charAt(a))?d[g]+=f.charAt(a):1==j.length&&(d[g]+=j);a=d.slice(0,g+1).join("").length;b.val(d.join(""));b.prop("selectionStart",a);b.prop("selectionEnd",a)},alignInternal:function(){if(this.get("alignWithCursor")){var a=c(this),b=a.tokens,g=this.get("menu"),d=a.cursorPosition,
e=a.tokenIndex,a=this.get("input"),b=b.slice(0,e).join("").length;0<b&&++b;a.prop("selectionStart",b);a.prop("selectionEnd",b);b=h(a);a.prop("selectionStart",d);a.prop("selectionEnd",d);g.set("xy",[b.left,b.top])}else l.prototype.alignInternal.apply(this,arguments)}},{ATTRS:{separator:{value:",;"},separatorType:{value:n},literal:{value:'"'},alignWithCursor:{}}},{xclass:"multi-value-combobox"})},{requires:["./cursor","./base"]});
KISSY.add("combobox/filter-select",function(f,h){var l=h.extend({validate:function(e){var c=this;l.superclass.validate.call(c,function(f,i){f?e(f,i):c.get("dataSource").fetchData(i,function(a){a:{if(a=c.normalizeData(a))for(var b=0;b<a.length;b++)if(a[b].textContent==i){a=a[b];break a}a=!1}e(a?"":c.get("invalidMessage"),i,a)})})}},{ATTRS:{invalidMessage:{value:"invalid input"}}});return l},{requires:["./base"]});
KISSY.add("combobox/local-data-source",function(f){function h(){h.superclass.constructor.apply(this,arguments)}h.ATTRS={data:{value:[]},parse:{value:function(l,e){var c=[],h=0;if(!l)return e;f.each(e,function(e){-1!=e.indexOf(l)&&c.push(e);h++});return c}}};f.extend(h,f.Base,{fetchData:function(f,e,c){var h=this.get("parse"),i=this.get("data"),i=h(f,i);e.call(c,i)}});return h},{requires:["component/base"]});
KISSY.add("combobox/remote-data-source",function(f,h){function l(){l.superclass.constructor.apply(this,arguments);this.io=null;this.caches={}}l.ATTRS={paramName:{value:"q"},allowEmpty:{},cache:{},parse:{},xhrCfg:{value:{}}};f.extend(l,f.Base,{fetchData:function(e,c,f){var i=this,a,b=i.get("paramName"),g=i.get("parse"),d=i.get("cache"),j=i.get("allowEmpty");i.io&&(i.io.abort(),i.io=null);if(!e&&!0!==j)return c.call(f,[]);if(d&&(a=i.caches[e]))return c.call(f,a);a=i.get("xhrCfg");a.data=a.data||{};
a.data[b]=e;a.success=function(a){g&&(a=g(e,a));i.setInternal("data",a);d&&(i.caches[e]=a);c.call(f,a)};i.io=h(a)}});return l},{requires:["io"]});KISSY.add("combobox",function(f,h,l,e,c,n){h.LocalDataSource=c;h.RemoteDataSource=n;h.FilterSelect=e;h.MultiValueComboBox=l;return h},{requires:["combobox/base","combobox/multi-value-combobox","combobox/filter-select","combobox/local-data-source","combobox/remote-data-source"]});