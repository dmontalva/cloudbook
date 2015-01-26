/**
 * Author : Raul Rodrigo Segura <raurodse@gmail.com>
 */

function Core() {

  CBUtil.createNameSpace('Project');
  CBUtil.createNameSpace('Project.Actions');
  CBUtil.createNameSpace('Project.UI');
  Project.UI.targetcontent = '#targetcontent';

}

Core.prototype.loadComponents = function loadComponents() {
  var that = this;
  var sections = CBUtil.readOnlyDirectories('./components');
  sections.forEach(function (section) {
    var actions = CBUtil.readOnlyDirectories('./components/'+section);
    actions.forEach(function (action) {
      var auxnamespace = 'Project.Actions.' + section + '.' + action;
      var auxpathcomponent = './components/'+section+'/'+action + '/';
      CBUtil.createNameSpace(auxnamespace);
      Project.Actions[section][action] = require( auxpathcomponent + 'core.js');
      var description = require(auxpathcomponent + '/metadata.json');
      that.loadComponentExtraScripts(auxpathcomponent , description);
    });
  });
};

Core.prototype.renderActionsButtons = function renderActionsButtons(){
    var that = this;
    Object.keys(Project.Actions).forEach(function (section) {
      Object.keys(Project.Actions[section]).forEach(function (action){

        var componentpath = './components/' + section + '/' + action + '/';
        var description = require(componentpath + 'metadata.json');

        that.loadComponentExtraCss(componentpath,description);
        $('#navactions').append($(document.createElement('button'))
          .bind('click', function () {
            var objeto = Project.Actions[section][action].add();
            var representacion = objeto.editorView();
            representacion.addClass('draggable').css('position','relative');
            $(Project.UI.targetcontent).append(representacion);
            loadElement(objeto);
            Project.UI.Data.Sections[Project.UI.selected.attr('id')-1].push(objeto);
          })
          .html(that.calculeButtonContent(componentpath, description)));        
      });
    })
}


Core.prototype.loadComponentExtraScripts = function loadComponentExtraScripts(pluginpath,infobutton) {
  var fs = require('fs');
  var path = require('path');
  if (infobutton.hasOwnProperty('external_scripts')) {
      var fs = require('fs');
      var path = require('path');
      infobutton['external_scripts'].forEach(function(scriptpath){
        var script = fs.readFileSync(path.join(pluginpath,scriptpath));
        eval(script);
      });
  } 
};

Core.prototype.loadComponentExtraCss = function loadComponentExtraCss(pluginpath, infobutton){
  var head = document.getElementsByTagName('head')[0];
  if (infobutton.hasOwnProperty('external_css')) {
      infobutton['external_css'].forEach(function(csspath){
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = pluginpath + csspath;
      head.appendChild(css);
    }); 
  }
}

Core.prototype.calculeButtonContent = function calculeButtonContent(pluginpath, infobutton) {
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

Core.prototype.loadSections = function loadSections() {
  var that = this;
  CBUtil.createNameSpace('Project.UI.Data.Sections');
  Project.UI.Data.Sections = [];
  var addsection = $(document.createElement('img'))
                    .attr('id','addsection')
                    .attr('src', 'img/add.png')
                    .bind('click', that.addSection);
  $("#navsections").append(addsection);
};

Core.prototype.addSection = function addSection() {
  var section = [];
  Project.UI.Data.Sections.push(section);
  var sectionthumbnail = $(document.createElement('img'))
                            .attr('src', 'img/white.png')
                            .attr('id', Project.UI.Data.Sections.length)
                            .bind('click', function () {loadContent(this); });
  $(this).before(sectionthumbnail);
};







function loadContent(thumbnail) {

  if (Project.UI.selected !== undefined){
    Project.UI.selected.removeClass('sectionselected');
  } 
  // Load content into targetcontent
  $(Project.UI.targetcontent).html("");
  Project.UI.selected = $(thumbnail);
  if (Project.UI.Data.Sections[Project.UI.selected.attr('id')-1] !== undefined ){
    Project.UI.Data.Sections[Project.UI.selected.attr('id')-1].forEach(function (element){
      $(Project.UI.targetcontent).append(element.editorView().addClass('draggable').css('position','relative'));
    });
  }
  $(thumbnail).addClass('sectionselected');
}



/************************
 *        Main          *
 ************************/

var core = new Core();
core.loadComponents();

$(document).ready(function () {

  core.renderActionsButtons();
  core.loadSections();
});