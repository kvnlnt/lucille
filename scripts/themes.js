// Usage:
// Pass a theme object in options formatted like so, else defaults will be applied:

// theme:{
// 	background:...
// 	touchTargetBackground:...
// }

Lucille.prototype.themeSetup = function(){

	// default settings
	var defaults                   = {};
	defaults.background            = '#e2e2e2';
	defaults.touchTargetBackground = '#e2e2e2';

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

			css = '.lucille .background { fill: '+settings.background+'; }';
			theme.append(css);

			css = '.lucille .touchTarget { fill: '+settings.touchTargetBackground+'; }';
			theme.append(css);

		// fonts

			css = [];
			css.push('@font-face {');
			css.push('font-family: \'VarelaRound\';');
			css.push('font-style: normal;');
			css.push('font-weight: 400;');
			css.push('src: local(\'VarelaRound\'), local(\'VarelaRound-Regular\'), url(../fonts/Varela_Round/VarelaRound-Regular.woff) format(\'woff\');');
			css.push('}');
			theme.append(css.join(' '));

		// general

			css = ".lucille { font-family:'VarelaRound'; font-size: 1rem; }";
			theme.append(css);

		// text basic

			css = ".lucille text { alignment-baseline:central; text-anchor:middle; }";
			theme.append(css);

		// buttons

			css = ".lucille .button { cursor: pointer; }";
			theme.append(css);

			css = ".lucille .button:hover { fill:#FFFFFF; }";
			theme.append(css);

			css = ".lucille .button.next, .lucille .button.prev, .lucille .button.play { font-family:'FontAwesome'; font-size: 2rem; cursor: pointer; }";
			theme.append(css);

			css = ".lucille .button.settings, .lucille .button.collapse { font-family:'FontAwesome'; font-size: 1.5rem; cursor: pointer; }";
			theme.append(css);

		// chord

			css = ".lucille .chord .root { font-size: 3rem; }";
			theme.append(css);

			css = ".lucille .chord .type { font-size: 1.10rem; }";
			theme.append(css);

		// strings

			css = ".lucille .string{ stroke:#000000; stroke-width:2; stroke-linecap:round; }";
			theme.append(css);

		// frets
			
			css = ".lucille .fret { stroke:#000000; stroke-width:2; opacity: 0.15; }";
			theme.append(css);

			css = ".lucille .fret:last-child { opacity: 0; }"
			theme.append(css);

		// frettings

			css = ".lucille .fretting .string { stroke:#000000; stroke-width:5; stroke-linecap:round; }";
			theme.append(css);

			css = ".lucille .fretting .label { font-size:.8rem; }";
			theme.append(css);

		// mini view

			css = ".lucille .minified .title { font-size: 1.15rem; }";
			theme.append(css);

		// helpers

			css = '.lucille .hide { display: none; }';
			theme.append(css);


	$('head').append(theme);

	return theme;

};