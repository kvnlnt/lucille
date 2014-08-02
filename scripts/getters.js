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

Lucille.prototype.getPickerConfig = function(){

	return {

		title:'Chord Picker',
		fields:{
			root:{
				name:'root',
				value:'c_n',
				enabled:true,
				options:{
					c_n:{ name:'C',  value :'C' },
					c_s:{ name:'C#', value :'C#' },
					d_f:{ name:'Db', value :'Db' },
					d_n:{ name:'D',  value :'D' },
					d_s:{ name:'D#', value :'D#' },
					e_f:{ name:'Eb', value :'Eb' },
					e_n:{ name:'E',  value :'E' },
					f_n:{ name:'F',  value :'F' },
					f_s:{ name:'F#', value :'F#' },
					g_b:{ name:'Gb', value :'Gb' },
					g_n:{ name:'G',  value :'G' },
					g_s:{ name:'G#', value :'G#' },
					a_f:{ name:'Ab', value :'Ab' },
					a_n:{ name:'A',  value :'A' },
					a_s:{ name:'A#', value :'A#' },
					b_b:{ name:'Bb', value :'Bb' },
					b_n:{ name:'B',  value :'B' }
				}
			},
			type:{
				name:'type',
				value:'Major',
				enabled:true,
				options:{
					'Major'      :{ name:'Major',    value: 'Major' },
					'maj7'       :{ name:'maj7',     value: 'maj7' },
					'maj9'       :{ name:'maj9',     value: 'maj9' },
					'maj11'      :{ name:'maj11',    value: 'maj11' },
					'maj13'      :{ name:'maj13',    value: 'maj13' },
					'maj9_s_11'  :{ name:'maj9#11',  value: 'maj9#11' },
					'maj13_s_11' :{ name:'maj13#11', value: 'maj13#11' },
					'6'          :{ name:'6',        value: '6' },
					'add9'       :{ name:'add9',     value: 'add9' },
					'6add9'      :{ name:'6add9',    value: '6add9' },
					'maj7b5'     :{ name:'maj7b5',   value: 'maj7b5' },
					'maj7_s_5'   :{ name:'maj7#5',   value: 'maj7#5' },
					'Minor'      :{ name:'minor',    value: 'minor' },
					'm7'         :{ name:'m7',       value: 'm7' },
					'm9'         :{ name:'m9',       value: 'm9' },
					'm11'        :{ name:'m11',      value: 'm11' },
					'm13'        :{ name:'m13',      value: 'm13' },
					'm6'         :{ name:'m6',       value: 'm6' },
					'madd9'      :{ name:'madd9',    value: 'madd9' },
					'm6add9'     :{ name:'m6add9',   value: 'm6add9' },
					'mmaj7'      :{ name:'mmaj7',    value: 'mmaj7' },
					'mmaj9'      :{ name:'mmaj9',    value: 'mmaj9' },
					'm7b5'       :{ name:'m7b5',     value: 'm7b5' },
					'm7_s_5'     :{ name:'m7#5',     value: 'm7#5' },
					'7'          :{ name:'7',        value: '7' },
					'9'          :{ name:'9',        value: '9' },
					'11'         :{ name:'11',       value: '11' },
					'13'         :{ name:'13',       value: '13' },
					'7sus4'      :{ name:'7sus4',    value: '7sus4' },
					'7b5'        :{ name:'7b5',      value: '7b5' },
					'7_s_5'      :{ name:'7#5',      value: '7#5' },
					'7b9'        :{ name:'7b9',      value: '7b9' },
					'7_s_9'      :{ name:'7#9',      value: '7#9' },
					'7_b5_b9'    :{ name:'7(b5,b9)', value: '7(b5,b9)' },
					'7_b5_s_9'   :{ name:'7(b5,#9)', value: '7(b5,#9)' },
					'7_s_5_b9'   :{ name:'7(#5,b9)', value: '7(#5,b9)' },
					'7_s_5_s_9'  :{ name:'7(#5,#9)', value: '7(#5,#9)' },
					'9b5'        :{ name:'9b5',      value: '9b5' },
					'9_s_5'      :{ name:'9#5',      value: '9#5' },
					'13_s_11'    :{ name:'13#11',    value: '13#11' },
					'13b9'       :{ name:'13b9',     value: '13b9' },
					'11b9'       :{ name:'11b9',     value: '11b9' },
					'aug'        :{ name:'aug',      value: 'aug' },
					'dim'        :{ name:'dim',      value: 'dim' },
					'dim7'       :{ name:'dim7',     value: 'dim7' },
					'5'          :{ name:'5',        value: '5' },
					'sus4'       :{ name:'sus4',     value: 'sus4' },
					'sus2'       :{ name:'sus2',     value: 'sus2' },
					'sus2sus4'   :{ name:'sus2sus4', value: 'sus2sus4' },
					'drop_5'     :{ name:'-5',       value: '-5' },
				}
			}
		}

	};

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