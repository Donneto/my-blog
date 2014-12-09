// ==============================================
// 	File: Gruntfile.js
// 	Author: Adolfo Gutierrez
// 	Description:
//   Automatic compiling, cleaning, concatenation
// 	 and minification of assets

module.exports = function (grunt) {
	'use strict';

	// DEPENDENT PLUGINS =======================/
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// CONFIG ==============================/
		sass: {
			dist: {
				options: {
					banner: '/*! ================================================================\n'+
							'\t<%= pkg.name %>\n'+
							'\tLast Update: <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT Z") %>\n'+
							'================================================================= */',
					style: 'compressed',
					sourcemap: 'none'
				},
				files: [
					{
						'css/materialize.css':'sass/materialize.scss'
					}
				]
			}
		},
		uglify: {
			options: {
			},
			build: {
				files: {
					'js/prod/materialize.js': [ 'js/dev/**/*.js' ]
				}
			}
		},
		watch: {
			css: {
				files: 'sass/**/*.scss',
				tasks: ['sass:dist'],
				options: {
					spawn: false
				}
			},
			js:{
				files: ['js/**/*.js'],
				tasks: ['uglify:build'],
				options: {
					spawn:false
				}
			}
		}
	});

	// TASKS ===================================/
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('js', ['uglify']);
};