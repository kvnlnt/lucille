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

    // var mouse = {x: 0, y: 0};

    // // document.addEventListener('mousemove', function(e){ 
    // //     mouse.x = e.clientX || e.pageX; 
    // //     mouse.y = e.clientY || e.pageY 
    // // }, false);

    // document.addEventListener('touchstart', function(e){
    //    if( navigator.userAgent.match(/Android/i) ) {
    //         e.preventDefault();
    //       }
    // }, false);

    // document.addEventListener('touchmove', function(e){
    //     var x = e.touches[0].pageX;
    //     var y = e.touches[0].pageY;
    //     mouse.x = x; 
    //     mouse.y = e.clientY || y;
    // }, false);

    // var checkMouse = function () {
    //     $("#debug").html(mouse.x + ',' + mouse.y);
    // };

    // window.setInterval(checkMouse, 100);

    // this.lucille.background.drag(drag);

};