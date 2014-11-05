module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    'download-atom-shell': {
      version: '0.19.1',
      outputDir: 'build',
      downloadDir: 'cache'
    }
  });

  grunt.loadNpmTasks('grunt-download-atom-shell');
  grunt.registerTask('default', 'download-atom-shell');
};
