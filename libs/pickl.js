var Pickl = function(options){

	// DEFAULTS

	    var defaults      = {};
	    defaults.form     = { width:320, height:520 };
	    defaults.config   = this.Config;
	    defaults.theme    = 'zen';
	    defaults.svg      = null;
	    defaults.callback = function(picks){ console.log(picks); };

    // SETTINGS
    
    	_.extend(this, defaults, options);

    // INIT

    	this.themeLoad();
    	this.render();

};;Pickl.prototype.Config = (function(){

	var config = {

		title:'Options',
		fields:{
			orientation:{
				name:'orientation',
				value:'righty',
				enabled:true,
				callback:null,
				options:{
					righty:{
						name:'righty',
						value:'RIGHTY'
					},
					lefty:{
						name:'lefty',
						value:'LEFTY'
					}
				}
			},
			root:{
				name:'root',
				value:'c_n',
				enabled:true,
				options:{
					c_n:{ name:'C',  value : 'C' },
					c_s:{ name:'C#', value : 'C#' },
					d_f:{ name:'Db', value : 'Db' },
					d_n:{ name:'D',  value : 'D' },
					d_s:{ name:'D#', value : 'D#' },
					e_f:{ name:'Eb', value : 'Eb' },
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
			instrument:{
				name:'instrument',
				value:'guitar',
				enabled:true,
				callback:null,
				options:{
					guitar:{
						name:'guitar',
						value:'GUITAR',
						enable:'tuning_guitar',
						disable:'tuning_banjo'
					},
					banjo:{
						name:'banjo',
						value:'BANJO',
						disable:'tuning_guitar',
						enable:'tuning_banjo'
					}
				}
			},
			tuning_guitar:{
				name:'tuning',
				value:'standard',
				enabled:true,
				options:{
					standard:{
						name:'standard',
						value:'EADGBE'
					},
					drop_d:{
						name:'drop d',
						value:'DADGBE'
					}
				}
			},
			tuning_banjo:{
				name:'tuning',
				value:'standard',
				enabled:false,
				options:{
					standard:{
						name:'standard',
						value:'EADG'
					},
					drop_d:{
						name:'drop d',
						value:'DADG'
					}
				}
			}
		}

	};

	return config;

}());;Pickl.prototype.render = function(){

	this.pickl 		      = this.pickl || this.renderForm();
	this.pickl.clear();
	this.pickl.background = this.renderBackground();
	this.pickl.title      = this.renderTitle();
	this.pickl.close      = this.renderClose();
	this.pickl.fields     = this.renderFields();

};

Pickl.prototype.renderForm = function(){

	var form = null === this.svg ? Snap(this.form.width, this.form.height) : this.svg;
	var klass = form.attr('class') + ' pickl';
	form.attr({ 'class':klass, 'transform':'translate('+this.form.width+',0)' });

	return form;

};

Pickl.prototype.renderBackground = function(){

	var background = this.pickl.rect(0,0,this.form.width,this.form.height);
	background.attr({ 'class':'background' });

	return background;

};

Pickl.prototype.renderTitle = function(){

	var title = this.pickl.text(this.form.width/2, 50, this.config.title);
	title.attr({ 'class':'title' });

	return title;

};

Pickl.prototype.renderClose = function(){

	var close  = this.pickl.g().attr('class','button close');
	var x      = this.form.width * .15 / 2;
	var y      = this.form.height - 70;
	var w      = this.form.width * .85;
	var h      = 50;
	var target = close.rect(x,y,w,h).attr({ 'class':'touchTarget' });
	var text   = close.text(this.form.width/2, y + 25, 'close');

	close.click(this.save, this);

	return close;

};

Pickl.prototype.renderFields = function(){

	var that   = this;
	var layout = this.calcLayout().fields;
	var fields = this.pickl.g().attr('class','fields');
	var y      = 90;

	_.each(this.config.fields, function(field){

		if(field.enabled){

			var fieldGroup  = fields.g().attr({ 'class':'field button', 'transform':'translate('+layout.x+','+y+')' });
			var fieldTarget = fieldGroup.rect(0,0,layout.width, 40).attr({ 'class':'touchTarget' });
			var fieldTitle  = fieldGroup.text(layout.x + 70,20, field.name).attr({ 'class':'title' });
			var fieldValue  = fieldGroup.text(layout.x + 80, 20, field.options[field.value].name).attr('class','value');		
			y 			   += 41;

			var click = void 0 === field.callback || null === field.callback ? function(){that.displayOptions(field)} : field.callback;
			fieldGroup.click(click,that);

		}

	});

	return fields.selectAll('.field');

};

Pickl.prototype.renderOptions = function(field){

	var that          = this;
	var layout        = that.calcLayout().fields;
	var options       = this.pickl.g().attr({ 'class':'options' });
	var background    = options.rect(0,0,that.form.width, that.form.height).attr('class','background');
	var title         = options.text(that.form.width/2, 27, field.name).attr('class','title options');
	var fieldsHeight  = that.form.height-140;
	var isClipping    = (_.size(field.options) * 40) > fieldsHeight;
	var fieldsShowing = Math.floor(fieldsHeight/40);
	var fieldHeight   = isClipping ? fieldsHeight/fieldsShowing : 40;
	var fieldMaskRect = options.rect(layout.x,50,layout.width, fieldsHeight + (fieldsShowing)).attr({'fill':'#FFFFFF'});
	var fieldMask     = options.mask().add(fieldMaskRect).attr({'class':'mask'});
	var fieldWrapper  = options.g().attr({ 'class':'fields', mask:fieldMask });
	var fields        = fieldWrapper.g().data('y',0);
	var selected      = field.options[field.value].value;
	var selectedIndex = 0;
	var y             = 50;
	var x             = layout.x - 1;
	var scrollBtnY    = this.form.height - 70;
	var scrollClass   = true === isClipping ? '' : 'hide';
	var down          = options.g().attr({ 'class':'field button scroll ' + scrollClass, 'transform':'translate('+this.form.width/2+','+scrollBtnY+')' });
	var scrolling     = true;
	var downTarget    = down.rect(0,0,layout.width/2-2, fieldHeight).attr({ 'class':'touchTarget' });
	var downText      = down.text(layout.width/4,fieldHeight/2,'*').attr({ 'class':'value' });
	var up            = options.g().attr({ 'class':'field button scroll ' + scrollClass, 'transform':'translate('+layout.x+','+scrollBtnY+')' });
	var upTarget      = up.rect(0,0,layout.width/2-2, fieldHeight).attr({ 'class':'touchTarget' });
	var upText        = up.text(layout.width/4,fieldHeight/2,'*').attr({ 'class':'value' });

	// update icons
	upText.node.innerHTML 	= '&#xf077';
	downText.node.innerHTML = '&#xf078';

	// Scrolling logic
	var scrollDownStart = function(){ scrolling = true; scrollDown(); };
	var scrollStop 		= function(){ scrolling = false; };
	var scrollDown 		= function(){
		var y = fields.data('y') - (fieldHeight + 1);
		var threshold = -(_.size(field.options) - fieldsShowing) * (fieldHeight + 1); // num of fields minus num of fields possible to show time field height
		if(Math.ceil(y) >= threshold){
			fields.animate({'transform':'translate(0,'+y+')'}, 100, mina.easeout, function(){
				if(scrolling) scrollDown();
			});
			fields.data('y',y);
		}

	};

	var scrollUpStart = function(){ scrolling = true; scrollUp(); };
	var scrollUp 	  = function(){
		var y = fields.data('y') + (fieldHeight + 1);
		if(Math.floor(y) <= 0){
			fields.animate({'transform':'translate(0,'+y+')'}, 100, mina.easeout, function(){
				if(scrolling) scrollUp();
			});
			fields.data('y',y);
		}
	};

	down.mousedown(scrollDownStart);
	down.mouseup(scrollStop);
	up.mousedown(scrollUpStart);
	up.mouseup(scrollStop);

	// position options container
	options.attr({ 'transform':'translate('+this.form.width+',0)' });

	// track selected index
	var selectedIndexCounter = 1;

	// option fields
	_.each(field.options, function(option, k){

		var fieldGroup  = fields.g().attr({ 'class':'field button', 'transform':'translate('+x+','+y+')' });
		var fieldTarget = fieldGroup.rect(0,0,layout.width, fieldHeight).attr({ 'class':'touchTarget' });
		var fieldText   = fieldGroup.text(fieldHeight,fieldHeight/2, option.name).attr({ 'class':'value' });
		var klass       = option.value === selected ? 'check selected' : 'check';
		var check       = fieldGroup.g().attr({ 'class':klass});
		var checkTarget = check.rect(0,0,fieldHeight,fieldHeight).attr({ 'class':'touchTarget' });
		var checkMark   = check.text(fieldHeight/4,fieldHeight/2,'*').attr({ 'class':'value' });

		if(option.value === selected){
			selectedIndex = selectedIndexCounter;
		};

		selectedIndexCounter += 1;

		checkMark.node.innerHTML = '&#xf00c';
		y += fieldHeight + 1;

		fieldGroup.click(function(){ 
			field.value = k;
			options.animate({ 'transform':'translate('+this.form.width+',0)'}, 200, mina.easeout, function(){ this.remove(); });
			that.displayField(option.disable, false);
			that.displayField(option.enable, true);
			that.render();
		}, that);

	});

	// auto scroll to selected item if it's hidden
	if(selectedIndex > fieldsShowing){
		var y = -(selectedIndex - fieldsShowing) * (fieldHeight + 1);
		fields.attr({'transform':'translate(0,'+y+')'});
		fields.data('y',y);

	}

	return options;


};;Pickl.prototype.calcLayout = function(){

	var layout = {};
	layout.fields = this.calcFields();

	return layout;

};

Pickl.prototype.calcFields = function(){

	var height = 40;
	var width  = this.form.width * .85;
	var x      = this.form.width * .15/2;

	return {
		height:height,
		width:width,
		x:x
	}

};;Pickl.prototype.display = function(){

	this.pickl.animate({ 'transform':'translate(0,0)'}, 200, mina.easein);

};

Pickl.prototype.displayOptions = function(field){

	var options = this.renderOptions(field);
	options.animate({'transform':'translate(0,0)'}, 200, mina.easin);

};

Pickl.prototype.displayField = function(fields, enabled){

	var that = this;
	var fields = "string" === typeof fields ? [fields] : fields;

	_.each(fields,function(field){

		if(void 0 !== that.config.fields[field]) that.config.fields[field].enabled = enabled;

	});

};;Pickl.prototype.save = function(){

	var picks = {};

	_.each(this.config.fields, function(field){
		if(field.enabled) picks[field.name] = field.options[field.value].value;
	});
	
	this.callback(picks);
	this.pickl.animate({ 'transform':'translate('+this.form.width+',0)'}, 200, mina.easein);

};;Pickl.prototype.themes = (function() {

	var themes                       = {};
	themes.plain                     = {};
	themes.plain.background          = '#e2e2e2';
	themes.plain.fieldset            = '#666666';
	themes.plain.touchTarget         = '#f2f2f2';
	themes.plain.touchTargetOver     = '#000000';
	themes.plain.buttonTextColor     = '#999999';
	themes.plain.buttonTextColorOver = '#e2e2e2';
	themes.plain.buttonStroke        = '#e2e2e2';
	themes.plain.modalBackground     = '#f2f2f2';
	themes.zen                       = {};
	themes.zen.background            = '#000000';
	themes.zen.fieldset              = '#666666';
	themes.zen.touchTarget           = '#222222';
	themes.zen.touchTargetOver       = '#444444';
	themes.zen.titleColor            = '#FFFFFF';
	themes.zen.buttonTextColor       = '#999999';
	themes.zen.buttonTextColorOver   = '#FFFFFF';
	themes.zen.buttonStroke          = '';
	themes.zen.modalBackground       = '#000000';

	return themes;

}());

Pickl.prototype.themeLoad = function(){

	var style = this.themes[this.theme];

	// remove if present
	$(".picklTheme").remove();

	// now create it
	var css   = '';
	var theme = $('<style>');
		theme.attr('type','text/css');
		theme.attr('class','picklTheme');

		// base
		css += '@font-face {';
		css += 'font-family: \'VarelaRound\';';
		css += 'font-style: normal;'
		css += 'font-weight: 400;';
		css += 'src: local(\'VarelaRound\'), local(\'VarelaRound-Regular\'), url(fonts/Varela_Round/VarelaRound-Regular.woff) format(\'woff\');';
		css += '}';
		css += '.pickl { font-family:\'VarelaRound\'; font-size: 1rem; }';
		css += '.pickl .title { text-transform: uppercase; font-size: 1.5rem; }';
		css += '.pickl .title.options { font-size: .7rem; opacity: 0.5; }';
		css += '.pickl .hide { display: none; }';
		css += '.pickl text { alignment-baseline:central; text-anchor:middle; pointer-events:none; }';
		css += '.pickl .button { cursor: pointer; font-size: 0.85rem; }';
		css += '.pickl .button.close { text-transform: uppercase; }';
		css += '.pickl .button.arrow .touchTarget { stroke:none; }';
		css += '.pickl .field { font-size: 0.85rem; }';
		css += '.pickl .field .title { font-size: .7rem; opacity: 0.5; text-anchor: end; }';
		css += '.pickl .field .value { text-anchor:start; }';
		css += '.pickl .field .check { font-family:\'FontAwesome\'; font-size: 1.25rem; text-anchor:middle; opacity: .2; cursor: pointer; }';
		css += '.pickl .scroll { font-family:\'FontAwesome\'; font-size: 1.25rem; text-anchor:middle; opacity: .8; cursor: pointer; }';
		css += '.pickl .scroll .value { text-anchor:middle; }';
		css += '.pickl .field .check.selected, .pickl .field:hover .check, .pickl .scroll:hover { opacity: 1; }';

		// overrides
		css += '.pickl .background { fill: '+style.background+'; } ';
		css += '.pickl .fieldset { fill: '+style.fieldset+'; } ';
		css += '.pickl .title { fill: '+style.titleColor+';} ';
		css += '.pickl .field text, .close text { fill:'+style.buttonTextColor+'} ';
		css += '.pickl .button > .touchTarget, .pickl .field .touchTarget { fill: '+style.touchTarget+'; } ';
		css += '.pickl .button > .touchTarget { stroke: '+style.buttonStroke+'; } ';
		css += '.pickl .button:hover .touchTarget { fill: '+style.touchTargetOver+'; cursor:pointer; } ';
		css += '.pickl .button:hover text { fill: '+style.buttonTextColorOver+'; } ';
		css += '.pickl .button > .arrow > .touchTarget { fill: '+style.touchTarget+' } ';
		
	theme.append(css);
	$('head').append(theme);

	return theme;

};

