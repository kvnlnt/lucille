module.exports = {

    html: {
        src: 'index.html',
        dest: 'dist/index.html'
    },

    fonts: {
        src: 'fonts/**',
        dest: 'dist/'
    },

    plukit: {
        src:'modules/plukit/**',
        dest: 'dist/'
    },

    vendor: {
        src:'.tmp/concat/vendor.min.js',
        dest:'dist/vendor.min.js'
    },

    modules: {
        src:'.tmp/concat/modules.min.js',
        dest:'dist/modules.min.js'
    },

    lucille: {
        src:'.tmp/concat/lucille.min.js',
        dest:'dist/lucille.min.js'
    }

}