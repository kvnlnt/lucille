Lucille.prototype.updateSettings = function(settings){

	this.orientation = settings.orientation
	this.instrument = this.getInstrument(settings.instrument);
	this.tab = this.getTab(this.tab.root, this.tab.type, this.instrument.tuning);

	console.log(settings, this.instrument);

	this.renderFretboardRefresh();
	this.display();

};

Lucille.prototype.updateChord = function(settings){

	// update ui
	this.updateRootText(settings.root);
	this.updateTypeText(settings.type);
	this.tab = this.getTab(settings.root, settings.type, this.instrument.tuning);
	this.renderFretboardRefresh();
	this.display();

};

Lucille.prototype.updateRootText = function(root){
	this.lucille.chord.select('.root').node.textContent = root;
};

Lucille.prototype.updateTypeText = function(type){
	this.lucille.chord.select('.type').node.textContent = type;
};