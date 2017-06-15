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
      build: {
        src: ['server/**/*.ts', '!node_modules/**/*.ts'], // Avoid compiling TypeScript files in node_modules
        options: {
          module: 'commonjs', // To compile TypeScript using external modules like NodeJS
          fast: 'never' // You'll need to recompile all the files each time for NodeJS
        }
      },
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
    },
    exec: {
      angular_build: {
        cmd: function () {
          return 'ng build --prod';
        }
      },
      angular_serve: {
        cmd: function () {
          return 'ng serve';
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
  grunt.registerTask('serve', ['concurrent:watchers']);
  grunt.registerTask('build', ['ts:buildServer', 'tslint', 'exec:angular_build']);
  grunt.registerTask('default', ['tslint:all', 'ts:buildServer', 'watch']);
};