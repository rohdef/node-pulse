"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);
  
  // load plugins
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jasmine-nodejs");
  grunt.loadNpmTasks("grunt-jsdoc");
  
  grunt.initConfig({
    package: grunt.file.readJSON("package.json"),

  
    eslint: {
      target: ["."]
    },

    jasmine_nodejs: {
      options: {
        specNameSuffix: "test.js",
        useHelpers: false,
        vendor: "node_modules/**/*.js",

        reporters: {
          console: {
            colors: true,
            cleanStack: 1,
            verbosity: 4,
            listStyle: "indent",
            activity: true
          },
          junit: {
            savePath: "./build/reports",
            filePrefix: "junit-report",
            consolidate: true,
            useDotNotation: true
          },
        }
      },
      all: {
        specs: ["tests/unit/**"]
      }
    },

    jsdoc: {
      dist: {
        src: "src/**.js",
        options: {
          destination: "build/doc"
        }
      }
    },

    watch: {
      scripts: {
        files: ["src/**/*", "tests/**/*.js", "*.js"],
        tasks: ["build"]
      }
    }
  });

  // register at least this one task
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["jasmine_nodejs", "eslint", "jsdoc"]);
};
