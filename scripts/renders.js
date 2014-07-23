Lucille.prototype.render = function(reload) {

	// render main version
	this.svg                = Snap(this.chart.width, this.chart.height).attr('class','lucille');
	this.lucille            = this.renderContainer();
	this.lucille.background = this.renderBackground();
	this.lucille.chord      = this.renderChord();
	this.lucille.fretboard  = this.renderFretboard();
	this.lucille.strings    = this.renderStrings();
	this.lucille.frets      = this.renderFrets();
	this.lucille.frettings  = this.renderFrettings();
	this.lucille.buttons    = this.renderButtons();
	this.lucille.settings   = this.renderSettings();
	this.lucille.picker     = this.renderPicker();

	// render minified version
	this.lucille.minified   = this.renderMinified();
	this.lucille.minified.background = this.renderMinifiedBackground();
	this.lucille.minified.buttons = this.renderMinifiedButtons();
	this.lucille.minified.title = this.renderMinifiedTitle();

};

Lucille.prototype.renderContainer = function(){

	var container = this.svg.g();
	container.attr({'class':'main'});

	return container;

};

Lucille.prototype.renderBackground = function(){

	var that       = this;
	var background = this.lucille.rect(0,0,this.chart.width,this.chart.height);
	background.attr({'class':'background'});

	// swipe play
	var hammertime = new Hammer(background.node, {
		distance:100,
		velocity:0.5
	});

	hammertime.on('swipe', function(ev) { 

		var direction = 2 === ev.direction ? 'up' : 'down';
		that.play(direction);

	});

	return background;

};

Lucille.prototype.renderChord = function(){

	var x          = (this.chart.width - 100) / 2;
	var y          = 10;
	var chord      = this.lucille.g().attr({ 'class':'chord button', 'transform':'translate('+x+','+y+')'});
	var background = chord.rect(0,0,100,100).attr('class','touchTarget');
	var root       = chord.text(50, 50, this.tab.root).attr('class','root');
	var type       = chord.text(50, 90, this.tab.type).attr('class','type');

	chord.click(function(){ this.lucille.picker.display(); }, this);

	return chord;

};

Lucille.prototype.renderFretboard = function(){

	var layout    = this.calcLayout();
	var fretboard = this.lucille.g();
	var x         = (layout.chart.width - layout.fretboard.width)/2;
	var y         = (layout.chart.height - layout.fretboard.height)/2 + 15;

	fretboard.attr({'class':'fretboard','transform':'translate('+x+','+y+')'});

	return fretboard;

};

Lucille.prototype.renderFretboardRefresh = function(){

	this.lucille.fretboard.clear();

	this.lucille.strings   = this.renderStrings();
	this.lucille.frets     = this.renderFrets();
	this.lucille.frettings = this.renderFrettings();

};

Lucille.prototype.renderStrings = function(){

	var layout  = this.calcLayout();
	var strings = this.lucille.fretboard.g().attr('class','strings');

	_.times(layout.strings.x1.length,function(n){

		var x1     = layout.strings.x1[n];
		var x2     = layout.strings.x2[n];
		var y1     = layout.strings.y1[n];
		var y2     = layout.strings.y2[n];
		var string = strings.line(x1, y1, x2, y2);

		string.attr({'class':'string'});

	});

	return strings.selectAll('.string');

};

Lucille.prototype.renderFrets = function(){

	var refresh = null !== this.lucille.fretboard.select('.frets');
	var layout  = this.calcLayout();
	var frets   = true === refresh ? this.lucille.fretboard.select('.frets') : this.lucille.fretboard.g().attr('class','frets');

	// prep for 
	frets.clear();

	_.each(layout.frets.y,function(y){

		var fret = frets.line(0,y,layout.fretboard.width,y);
		fret.attr({'class':'fret'});

	});

	return frets.selectAll('.fret');

};

Lucille.prototype.renderFrettings = function(){

	var that      = this;
	var layout    = this.calcLayout();
	var frettings = this.lucille.fretboard.g().attr('class','frettings');
	var radius    = 11;
	var voicing   = this.calcVoicing();

	_.times(layout.strings.x1.length, function(n){

		var x         = layout.strings.x1[n];
		var y         = layout.fretboard.height/2;
		var fretting  = frettings.g().attr({ 'class':'fretting' });
		var dot       = fretting.circle(x,y,radius).attr('class','dot');
		var string    = fretting.line(x,y,x,that.fretboard.height).attr('class','string');
		var tabY 	  = layout.strings.y1[n] - 15;
		var tabFret   = null === voicing[n].fret ? 'X' : voicing[n].fret.toString();
		var tabLabel  = fretting.text(x, tabY, tabFret).attr('class','tab label');
		var noteY     = layout.strings.y2[n] + 15;
		var noteNote  = null === voicing[n].note ? 'X' : voicing[n].note;
		var noteLabel = fretting.text(x, noteY, noteNote).attr('class','note label');

		fretting.click(function(){ that.playString(n); }, this);

	});

	return frettings.selectAll('.fretting');

};

