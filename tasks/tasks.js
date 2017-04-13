module.exports = function(grunt) {
  
    // simple build task
    grunt.registerTask('build', [
        'useminPrepare',
        'copy',
        'concat:generated',
        'uglify:generated',
        'usemin'
    ]);
    
};