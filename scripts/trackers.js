Lucille.prototype.trackSwipes = function(){

    var that       = this;
    var tracking   = false;
    var layout     = this.calcLayout();
    var fretboardX = (layout.chart.width - layout.fretboard.width)/2;
    var fretboardY = (layout.chart.height - layout.fretboard.height)/2 + 15;
    var stringsX   = _.map(this.lucille.frettings, function(fretting){ return parseInt(fretting.select('.string').attr('x1')) + fretboardX; });

    var drag = function(dx,dy,px,py,e){

        var x = e.offsetX;
        var y = e.offsetY;
        // console.log(dx,dy,x,y,e, relX, relY);

        // check if over fretboard
        var onFretboard =   x > fretboardX && 
                            y > fretboardY && 
                            x < fretboardX + that.fretboard.width && 
                            y < fretboardY + that.fretboard.height;

        if(onFretboard){

            // loop each string and see if current xOffset is close to one (within some margin based off of layout.string.spacing)
            _.each(stringsX, function(stringX, i){

                var threshold = (x - layout.strings.spacing/3) < stringX && (x + layout.strings.spacing/3) > stringX;
                if(threshold) that.playString(i);

            });

        }

    };

    // this.lucille.background.drag(drag);

};