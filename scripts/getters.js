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