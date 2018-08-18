/**
 * This script lives in the parent window.
 */
 
window.EmbedManager = window.EmbedManager || new function() {
	var FRAME_NAME_PREFIX = "frame-one";
	
	var _addListener = function(obj, name, fn) {
		if(obj.addEventListener) {
			obj.addEventListener(name, fn, false);
		} else if(obj.attachEvent) {
			obj.attachEvent("on" + name, fn);
		}
	}
	
	var _embeds = {};
	
	_addListener(document, "touchmove", function(evn) {
		// android chrome scrolling fix
	});
	
	_addListener(window, "message", function(evn) {
		var parts = evn.data.split(':');
		
		// expect [id, height, scroll]
		if(parts.length == 3) {
			var embed = _embeds[parts[0]];
			
			if(embed) {
				var frame = document.getElementById(FRAME_NAME_PREFIX + parts[0]);
				
				if(frame) {
					if (frame.height != parts[1]) {
						frame.height = parts[1]; 
						embed.callback();
					}
					
					if(embed.hits++ > 0) {
						if(parts[2] == "true"){
							EmbedManager.scrollPage(parts[0]);
						}
					}
				} else {
					alert("embed frame " + parts[0] + " could not be found");
				}
			}
		}
	});
	
	return {
		embed: function(params) {
			var embedKey = params.key.replace(/&#038;|&amp;/g, "&"); // fix for CMS (WordPress, etc) double encoding
			var embedId = embedKey.substr(embedKey.indexOf('&') + 1);
			var embedUrl = embedKey + "&EmbedId=" + embedId;
			var embedCallback = params.resizeCallback || function() {};
			var embedTitle = params.title || "";
			var embedWidth = params.width || "100%";
			
			// assume width is px if no units
			if(embedWidth.indexOf('%') < 0 && embedWidth.indexOf("px") < 0) {
				embedWidth += "px";
			}
			
			if(params.showFormLogin) {
				if (embedUrl.indexOf("https:") < 0) {
					embedUrl = "https:" + embedUrl.substr(5); // replace http with https
				}
				
				embedUrl += "&ShowFormLogin";
			}
			
			if (params.prePopulate) {
				embedUrl += "&PrePopulate";
			
				for (var i in params.prePopulate) {
					embedUrl += '&' + i + '=' + encodeURIComponent(params.prePopulate[i]);
				}
			}
			
			if(params.mobileResponsive) {
				embedUrl += "&MobileResponsive";
			}
			
			_embeds[embedId] = { id:embedId, url:embedUrl, callback:embedCallback, hits:0 };
			
			EmbedManager.createFrame(embedId, embedUrl, embedTitle, embedWidth);
		},
		
		createFrame: function(embedId, embedUrl, embedTitle, embedWidth) {
			var anc = document.getElementById("formAnchor" + embedId);
			var frame = document.createElement("iframe");
			
			frame.allowTransparency = true;
			frame.frameBorder = 0;
			frame.id = "frame-one" + embedId;
			frame.scrolling = "no";
			frame.src = embedUrl;
			frame.style.border = 0;
			frame.style.margin = 0;
			frame.style.padding = 0;
			frame.style.width = embedWidth;
			frame.title = embedTitle;
			
			anc.parentNode.insertBefore(frame, anc);
		},
		
		scrollPage: function(embedId) {
			function findPos(el) {
				var left = 0;
				var top = 0;
				
				if (el.offsetParent) {
					do {
						left += el.offsetLeft;
						top += el.offsetTop;
					} while (el = el.offsetParent);
					
					return { X:left, Y:top };
				}
			}
			
			var frame = document.getElementById(FRAME_NAME_PREFIX + embedId);
			var framePos = findPos(frame);
			var scrollY = window.pageYOffset || document.documentElement.scrollTop
			
			if(scrollY > framePos.Y) {
				// scroll top of form into view
				window.scrollTo(framePos.X, framePos.Y);
			}
		}
	};
}();
