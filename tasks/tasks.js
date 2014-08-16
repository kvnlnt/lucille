module.exports = function(grunt) {
  
    // simple build task
    grunt.registerTask('build', [
        'useminPrepare',
        'copy:html',
        'concat:generated',
        'uglify:generated',
        'usemin'
    ]);
    
};