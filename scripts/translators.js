Lucille.prototype.transToTabulousChordType = function(type) {

	var translation = '';

	switch(type){

		case 'Major':
			translation = '';
			break
		case 'minor':
			translation = 'm';
			break;

	};

	return translation;

};

Lucille.prototype.transTabulousChordToVoicings = function(tabulous){

	// loop voicings
	var notes    = _.map(tabulous.notes, function(note){ return note.toString(true)});
	var voicings = _.map(tabulous.voicings, function(voicing, x){ 

		// loop voicing frettings
		return _.map(voicing.data, function(fretting, y){

			var isNoteInChord 	= _.contains(notes, fretting.toString(true));
			var hasEnharmonic 	= _.filter(fretting.enharmonics(), function(enharmonic){ return _.contains(notes, enharmonic.toString(true))});
			var note 			= null;

			if(isNoteInChord) note = fretting.toString(true);
			if(hasEnharmonic.length) note = hasEnharmonic.toString(true);
			note = note.charAt(0).toUpperCase() + note.charAt(1);

			return {
				fret:voicing.voicing[y],
				finger:0,
				note:note,
				obj:fretting
			}

		});

	});

	voicings = _.map(voicings, function(voicing){ return voicing.reverse(); });

	return voicings;

};
