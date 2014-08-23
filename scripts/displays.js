Lucille.prototype.display = function(){

	var voicing   = this.calcVoicing();
	var layout    = this.calcLayout();
	var frets     = layout.frets;
	var frettings = this.lucille.frettings;

	// reset frets
	this.renderFrets();

	_.each(voicing, function(voice, i){

		var fretting 	= frettings[i];
		var pos 		= _.indexOf(frets.range, voice.fret);
		var loc 		= -1 === pos ? 0 : pos;
		var disabled    = true === voice.obj.inverted;

		// fretting dot
		var dot 		= fretting.select('.dot');
		var dotDisabled = true === disabled ? 'disabled' : '';
		var dotClass 	= -1 === pos ? 'dot hide' : 'dot ' + dotDisabled;
		var dotY 		= frets.y[loc] - (frets.spacing/2);

		dot.attr({ class:dotClass });
		dot.animate({ cy:dotY }, 700, mina.backout);

		// fretting line
		var line 		 = fretting.select('.string');
		var lineDisabled = true === disabled ? 'disabled' : '';
		var lineClass 	 = -1 === voice.fret ? 'string hide' : 'string ' + lineDisabled;
		var lineY 		 = 0 === voice.fret ? layout.strings.y1[i] : frets.y[loc] - (frets.spacing/2);

		line.attr({ class:lineClass });
		line.animate({ y1:lineY }, 700, mina.backout);

		// fretting tab
		var tab 		= fretting.select('.tab');
		var tabFret     = -1 === voice.fret ? 'X' : voice.fret;

		tab.node.textContent = tabFret;

		// fretting tab
		var note 		= fretting.select('.note');
		var noteNote    = null === voice.note ? 'X' : voice.note;

		note.node.textContent = noteNote;

	});

	// log
	if(typeof analytics !== "undefined"){
		var label = this.tab.root + this.tab.type + this.tab.caged[0];
		analytics.trackEvent('Display', 'Voicing', label);
	}
	

};

Lucille.prototype.displayNext = function(){

	var curr  = this.tab.caged[0];
	var total = this.tab.caged[1];
	var next  = curr + 1 > total ? 0 : curr + 1;

	this.tab.caged[0] = next;

	this.display();

};

Lucille.prototype.displayPrev = function(){

	var curr  = this.tab.caged[0];
	var total = this.tab.caged[1];
	var prev  = curr - 1 < 0 ? total : curr - 1;

	this.tab.caged[0] = prev;

	this.display();

};

Lucille.prototype.displayOrientation = function(mode) {

	this.orientation = mode;
	this.renderFretboardRefresh();
	this.display();

};

Lucille.prototype.displayMinified = function(){

	this.lucille.minified.attr('display','');
	this.lucille.attr('display','none');
	this.svg.attr('height', 50);

};

Lucille.prototype.displayMinifiedHidden = function(){

	this.lucille.minified.attr('display','none');
	this.lucille.attr('display','');
	this.svg.attr('height', this.chart.height);

};

