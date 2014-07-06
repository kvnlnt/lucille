Lucille.prototype.config = function(options){

    // themes
    this.themes = {};
    this.themes.plain = {};
    this.themes.plain.background = '#e2e2e2';
    this.themes.plain.touchTargetBackground = '#e2e2e2';

    var defaults = {};

    defaults.chart       = { width: 320, height: 520 };
    defaults.fretboard   = { width:120, height:250 };
    defaults.orientation = 'RIGHTY';
    defaults.instrument  = this.Instrument.guitar;
    defaults.tab         = this.Fixture.guitar;
    defaults.theme       = this.themes.plain;

    _.extend(this, defaults, options);

};


