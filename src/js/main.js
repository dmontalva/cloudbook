var fs = require("fs");

function loadElement(relativeobject){
            $(function() {
                $( ".draggable" ).draggable({stop: function (event,ui){console.log(ui); relativeobject.position = [ui.position.left,ui.position.top];}});
                $( ".raptor" ).raptor({});
            });
}

function appendSection(element){
    var newsection = $(document.createElement('img')).attr('src','img/1.png');
    $(element).before(newsection);
}