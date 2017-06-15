module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server/index.js'
      },
      options: {
        ignore: ['node_modules/**', 'Gruntfile.js'],
        env: {
          PORT: '8181'
        }
      }
    },
    watch: {
      scripts: {
        files: ['server/**/*.ts', '!node_modules/**/*.ts'], // the watched files
        tasks: ['ts:buildServer'], // the task to run
        options: {
          spawn: false // makes the watch task faster
        }
      }
    },
    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      all: {
        src: ['server/**/*.ts', '!node_modules/**/*.ts', '!obj/**/*.ts'] // avoid linting typings files and node_modules files
      }
    },
    ts: {
      buildServer: {
        files: [{
          src: ['server/\*\*/\*.ts', '!src/.baseDir.ts', '!src/_all.d.ts']
        }],
        options: {
          module: 'commonjs',
          target: 'es6',
          sourceMap: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-exec');

  // Default tasks.
  grunt.registerTask('default', ['concurrent:watchers']);
  grunt.registerTask('build', ['ts:buildServer', 'tslint', 'exec:angular_build']);  
  grunt.registerTask('serve', ['tslint:all', 'ts:buildServer', 'watch']);
};