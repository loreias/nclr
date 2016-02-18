module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          paths: ["less"]
        },
        
        files: {
          "css/nclr-styles.min.css" : "css/less/nclr-styles.less"
        }
      }
    },


    watch: {
      grunt: { files: ['Gruntfile.js'] },

      less: {
        files: 'css/less/*.less',
        tasks: ['less']
      },

    },

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['less']);
  grunt.registerTask('default', ['build','watch']);
}