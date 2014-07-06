Lucille.prototype.play = function(){

	var that    = this;
	var voicing = _.map(this.calcVoicing(),function(voice){ return voice.note });

	_.each(voicing, function(voice, i){ 
		if(null !== voice){
			that.playString(i);
		}
	});

};

Lucille.prototype.playString = function(n){

	var string   = this.lucille.frettings[n].select('.string');
	var coord    = string.attr('x1');
	var dir      = 1;
	var strength = 5;

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