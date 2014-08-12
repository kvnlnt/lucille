var Lucille = function(options){

    // params
    var defaults = {};

    defaults.chart        = { width: 320, height: 520 };
    defaults.fretboard    = { width:120, height:250 };
    defaults.orientation  = 'RIGHTY';
    defaults.instrument   = this.Instrument;
    defaults.plukit       = new Plukit();
    defaults.pattern      = 'strum';
    defaults.tab          = this.getTab('C','M', this.Instrument.tuning);
    defaults.theme        = 'zen';

    // setup options
    _.extend(this, defaults, options);    

    // initializers
    this.themeLoad();
    this.render();
    this.display();
    this.updateTypeText('Major');

};