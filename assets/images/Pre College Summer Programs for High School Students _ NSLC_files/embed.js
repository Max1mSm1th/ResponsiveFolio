/**
 * This script lives in the embedded form window.
 */

var Embed = {
	embedId: "",

	init: function(embedId) {
		Embed.embedId = embedId;
	},

	getBodyHeight: function() {
		var extra = 16; // magic padding from old code

		return document.body.offsetHeight + extra;
	},
	
	publishHeight: function(doScroll) {
		doScroll = doScroll || false;
		
		parent.postMessage(Embed.embedId + ':' + Embed.getBodyHeight() + ':' + doScroll, '*');
	},
	
	onLoad: function() {
		var form = document.getElementById('FSForm');
		
		Embed.applyStyleChanges();
		Embed.publishHeight(true);
		
		if(form) {
			if(!document.getElementById("EmbedId")) {
				var input = document.createElement("input");
				input.type = "hidden";
				input.id = input.name = "EmbedId";
				input.value = Embed.embedId;
				form.appendChild(input);
			}

			// scroll to special message
			if(document.getElementById("showWarning")){
				document.getElementById("showWarning").scrollIntoView();
			}
		}
	},
	
	applyStyleChanges: function() {
		document.body.style.background = "transparent";
		
		if (document.getElementById("no_100_width")) {
			return;
		} else {
			var head = document.getElementsByTagName("head")[0];
			var cssNode = document.createElement("style");
			cssNode.type = "text/css";
			cssNode.media = "screen";
			cssNode.title = "EmbedCSSChanges";
			head.appendChild(cssNode);
			
			for (var i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].title == "EmbedCSSChanges") {
					if (document.styleSheets[i].addRule) {
						// IE
						document.styleSheets[i].addRule(".form_table", "width: auto !important;"); 
						document.styleSheets[i].addRule(".outside_container", "width: auto !important;");
					} else {
						// standard
						document.styleSheets[i].insertRule(".outside_container,.form_table{width: auto !important;}", 0);
					} 
				}
			}
		}
	}
};


if (window.addEventListener) {
	// standard
	window.addEventListener("load", Embed.onLoad, false);
	window.addEventListener("resize", Embed.publishHeight, false);
} else {
	// IE
	window.attachEvent("onload", Embed.onLoad);
	window.attachEvent("onresize", Embed.publishHeight);
}
