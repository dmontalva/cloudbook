function load_element(element){
            var content=document.getElementById("targetpage");
            content.innerHTML = elements[element.id];
            $(function() {
$( ".draggable" ).draggable();
});
}
$("#save").bind('click',function(){
	console.log($("#targetpage").html());
	var fs = require("fs");
	fs.writeFile('/home/kbut/inboxubuntu/cloudbook',$("#targetpage").html());
});
var elements = {
    "a":'<h1 class="draggable">cabecera</h1><textarea>Esto es el primer parrafo</textarea>',
    "b":"<h2>cabecera</h2><p>Esto es el primer parrafo</p><p>Esto es el segundo parrafo</p>",
    "c":"<h1>cabecera</h1><p>Esto es el primer parrafo</p>",
    "d":"<h2>cabecera</h2><p>Esto es el primer parrafo</p><p>Esto es el segundo parrafo</p>",
    "e":"<h1>cabecera</h1><p>Esto es el primer parrafo</p>",
    "f":"<h2>cabecera</h2><p>Esto es el primer parrafo</p><p>Esto es el segundo parrafo</p>",
}

