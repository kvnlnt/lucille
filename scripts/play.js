Lucille.prototype.play = function(direction){

	var that            = this;
	var voicing         = _.map(this.calcVoicing(),function(voice){ return voice.note });
	var currVoicing     = this.getCurrentVoicing();
	var playableVoicing = _.filter(currVoicing,function(o){ return o.fret > -1});
	var keys            = _.map(playableVoicing, function(voice){ return voice.obj.key(); });
	var notes           = _.map(playableVoicing, function(voice){ return voice.obj.toString(); });
	var offsets         = this.calcSpriteOffsets();
	var direction       = direction || 'down';
	var loopOrder       = 'down' === direction ? _.eachRight : _.each;

	var delay = 65;
	loopOrder(voicing, function(voice, i){ 
		if(null !== voice){
			window.setTimeout(function(){that.playString(i);}, delay);
			delay += 65;
		}
	});

};

Lucille.prototype.playString = function(n){

	var string          = this.lucille.frettings[n].select('.string');
	var coord           = string.attr('x1');
	var dir             = 1;
	var strength        = 5;
	var currVoicing     = this.getCurrentVoicing();
	var key             = currVoicing[n].obj.key();
	var note            = currVoicing[n].obj.toString();

	// console.log('play', key, note);

	// play note
	this.player.play(note);

	// prevent over clicks
	if(void 0 === string.data('active')){
		string.data('active', false);
	}

	// start vibration
	var start = function (val){

		// vars
		var x    = coord;
		var up   = parseInt(coord) + val;
		var down = parseInt(coord) - val;

		// set to active
		string.data('active', true);

		// update coord
		x = dir == 1 ? up : down;

		// attrs
		string.attr({ x1: x, x2:x });

		// flip direction
		dir = dir == 1 ? 0 : 1;

	};

	// reset on completion
	var end = function(){
		string.attr({ x1:coord, x2:coord });
		string.data('active', false);
	};

	// if not currently active, animate
	if(false === string.data('active')){
		Snap.animate(strength, 1, start, strength * 200, mina.easein, end);
	}

};