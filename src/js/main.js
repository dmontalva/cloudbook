var fs = require("fs");

function load_element(){
            $(function() {
                $( ".draggable" ).draggable({stop: function (event,ui){console.log(ui)}});
            });
}

function appendsection(element){
    var newsection = $(document.createElement('img')).attr('src','img/1.png');
    $(element).before(newsection);
}