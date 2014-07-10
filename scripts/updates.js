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

	console.log('chord', settings);

};