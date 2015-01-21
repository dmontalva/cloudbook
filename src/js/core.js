
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


Core.prototype.load_components = function load_components() {
  var that = this;
  var fs = require('fs');
  var sections = fs.readdirSync('components');
  sections.forEach(function (section) {
    var actions = fs.readdirSync('components/' + section);
    actions.forEach(function (action) {
      var auxnamespace = 'Project.Actions.' + section + '.' + action;
      var componentpath = './components/' + section + '/' + action + '/';
      createNameSpace(auxnamespace);
      Project.Actions[section][action] = require('./components/' + section + '/' + action + '/' + 'core.js');
      var description = require(componentpath + 'metadata.json');
      $('#navactions').append($(document.createElement('button'))
        //.bind('click', function () {Project.Actions[section][action].add(load_element); })
        .bind('click', function () {
          var objeto = Project.Actions[section][action].add();
          var representacion = objeto.editorView();
          representacion.addClass('draggable').css('position','relative');
          $(Project.UI.targetcontent).append(representacion);
          load_element(objeto);
          Project.UI.Data.Sections[Project.UI.selected.attr('id')-1].push(objeto);
        })
        .html(that.calcule_button_content(componentpath, description)));
      that.load_component_extra(componentpath, description);
    });
  });
};

Core.prototype.load_component_extra = function load_component_extra(pluginpath,infobutton) {
  var head = document.getElementsByTagName('head')[0];
  if (infobutton.hasOwnProperty('external_css')) {
      infobutton['external_css'].forEach(function(csspath){
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = pluginpath + csspath;
      head.appendChild(css);
    }); 
  }
  if (infobutton.hasOwnProperty('external_scripts')) {
    infobutton['external_scripts'].forEach(function(scriptpath){
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = pluginpath + scriptpath;
      head.appendChild(script);
    });
  }
  
};


Core.prototype.calcule_button_content = function calcule_button_content(pluginpath, infobutton) {
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

Core.prototype.load_sections = function load_sections() {
  var that = this;
  createNameSpace('Project.UI.Data.Sections');
  Project.UI.Data.Sections = [];
  var addsection = $(document.createElement('img'))
                    .attr('id','addsection')
                    .attr('src', 'img/add.png')
                    .bind('click', that.add_section);
  $("#navsections").append(addsection);
};

Core.prototype.add_section = function add_section() {
  var section = [];
  Project.UI.Data.Sections.push(section);
  var section_thumbnail = $(document.createElement('img'))
                            .attr('src', 'img/white.png')
                            .attr('id', Project.UI.Data.Sections.length)
                            .bind('click', function () {load_content(this); });
  $(this).before(section_thumbnail);
};






function load_content(thumbnail) {

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


$(document).ready(function () {
  var core = new Core();
  core.load_components();
  core.load_sections();
  createNameSpace('Project.UI');
  Project.UI.targetcontent = '#targetcontent';
});