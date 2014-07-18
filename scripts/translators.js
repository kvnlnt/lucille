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
	var voicings = _.map(tabulous.voicings, function(voicing, x){ 

		// loop voicing frettings
		return _.map(voicing.data, function(fretting, y){

			return {
				fret:voicing.voicing[y],
				finger:0,
				note:fretting.toString(true).charAt(0).toUpperCase() + fretting.toString(true).charAt(1),
				obj:fretting
			}

		});

	});

	voicings = _.map(voicings, function(voicing){ return voicing.reverse(); });

	return voicings;

};
