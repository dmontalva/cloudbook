var Project = window.Project;  
var $ = require('jquery');
var util = require('util');
var CBobject = require('cbobject');


function TextBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"text":"Lorem ipsum", "position" : [200,200]};
  TextBox.super_.call(this,objectdata.position,'core.text');
  this.text = objectdata.text;
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
  return new TextBox();
}

exports.restore = function restore(objectdata){
  return new TextBox(objectdata);
}