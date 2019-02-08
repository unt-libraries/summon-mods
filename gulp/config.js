var dest = './',
    src = './summon_2_src',
    vendor = './node_modules';

module.exports = {
    sass: {
        src: [ src + '/sass/summon-2-styles-local.scss', src + '/sass/summon-docs.scss'],
        dest: dest
    },
    bower: {
        dest: dest
    },
    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/js/summon-2-local.js',
            dest: dest,
            outputName: 'summon-2-local.js',
            // Gulp-uglify options https://www.npmjs.com/package/gulp-uglify
            uglifyOpts: {},
            // list of externally available modules to exclude from the bundle
            external: []
        }, {
            entries: src + '/js/summon-2-preview.js',
            dest: dest,
            outputName: 'summon-2-preview.js',
            // Gulp-uglify options https://www.npmjs.com/package/gulp-uglify
            uglifyOpts: {},
            // list of externally available modules to exclude from the bundle
            external: []
        }]
    }
};