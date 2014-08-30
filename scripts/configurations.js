Lucille.prototype.configSettings = function(){

	var that = this;

	return {

		title:'Settings',
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
				value:'1',
				enabled:true,
				options:{
					'1' :{ name:'Major', value:'M',   enable:['maj_extend'], disable:['min_extend', 'sus_extend'] },
					'2' :{ name:'minor', value:'m',   enable:['min_extend'], disable:['maj_extend', 'sus_extend'] },
					'3' :{ name:'sus', 	 value:'sus', enable:['sus_extend'], disable:['maj_extend', 'min_extend'] },
					'4' :{ name:'dim', 	 value:'dim', enable:['dim_extend'], disable:['maj_extend', 'min_extend', 'sus_extend'] },
					'5' :{ name:'aug', 	 value:'aug', enable:['aug_extend'], disable:['maj_extend', 'min_extend', 'sus_extend'] },
				}
			},
			maj_extend:{
				name:'extend',
				value:'0',
				enabled:true,
				options:{
					'0' :{ name:'---',	 value:'' },
					'1' :{ name:'6', 	 value:'6' },
					'2' :{ name:'6add9', value:'6add9' },
					'3' :{ name:'7', 	 value:'7' },
					'4' :{ name:'dom7',  value:'dom7' },
					'4' :{ name:'add9',  value:'add9' },
					'5' :{ name:'9', 	 value:'9' },
					'6' :{ name:'13', 	 value:'13' }
				}
			},
			min_extend:{
				name:'extend',
				value:'0',
				enabled:false,
				options:{
					'0' :{ name:'---',	 value:'' },
					'1' :{ name:'6',	 value:'6' },
					'2' :{ name:'6add9', value:'6add9' },
					'3' :{ name:'7',	 value:'7' },
					'4' :{ name:'7b5',	 value:'7b5' },
					'5' :{ name:'9',	 value:'9' },
					'6' :{ name:'add9',	 value:'add9' },
					'7' :{ name:'11',	 value:'11' },
					'8' :{ name:'13',	 value:'13' },
				}
			},
			sus_extend:{
				name:'extend',
				value:'0',
				enabled:false,
				options:{
					'0' :{ name:'2',	 value:'2' },
					'1' :{ name:'4',	 value:'4' },
				}
			},
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
					standard:{ name:'EADGBE / Standard', 	value :['e2','a2','d3','g3','b3','e4'] },
					drop_d:{ name:'DADGBE / Drop D', 		value :['d2','a2','d3','g3','b3','e4'] }
				}
			},
			preview:{
				name:'preview',
				value:'gtr_aco_steel',
				enabled:true,
				options:{
					gtr_aco_steel:{ name:'Acoustic Guitar',     value: PLUKIT.guitar.acoustic.steel.mp3 },
					gtr_aco_nylon:{ name:'Classical Guitar',    value: PLUKIT.guitar.acoustic.nylon.mp3 },
					gtr_elec_clean:{ name:'Clean Eletric',      value: PLUKIT.guitar.electric.clean.mp3 },
					gtr_elec_dist:{ name:'Distortion Electric', value: PLUKIT.guitar.electric.dist.mp3 },
				}
			},
			delete:{
				type:'button',
				text:'delete',
				callback:function(){ that.destroy(); }
			},
		}

	};

};


// Major
// Minor
// Diminished
// Augmented
// Suspended 2nd
// Suspended 4th
// Major Flat 5th
// Minor Sharp 5th
// Minor Double Flat 5th
// Suspended 4th Sharp 5th
// Suspended 2nd Flat 5th
// Suspended 2nd Sharp 5th

// 7th
// Minor 7th
// Major 7th
// Minor Major 7th
// Diminished 7th
// Augmented 7th
// Augmented Major 7th
// 7th Flat 5th
// Major 7th Flat 5th
// Minor 7th Flat 5th
// Minor Major 7th Flat 5th
// Minor Major 7th Double Flat 5th
// Minor 7th Sharp 5th
// Minor Major 7th Sharp 5th
// 7th Flat 9th

// 6th
// Minor 6th
// 6th Flat 5th
// 6th Add 9th
// Minor 6th Add 9th

// 9th
// Minor 9th
// Major 9th
// Minor Major 9th
// 9th Flat 5th
// Augmented 9th
// 9th Suspended 4th
// 7th Sharp 9th
// 7th Sharp 9th Flat 5th
// Augmented Major 9th

// 11th
// Minor 11th
// Major 11th
// Minor Major 11th
// Major Sharp 11th

// 13th
// Minor 13th
// Major 13th
// Minor Major 13th

// 7th Suspended 2nd
// Major 7th Suspended 2nd
// 7th Suspended 4th
// Major 7th Suspended 4th
// 7th Suspended 2nd Sharp 5th
// 7th Suspended 4th Sharp 5th
// Major 7th Suspended 4th Sharp 5th
// Suspended 2nd Suspended 4th
// 7th Suspended 2nd Suspended 4th
// Major 7th Suspended 2nd Suspended 4th

// 5th
// Major Add 9th
    
