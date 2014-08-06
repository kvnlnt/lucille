var Lucille = function(options){

    // params
    var defaults = {};

    defaults.chart       = { width: 320, height: 520 };
    defaults.fretboard   = { width:120, height:250 };
    defaults.orientation = 'RIGHTY';
    defaults.instrument  = this.Instrument;
    defaults.audio       = 'audio/gtr_aco_steel.mp3';
    defaults.pattern     = 'strum';
    defaults.tab         = this.getTab('C','M', this.Instrument.tuning);
    defaults.theme       = 'zen';

    // setup options
    _.extend(this, defaults, options);

    // computed params
    this.player = this.getPlayer();

    // initializers
    this.themeLoad();
    this.render();
    this.display();
    this.updateTypeText('Major');

};;Lucille.prototype.Fixture = (function(){

    var fixture = {

        theme:{

            plain:{

                background:'#e2e2e2',
                touchTargetBackground:'#e2e2e2'

            }

        },

        guitar: {
            root:'C',
            type:'Major',
            caged:[0,1],
            voicings:[
                [
                    { fret:0, finger:0, note:'E'},
                    { fret:1, finger:0, note:'C'},
                    { fret:0, finger:0, note:'G'},
                    { fret:2, finger:0, note:'E'},
                    { fret:3, finger:0, note:'C'},
                    { fret:null, finger:null, note:null},
                ],
                [
                    { fret:3, finger:0, note:'G'},
                    { fret:5, finger:0, note:'D'},
                    { fret:5, finger:0, note:'C'},
                    { fret:5, finger:0, note:'G'},
                    { fret:3, finger:0, note:'C'},
                    { fret:3, finger:0, note:'G'},
                ]
            ]
        }

    };

    return fixture;

}());


;Lucille.prototype.Instrument = (function(){

	var instrument =  { strings : 6, tuning : ['e2','a2','d3','g3','b3','e4'] };

	return instrument;	

}());;Lucille.prototype.calcVoicing = function(){

	return this.tab.voicings[this.tab.caged[0]];

};

Lucille.prototype.calcLayout = function(){

	var layout       = {};

	layout.chart 	 = this.chart;
	layout.fretboard = this.fretboard;
	layout.strings 	 = this.calcStringLayout();
	layout.frets   	 = this.calcFretLayout();

	return layout;

};

Lucille.prototype.calcStringLayout = function(){

        // param
        var that    = this;
		var strings = this.instrument.strings;
		var spacing = this.fretboard.width / (strings - 1);
        var arch 	= this.fretboard.height * .025;
        var x1 		= _.times(strings, function(string) { return string * spacing });
        var x2 		= _.times(strings, function(string) { return string * spacing });
        var y1 		= _.times(strings, function(string) { return 0 });
        var y2 		= _.times(strings, function(string) { return that.fretboard.height });
        var yTop    = 0;

        // curve top
        for (var start = 0, end = strings - 1; start <= end; start++, end--) {

            y1[start] = yTop;
            y1[end] = yTop;
            yTop += arch; 

        }

        // reverse
        if('RIGHTY' === this.orientation){
            x1.reverse();
            x2.reverse();
            y1.reverse();
            y2.reverse();
        }
        
        return {

            x1: x1,
            x2: x2,
            y1: y1,
            y2: y2,
            spacing:spacing

        };

};

Lucille.prototype.calcFretLayout = function(){

	var voicing = this.calcVoicing();
	var range, spacing, y = null;

    range   = _.sortBy(voicing,function(voice){ return voice.fret; });
    range   = _.pluck(range, 'fret');
    range   = _.compact(range);
    range   = _.filter(range,function(fret){ return fret > -1});
    range   = _.range(_.first(range), _.last(range)+1);
    spacing = this.fretboard.height / range.length;
    y       = _.times(range.length,function(fret){ return (fret+1) * spacing });

    return {
        y:y,
        range:range,
        spacing:spacing
    }

};

