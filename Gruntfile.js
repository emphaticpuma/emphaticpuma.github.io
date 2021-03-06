module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    dest: 'js/scripts.js',
                    src: '_javascript/*.js'
                }
            }
        },
        sass: {
            options: {
                outputStyle: 'compressed',
            },
            dist: {
                files: {
                    'css/styles.css': ['_sass/main.sass'],
                }
            }
        },
        shell: {
            jekyll_build: {
                command: 'jekyll build'
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions']}),
                    require('postcss-focus')
                ]
            },
            dist: {
                src: 'css/styles.css'
            }
        },
        bower_concat: {
            build: {
                dest: '_js/bower.js',
                cssDest: '_sass/bower.scss'
            }
        },
        watch: {
            options: {
                livereload: {
                    host: '0.0.0.0',
                }
            },
            src: {
                files: [
                    '_sass/*.scss',
                    '_sass/*.sass',
                    'index.html',
                    '.md',
                    '_includes/*.html',
                    'js/*.js',
                    '_layouts/*.html',
                    '_posts/*.md',
                    '_posts/*/*.md',
                    '_data/*','*.md',
                    'img/*',
                    '*.json'
                ],
                tasks: ['uglify','sass','shell'],
            },
        },
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    base: '_site',
                    port: 4400,
                }
            }
        },
    });


    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-autoprefixer');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');

    // Default task(s).
    grunt.registerTask('init_build', ['bower_concat:build','uglify','sass','shell:jekyll_build']);
    grunt.registerTask('build', ['bower_concat:build','newer:uglify','newer:sass','shell:jekyll_build']);
    grunt.registerTask('default', ['init_build','connect','watch']);

};
