// Usage:
// Pass a theme object in options formatted like so, else defaults will be applied:

// theme:{
//     background:'#000000',
//     touchTargetBackground:'#000000',
//     fontColor:'#FFFFFF',
//     chordFontColor:'#FF0000'
// }

Lucille.prototype.themeSetup = function(){

	// default settings
	var defaults                   = {};
	defaults.background            = '#e2e2e2';
	defaults.touchTargetBackground = '#e2e2e2';
	defaults.fontColor             = '#000000';
	defaults.chordFontColor        = '#000000';

	// concat settings
	var settings = _.extend(defaults, this.theme);

	// create load theme
	this.themeLoad(settings);

    return settings;

};

Lucille.prototype.themeLoad = function(settings){

	// remove if exists
	$('.lucilleTheme').remove();

	// theme
	var css   = '';
	var theme = $('<style>');
		theme.attr('type','text/css');
		theme.attr('class','lucilleTheme');

		// backgrounds

			css += '.lucille .background { fill: '+settings.background+'; }';
			css += '.lucille .touchTarget { fill: '+settings.touchTargetBackground+'; }';

		// fonts

			css += '@font-face {';
			css += 'font-family: \'VarelaRound\';';
			css += 'font-style: normal;';
			css += 'font-weight: 400;';
			css += 'src: local(\'VarelaRound\'), local(\'VarelaRound-Regular\'), url(../fonts/Varela_Round/VarelaRound-Regular.woff) format(\'woff\');';
			css += '}';

		// general

			css += ".lucille { font-family:'VarelaRound'; font-size: 1rem; }";

		// text basic

			css += ".lucille text { alignment-baseline:central; text-anchor:middle; fill:"+settings.fontColor+" }";

		// buttons

			css += ".lucille .button text { cursor: pointer; fill:"+settings.fontColor+"; opacity:0.4; }";
			css += ".lucille .button:hover text { opacity:1; }";
			css += ".lucille .button.next, .lucille .button.prev, .lucille .button.play { font-family:'FontAwesome'; font-size: 2rem; cursor: pointer; }";
			css += ".lucille .button.settings, .lucille .button.collapse { font-family:'FontAwesome'; font-size: 1.5rem; cursor: pointer; }";

		// chord

			css += ".lucille .chord .root { font-size: 3rem; opacity:1; fill:"+settings.chordFontColor+" }";
			css += ".lucille .chord .type { font-size: 1.10rem; }";

		// strings

			css += ".lucille .string{ stroke:"+settings.fontColor+"; stroke-width:2; stroke-linecap:round; opacity:0.5; }";

		// frets
			
			css += ".lucille .fret { stroke:"+settings.fontColor+"; stroke-width:2; opacity: 0.25; }";
			css += ".lucille .fret:last-child { opacity: 0; }"

		// frettings

			css += ".lucille .fretting .string { stroke:"+settings.fontColor+"; opacity:1; stroke-width:5; stroke-linecap:round; }";
			css += ".lucille .fretting .label { font-size:.8rem; opacity:0.6; }";
			css += ".lucille .fretting .dot { fill:"+settings.fontColor+"}";

		// mini view

			css += ".lucille .minified .title { font-size: 1.15rem; }";

		// helpers

			css += '.lucille .hide { display: none; }';

		// concat theme

			theme.append(css);


	$('head').append(theme);

	return theme;

};