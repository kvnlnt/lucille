// Usage:
// Pass a theme object in options formatted like so, else defaults will be applied:

// theme:{
//     background:'#000000',
//     touchTargetBackground:'#000000',
//     fontColor:'#FFFFFF',
//     chordFontColor:'#FF0000'
// }

Lucille.prototype.themes = (function(){

	// default settings
	var themes                         = {};
	themes.plain                       = {};
	themes.plain.background            = '#e2e2e2';
	themes.plain.touchTargetBackground = '#e2e2e2';
	themes.plain.fontColor             = '#000000';
	themes.plain.chordFontColor        = '#000000';
	themes.zen                         = {};
	themes.zen.background              = '#000000';
	themes.zen.touchTargetBackground   = '#000000';
	themes.zen.fontColor               = '#FFFFFF';
	themes.zen.fontColor50             = '#777777';
	themes.zen.chordFontColor          = '#FF0000';

    return themes;

}());

Lucille.prototype.themeLoad = function(){

	// remove if exists
	$('.lucilleTheme').remove();

	// style
	var style = this.themes[this.theme];

	// theme
	var css   = '';
	var theme = $('<style>');
		theme.attr('type','text/css');
		theme.attr('class','lucilleTheme');

		// backgrounds

			css += 'html, body { background: '+style.background+'}';
			css += '.lucille .background { fill: '+style.background+'; }';
			css += '.lucille .touchTarget { fill: '+style.touchTargetBackground+'; cursor:pointer; }';

		// fonts

			css += '@font-face {';
			css += 'font-family: \'VarelaRound\';';
			css += 'font-style: normal;';
			css += 'font-weight: 400;';
			css += 'src: local(\'VarelaRound\'), local(\'VarelaRound-Regular\'), url(fonts/Varela_Round/VarelaRound-Regular.woff) format(\'woff\');';
			css += '}';

		// general

			css += "h1 { cursor: pointer; color: white; font-family:'VarelaRound'; font-size:2rem; display:block; text-align: center; border-bottom:1px solid #222222; line-height:3rem; }";
			css += ".lucille { border: 1px solid #222222; font-family:'VarelaRound'; font-size: 1rem; display:block; margin:2px auto; }";

		// text basic

			css += ".lucille text { alignment-baseline:central; text-anchor:middle; fill:"+style.fontColor+" }";

		// buttons

			css += ".lucille .buttons .button text { cursor: pointer; fill:"+style.fontColor+"; opacity:0.4; pointer-events:none; }";
			css += ".lucille .button:hover text { opacity:1; }";
			css += ".lucille .button.next, .lucille .button.prev, .lucille .button.play { font-family:'FontAwesome'; font-size: 2rem; cursor: pointer; }";
			css += ".lucille .button.settings, .lucille .button.collapse { font-family:'FontAwesome'; font-size: 1.5rem; cursor: pointer; }";

		// chord

			css += ".lucille .chord .root { font-size: 3rem; opacity:1; fill:"+style.chordFontColor+"; pointer-events:none; }";
			css += ".lucille .chord .type { font-size: 1.10rem; opacity:.4; pointer-events:none; }";

		// strings

			css += ".lucille .string{ stroke:"+style.fontColor+"; stroke-width:2; stroke-linecap:round; opacity:0.5; }";

		// frets
			
			css += ".lucille .fret { stroke:"+style.fontColor+"; stroke-width:2; opacity: 0.25; }";
			css += ".lucille .fret:last-child { opacity: 0; }"

		// frettings

			css += ".lucille .fretting .string { stroke:"+style.fontColor+"; opacity:1; stroke-width:5; stroke-linecap:round; }";
			css += ".lucille .fretting .string.disabled { stroke:"+style.fontColor50+"; stroke-width:5; stroke-linecap:round; }";
			css += ".lucille .fretting .label { font-size:.8rem; opacity:0.6; }";
			css += ".lucille .fretting .dot { fill:"+style.fontColor+"}";
			css += ".lucille .fretting .dot.disabled { fill:"+style.fontColor50+"; }";

		// mini view

			css += ".lucille .minified .title { font-size: 1.15rem; }";

		// helpers

			css += '.lucille .hide { display: none; }';

		// concat theme

			theme.append(css);


	$('head').append(theme);

	return theme;

};