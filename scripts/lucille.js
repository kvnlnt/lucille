var Lucille = function(options){

	// DEFAULTS

	    var defaults         = {};
	    defaults.chart       = { width: 320, height: 520 };
	    defaults.fretboard   = { width:120, height:250 };
	    defaults.orientation = 'righty';
	    defaults.instrument  = this.Instrument.guitar;
	    defaults.tab         = this.Fixture.guitar;
	    defaults.theme       = this.Fixture.theme.plain;

    // SETTINGS
    
    	_.extend(this, defaults, options);

    // INIT

    	this.render();
    	this.display();

};