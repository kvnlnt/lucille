Lucille.prototype.updateSettings = function(settings){

	// extension type
	var extend = void 0 === typeof settings.extend ? { value:'' } : settings.extend;
	var name = extend.value === '' ? settings.type.name : settings.type.value + extend.value;
	this.orientation       = settings.orientation.value;
	this.instrument.tuning = settings.tuning.value;
	this.updateRootText(settings.root.name);
	this.updateTypeText(name);
	this.updateMinifiedTitle(settings.root.name, name);
	this.tab = this.getTab(settings.root.value, settings.type.value + extend.value, this.instrument.tuning);

	this.renderFretboardRefresh();
	this.plukit = new Plukit({ sampleFile:settings.preview.value, samplePath:this.plukit.settings.samplePath, device:this.plukit.settings.device });
	this.display();

};

Lucille.prototype.updateRootText = function(root){
	this.lucille.chord.select('.root').node.textContent = root;
};

Lucille.prototype.updateTypeText = function(type){
	this.lucille.chord.select('.type').node.textContent = type;
};

Lucille.prototype.updateMinifiedTitle = function(root, type){
	this.lucille.minified.title.node.textContent = root + ' ' + type;
};