(function(){
    "use strict";
})();

function defineComponetEvents() {
    $('#btnHome').click(function(){
		window.location.assign("index.html");
    });
    $('#btnProducts').click(function(){
		window.location.assign("product.html");
    });	   
};

$(document).ready(function() {
	defineComponetEvents();
});