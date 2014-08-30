Lucille.prototype.play = function(direction){

	var that       = this;
	var playButton = this.lucille.buttons[2];

	// don't allow reclicks
	if(!playButton.data('active')){

		// set to active to prevent reclicks
		playButton.data('active', true);

		// and expire after 2 seconds to allow reclicks
		setTimeout(function(){ that.lucille.buttons[2].data('active', false); }, 2000);
		
		// calc stuff
		var voicing         = _.map(this.calcVoicing(),function(voice){ return voice.note });
		var currVoicing     = this.getCurrentVoicing();
		var playableVoicing = _.filter(currVoicing,function(o){ return o.fret > -1 && o.obj.inverted === false });
		var keys            = _.map(playableVoicing, function(voice){ return voice.obj.key(); });
		var notes           = _.map(playableVoicing, function(voice){ return voice.obj.toString(); });
		var direction       = direction || 'down';
		var loopOrder       = 'down' === direction ? _.eachRight : _.each;

		var delay = 65;
		loopOrder(currVoicing, function(voice, i){ 
			if(null !== voice.obj){
                if(false === voice.obj.inverted){
                    window.setTimeout(function(){that.playString(i);}, delay);
                    delay += 65;
                }	
			}
		});

	}
	

};

Lucille.prototype.playString = function(n){

	// get object
	var string      = this.lucille.frettings[n].select('.string');
	var currVoicing = this.getCurrentVoicing();
	var key         = currVoicing[n].obj.key();
	var note        = currVoicing[n].obj.toString();
	var reset       = function(){ clearInterval(vibrate); string.attr({ 'stroke-opacity': 1, 'strokeWidth': 5 }); };
	var interval    = 50;
	var playLength  = 2000;
	var playHead    = 0;

	// reset anim
	reset();

	// start animation
	var buzz = function(){

		playHead += interval;

        var percentComplete = playHead / playLength;
        var opacity         = percentComplete < 0.5 ? 0.5 : percentComplete;
        var strokeWidth     = (1 - percentComplete) < 0.5 ? 5 : (1 - percentComplete) * 10;

        string.attr({ 'stroke-opacity':opacity, 'stroke-width':strokeWidth });
        if (playHead >= playLength) reset();
        
    };

    // start string buzz if not active
    if(false === string.data('active')){
    	var vibrate = setInterval(buzz, interval);
		this.plukit.play(note);
    	string.data('active',true);
    	setTimeout(function(){ string.data('active',false); }, playLength);
    }	

};