Lucille.prototype.renderButtons = function(){

	var that    = this;
	var layout  = this.calcLayout();
	var buttons = this.lucille.g().attr('class', 'buttons');

	// next 
	var nextX      = layout.chart.width - ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var nextY      = layout.chart.height / 2;
	var next       = buttons.g();
	var nextTarget = next.rect(-25,-25,50,50).attr({'class':'touchTarget'});
	var nextText   = next.text(0, 0, '');

	next.click(this.displayNext, this);
	next.attr({ 'class':'button next', 'transform':'translate('+nextX+','+nextY+')' });
	nextText.node.innerHTML = '&#xf054';

	// prev
	var prevX      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var prevY      = layout.chart.height / 2;
	var prev       = buttons.g();
	var prevTarget = prev.rect(-25,-25,50,50).attr('class','touchTarget');
	var prevText   = prev.text(0, 0, '');

	prev.click(this.displayPrev, this);
	prev.attr({ 'class':'button prev', 'transform':'translate('+prevX+','+prevY+')' });
	prevText.node.innerHTML = '&#xf053';

	// play
	var playX      = layout.chart.width/2;
	var playY      = layout.chart.height - ((layout.chart.height - layout.fretboard.height) / 2) / 2 + 10;
	var play       = buttons.g();
	var playTarget = play.rect(-25,-25,50,50).attr('class','touchTarget');
	var playText   = play.text(0, 0, '');

	play.click(function(){ that.play(); }, this);
	play.attr({ 'class':'button play', 'transform':'translate('+playX+','+playY+')' });
	playText.node.innerHTML = '&#xf028';

	// settings
	var settingsX      = layout.chart.width - ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var settingsY      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var settings       = buttons.g();
	var settingsTarget = settings.rect(-25,-25,50,50).attr('class','touchTarget');
	var settingsText   = settings.text(0, 0, '');

	settings.click(function(){ this.lucille.settings.display(); }, this);
	settings.attr({ 'class':'button settings', 'transform':'translate('+settingsX+','+settingsY+')' });
	settingsText.node.innerHTML = '&#xf0c9';

	// collapse
	var collapseX      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var collapseY      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var collapse       = buttons.g();
	var collapseTarget = collapse.rect(-25,-25,50,50).attr('class','touchTarget');
	var collapseText   = collapse.text(0, 0, '');

	collapse.click(this.displayMinified, this);
	collapse.attr({ 'class':'button collapse', 'transform':'translate('+collapseX+','+collapseY+')' });
	collapseText.node.innerHTML = '&#xf068';

	return buttons.selectAll('.button');

};

Lucille.prototype.renderSettings = function(){

	var orientation      = {};
	orientation.name     = 'orientation';
	orientation.values   = ['RIGHTY','LEFTY'];
	orientation.selected = 0;

	var instrument       = {};
	instrument.name      = 'instrument';
	instrument.values    = ['Guitar','Mandolin'];
	instrument.selected  = 0;

	var preview          = {};
	preview.name         = 'preview';
	preview.values       = ['Strum','Arpeggiate','Travis Pick'];
	preview.selected     = 0;

	var picker           = {};
	picker.title         = 'settings';
	picker.colors        = { background:'#e2e2e2' };
	picker.fields        = [orientation, instrument, preview];

	var that             = this;
	var callback         = function(settings){ that.updateSettings(settings); };
	var settingsPickl    = this.lucille.g();
	var pickl            = new Pickl({ svg:settingsPickl, callback:callback, config:picker });

	return pickl;

};

Lucille.prototype.renderPicker = function(){

	// Picker Settings
	var rootField        	      = {};
	rootField.name              = 'root';
	rootField.values            = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];
	rootField.selected          = 0;

	var typeField               = {};
	typeField.name              = 'type';
	// typeField.values            = ['Major','Maj 6', 'Maj 6add9', 'Maj 7','Maj add9','Maj 9','Maj 13','sus 4','minor','min 6','min 6add9','min 7','min 9','min 11','min 13','Aug','Dim','Dom 7'],
	typeField.values            = ['Major',"minor"];
	typeField.selected          = 0;

	var picker                  = {};
	picker.title                = 'Chord';
	picker.colors               = { background:'#e2e2e2' };
	picker.fields               = [rootField, typeField];

	var that                    = this;
	var callback                = function(settings){ that.updateChord(settings); };
	var settingsPickl           = this.lucille.g();
	var pickl                   = new Pickl({ svg:settingsPickl, callback:callback, config:picker });

	return pickl;

};

Lucille.prototype.renderMinified = function(){

	var minified = this.svg.g();
	minified.attr({'class':'minified', 'display':'none'});

	return minified;

};

Lucille.prototype.renderMinifiedBackground = function(){

	var background = this.lucille.minified.rect(0,0,this.chart.width,50);
	background.attr({'class':'background'});

	return background;

};

Lucille.prototype.renderMinifiedButtons = function(){

	// params
	var that    = this;
	var layout  = this.calcLayout();
	var x, y, buttons, button, buttonTarget, buttonText = null;

	// expand button
	x            = 25;
	y            = 25;
	buttons      = this.lucille.minified.g().attr('class', 'buttons');
	button       = buttons.g();
	buttonTarget = button.rect(-25,-25,50,50).attr('class','touchTarget');
	buttonText   = button.text(0, 0, '');

	button.click(this.displayMinifiedHidden, this);
	button.attr({ 'class':'button collapse', 'transform':'translate('+x+','+y+')' });
	buttonText.node.innerHTML = '&#xf067';

	// play button
	x            = layout.chart.width - 25;
	y            = 25;
	buttons      = this.lucille.minified.g().attr('class', 'buttons');
	button       = buttons.g();
	buttonTarget = button.rect(-25,-25,50,50).attr('class','touchTarget');
	buttonText   = button.text(0, 0, '');

	button.click(function(){ that.play(); }, this);
	button.attr({ 'class':'button collapse', 'transform':'translate('+x+','+y+')' });
	buttonText.node.innerHTML = '&#xf028';

	return buttons;

};

Lucille.prototype.renderMinifiedTitle = function(){

	var layout = this.calcLayout();
	var x      = this.chart.width / 2;
	var y      = 25;
	var root   = this.tab.root;
	var type   = this.tab.type;
	var title  = root + ' ' + type;
	var text   = this.lucille.minified.text(x, y, title).attr({'class':'title'});

	return text;

};
