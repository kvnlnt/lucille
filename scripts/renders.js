Lucille.prototype.render = function(reload) {

	this.lucille            = this.renderChart();
	this.lucille.theme      = this.renderTheme();
	this.lucille.background = this.renderBackground();
	this.lucille.chord      = this.renderChord();
	this.lucille.fretboard  = this.renderFretboard();
	this.lucille.strings    = this.renderStrings();
	this.lucille.frets      = this.renderFrets();
	this.lucille.frettings  = this.renderFrettings();
	this.lucille.buttons    = this.renderButtons();

};

Lucille.prototype.renderChart = function(){

	var chart = Snap(this.chart.width, this.chart.height);
	chart.attr({'class':'lucille'});

	return chart;

};

Lucille.prototype.renderTheme = function(){

	var theme = $('<style>');
		theme.attr('type','text/css');
		theme.attr('class','lucilleTheme');
		theme.append('.lucille .background { fill: '+this.theme.background+'; }');
		theme.append('.lucille .touchTarget { fill: '+this.theme.touchTargetBackground+'; }');

	$('head').append(theme);

	return theme;

};

Lucille.prototype.renderBackground = function(){

	var background = this.lucille.rect(0,0,this.chart.width,this.chart.height);
	background.attr({'class':'background'});

	return background;

};

Lucille.prototype.renderChord = function(){

	var x          = (this.chart.width - 100) / 2;
	var y          = 10;
	var chord      = this.lucille.g().attr({ 'class':'chord button', 'transform':'translate('+x+','+y+')'});
	var background = chord.rect(0,0,100,100).attr('class','touchTarget');
	var root       = chord.text(50, 50, this.tab.root).attr('class','root');
	var type       = chord.text(50, 90, this.tab.type).attr('class','type');

	chord.click(this.displayChordPicker, this);

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

	var layout = this.calcLayout();
	var frets  = this.lucille.fretboard.g().attr('class','frets');

	_.times(layout.frets.y.length,function(n){

		var y    = layout.frets.y[n];
		var fret = frets.line(0,y,layout.fretboard.width,y);

		fret.attr({'class':'fret'});

	});

	return frets.selectAll('.fret');

};

Lucille.prototype.renderFrettings = function(){

	var that      = this;
	var layout    = this.calcLayout();
	var frettings = this.lucille.fretboard.g().attr('class','frettings');
	var radius    = layout.strings.spacing/2 - 1;

	_.times(layout.strings.x1.length,function(n){

		var x        = layout.strings.x1[n];
		var y        = layout.fretboard.height/2;
		var fretting = frettings.g().attr({'class':'fretting'});
		var dot      = fretting.circle(x,y,radius).attr('class','dot');
		var string   = fretting.line(x,y,x,that.fretboard.height).attr('class','string');

	});

	return frettings.selectAll('.fretting');

};

Lucille.prototype.renderButtons = function(){

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
	var playY      = layout.chart.height - ((layout.chart.height - layout.fretboard.height) / 2) / 2;
	var play       = buttons.g();
	var playTarget = play.rect(-25,-25,50,50).attr('class','touchTarget');
	var playText   = play.text(0, 0, '');

	play.click(this.play, this);
	play.attr({ 'class':'button play', 'transform':'translate('+playX+','+playY+')' });
	playText.node.innerHTML = '&#xf028';

	// settings
	var settingsX               = layout.chart.width - ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var settingsY               = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var settings                = buttons.g();
	var settingsTarget          = settings.rect(-25,-25,50,50).attr('class','touchTarget');
	var settingsText            = settings.text(0, 0, '');

	settings.click(this.displaySettings, this);
	settings.attr({ 'class':'button settings', 'transform':'translate('+settingsX+','+settingsY+')' });
	settingsText.node.innerHTML = '&#xf0c9';

	return buttons.selectAll('.button');

};
