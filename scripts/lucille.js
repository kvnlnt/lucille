var Lucille = function(options){

    // themes
    this.themes = {};
    this.themes.plain = {};
    this.themes.plain.background = '#e2e2e2';
    this.themes.plain.touchTargetBackground = '#e2e2e2';

    // params
    var defaults = {};

    defaults.chart       = { width: 320, height: 520 };
    defaults.fretboard   = { width:120, height:250 };
    defaults.orientation = 'RIGHTY';
    defaults.instrument  = this.Instrument.guitar;
    defaults.audio       = 'audio/acoustic_guitar.mp3',
    defaults.pattern     = 'strum',
    defaults.tab         = this.getTab('C','Major', this.Instrument.guitar.tuning);
    defaults.theme       = this.themes.plain;

    // setup options
    _.extend(this, defaults, options);

    // computed params
    this.player      = this.getPlayer();

    // initializers
    this.render();
    this.display();

};