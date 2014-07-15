module.exports = function(grunt) {

    grunt.registerTask('build', [
        'concat', 'uglify'
    ]);

    grunt.registerTask('install', [
    	'curl'
    ]);
    
};