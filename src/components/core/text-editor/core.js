var Project = window.Project;  
var $ = require('jquery');


function TextBox(){
  this.position = [100,100];
  this.text = "Lorem ipsum";
}

TextBox.prototype.editorView = function editorView() {
  var aux = $(window.document.createElement('div')).html(this.text);
  aux.css('left', this.position[0]);
  aux.css('top', this.position[1]);
  aux.addClass('raptor');
  aux.dblclick(function (event) {
    $(this).css('border', '2px solid black');
    $(this).css('display', 'inline-block');
  });
  return aux;
};

TextBox.prototype.save = function save() {
  return {'type':'TextBox','position':this.position,'text':this.text};
};

function add (){
  var x = new TextBox();
  return x;
}

exports.add = add;