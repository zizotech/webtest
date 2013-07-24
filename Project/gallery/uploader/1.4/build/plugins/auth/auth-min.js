KISSY.add("gallery/uploader/1.4/plugins/auth/auth",function(e,k,l){function m(a){var b=-1;do a/=1024,b++;while(99<a);return Math.max(a,0.1).toFixed(1)+"kB,MB,GB,TB,PB,EB".split(",")[b]}function i(a){i.superclass.constructor.call(this,a)}var j=k.all;e.extend(i,l,{pluginInitializer:function(a){if(!a)return!1;var b=this;b.set("uploader",a);b._useThemeConfig();var c=a.get("queue");b._setSwfButtonExt();c.on("add",function(a){a=a.file;if("restore"==a.type)return!0;var c=b.testAllowExt(a);c&&(c=b.testMaxSize(a));
c&&b.testRepeat(a);c&&b.testWidthHeight(a)});c.on("remove",function(a){"success"==a.file.status&&b.testMax()&&b.testRequired()});a.on("success",function(){b.testMax()});a.on("error",function(c){-1===c.status&&"max"==c.rule&&b._maxStopUpload();a.set("isAllowUpload",!0)})},_useThemeConfig:function(){var a=this.get("msg");if(!e.isEmptyObject(a))return!1;var b=this.get("uploader").get("theme");if(!b)return!1;(a=b.get("authMsg"))&&this.set("msg",a);this.get("allowExts")||this.set("allowExts",b.get("allowExts"));
return this},setAllowExts:function(a){if(!e.isString(a))return!1;var b=[],c=[],a=a.split(",");e.each(a,function(a){b.push("*."+a);c.push(a.toUpperCase())});b=b.join(";");c=c.join(",");return{desc:c,ext:b}},testAll:function(){return this.testRequire()&&this.testMax()},isUploaderType:function(a){var b=this.get("uploader").get("type");return a==b},testRequired:function(){return 0<this.get("uploader").get("queue").getFiles("success").length},testAllowExt:function(a){function b(a){a=a.split(".");return a[a.length-
1]}if(!e.isObject(a))return!1;var c=a.name,d=this.get("allowExts");if(!d)return!0;var g=function(a,b){var c=!1,d=b.toLowerCase(),g;e.each(a,function(a){g=RegExp("^.+."+a+"$");if(g.test(d))return c=!0});return c}(d.split(","),c);if(!g){var c=b(c),f=this.msg("allowExts"),f=e.substitute(f,{ext:c});this._fireUploaderError("allowExts",[d,f],a)}return g},testMax:function(){var a=this.get("max");if(""==a)return!0;var b=this.get("uploader"),c=b.get("queue").getFiles("success").length<a;c?(b.set("disabled",
!1),b.set("isAllowUpload",!0)):(b.set("disabled",!0),b.set("isAllowUpload",!1),b=this.msg("max"),b=e.substitute(b,{max:a}),this._fireUploaderError("max",[a,b]));return c},testMaxSize:function(a){var b=a.size,c=this.get("maxSize");if(""==c||!b)return!0;this.get("uploader");c*=1024;b=b<=c;if(!b){var d=this.msg("maxSize"),d=e.substitute(d,{maxSize:m(c),size:a.textSize});this._fireUploaderError("maxSize",[c,d],a)}return b},testRepeat:function(a){if(!e.isObject(a))return!1;var b=this,c=a.name,d=b.get("allowRepeat");
if(""===d)return!1;var g=b.get("uploader").get("queue").getFiles("success"),f=!1;e.each(g,function(g){if(g.name==c)return g.size?g.size==a.size&&b._fireUploaderError("allowRepeat",[d,b.msg("allowRepeat")],a):b._fireUploaderError("allowRepeat",[d,b.msg("allowRepeat")],a),f=!0});return f},testWidthHeight:function(a){function b(b,e){if(d.call(c,b,e)){g.set("isAllowUpload",!0);var f=g.get("queue").getFileIndex(a.id);g.upload(f)}else f=c.msg("widthHeight"),c._fireUploaderError("widthHeight",[d,f],a)}var c=
this,d=c.get("widthHeight");if(""===d)return!0;var g=c.get("uploader");g.set("isAllowUpload",!1);var f=a.data;if(e.isEmptyObject(f)){f=g.get("target").all("input").getDOMNode();f.select();f.blur();var f=document.selection.createRange().text,h=j('<img style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);width:300px;visibility:hidden;"  />').appendTo("body").getDOMNode();h.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=f;b(h.offsetWidth,h.offsetHeight);
j(h).remove()}else h=new FileReader,h.onload=function(a){var a=a.target.result,c=new Image;c.onload=function(){b(c.width,c.height)};c.src=a},h.readAsDataURL(f)},_setSwfButtonExt:function(){var a=this.get("uploader"),b=this.get("allowExts"),a=a.get("button");if(!this.isUploaderType("flash")||""===b)return!1;b=this.setAllowExts(b);a&&a.set("fileFilters",b[0]);return this},_getExts:function(a){if(!e.isString(a))return!1;var b=a.split(";"),c=[],d=/^\*\./;e.each(b,function(a){a=a.replace(d,"");c.push(a.toUpperCase())});
e.each(c,function(a){b.push(a)});return b},_fireUploaderError:function(a,b,c){var d=this.get("uploader"),g=d.get("queue"),a={status:-1,rule:a},f=-1;c&&(f=g.getFileIndex(c.id),e.mix(a,{file:c,index:f}));b&&e.mix(a,{msg:b[1],value:b[0],result:{}});g.fileStatus(f,"error",a);this.fire("error",a);d.fire("error",a)},_maxStopUpload:function(){var a=this.get("uploader"),b=a.get("queue"),c=this.get("max"),d=a.get("curUploadIndex");if(""==d||d<c)return!1;c=b.get("files");a.stop();e.each(c,function(a,c){c>=
d&&b.remove(a.id)});a.set("curUploadIndex","")},msg:function(a,b){if(!e.isString(a))return this;var c=this.get("msg");return!e.isString(b)?c[a]:c[a]=b},_processRuleConfig:function(a,b){if(!e.isString(a))return this;e.isArray(b)&&this.msg(a,b[1]);return this}},{ATTRS:{pluginId:{value:"auth"},uploader:{value:""},required:{value:""},max:{value:""},allowExts:{value:""},maxSize:{value:""},allowRepeat:{value:""},widthHeight:{value:""},msg:{value:{}}}});return i},{requires:["node","base"]});
