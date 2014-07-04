Lucille.prototype.display = function(){

	var voicing = this.calcVoicing();
	var layout = this.calcLayout();
	var frets = layout.frets;
	var frettings = this.lucille.frettings;

	_.each(voicing, function(voice, i){

		var fretting = frettings[i];
		var pos = _.indexOf(frets.range, voice.fret);
		var loc = -1 === pos ? 0 : pos;

		// fretting dot
		var dot = fretting.select('.dot');
		var dotClass = -1 === pos ? 'dot hide' : 'dot';
		var dotY = frets.y[loc] - (frets.spacing/2);
		dot.attr({ class:dotClass });
		dot.animate({ cy:dotY }, 700, mina.backout);

		// fretting line
		var line = fretting.select('.string');
		var lineClass = -1 === pos ? 'string hide' : 'string';
		var lineY = frets.y[loc] - (frets.spacing/2);
		line.attr({ class:lineClass });
		line.animate({ y1:lineY }, 700, mina.backout);


	});

};

Lucille.prototype.displayNext = function(){

	var curr = this.tab.caged[0];
	var total = this.tab.caged[1];
	var next = curr + 1 > total ? 0 : curr + 1;

	this.tab.caged[0] = next;

	this.display();

};

Lucille.prototype.displayPrev = function(){

	var curr = this.tab.caged[0];
	var total = this.tab.caged[1];
	var prev = curr - 1 < 0 ? total : curr - 1;

	this.tab.caged[0] = prev;

	this.display();

};