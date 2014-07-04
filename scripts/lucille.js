var Lucille = function(options){

	// DEFAULTS

	    var defaults = {};
	    	defaults.chart = { width: 320, height: 520 };
	    	defaults.fretboard = { width:120, height:250 };
	    	defaults.orientation = 'righty';
	    	defaults.instrument = Instrument.guitar;
	    	defaults.tab = Fixture.guitar;

    // SETTINGS
    
    	_.extend(this, defaults, options);

    // INIT

    	this.render();
    	this.display();

};