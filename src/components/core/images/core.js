var Project = window.Project;
var $ = require('jquery');

exports.add = function add(callback) {

  var aux = $(window.document.createElement('img')).attr('src', './img/1.png');
  aux.css('position', 'relative');
  aux.css('top', 100);
  aux.css('left', 100);
  aux.css('height','100px');
  aux.css('width','auto');
  aux.addClass('draggable');
  aux.dblclick(function (event) {
    $(this).css('border', '2px solid black');
    $(this).css('display', 'inline-block');
  });
  $(Project.UI.targetcontent).append(aux);
  callback();
};