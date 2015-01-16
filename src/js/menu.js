var gui = require('nw.gui');

// get the window object
var win = gui.Window.get();
var menubar = new gui.Menu({
    type: 'menubar'
  });

var file = new gui.Menu();
file.append(new gui.MenuItem({
  label: 'Save Project',
  click: function () {
    
  }
}));

file.append(new gui.MenuItem({
  label: 'Quit',
  click: function () {
    window.close();
  }
}));

menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));

win.menu = menubar;