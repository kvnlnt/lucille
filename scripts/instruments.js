Lucille.prototype.Instrument = (function(){

	var instrument = {

		guitar         : { strings : 6, tuning : ['e2','a2','d3','g3','b3','e4'] },
		guitar_drop_d  : { strings : 6, tuning : ['d2','a2','d3','g3','b3','e4'] },
		mandolin       : { strings : 4, tuning : ['g3','d4','a4','e5']},
		banjo_4_string : { strings : 4, tuning : []},
		banjo_5_string : { strings : 5, tuning : []}

	};

	return instrument;	

}());