Lucille.prototype.updateSettings = function(settings){

	// orientation
	if(this.orientation != settings.orientation){
	
		this.orientation = settings.orientation;
		this.renderFretboardRefresh();
		this.display();

	}

};

Lucille.prototype.updateChord = function(settings){

	console.log('chord', settings);

};