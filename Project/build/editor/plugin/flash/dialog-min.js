/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:46
*/
KISSY.add("editor/plugin/flash/dialog",function(e,d,g,h,i){function f(b,a){this.editor=b;this.config=a||{};d.Utils.lazyRun(this,"_prepareShow","_realShow");this._config()}e.augment(f,{addRes:d.Utils.addRes,destroyRes:d.Utils.destroyRes,_config:function(){var b=this.editor.prefixCls;this._urlTip="\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf";this._type="flash";this._cls="ke_flash";this._config_dwidth="400px";this._title="Flash";this._bodyHTML=e.substitute("<div style='padding:20px 20px 0 20px'><p><label>\u7f51\u5740\uff1a <input  data-verify='^https?://[^\\s]+$'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp://' class='{prefixCls}editor-flash-url {prefixCls}editor-input' style='width:300px;' /></label></p><table style='margin:10px 0 5px  40px;width:300px;'><tr><td><label>\u5bbd\u5ea6\uff1a <input  data-verify='^(?!0$)\\d+$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='{prefixCls}editor-flash-width {prefixCls}editor-input' style='width:60px;' /> \u50cf\u7d20 </label></td><td><label>\u9ad8\u5ea6\uff1a <input  data-verify='^(?!0$)\\d+$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='{prefixCls}editor-flash-height {prefixCls}editor-input' style='width:60px;' /> \u50cf\u7d20 </label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a </label><select class='{prefixCls}editor-flash-align' title='\u5bf9\u9f50'><option value='none'>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a </label><input  data-verify='^\\d+$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570' class='{prefixCls}editor-flash-margin {prefixCls}editor-input' style='width:60px;' value='5'/> \u50cf\u7d20</td></tr></table></div>",
{prefixCls:b});this._footHTML=e.substitute("<div style='padding:10px 0 35px 20px;'><a class='{prefixCls}editor-flash-ok {prefixCls}editor-button ks-inline-block' style='margin-left:40px;margin-right:20px;'>\u786e\u5b9a</a> <a class='{prefixCls}editor-flash-cancel {prefixCls}editor-button ks-inline-block'>\u53d6\u6d88</a></div>",{prefixCls:b})},_prepareShow:function(){this.dialog=(new h({headerContent:this._title,bodyContent:this._bodyHTML,footerContent:this._footHTML,width:this._config_dwidth||"500px",mask:!0})).render();
this.addRes(this.dialog);this._initD()},_realShow:function(){this._updateD();this.dialog.show()},_getFlashUrl:function(b){return g.getUrl(b)},_updateD:function(){var b=this.editor,a=this.config,c=this.selectedFlash;if(c){if(b=b.restoreRealElement(c))c.css("width")&&this.dWidth.val(parseInt(c.css("width"))),c.css("height")&&this.dHeight.val(parseInt(c.css("height"))),this.dAlign.set("value",c.css("float")),d.Utils.valInput(this.dUrl,this._getFlashUrl(b)),this.dMargin.val(parseInt(b.style("margin"))||
0)}else d.Utils.resetInput(this.dUrl),this.dWidth.val(a.defaultWidth||""),this.dHeight.val(a.defaultHeight||""),this.dAlign.set("value","none"),this.dMargin.val("5")},show:function(b){this.selectedFlash=b;this._prepareShow()},_initD:function(){var b=this.dialog,a=this.editor.prefixCls,c=b.get("el");this.dHeight=c.one("."+a+"editor-flash-height");this.dWidth=c.one("."+a+"editor-flash-width");this.dUrl=c.one("."+a+"editor-flash-url");this.dAlign=i.Select.decorate(c.one("."+a+"editor-flash-align"),{prefixCls:a+
"editor-big-",width:80,menuCfg:{prefixCls:a+"editor-",render:c}});this.dMargin=c.one("."+a+"editor-flash-margin");var e=c.one("."+a+"editor-flash-ok"),a=c.one("."+a+"editor-flash-cancel");e.on("click",this._gen,this);a.on("click",function(a){b.hide();a&&a.halt()});d.Utils.placeholder(this.dUrl,this._urlTip);this.addRes(this.dAlign)},_getDInfo:function(){return{url:this.dUrl.val(),attrs:{width:this.dWidth.val(),height:this.dHeight.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;float:"+
this.dAlign.get("value")+";"}}},_gen:function(b){b&&b.halt();var b=this.editor,a=this._getDInfo(),c=a&&e.trim(a.url),f=a&&a.attrs;a&&d.Utils.verifyInputs(this.dialog.get("el").all("input"))&&(this.dialog.hide(),a=g.insertFlash(b,c,f,this._cls,this._type),this.selectedFlash&&b.getSelection().selectElement(a),b.notifySelectionChange())},destroy:function(){this.destroyRes()}});return f},{requires:["editor","../flash-common/utils","../dialog","../menubutton"]});
