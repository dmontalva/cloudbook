var gui = require('nw.gui');

// get the window object
var win = gui.Window.get();
var menubar = new gui.Menu({
    type: 'menubar'
  });

/**
 * Actions for menu
 */

var save_project = {
  label: 'Save Project',
  click: function () {
    var fs = require('fs');
    var objectProject = {};
    objectProject['name'] = "Nombre temporal";
    objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
    objectProject['data'] = {};
    objectProject['data']['sections'] = [];
    Project.UI.Data.Sections.forEach(function (section){
      var aux = [];
      section.forEach(function (cbobject){
        aux.push(cbobject.save());
      });
      objectProject['data']['sections'].push(aux);
    });
    var result_string = JSON.stringify(objectProject,null," ");
    fs.writeFile('/tmp/.cloudbook_temp',result_string);

  }
};

var load_project = {
  label: 'Load Project',
  click: function () {
    var pathelement = $(document.createElement('input')).attr('type','file');
    pathelement.change(function(evt) {
          core.loadProject($(this).val());
        });
    pathelement.trigger('click');
  }
};







var file = new gui.Menu();
file.append(new gui.MenuItem(load_project));
file.append(new gui.MenuItem(save_project));

file.append(new gui.MenuItem({
  label: 'Quit',
  click: function () {
    window.close();
  }
}));

menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));

win.menu = menubar;