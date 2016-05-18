(function(){
    "use strict";
})();

function defineComponetEvents() {
    $('#btnProducts').click(function(){
		new Product().setListOnScrean('#content');
    })	
};

$(document).ready(function() {
	defineComponetEvents();
});