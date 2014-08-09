module.exports = {
    options: {
      separator: ';',
    },
    dist: {
      src: ['scripts/lucille.js', 
      		'scripts/fixtures.js',
			'scripts/instruments.js',
			'scripts/calculations.js',
			'scripts/renders.js',
			'scripts/displays.js',
			'scripts/play.js',
			'scripts/updates.js',
			'scripts/translators.js',
			'scripts/getters.js',
			'scripts/destroyers.js',
			'scripts/themes.js',
			'scripts/configurations.js',
			'scripts/themes.js'],
      dest: 'dist/lucille.js',
    },
}