module.exports = function(grunt) {
  
    // simple build task
    grunt.registerTask('build', [
        'useminPrepare',
        'concat',
        'copy',
        'usemin'
    ]);
    
};