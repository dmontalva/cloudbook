var Project = window.Project;
var $ = require('jquery');
var util = require('util');
var CBobject = require('cbobject');

function ImageBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"imgpath":"./img/1.png", "position" : [200,200]};
  ImageBox.super_.call(this,objectdata.position,'core.images');
  this.imgpath = objectdata.imgpath;
}

util.inherits(ImageBox,CBobject);

ImageBox.prototype.editorView = function editorView() {
  var aux = ImageBox.super_.prototype.editorView.call(this);
  var imgelement = $(window.document.createElement('img')).attr('src', this.imgpath);
  imgelement.css('height','100px');
  imgelement.css('width','auto');
  aux.append(imgelement);
  return aux;
};


ImageBox.prototype.save = function save() {
  var result = ImageBox.super_.prototype.save.call(this);
  result['imgpath'] = this.imgpath;
  return result;
};


exports.add = function add() {
  return new ImageBox();
};

exports.restore = function restore(objectdata) {
  return new ImageBox(objectdata);
};