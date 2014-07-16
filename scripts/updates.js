Lucille.prototype.updateSettings = function(settings){

	console.log(settings, this);

	// orientation
	if(this.orientation != settings.orientation){
	
		this.orientation = settings.orientation;
		this.renderFretboardRefresh();
		this.display();

	}

};

Lucille.prototype.updateChord = function(settings){

	var root     = settings.root.toLowerCase();
	var type     = this.transToTabulousChordType(settings.type);
	var tabulous = new Tabulous({ root:root, type:type });
	var voicings = this.transTabulousChordToVoicings(tabulous);
	var tab      = {
		root:settings.root,
		type:settings.type,
		caged:[0, voicings.length-1],
		voicings:voicings
	};

	this.tab = tab;
	this.renderFretboardRefresh();
	this.display();

};