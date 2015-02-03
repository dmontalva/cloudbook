var fs = require("fs");

function loadElement(miobjeto , relativeobject){
            $(function() {
                $( ".draggable" ).draggable({stop: function (event,ui){relativeobject.position = [ui.position.left,ui.position.top];}});
                //miobjeto.draggable({stop: function (event,ui){relativeobject.position = [ui.position.left,ui.position.top];}});
                $( ".raptor" ).raptor({});
            });
}

