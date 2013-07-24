/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:43
*/
KISSY.add("dom/ie/attr",function(e,d){function f(g){var h="",a=g.nodeType;if(a===d.NodeType.ELEMENT_NODE)for(g=g.firstChild;g;g=g.nextSibling)h+=f(g);else if(a==i.TEXT_NODE||a==i.CDATA_SECTION_NODE)h+=g.nodeValue;return h}var c=d._attrHooks,j=d._attrNodeHook,i=d.NodeType,b=d._valHooks,a=d._propFix;8>e.UA.ie&&(c.style.set=function(g,a){g.style.cssText=a},e.mix(j,{get:function(g,a){var b=g.getAttributeNode(a);return b&&(b.specified||b.nodeValue)?b.nodeValue:void 0},set:function(g,a,b){var m=g.getAttributeNode(b),
k;if(m)m.nodeValue=a;else try{k=g.ownerDocument.createAttribute(b),k.value=a,g.setAttributeNode(k)}catch(d){return g.setAttribute(b,a,0)}}}),e.mix(d._attrFix,a),c.tabIndex=c.tabindex,e.each("href,src,width,height,colSpan,rowSpan".split(","),function(a){c[a]={get:function(b){b=b.getAttribute(a,2);return b===null?void 0:b}}}),b.button=c.value=j,c.placeholder={get:function(a,b){return a[b]||j.get(a,b)}},b.option={get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}});(c.href=
c.href||{}).set=function(a,b,d){for(var m=a.childNodes,k,c=m.length,e=c>0,c=c-1;c>=0;c--)m[c].nodeType!=i.TEXT_NODE&&(e=0);if(e){k=a.ownerDocument.createElement("b");k.style.display="none";a.appendChild(k)}a.setAttribute(d,""+b);k&&a.removeChild(k)};d._getText=f;return d},{requires:["dom/base"]});
KISSY.add("dom/ie/create",function(e,d){d._fixCloneAttributes=function(c,b){b.clearAttributes&&b.clearAttributes();b.mergeAttributes&&b.mergeAttributes(c);var a=b.nodeName.toLowerCase(),g=c.childNodes;if("object"===a&&!b.childNodes.length)for(a=0;a<g.length;a++)b.appendChild(g[a].cloneNode(!0));else if("input"===a&&("checkbox"===c.type||"radio"===c.type)){if(c.checked&&(b.defaultChecked=b.checked=c.checked),b.value!==c.value)b.value=c.value}else if("option"===a)b.selected=c.defaultSelected;else if("input"===
a||"textarea"===a)b.defaultValue=c.defaultValue,b.value=c.value;b.removeAttribute(d.__EXPANDO)};var f=d._creators,c=d._defaultCreator,j=/<tbody/i;8>e.UA.ie&&(f.table=function(f,b){var a=c(f,b);if(j.test(f))return a;var g=a.firstChild,h=e.makeArray(g.childNodes);e.each(h,function(a){"tbody"==d.nodeName(a)&&!a.childNodes.length&&g.removeChild(a)});return a})},{requires:["dom/base"]});
KISSY.add("dom/ie/insertion",function(e,d){8>e.UA.ie&&(d._fixInsertionChecked=function c(e){for(var i=0;i<e.length;i++){var b=e[i];if(b.nodeType==d.NodeType.DOCUMENT_FRAGMENT_NODE)c(b.childNodes);else if("input"==d.nodeName(b)){if("checkbox"===b.type||"radio"===b.type)b.defaultChecked=b.checked}else if(b.nodeType==d.NodeType.ELEMENT_NODE)for(var b=b.getElementsByTagName("input"),a=0;a<b.length;a++)c(b[a])}})},{requires:["dom/base"]});
KISSY.add("dom/ie/style",function(e,d){var f=d._cssProps,c=e.UA,j=e.Env.host.document,j=j&&j.documentElement,i=/^(top|right|bottom|left)$/,b=d._CUSTOM_STYLES,a=/opacity\s*=\s*([^)]*)/,g=/alpha\([^)]*\)/i;f["float"]="styleFloat";b.backgroundPosition={get:function(a,b){return b?a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY:a.style.backgroundPosition}};try{null==j.style.opacity&&(b.opacity={get:function(b,c){return a.test((c&&b.currentStyle?b.currentStyle.filter:b.style.filter)||
"")?parseFloat(RegExp.$1)/100+"":c?"1":""},set:function(a,b){var b=parseFloat(b),c=a.style,d=a.currentStyle,h=isNaN(b)?"":"alpha(opacity="+100*b+")",f=e.trim(d&&d.filter||c.filter||"");c.zoom=1;if((1<=b||!h)&&!e.trim(f.replace(g,"")))if(c.removeAttribute("filter"),!h||d&&!d.filter)return;c.filter=g.test(f)?f.replace(g,h):f+(f?", ":"")+h}})}catch(h){}var c=8==c.ie,l={};l.thin=c?"1px":"2px";l.medium=c?"3px":"4px";l.thick=c?"5px":"6px";e.each(["","Top","Left","Right","Bottom"],function(a){var c="border"+
a+"Width",g="border"+a+"Style";b[c]={get:function(a,b){var d=b?a.currentStyle:0,h=d&&""+d[c]||void 0;h&&0>h.indexOf("px")&&(h=l[h]&&"none"!==d[g]?l[h]:0);return h}}});d._getComputedStyle=function(a,b){var b=f[b]||b,c=a.currentStyle&&a.currentStyle[b];if(d._RE_NUM_NO_PX.test(c)&&!i.test(b)){var g=a.style,h=g.left,e=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;g.left="fontSize"===b?"1em":c||0;c=g.pixelLeft+"px";g.left=h;a.runtimeStyle.left=e}return""===c?"auto":c}},{requires:["dom/base"]});
KISSY.add("dom/ie/traversal",function(e,d){d._contains=function(f,c){f.nodeType==d.NodeType.DOCUMENT_NODE&&(f=f.documentElement);c=c.parentNode;return f==c?!0:c&&c.nodeType==d.NodeType.ELEMENT_NODE?f.contains&&f.contains(c):!1}},{requires:["dom/base"]});
KISSY.add("dom/ie/input-selection",function(e,d){function f(a,b){var h=0,d=0,f=a.ownerDocument.selection.createRange(),e=c(a);e.inRange(f)&&(e.setEndPoint("EndToStart",f),h=i(a,e).length,b&&(d=h+i(a,f).length));return[h,d]}function c(a){if("textarea"==a.type){var b=a.document.body.createTextRange();b.moveToElementText(a);return b}return a.createTextRange()}function j(a,b,c){var d=Math.min(b,c),f=Math.max(b,c);return d==f?0:"textarea"==a.type?(a=a.value.substring(d,f).replace(/\r\n/g,"\n").length,
b>c&&(a=-a),a):c-b}function i(a,b){if("textarea"==a.type){var c=b.text,d=b.duplicate();if(0==d.compareEndPoints("StartToEnd",d))return c;d.moveEnd("character",-1);d.text==c&&(c+="\r\n");return c}return b.text}var b=d._propHooks;b.selectionStart={set:function(a,b){var d=a.ownerDocument.selection.createRange();if(c(a).inRange(d)){var e=f(a,1)[1],i=j(a,b,e);d.collapse(!1);d.moveStart("character",-i);b>e&&d.collapse(!0);d.select()}},get:function(a){return f(a)[0]}};b.selectionEnd={set:function(a,b){var d=
a.ownerDocument.selection.createRange();if(c(a).inRange(d)){var e=f(a)[0],i=j(a,e,b);d.collapse(!0);d.moveEnd("character",i);e>b&&d.collapse(!1);d.select()}},get:function(a){return f(a,1)[1]}}},{requires:["dom/base"]});KISSY.add("dom/ie",function(e,d){return d},{requires:"./ie/attr,./ie/create,./ie/insertion,./ie/style,./ie/traversal,./ie/input-selection".split(",")});