Lucille.prototype.calcSpriteOffsets = function(){

    var keys          = ['c','c#/db','d','d#/eb','e','f','f#/gb','g','g#/ab','a','a#/bb','b'];
    var offset        = 0;
    var sprite        = {};
    var sample_length = 2000;
    var octaves       = 5;
    
    _.times(octaves,function(n){

        var octave = n+1;
        _.each(keys, function(key){

            var key_notes = key.split('/');
            sprite[key_notes[0] + octave] = [offset, sample_length];
            if(key_notes.length > 1){
                sprite[key_notes[1] + octave] = [offset, sample_length];
            } 
            
            offset += sample_length;

        });

    });

    return sprite;

};
;Lucille.prototype.render = function(reload) {

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
	var hammertime = new Hammer(background.node, { distance:50	});

	hammertime.on('swiperight', function(ev) { 

		var direction = 'RIGHTY' === that.orientation ? 'down' : 'up';
		that.play(direction);

	});

	hammertime.on('swipeleft', function(ev) { 

		var direction = 'RIGHTY' === that.orientation ? 'up' : 'down';
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
	var nextText   = next.text(0, 0, '\uf054');

	next.click(this.displayNext, this);
	next.attr({ 'class':'button next', 'transform':'translate('+nextX+','+nextY+')' });

	// prev
	var prevX      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var prevY      = layout.chart.height / 2;
	var prev       = buttons.g();
	var prevTarget = prev.rect(-25,-25,50,50).attr('class','touchTarget');
	var prevText   = prev.text(0, 0, '\uf053');

	prev.click(this.displayPrev, this);
	prev.attr({ 'class':'button prev', 'transform':'translate('+prevX+','+prevY+')' });

	// play
	var playX      = layout.chart.width/2;
	var playY      = layout.chart.height - ((layout.chart.height - layout.fretboard.height) / 2) / 2 + 10;
	var play       = buttons.g();
	var playTarget = play.rect(-25,-25,50,50).attr('class','touchTarget');
	var playText   = play.text(0, 0, '\uf028');

	play.click(function(){ that.play(); }, this);
	play.attr({ 'class':'button play', 'transform':'translate('+playX+','+playY+')' });

	// settings
	var settingsX      = layout.chart.width - ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var settingsY      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var settings       = buttons.g();
	var settingsTarget = settings.rect(-25,-25,50,50).attr('class','touchTarget');
	var settingsText   = settings.text(0, 0, '\uf0c9');

	settings.click(function(){ this.lucille.settings.display(); }, this);
	settings.attr({ 'class':'button settings', 'transform':'translate('+settingsX+','+settingsY+')' });

	// collapse
	var collapseX      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var collapseY      = ((layout.chart.width - layout.fretboard.width) / 2) / 2;
	var collapse       = buttons.g();
	var collapseTarget = collapse.rect(-25,-25,50,50).attr('class','touchTarget');
	var collapseText   = collapse.text(0, 0, '\uf068');

	collapse.click(this.displayMinified, this);
	collapse.attr({ 'class':'button collapse', 'transform':'translate('+collapseX+','+collapseY+')' });

	return buttons.selectAll('.button');

};

Lucille.prototype.renderSettings = function(){


	var config   = this.configSettings();
	var that     = this;
	var callback = function(settings){ that.updateSettings(settings); };
	var svg      = this.lucille.g();
	var pickl    = new Pickl({ svg:svg, callback:callback, config:config });

	return pickl;

};

Lucille.prototype.renderPicker = function(){

	var config   = this.configPicker();
	var that     = this;
	var callback = function(settings){ that.updateChord(settings); };
	var svg      = this.lucille.g();
	var pickl    = new Pickl({ svg:svg, callback:callback, config:config });

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
	buttonText   = button.text(0, 0, '\uf067');

	button.click(this.displayMinifiedHidden, this);
	button.attr({ 'class':'button collapse', 'transform':'translate('+x+','+y+')' });

	// play button
	x            = layout.chart.width - 25;
	y            = 25;
	buttons      = this.lucille.minified.g().attr('class', 'buttons');
	button       = buttons.g();
	buttonTarget = button.rect(-25,-25,50,50).attr('class','touchTarget');
	buttonText   = button.text(0, 0, '\uf028');

	button.click(function(){ that.play(); }, this);
	button.attr({ 'class':'button collapse', 'transform':'translate('+x+','+y+')' });

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
;Lucille.prototype.display = function(){

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

		// fretting dot
		var dot 		= fretting.select('.dot');
		var dotClass 	= -1 === pos ? 'dot hide' : 'dot';
		var dotY 		= frets.y[loc] - (frets.spacing/2);

		dot.attr({ class:dotClass });
		dot.animate({ cy:dotY }, 700, mina.backout);

		// fretting line
		var line 		= fretting.select('.string');
		var lineClass 	= -1 === voice.fret ? 'string hide' : 'string';
		var lineY 		= 0 === voice.fret ? layout.strings.y1[i] : frets.y[loc] - (frets.spacing/2);

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

;Lucille.prototype.play = function(direction){

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

};;Lucille.prototype.updateSettings = function(settings){

	this.orientation       = settings.orientation.value;
	this.instrument.tuning = settings.tuning.value;
	this.tab               = this.getTab(this.tab.root, this.tab.type, this.instrument.tuning, settings.algorithm.value);
	this.audio             = settings.preview.value;

	this.renderFretboardRefresh();
	this.player = this.getPlayer();
	this.display();

};

Lucille.prototype.updateChord = function(settings){

	// update ui
	this.updateRootText(settings.root.name);
	this.updateTypeText(settings.type.name);
	this.updateMinifiedTitle(settings.root.name, settings.type.name);
	this.tab = this.getTab(settings.root.value, settings.type.value, this.instrument.tuning);
	this.renderFretboardRefresh();
	this.display();

};

Lucille.prototype.updateRootText = function(root){
	this.lucille.chord.select('.root').node.textContent = root;
};

Lucille.prototype.updateTypeText = function(type){
	this.lucille.chord.select('.type').node.textContent = type;
};

Lucille.prototype.updateMinifiedTitle = function(root, type){
	this.lucille.minified.title.node.textContent = root + ' ' + type;
};;Lucille.prototype.transToTabulousChordType = function(type) {

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

			var note = null === fretting ? null : fretting.toString(true).charAt(0).toUpperCase() + fretting.toString(true).charAt(1);

			return {
				fret:voicing.voicing[y],
				finger:0,
				note:note,
				obj:fretting
			}

		});

	});

	voicings = _.map(voicings, function(voicing){ return voicing.reverse(); });

	return voicings;

};
;// Lucille.prototype.set = function(param, value){

