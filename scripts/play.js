Lucille.prototype.play = function(){

	var voicing = _.map(this.calcVoicing(),function(voice){ return voice.note });

	console.log(voicing);

};