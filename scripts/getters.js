// Lucille.prototype.set = function(param, value){

// };

Lucille.prototype.getTab = function(root, type, tuning){

	// update tab & refresh
	var tuning   = tuning || this.instrument.tuning;
	var tabulous = new Tabulous({ root:root.toLowerCase(), type:this.transToTabulousChordType(type), tuning:tuning });
	var voicings = this.transTabulousChordToVoicings(tabulous);
	var tab      = { root:root, type:type, caged:[0, voicings.length-1], voicings:voicings };

	return tab;

};

Lucille.prototype.getCurrentVoicing = function(){

	return lucille.tab.voicings[lucille.tab.caged[0]];

};

Lucille.prototype.getInstrument = function(name){

	var instrument = null;

	switch(name){
		case 'Guitar':
		instrument = this.Instrument.guitar;
		break;
		case 'Mandolin':
		instrument = this.Instrument.mandolin;
		break;
	}

	return instrument;

};

Lucille.prototype.getPlayer = function(){

	var audio = new Howl({
	  urls: [this.audio],
	  sprite: this.calcSpriteOffsets()
	});

	return audio;

};