var Project = window.Project;  
var $ = require('jquery');
var util = require('util');
var CBobject = require('cbobject');

function TextBox(){
  TextBox.super_.call(this,[200,200],'TextBox');
  this.text = "Lorem ipsum";
}

util.inherits(TextBox,CBobject);

TextBox.prototype.editorView = function editorView() {
  var aux = TextBox.super_.prototype.editorView.call(this);
  aux.html(this.text);
  return aux;
};


TextBox.prototype.save = function save() {
  var result = TextBox.super_.prototype.save.call(this);
  result['text'] = this.text;
  return result;
};

exports.add = function add(){
  var x = new TextBox();
  return x;
}