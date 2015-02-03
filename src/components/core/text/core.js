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

TextBox.add_callback = 	CBobject.add_callback;
/*
exports.add = function add(){
  return new TextBox();
}

exports.restore = function restore(objectdata){
  return new TextBox(objectdata);
}
*/

module.exports = TextBox;