// };

Lucille.prototype.getTab = function(root, type, tuning, algorithm){

	// update tab & refresh
	var tuning    = tuning || this.instrument.tuning;
	var algorithm = algorithm || 'CHAIN';
	var tabulous  = new Tabulous({ root:root, type:type, tuning:tuning, algorithm:algorithm });
	var voicings  = this.transTabulousChordToVoicings(tabulous);
	var tab       = { root:root, type:type, caged:[0, voicings.length-1], voicings:voicings, chord:tabulous.chord };

	return tab;

};

Lucille.prototype.getCurrentVoicing = function(){

	return this.tab.voicings[this.tab.caged[0]];

};

Lucille.prototype.getInstrument = function(instrument, tuning){

	var instrument = null;

	switch(name){
		case 'Guitar':
		instrument = this.Instrument.guitar;
		break;
		case 'majandolin':
		instrument = this.Instrument.mandolin;
		break;
	}

	return instrument;

};

Lucille.prototype.getPlayer = function(){

	var audio = new Howl({
	  urls: [this.audio],
	  sprite: this.calcSpriteOffsets()
	});

	return audio;

};;Lucille.prototype.destroy = function(){

	// var that = this;
	// var msg = confirm('Would you like to remove this chord?');

	// if(msg){ 
		this.lucille.remove();
		this.svg.remove();
		delete this;
	// }

};;// Usage:
// Pass a theme object in options formatted like so, else defaults will be applied:

// theme:{
//     background:'#000000',
//     touchTargetBackground:'#000000',
//     fontColor:'#FFFFFF',
//     chordFontColor:'#FF0000'
// }

Lucille.prototype.themes = (function(){

	// default settings
	var themes                         = {};
	themes.plain                       = {};
	themes.plain.background            = '#e2e2e2';
	themes.plain.touchTargetBackground = '#e2e2e2';
	themes.plain.fontColor             = '#000000';
	themes.plain.chordFontColor        = '#000000';
	themes.zen                         = {};
	themes.zen.background              = '#000000';
	themes.zen.touchTargetBackground   = '#000000';
	themes.zen.fontColor               = '#FFFFFF';
	themes.zen.chordFontColor          = '#FF0000';

    return themes;

}());

