function(t) {
    "use strict";

    t.module("website", [
    	"angular-parallax",
    	"duScroll",
    	"ngTooltip",
    	"sticky",
    	"interface"
   	]).value(
   		'duScrollDuration',
   		1500
   	);
}(window.angular);
