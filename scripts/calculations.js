Lucille.prototype.calcVoicing = function(){

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