Lucille.prototype.themeLoad = function(){

	// remove if exists
	$('.lucilleTheme').remove();

	// style
	var style = this.themes[this.theme];

	// theme
	var css   = '';
	var theme = $('<style>');
		theme.attr('type','text/css');
		theme.attr('class','lucilleTheme');

		// backgrounds

			css += '.lucille .background { fill: '+style.background+'; }';
			css += '.lucille .touchTarget { fill: '+style.touchTargetBackground+'; cursor:pointer; }';

		// fonts

			css += '@font-face {';
			css += 'font-family: \'VarelaRound\';';
			css += 'font-style: normal;';
			css += 'font-weight: 400;';
			css += 'src: local(\'VarelaRound\'), local(\'VarelaRound-Regular\'), url(../fonts/Varela_Round/VarelaRound-Regular.woff) format(\'woff\');';
			css += '}';

		// general

			css += ".lucille { font-family:'VarelaRound'; font-size: 1rem; }";

		// text basic

			css += ".lucille text { alignment-baseline:central; text-anchor:middle; fill:"+style.fontColor+" }";

		// buttons

			css += ".lucille .buttons .button text { cursor: pointer; fill:"+style.fontColor+"; opacity:0.4; pointer-events:none; }";
			css += ".lucille .button:hover text { opacity:1; }";
			css += ".lucille .button.next, .lucille .button.prev, .lucille .button.play { font-family:'FontAwesome'; font-size: 2rem; cursor: pointer; }";
			css += ".lucille .button.settings, .lucille .button.collapse { font-family:'FontAwesome'; font-size: 1.5rem; cursor: pointer; }";

		// chord

			css += ".lucille .chord .root { font-size: 3rem; opacity:1; fill:"+style.chordFontColor+"; pointer-events:none; }";
			css += ".lucille .chord .type { font-size: 1.10rem; opacity:.4; pointer-events:none; }";

		// strings

			css += ".lucille .string{ stroke:"+style.fontColor+"; stroke-width:2; stroke-linecap:round; opacity:0.5; }";

		// frets
			
			css += ".lucille .fret { stroke:"+style.fontColor+"; stroke-width:2; opacity: 0.25; }";
			css += ".lucille .fret:last-child { opacity: 0; }"

		// frettings

			css += ".lucille .fretting .string { stroke:"+style.fontColor+"; opacity:1; stroke-width:5; stroke-linecap:round; }";
			css += ".lucille .fretting .label { font-size:.8rem; opacity:0.6; }";
			css += ".lucille .fretting .dot { fill:"+style.fontColor+"}";

		// mini view

			css += ".lucille .minified .title { font-size: 1.15rem; }";

		// helpers

			css += '.lucille .hide { display: none; }';

		// concat theme

			theme.append(css);


	$('head').append(theme);

	return theme;

};;Lucille.prototype.configPicker = function(){

	return {

		title:'Chord Picker',
		fields:{
			root:{
				name:'root',
				value:'c_n',
				enabled:true,
				options:{
					c_n:{ name:'C',  value :'C' },
					c_s:{ name:'C#', value :'C#' },
					d_f:{ name:'Db', value :'Db' },
					d_n:{ name:'D',  value :'D' },
					d_s:{ name:'D#', value :'D#' },
					e_f:{ name:'Eb', value :'Eb' },
					e_n:{ name:'E',  value :'E' },
					f_n:{ name:'F',  value :'F' },
					f_s:{ name:'F#', value :'F#' },
					g_b:{ name:'Gb', value :'Gb' },
					g_n:{ name:'G',  value :'G' },
					g_s:{ name:'G#', value :'G#' },
					a_f:{ name:'Ab', value :'Ab' },
					a_n:{ name:'A',  value :'A' },
					a_s:{ name:'A#', value :'A#' },
					b_b:{ name:'Bb', value :'Bb' },
					b_n:{ name:'B',  value :'B' }
				}
			},
			type:{
				name:'type',
				value:'1',
				enabled:true,
				options:{
					'1'  :{ name:'Major',    value: 'M' },
					'13' :{ name:'minor',    value: 'm' }
				}
			}
		}

	};

};

Lucille.prototype.configSettings = function(){

	var that = this;

	return {

		title:'Settings',
		fields:{
			orientation:{
				name:'orientation',
				value:'righty',
				enabled:true,
				options:{
					righty:{ name :'Right Handed', value :'RIGHTY' },
					lefty:{  name :'Left Handed',  value :'LEFTY' }
				}
			},
			tuning:{
				name:'tuning',
				value:'standard',
				enabled:true,
				options:{
					standard:{ name:'EADGBE / Standard', 	value :['e2','a2','d3','g3','b3','e4'] },
					drop_d:{ name:'DADGBE / Drop D', 		value :['d2','a2','d3','g3','b3','e4'] }
				}
			},
			preview:{
				name:'preview',
				value:'gtr_aco_steel',
				enabled:true,
				options:{
					gtr_aco_steel:{ name:'Acoustic Guitar',     value: 'audio/gtr_aco_steel.mp3' },
					gtr_aco_nylon:{ name:'Classical Guitar',    value: 'audio/gtr_aco_nylon.mp3' },
					gtr_elec_clean:{ name:'Clean Eletric',      value: 'audio/gtr_elec_clean.mp3' },
					gtr_elec_dist:{ name:'Distortion Electric', value: 'audio/gtr_elec_dist.mp3' },
				}
			},
			algorithm:{
				name:'algorithm',
				value:'chain',
				enabled:true,
				options:{
					chain:{ name:'chained', value:'CHAIN' },
					kordfu:{ name:'kordfu', value:'KORDFU' },
				}
			},
			delete:{
				type:'button',
				text:'delete',
				callback:function(){ that.destroy(); }
			},
		}

	};

};