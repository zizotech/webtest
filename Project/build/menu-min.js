/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:54
*/
KISSY.add("menu/menu-render",function(h,b){return b.Render.extend({initializer:function(){this.get("elAttrs").role="menu"},setAriaActiveDescendant:function(b){var c=this.get("el");b?(b=b.get("el").attr("id"),c.attr("aria-activedescendant",b)):c.attr("aria-activedescendant","")},containsElement:function(b){var c=this.get("el");return c[0]===b||c.contains(b)}})},{requires:["component/base"]});
KISSY.add("menu/base",function(h,b,f,c,e,a){function i(a){this.get("view").setAriaActiveDescendant(a.newVal)}var g=b.KeyCode,d=f.Controller.extend([c.DelegateChildren,c.DecorateChildren],{isMenu:1,_onSetHighlightedItem:function(a,b){var c;a&&b&&(c=b.prevVal)&&c.set("highlighted",!1,{data:{byPassSetHighlightedItem:1}})},_onSetVisible:function(a,b){d.superclass._onSetVisible.apply(this,arguments);var c;!a&&(c=this.get("highlightedItem"))&&c.set("highlighted",!1)},bindUI:function(){this.on("afterHighlightedItemChange",
i,this)},getRootMenu:function(){return this},handleMouseEnter:function(){d.superclass.handleMouseEnter.apply(this,arguments);var a=this.getRootMenu();a&&a._popupAutoHideTimer&&(clearTimeout(a._popupAutoHideTimer),a._popupAutoHideTimer=null);this.get("focusable")&&this.set("focused",!0)},handleBlur:function(a){d.superclass.handleBlur.call(this,a);var b;(b=this.get("highlightedItem"))&&b.set("highlighted",!1)},_getNextEnabledHighlighted:function(b,c){var g=this.get("children"),i=g.length,j=b;do{var o=
g[b];if(!o.get("disabled")&&!1!==o.get("visible"))return g[b];b=(b+c+i)%i}while(b!=j);return a},handleKeyEventInternal:function(b){var c=this.get("highlightedItem");if(c&&c.handleKeydown(b))return!0;var i=this.get("children"),d=i.length;if(0===d)return a;var j;switch(b.keyCode){case g.ESC:(c=this.get("highlightedItem"))&&c.set("highlighted",!1);break;case g.HOME:j=this._getNextEnabledHighlighted(0,1);break;case g.END:j=this._getNextEnabledHighlighted(d-1,-1);break;case g.UP:c?(b=h.indexOf(c,i),d=
(b-1+d)%d):d-=1;j=this._getNextEnabledHighlighted(d,-1);break;case g.DOWN:c?(b=h.indexOf(c,i),d=(b+1+d)%d):d=0,j=this._getNextEnabledHighlighted(d,1)}return j?(j.set("highlighted",!0,{data:{fromKeyboard:1}}),!0):a},containsElement:function(a){if(!1===this.get("visible")||!this.get("view"))return!1;if(this.get("view").containsElement(a))return!0;for(var b=this.get("children"),c=0,d=b.length;c<d;c++){var j=b[c];if(j.containsElement&&j.containsElement(a))return!0}return!1}},{ATTRS:{highlightedItem:{value:null},
xrender:{value:e},defaultChildCfg:{value:{xclass:"menuitem"}}}},{xclass:"menu"});return d},{requires:["node","component/base","component/extension","./menu-render"]});
KISSY.add("menu/menuitem-render",function(h,b,f){return f.Render.extend({initializer:function(){var b=this.get("renderData");this.get("elAttrs").role=b.selectable?"menuitemradio":"menuitem";b.selected&&this.get("elCls").push(this.getBaseCssClasses("selected"))},_onSetSelected:function(b){var e=this.get("el"),a=this.getBaseCssClasses("selected");e[b?"addClass":"removeClass"](a)},containsElement:function(b){var e=this.get("el");return e&&(e[0]==b||e.contains(b))}},{ATTRS:{selected:{sync:0}},HTML_PARSER:{selectable:function(b){return b.hasClass(this.getBaseCssClass("selectable"))}}})},
{requires:["node","component/base"]});
KISSY.add("menu/menuitem",function(h,b,f){var c=h.all,e=b.Controller.extend({isMenuItem:1,handleMouseDown:function(a){e.superclass.handleMouseDown.call(this,a);this.set("highlighted",!0)},performActionInternal:function(){this.get("selectable")&&this.set("selected",!0);this.fire("click");return!0},_onSetHighlighted:function(a,b){if(!b||!b.byPassSetHighlightedItem)this.get("rendered")?this.get("parent").set("highlightedItem",a?this:null):a&&this.get("parent").set("highlightedItem",this);if(a){var g=
this.get("el"),d=g.parent(function(a){return"visible"!=c(a).css("overflow")},this.get("parent").get("el").parent());d&&g.scrollIntoView(d,{alignWithTop:!0,allowHorizontalScroll:!0,onlyScrollIfNeeded:!0})}},containsElement:function(a){return this.get("view")&&this.get("view").containsElement(a)}},{ATTRS:{focusable:{value:!1},handleMouseEvents:{value:!1},selectable:{view:1},value:{},selected:{view:1},xrender:{value:f}}},{xclass:"menuitem"});return e},{requires:["component/base","./menuitem-render"]});
KISSY.add("menu/check-menuitem-render",function(h,b,f){return b.extend([f.ContentRender],{initializer:function(){this.get("checked")&&this.get("elCls").push(self.getBaseCssClasses("checked"))},_onSetChecked:function(b){var e=this.get("el"),a=this.getBaseCssClasses("checked");e[b?"addClass":"removeClass"](a)}},{ATTRS:{contentTpl:{value:'<div class="{{getBaseCssClasses "checkbox"}}"></div>'+f.ContentRender.ContentTpl},checked:{sync:0}}})},{requires:["./menuitem-render","component/extension"]});
KISSY.add("menu/check-menuitem",function(h,b,f){return b.extend({performActionInternal:function(){this.set("checked",!this.get("checked"));this.fire("click");return!0}},{ATTRS:{checked:{view:1},xrender:{value:f}}},{xclass:"check-menuitem"})},{requires:["./menuitem","./check-menuitem-render"]});
KISSY.add("menu/submenu-render",function(h,b,f){return b.extend([f.ContentRender],{},{ATTRS:{contentTpl:{value:f.ContentRender.ContentTpl+'<span class="{{prefixCls}}submenu-arrow">\u25ba</span>'}}})},{requires:["./menuitem-render","component/extension"]});
KISSY.add("menu/submenu",function(h,b,f,c,e){function a(a){var b=a.target;b!==this&&b.isMenuItem&&a.newVal&&(i(this),this.get("highlighted")||(this.set("highlighted",!0),b.set("highlighted",!1),b.set("highlighted",!0)))}function i(a){var b;if(b=a.dismissTimer_)b.cancel(),a.dismissTimer_=null;if(b=a.showTimer_)b.cancel(),a.showTimer_=null}function g(a,b){var d=a.get("menu");if(d&&!d.isController)if(b)a.setInternal("menu",d=a.createChild(d));else return null;return d}function d(){var a,b,d=g(this,1);
d&&(a=this.get("el"),b=d.get("align"),delete b.node,b=h.clone(b),b.node=a,b.points=b.points||["tr","tl"],d.set("align",b),d.show(),a.attr("aria-haspopup",d.get("el").attr("id")))}function k(){var a=g(this);a&&a.hide()}var l=b.KeyCode,m=e.DecorateChild,n=f.extend([e.DecorateChild],{isSubMenu:1,clearSubMenuTimers:function(){i(this)},bindUI:function(){this.on("afterHighlightedChange",a,this)},handleMouseLeave:function(){this.set("highlighted",!1,{data:{fromMouse:1}});i(this);var a=g(this);a&&a.get("visible")&&
(this.dismissTimer_=h.later(k,1E3*this.get("menuDelay"),!1,this))},handleMouseEnter:function(){this.set("highlighted",!0,{data:{fromMouse:1}});i(this);var a=g(this);if(!a||!a.get("visible"))this.showTimer_=h.later(d,1E3*this.get("menuDelay"),!1,this)},_onSetHighlighted:function(a,b){b&&(n.superclass._onSetHighlighted.apply(this,arguments),b.fromMouse||(a&&!b.fromKeyboard?d.call(this):a||k.call(this)))},performActionInternal:function(){d.call(this);n.superclass.performActionInternal.apply(this,arguments)},
handleKeydown:function(a){var b=g(this),c,i=b&&b.get("visible"),e=a.keyCode;if(i){if(!b.handleKeydown(a))if(e==l.LEFT)this.set("highlighted",!1),this.set("highlighted",!0,{data:{fromKeyboard:1}});else return}else if(e==l.RIGHT){if(d.call(this),b=g(this))a=b.get("children"),(c=a[0])&&c.set("highlighted",!0,{data:{fromKeyboard:1}})}else{if(a.keyCode==l.ENTER)return this.performActionInternal(a);return}return!0},containsElement:function(a){var b=g(this);return b&&b.containsElement(a)},decorateChildrenInternal:function(a,
b){b.prependTo(b[0].ownerDocument.body);this.setInternal("menu",m.prototype.decorateChildrenInternal.call(this,a,b,this.get("menu")))},destructor:function(){var a=g(this);i(this);a&&a.destroy&&a.destroy()}},{ATTRS:{decorateChildCls:{valueFn:function(){return this.prefixCls+"popupmenu"}},menuDelay:{value:0.15},menu:{setter:function(a){a&&a.isController&&a.setInternal("parent",this)}},defaultChildCfg:{value:{xclass:"popupmenu"}},xrender:{value:c}}},{xclass:"submenu"});return n},{requires:["node","./menuitem",
"./submenu-render","component/extension"]});KISSY.add("menu/popupmenu-render",function(h,b,f){return f.extend([b.ContentRender,b.PositionRender,b.ShimRender])},{requires:["component/extension","./menu-render"]});
KISSY.add("menu/popupmenu",function(h,b,f,c){var e=f.extend([b.DecorateChild,b.Position,b.Align],{getRootMenu:function(){var a=this,b;do b=a,a=a.get("parent");while(a&&(a.isMenuItem||a.isMenu));return b===this?null:b},handleMouseLeave:function(a){e.superclass.handleMouseLeave.apply(this,arguments);var b=this.get("parent");b&&b.isSubMenu&&b.clearSubMenuTimers();if(this.get("autoHideOnMouseLeave")){var c=this.getRootMenu();c&&(clearTimeout(c._popupAutoHideTimer),c._popupAutoHideTimer=setTimeout(function(){var a;
(a=c.get("highlightedItem"))&&a.set("highlighted",!1)},1E3*this.get("parent").get("menuDelay")))}},isPopupMenu:1,handleBlur:function(){e.superclass.handleBlur.apply(this,arguments);this.hide()}},{ATTRS:{focusable:{value:!1},autoHideOnMouseLeave:{},contentEl:{view:1},xrender:{value:c}}},{xclass:"popupmenu"});return e},{requires:["component/extension","./base","./popupmenu-render"]});KISSY.add("menu/filtermenu-tpl",function(){return'<div id="ks-filter-menu-input-wrap-{{id}}" class="{{getBaseCssClasses "input-wrap"}}"> <div id="ks-filter-menu-placeholder-{{id}}" class="{{getBaseCssClasses "placeholder"}}"> {{placeholder}} </div> <input id="ks-filter-menu-input-{{id}}" class="{{getBaseCssClasses "input"}}" autocomplete="off"/> </div> <div id="ks-content-{{id}}" class="{{getBaseCssClasses "content"}}"> </div>'});
KISSY.add("menu/filtermenu-render",function(h,b,f,c,e){return f.extend([e.ContentRender],{initializer:function(){var a=this.get("childrenElSelectors");h.mix(a,{placeholderEl:"#ks-filter-menu-placeholder-{id}",filterInputWrap:"#ks-filter-menu-input-wrap-{id}",filterInput:"#ks-filter-menu-input-{id}"})},getKeyEventTarget:function(){return this.get("filterInput")},_onSetPlaceholder:function(a){this.get("placeholderEl").html(a)}},{ATTRS:{placeholder:{sync:0},contentTpl:{value:c}},HTML_PARSER:{placeholderEl:function(a){return a.one("."+
this.getBaseCssClass("placeholder"))},filterInputWrap:function(a){return a.one("."+this.getBaseCssClass("input-wrap"))},filterInput:function(a){return a.one("."+this.getBaseCssClass("input"))}}})},{requires:["node","./menu-render","./filtermenu-tpl","component/extension"]});
KISSY.add("menu/filtermenu",function(h,b,f,c){var e=b.extend([c.DecorateChild],{bindUI:function(){this.get("view").get("filterInput").on("valuechange",this.handleFilterEvent,this)},handleMouseEnter:function(){e.superclass.handleMouseEnter.apply(this,arguments);this.getKeyEventTarget()[0].select()},handleFilterEvent:function(){var a;a=this.get("view").get("filterInput");var b=this.get("highlightedItem");this.set("filterStr",a.val());a=a.val();this.get("allowMultiple")&&(a=a.replace(/^.+,/,""));if(!a&&
b)b.set("highlighted",!1);else if(a&&(!b||!b.get("visible")))(b=this._getNextEnabledHighlighted(0,1))&&b.set("highlighted",!0)},_onSetFilterStr:function(a){this.filterItems(a)},filterItems:function(a){var b=this.prefixCls,c=this.get("view"),d=c.get("placeholderEl"),c=c.get("filterInput");d[a?"hide":"show"]();if(this.get("allowMultiple")){var d=[],e;e=a.match(/(.+)[,\uff0c]\s*([^\uff0c,]*)/);var f=[];e&&(f=e[1].split(/[,\uff0c]/));/[,\uff0c]$/.test(a)?(d=[],e&&(d=f,e=f[f.length-1],(f=(f=this.get("highlightedItem"))&&
f.get("content"))&&-1<f.indexOf(e)&&e&&(d[d.length-1]=f),c.val(d.join(",")+",")),a=""):(e&&(a=e[2]||""),d=f);this.get("enteredItems").length!=d.length&&this.set("enteredItems",d)}var c=this.get("children"),m=a&&RegExp(h.escapeRegExp(a),"ig");h.each(c,function(c){var d=c.get("content");a?-1<d.indexOf(a)?(c.set("visible",!0),c.get("el").html(d.replace(m,function(a){return"<span class='"+b+"menuitem-hit'>"+a+"</span>"}))):c.set("visible",!1):(c.get("el").html(d),c.set("visible",!0))})},reset:function(){var a=
this.get("view");this.set("filterStr","");this.set("enteredItems",[]);(a=a&&a.get("filterInput"))&&a.val("")},destructor:function(){var a=this.get("view");(a=a&&a.get("filterInput"))&&a.detach()}},{ATTRS:{contentEl:{view:!0},allowTextSelection:{value:!0},placeholder:{view:1},filterStr:{},enteredItems:{value:[]},allowMultiple:{value:!1},xrender:{value:f}}},{xclass:"filter-menu"});return e},{requires:["./base","./filtermenu-render","component/extension"]});
KISSY.add("menu",function(h,b,f,c,e,a,i,g,d,k,l,m){b.Render=f;b.Item=c;b.CheckItem=e;e.Render=a;c.Render=i;b.SubMenu=g;g.Render=d;b.PopupMenu=k;k.Render=l;b.FilterMenu=m;return b},{requires:"menu/base,menu/menu-render,menu/menuitem,menu/check-menuitem,menu/check-menuitem-render,menu/menuitem-render,menu/submenu,menu/submenu-render,menu/popupmenu,menu/popupmenu-render,menu/filtermenu".split(",")});