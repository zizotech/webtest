/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:45
*/
KISSY.add("editor/plugin/drag-upload",function(e,o){function g(e){this.config=e||{}}var q=e.Node,l=e.Event,r=o.Utils,k=e.DOM;e.augment(g,{pluginRenderUI:function(g){function p(b){b=b.originalEvent.target;"img"==k.nodeName(b)&&b.src.match(/^file:\/\//)&&(m[b.src]=b)}function s(b,d){var i=new window.FileReader;i.onload=function(f){var a=b.name,f=f.target.result,c=new XMLHttpRequest;c.open("POST",t,!0);c.onreadystatechange=function(){if(4==c.readyState){if(200==c.status||304==c.status){if(""!=c.responseText){var a=
window.JSON.parse(c.responseText);d[0].src=a.imgUrl}}else alert("\u670d\u52a1\u5668\u7aef\u51fa\u9519\uff01"),d.remove();c.onreadystatechange=null}};a="\r\n------kissy-editor-yiminghe\r\n"+('Content-Disposition: form-data; name="'+u+'"; filename="'+encodeURIComponent(a)+'"\r\n');a+="Content-Type: "+(b.type||"application/octet-stream")+"\r\n\r\n";a+=f+"\r\n";j=o.Utils.normParams(j);for(var e in j)a+="------kissy-editor-yiminghe\r\n",a+='Content-Disposition: form-data; name="'+e+'"\r\n\r\n',a+=j[e]+"\r\n";a+="------kissy-editor-yiminghe--";
c.setRequestHeader("Content-Type","multipart/form-data, boundary=----kissy-editor-yiminghe");c.sendAsBinary("Content-Type: multipart/form-data; boundary=----kissy-editor-yiminghe\r\nContent-Length: "+a.length+"\r\n"+a+"\r\n");i.onload=null};i.readAsBinaryString(b)}var h=this.config,u=h.fileInput||"Filedata",v=h.sizeLimit||Number.MAX_VALUE,j=h.serverParams||{},t=h.serverUrl||"",w=RegExp((h.suffix||"png,jpg,jpeg,gif").split(/,/).join("|")+"$","i"),m={},n=!1;g.docReady(function(){var b=g.get("document")[0];
l.on(b,"dragenter",function(){n||(l.on(b,"DOMNodeInserted",p),n=!0)});l.on(b,"drop",function(d){l.remove(b,"DOMNodeInserted",p);n=!1;d.halt();var d=d.originalEvent,i,f;e.isEmptyObject(m)?(f=b.elementFromPoint(d.clientX,d.clientY),i=f.lastChild):(e.each(m,function(a){"img"==k.nodeName(a)&&(i=a.nextSibling,f=a.parentNode,k.remove(a))}),m={});d=d.dataTransfer;d.dropEffect="copy";if(d=d.files)for(var a=0;a<d.length;a++){var c=d[a],g=c.size;if(c.name.match(w)&&!(g/1E3>v)){var g=new q("<img src='"+r.debugUrl("theme/tao-loading.gif")+
"'/>"),h=g[0];f.insertBefore(h,i);var j=k.nodeName(h.parentNode);("head"==j||"html"==j)&&k.insertBefore(h,b.body.firstChild);s(c,g)}}})});window.XMLHttpRequest&&!XMLHttpRequest.prototype.sendAsBinary&&(XMLHttpRequest.prototype.sendAsBinary=function(b,d){for(var e=new (window.BlobBuilder||window.WebKitBlobBuilder),f=b.length,a=new window.Uint8Array(f),c=0;c<f;c++)a[c]=b.charCodeAt(c);e.append(a.buffer);this.send(e.getBlob(d))})}});return g},{requires:["editor"]});
