
function createNameSpace(nameSpaceString) {
  var names = nameSpaceString.split("."),
    parent = window,
    imax = names.length,
    i;

  //if any nameSpace level doesn't exist, create it
  for (i = 0; i < imax; i++) {
    if (!parent[names[i]]) {
      parent[names[i]] = {};
    }
    parent = parent[names[i]];
  }
}


function Core() {
  createNameSpace('Project');
  createNameSpace('Project.Actions');
}

function calcule_button_content(pluginpath, infobutton) {
  var result = "";
  var fs = require('fs');
  if (infobutton.hasOwnProperty('icon')) {
    var iconpath = pluginpath + infobutton.icon;
    if (fs.existsSync(iconpath)) {
      result = '<img src="' + iconpath + '" />';
    }
  }
  if (infobutton.hasOwnProperty('label')) {
    result += infobutton.label;
  }
  return result;
};

Core.prototype.load_components = function load_components() {
  var fs = require('fs');
  var sections = fs.readdirSync('components');
  sections.forEach(function (section) {
    var actions = fs.readdirSync('components/' + section);
    actions.forEach(function (action) {
      var auxnamespace = 'Project.Actions.' + section + '.' + action;
      var componentpath = './components/' + section + '/' + action + '/';
      createNameSpace(auxnamespace);
      Project.Actions[section][action] = require('./components/' + section + '/' + action + '/' + 'core.js');
      var description = require( componentpath + 'metadata.json');
      $('#navactions').append($(document.createElement('button'))
        .bind('click', function () {Project.Actions[section][action].add(load_element); })
        .html(calcule_button_content(componentpath, description)));
    });
  });
};




$(document).ready(function () {
  var core = new Core();
  core.load_components();
  createNameSpace('Project.UI');
  Project.UI.targetcontent = '#targetcontent';
});