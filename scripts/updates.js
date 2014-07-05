Lucille.prototype.updateSettings = function(settings){

	console.log('settings', settings);
	console.log('this', this);

	// orientation
	if(this.orientation != settings.orientation){
	
		this.orientation = settings.orientation;
		this.renderFretboardRefresh();
		this.display();

	}

};