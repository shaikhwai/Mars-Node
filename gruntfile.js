// Generated on 2014-04-14 using generator-angular 0.8.0
'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-istanbul-coverage');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks("grunt-ts");

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-node-mocha');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-tsd');

    require('load-grunt-config')(grunt, {
        jitGrunt: {
        }
    });
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.registerTask('buildCoverage',
        [
            'replace:coverage',
            'clean:instrument',
            'instrument',
            'concat:coverage',
            'mochaTest:coverage',
            'clean:coverage',
            'storeCoverage',
            'makeReport',
            'coverage'
        ]);

    grunt.registerTask('test', [
        'clean:default',
        'ts:default',
        'buildCoverage'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'ts:default',
        'concat:build'
    ]);

    grunt.registerTask('install', [
        'npm-install'
    ]);

    grunt.registerTask('default', [
        'clean:default',
        'ts:default',
        'watch'
    ]);
};