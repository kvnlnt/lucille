Lucille.prototype.configPicker = function(){

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
				value:'1',
				enabled:true,
				options:{
					'1'  :{ name:'Major',    value: 'M' },
					'13' :{ name:'minor',    value: 'm' }
				}
			}
		}

	};

};

Lucille.prototype.configSettings = function(){

	var that = this;

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