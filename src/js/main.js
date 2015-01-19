var fs = require("fs");

function load_element(relativeobject){
            $(function() {
                $( ".draggable" ).draggable({stop: function (event,ui){console.log(ui); relativeobject.position = [ui.position.left,ui.position.top];}});
            });
}

function appendsection(element){
    var newsection = $(document.createElement('img')).attr('src','img/1.png');
    $(element).before(newsection);
}