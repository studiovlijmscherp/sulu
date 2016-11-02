define(["underscore","services/sulumedia/overlay-manager","services/sulumedia/user-settings-manager"],function(a,b,c){"use strict";var d={eventNamespace:"sulu.media-selection",thumbnailKey:"thumbnails",thumbnailSize:"50x50",formats:[],resultKey:"media",dataAttribute:"media-selection",actionIcon:"fa-file-image-o",types:null,url:"/admin/api/media",navigateEvent:"sulu.router.navigate",locale:"",dataDefault:{displayOption:"top",ids:[]},hideConfigButton:!0,translations:{noContentSelected:"media-selection.nomedia-selected",addImages:"media-selection.add-images",choose:"public.choose",collections:"media-selection.collections",upload:"media-selection.upload-new",collection:"media-selection.upload-to-collection",createNewCollection:"media-selection.create-new-collection",newCollection:"media-selection.new-collection",crop:"sulu-media.crop"}},e=function(){return f.call(this,"record-deselected")},f=function(a){return this.options.eventNamespace+"."+(this.options.instanceName?this.options.instanceName+".":"")+a},g={contentItem:function(a,b,c,d,e,f,g){var h=['<a href="#" class="media-selection-item link" data-id="',a,'" data-collection="',b,'">'];return d&&h.push(['<span class="image">','    <img src="',d,'"/>',"</span>"].join("")),e&&(h.push('<div class="badges">'),h.push('    <span class="badge">',e,"</span>"),h.push("</div>")),h.push('<span class="title">',c,"</span>"),"image"===f&&h.push('<span class="crop"><span class="fa-crop"></span>',g,"</span>"),h.push("</a>"),h.join("")}},h=function(){this.sandbox.on(this.DISPLAY_OPTION_CHANGED(),function(a){k.call(this,{displayOption:a},!1)},this),this.sandbox.on(this.DATA_RETRIEVED(),function(a){var b=[];this.sandbox.util.foreach(a,function(a){b.push(a.id)}.bind(this)),k.call(this,{ids:b},!1)},this),this.sandbox.on("sulu.media-selection."+this.options.instanceName+".add-button-clicked",function(){var b=a.map(this.getData().ids,function(a){return{id:a}});this.sandbox.emit("sulu.media-selection-overlay."+this.options.instanceName+".set-items",b),this.sandbox.emit("sulu.media-selection-overlay."+this.options.instanceName+".open")}.bind(this))},i=function(){this.$el.on("click",".crop",function(a){a.preventDefault(),a.stopImmediatePropagation();var d=$(a.currentTarget).parents("a").data("id");b.startEditMediaOverlay.call(this,d,c.getMediaLocale(),"crop",this.options.formats)}.bind(this)),this.$el.on("click","a.link",function(a){var b=this.sandbox.dom.data(a.currentTarget,"id"),c=this.sandbox.dom.data(a.currentTarget,"collection");return this.sandbox.emit(this.options.navigateEvent,"media/collections/edit:"+c+"/files/edit:"+b),!1}.bind(this))},j=function(){var b=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,b),this.sandbox.start([{name:"media-selection/overlay@sulumedia",options:{el:b,url:this.options.url,instanceName:this.options.instanceName,preSelectedIds:a.map(this.getData().ids,function(a){return{id:a}}),removeOnClose:!1,autoStart:!1,removeable:!1,types:this.options.types,locale:this.options.locale,saveCallback:function(b){var c=this.getData();a.each(c.ids,this.removeItemById.bind(this)),c.ids=a.map(b,function(a){return this.addItem(a),a.id}.bind(this)),this.setData(c,!1)}.bind(this)}}])},k=function(a,b){var c=this.getData();for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);this.setData(c,b)};return{type:"itembox",initialize:function(){this.options=this.sandbox.util.extend(!0,{},d,this.options);var a=this.getData();this.options.ids={container:"media-selection-"+this.options.instanceName+"-container",addButton:"media-selection-"+this.options.instanceName+"-add",configButton:"media-selection-"+this.options.instanceName+"-config",displayOption:"media-selection-"+this.options.instanceName+"-display-option",content:"media-selection-"+this.options.instanceName+"-content",chooseTab:"media-selection-"+this.options.instanceName+"-choose-tab",uploadTab:"media-selection-"+this.options.instanceName+"-upload-tab",loader:"media-selection-"+this.options.instanceName+"-loader",collectionSelect:"media-selection-"+this.options.instanceName+"-collection-select",dropzone:"media-selection-"+this.options.instanceName+"-dropzone"},h.call(this),i.call(this),this.render(),a.displayOption&&this.setDisplayOption(a.displayOption),j.call(this)},isDataEmpty:function(a){return this.sandbox.util.isEmpty(a.ids)},getUrl:function(a){var b=-1===this.options.url.indexOf("?")?"?":"&";return[this.options.url,b,this.options.idsParameter,"=",(a.ids||[]).join(","),"&locale=",this.options.locale].join("")},getItemContent:function(a){return g.contentItem(a.id,a.collection,a.title,a.thumbnails?a.thumbnails[this.options.thumbnailSize]:null,a.locale!==this.options.locale?a.locale:null,a.type,this.sandbox.translate(this.options.translations.crop))},sortHandler:function(a){var b=this.getData();b.ids=a,this.setData(b,!1)},removeHandler:function(a){for(var b=this.getData(),c=-1,d=b.ids.length;++c<d;)if(b.ids[c]===a){b.ids.splice(b.ids.indexOf(a),1);break}this.sandbox.emit(e.call(this),a),this.setData(b,!1)}}});