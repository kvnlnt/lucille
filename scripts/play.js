Lucille.prototype.play = function(direction){

	var that            = this;
	var voicing         = _.map(this.calcVoicing(),function(voice){ return voice.note });
	var currVoicing     = this.getCurrentVoicing();
	var playableVoicing = _.filter(currVoicing,function(o){ return o.fret > -1 && o.obj.inverted === false });
	var keys            = _.map(playableVoicing, function(voice){ return voice.obj.key(); });
	var notes           = _.map(playableVoicing, function(voice){ return voice.obj.toString(); });
	var direction       = direction || 'down';
	var loopOrder       = 'down' === direction ? _.eachRight : _.each;

	var delay = 65;
	loopOrder(playableVoicing, function(voice, i){ 
		if(null !== voice){
			window.setTimeout(function(){that.playString(i);}, delay);
			delay += 65;
		}
	});

};

Lucille.prototype.playString = function(n){

	// get object
	var string      = this.lucille.frettings[n].select('.string');
	var x           = string.data('x');
	var dir         = 1;
	var currVoicing = this.getCurrentVoicing();
	var key         = currVoicing[n].obj.key();
	var note        = currVoicing[n].obj.toString();
	var length      = 2000;
	var number      = 10;
	var inc         = 50;
	var complete    = 0;
	var variance    = 3;
	var reset       = function(){ clearInterval(vibrate); string.attr({x1:x, x2:x}); };

	// reset anim
	reset();

	// start animation
	var vibrate     = setInterval(function() {
		dir = dir == 1 ? 0 : 1;
		complete = number / length;
		var factor = (1 - complete) * variance; // invert percent complete
		var playX = dir == 1 ? x-factor : x+factor; // get current x
		number += inc; // increment number
        string.attr({x1:playX, x2:playX});
        if (number >= length) reset();
    }, inc);

	// play audio
	this.player.play(note);

	

};