function load_element(){
            $(function() {
                $( ".draggable" ).draggable();
            });
}

function append_textbox(){
    var aux = $(document.createElement('div')).html('Esto es una prueba de concepto');
    aux.css('position','relative');
    aux.css('top',100);
    aux.css('left',100);
    aux.addClass('draggable');
    aux.dblclick(function(event) {
        $(this).css('border','2px solid black');
    });
    $("#targetcontent").append(aux);
    load_element();
}


function binding_actions(){
    $("#actaddtext").bind('click',append_textbox);
}

$(document).ready(function(){
    binding_actions();
});