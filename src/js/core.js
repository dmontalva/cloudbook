/**
 * Author : Raul Rodrigo Segura <raurodse@gmail.com>
 */

function Core() {

  CBUtil.createNameSpace('Project');
  CBUtil.createNameSpace('Project.Actions');
  CBUtil.createNameSpace('Project.UI');
  CBUtil.createNameSpace('Project.UI.Data.Info');
  Project.UI.targetcontent = '#targetcontent';

}

Core.prototype.loadComponents = function loadComponents() {
  var that = this;
  var sections = CBUtil.readOnlyDirectories('./components');
  sections.forEach(function (section) {
    var actions = CBUtil.readOnlyDirectories('./components/'+section);
    actions.forEach(function (action) {
      
      var auxpathcomponent = './components/'+section+'/'+action + '/';
      var description = require(auxpathcomponent + '/metadata.json');
      var auxnamespace = 'Project.Actions.' + description['namespace'];
      CBUtil.createNameSpace(auxnamespace);
      Project.Actions[section][action] = require( auxpathcomponent + 'core.js');
      
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
            var fullobject = new Project.Actions[section][action]();
            var viewobject = $(fullobject.editorView());
            $(Project.UI.targetcontent).append(viewobject);
            //eval('function _____x_____(jquerycbo,objectcbo){'+ Project.Actions[section][action].add_callback + '}; _____x_____(fullobject,viewobject); ');
            add_callback = Function('jquerycbo','objectcbo',Project.Actions[section][action].add_callback);
            add_callback(fullobject,viewobject);
            //loadElement(viewobject,fullobject);
            Project.UI.Data.Sections[Project.UI.selected.attr('id')-1].push(fullobject);
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
        var script = fs.readFileSync(path.join(pluginpath,scriptpath),'utf8');
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

Core.prototype.initSections = function initSections() {
  var that = this;
  CBUtil.createNameSpace('Project.UI.Data.Sections');
  Project.UI.Data.Sections = [];
  var addsection = $(document.createElement('img'))
                    .attr('id','addsection')
                    .attr('src', 'img/add.png')
                    .bind('click', that.addSection);
  $("#navsections").html(addsection);
};

Core.prototype.addSection = function addSection() {
  Project.UI.Data.Sections.push([]);
  var sectionthumbnail = $(document.createElement('img'))
                            .attr('src', 'img/white.png')
                            .attr('id', Project.UI.Data.Sections.length)
                            .bind('click', function () {loadThumbnailSelected(this); });
                            
  $(this).before(sectionthumbnail);
};

Core.prototype.loadProject = function(projectPath) {
  var fs = require('fs');
  if (fs.existsSync(projectPath)){

    var projectdata = require(projectPath);
    this.voidProject();
    Project.UI.Data.Info.projectname = projectPath;
    projectdata.data.sections.forEach(function(section){
      var tempsection = [];
      section.forEach(function(element){
        tempsection.push(CBUtil.getObjectFromString('Project.Actions.' + element['type']).restore(element));
      });
      Project.UI.Data.Sections.push(tempsection);
    });
  }
  
};


Core.prototype.saveProject = function(projectPath) {
  var fs = require('fs');
    var objectProject = {};
    objectProject['name'] = "Nombre temporal";
    objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
    objectProject['data'] = {};
    objectProject['data']['sections'] = Project.UI.Data.Sections;
    var result_string = JSON.stringify(objectProject,null," ");
    fs.writeFile(projectPath,result_string);
};

Core.prototype.voidProject = function() {
  this.initSections();
};


function loadThumbnailSelected(thumbnail) {

  if (Project.UI.selected !== undefined){
    Project.UI.selected.removeClass('sectionselected');
  } 
  // Load content into targetcontent
  
  Project.UI.selected = $(thumbnail);
  loadContent(Project.UI.selected.attr('id')-1);
  $(thumbnail).addClass('sectionselected');
}

function loadContent(id){
  $(Project.UI.targetcontent).html("");
  if (Project.UI.Data.Sections[id] !== undefined ){
    Project.UI.Data.Sections[id].forEach(function (element){
      var x = element.editorView();
      $(Project.UI.targetcontent).append(x);
      loadElement(x);
    });
  }
}



/************************
 *        Main          *
 ************************/

/*
 * Core is created in this moment by loadComponent function. This function is responsible load extra libs on components.
 * These libraries be load before 
 */
var core = new Core();
core.loadComponents();

$(document).ready(function () {

  core.renderActionsButtons();
  core.initSections();

  /**
   * Create initial page and select this
   */
  $('#addsection').click();
  $('#addsection').prev().click();
});

