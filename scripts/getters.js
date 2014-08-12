// Lucille.prototype.set = function(param, value){

// };

Lucille.prototype.getTab = function(root, type, tuning, algorithm){

	// update tab & refresh
	var tuning    = tuning || this.instrument.tuning;
	var tabulous  = new Tabulous({ root:root, type:type, tuning:tuning });
	var voicings  = this.transTabulousChordToVoicings(tabulous);
	var tab       = { root:root, type:type, caged:[0, voicings.length-1], voicings:voicings, chord:tabulous.chord };

	return tab;

};

Lucille.prototype.getCurrentVoicing = function(){

	return this.tab.voicings[this.tab.caged[0]];

};

Lucille.prototype.getInstrument = function(instrument, tuning){

	var instrument = null;

	switch(name){
		case 'Guitar':
		instrument = this.Instrument.guitar;
		break;
		case 'majandolin':
		instrument = this.Instrument.mandolin;
		break;
	}

	return instrument;

};