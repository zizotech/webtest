/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:45
*/
KISSY.add("editor/plugin/color/btn",function(i,g,m,n,o){function k(a,b,d){setTimeout(function(){a.execCommand(b,d)},0)}var p=i.Node,q=["000,444,666,999,CCC,EEE,F3F3F3,FFF".split(","),"F00,F90,FF0,0F0,0FF,00F,90F,F0F".split(","),"F4CCCC,FCE5CD,FFF2CC,D9EAD3,D0E0E3,CFE2F3,D9D2E9,EAD1DC,EA9999,F9CB9C,FFE599,B6D7A8,A2C4C9,9FC5E8,B4A7D6,D5A6BD,E06666,F6B26B,FFD966,93C47D,76A5AF,6FA8DC,8E7CC3,C27BAD,CC0000,E69138,F1C232,6AA84F,45818E,3D85C6,674EA7,A64D79,990000,B45F06,BF9000,38761D,134F5C,0B5394,351C75,741B47,660000,783F04,7F6000,274E13,0C343D,073763,20124D,4C1130".split(",")],
b;(function(){b="<div class='{prefixCls}editor-color-panel'><a class='{prefixCls}editor-color-remove' href=\"javascript:void('\u6e05\u9664');\">\u6e05\u9664</a>";for(var a=0;3>a;a++){b+="<div class='{prefixCls}editor-color-palette'><table>";for(var f=q[a],d=f.length/8,c=0;c<d;c++){b+="<tr>";for(var e=0;8>e;e++){var h="#"+f[8*c+e];b+="<td>";b+="<a href='javascript:void(0);' class='{prefixCls}editor-color-a' style='background-color:"+h+"'></a>";b+="</td>"}b+="</tr>"}b+="</table></div>"}b+="<div><a class='{prefixCls}editor-button {prefixCls}editor-color-others ks-inline-block'>\u5176\u4ed6\u989c\u8272</a></div></div>"})();
var j=m.extend({initializer:function(){var a=this;a.on("blur",function(){setTimeout(function(){a.colorWin&&a.colorWin.hide()},150)});a.on("click",function(){a.get("checked")?a._prepare():a.colorWin&&a.colorWin.hide()})},_prepare:function(){var a=this,f=a.get("editor"),d=f.prefixCls,c;a.colorWin=(new n({elAttrs:{tabindex:0},elCls:d+"editor-popup",content:i.substitute(b,{prefixCls:d}),width:172,zIndex:g.baseZIndex(g.zIndexManager.POPUP_MENU)})).render();var e=a.colorWin;c=e.get("contentEl");c.on("click",
a._selectColor,a);e.on("hide",function(){a.set("checked",!1)});c.one("."+d+"editor-color-others").on("click",function(b){b.halt();e.hide();o.useDialog(f,"color",void 0,a)});a._prepare=a._show;a._show()},_show:function(){var a=this.get("el"),b=this.colorWin;b.set("align",{node:a,points:["bl","tl"],offset:[0,2],overflow:{adjustX:1,adjustY:1}});b.show()},_selectColor:function(a){a.halt();var b=this.get("editor").prefixCls,a=new p(a.target);a.hasClass(b+"editor-color-a")&&this.fire("selectColor",{color:a.style("background-color")})},
destructor:function(){this.colorWin&&this.colorWin.destroy()}},{ATTRS:{checkable:{value:!0},mode:{value:g.Mode.WYSIWYG_MODE}}});j.init=function(a,b){var d=a.prefixCls+"editor-toolbar-",c=b.cmdType,e=b.tooltip,h=a.addButton(c,{elCls:c+"Btn",content:i.substitute('<div class="{icon}"></div><div style="background-color:{defaultColor}" class="{indicator}"></div>',{defaultColor:b.defaultColor,icon:d+"item "+d+c,indicator:d+"color-indicator"}),mode:g.Mode.WYSIWYG_MODE,tooltip:"\u8bbe\u7f6e"+e}),e=a.addButton(c+"Arrow",
{tooltip:"\u9009\u62e9\u5e76\u8bbe\u7f6e"+e,elCls:c+"ArrowBtn"},j),l=h.get("el").one("."+d+"color-indicator");e.on("selectColor",function(b){l.css("background-color",b.color);k(a,c,b.color)});h.on("click",function(){k(a,c,l.style("background-color"))})};return j},{requires:["editor","../button","../overlay","../dialog-loader"]});
