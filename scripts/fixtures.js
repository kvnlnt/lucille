Lucille.prototype.Fixture = (function(){

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


