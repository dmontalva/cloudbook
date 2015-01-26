function Util(){}

Util.prototype.createNameSpace = function createNameSpace(nameSpaceString) {
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
};

Util.prototype.readOnlyDirectories = function readOnlyDirectories(directorypath) {
	var fs = require('fs');
	var path = require('path');
	var listfiles = fs.readdirSync(directorypath);
	var listfolders = [];
	listfiles.forEach(function (filename){
		var relativepath = path.join(directorypath,filename);
		if(fs.statSync(relativepath).isDirectory()){
			listfolders.push(filename);
		}
	});
	return listfolders;
};

CBUtil = new Util();