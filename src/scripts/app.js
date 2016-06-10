function defineComponetEvents() {
    "use strict";
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