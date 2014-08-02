// Lucille.prototype.set = function(param, value){

// };

Lucille.prototype.getTab = function(root, type, tuning){

	// update tab & refresh
	var tuning   = tuning || this.instrument.tuning;
	var tabulous = new Tabulous({ root:root.toLowerCase(), type:this.transToTabulousChordType(type), tuning:tuning });
	var voicings = this.transTabulousChordToVoicings(tabulous);
	var tab      = { root:root, type:type, caged:[0, voicings.length-1], voicings:voicings };

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
		case 'Mandolin':
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

};

Lucille.prototype.getSettingsConfig = function(){

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
					standard      :{ name:'EADGBE / Standard' 	   , value :['e2','a2','d3','g3','b3','e4'] },
					drop_d        :{ name:'DADGBE / Drop D'   	   , value :['d2','a2','d3','g3','b3','e4'] },
					double_drop_d :{ name:'DADGBD / Dbl Drop D'    , value :['d1','a1','d2','g2','b2','d3'] },
					drop_c        :{ name:'CGCFAD / Drop C'        , value :['c1','g1','c2','f2','a2','d3'] },
					open_d        :{ name:'DADF#AD / Open D'       , value :['d1','a1','d2','f#2','a2','d3'] },
					open_d_minor  :{ name:'DADFAD / Open D Minor'  , value :['d1','a1','d2','f2','a2','d3'] },
					open_g        :{ name:'DGDGBD / Open G'        , value :['d1','g1','d2','g2','b2','d3'] },
					open_g_minor  :{ name:'DGDGA#D / Open G Minor' , value :['d1','g1','d2','g2','a#2','d3'] },
					open_c        :{ name:'CGCGCE / Open C'        , value :['c1','g1','c2','g2','c3','e3'] },
					open_c_minor  :{ name:'CGCGCD# / Open C Minor' , value :['c1','g1','c2','g2','c3','d#3'] },
					open_e        :{ name:'EBEG#BE / Open E'       , value :['e1','b1','e2','g#2','b2','e3'] },
					open_a        :{ name:'EAC#EA3 / Open A'       , value :['e1','a1','c#2','e2','a2','e3'] },
					baritone      :{ name:'ADGCEA / Baritone'      , value :['a0','d1','g1','c2','e2','a2'] },
					pentatonic    :{ name:'ACDEGA / Pentatonic'    , value :['a1','c2','d2','e2','g2','a3'] },
					ostrich       :{ name:'DDDDDD / Ostrich'       , value :['d1','d2','d2','d2','d3','d3'] },
					dobro         :{ name:'GBDGBD / Dobro'         , value :['g1','b1','d2','g2','b2','d3'] },
					mando_guitar  :{ name:'CGDAEB / Mandoguitar'   , value :['c1','g1','d2','a2','e3','b3'] },
					rusty_cage    :{ name:'BADGBE / Rusty Cage'    , value :['b0','a1','d2','g2','b2','e3'] }
				}
			},
			preview:{
				name:'preview',
				value:'acoustic',
				enabled:true,
				options:{
					acoustic:{ name:'Acoustic Guitar', value:'audio/acoustic_guitar.mp3' },
					electric:{ name:'Electric Guitar', value:'audio/electric_guitar.mp3' }
				}
			},
			algorithm:{
				name:'Fingering',
				value:'natural',
				enabled:true,
				options:{
					natural:{ name:'Natural', value:'NATURAL' },
					fret_by_fret:{ name:'Fret x Fret', value:'FRET_X_FRET'}
				}
			}
		}

	};

};