var gulp = require('gulp'),
    flatten = require('gulp-flatten'),
    runseq = require('run-sequence'),
    del = require('del'),
    concat = require('gulp-concat'),
    typescript = require('gulp-typescript'),
    less = require('gulp-less'),
    karma = require('karma').Server,
    images = require('gulp-imagemin');

var config = {
    compiled: 'bin',
    templates: './modules/**/*.html',
    index: './index.html',
    typescript: './modules/**/*.ts',
    TStests: './tests/unit/**/*.ts',
    JStests: './bin/tests/unit/**/*.js',
    libs: [
        'node_modules/angular2/es6/prod/src/testing/shims_for_IE.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery/dist/jquery-ui.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.js',
        'node_modules/angular2/bundles/http.js',
        'node_modules/angular2/bundles/router.js',

    ],
    angular2: [
        'node_modules/angular2/**/*.js',
        'node_modules/rxjs/**/*.js',
        
    ],
    primeng: [
        'node_modules/primeng/**/*.js',
    ],

    styles: [
        'modules/**/*.less'
    ],
    images: [
        './modules/**/images/*'
    ]
};

//------------------------------- Build libs -------------------------------------
gulp.task('libs', function() {
    return gulp.src(config.libs)
        .pipe(gulp.dest('./bin/lib/'));
});

//----------------------------- Build Angular 2 ----------------------------------
gulp.task('angular2', function() {
    return gulp.src(config.angular2)
        .pipe(gulp.dest('./bin/angular2/'));
});

gulp.task('primeng', function() {
    return gulp.src(config.primeng)
        .pipe(gulp.dest('./bin/primeng/'));
});

//------------------------------ Build index -------------------------------------
gulp.task('index', function() {
    return gulp.src(config.index)
        .pipe(gulp.dest('./bin/'));

});

//----------------------------- Build typescript ---------------------------------
gulp.task('typescript', function() {
    var ts = typescript.createProject('tsconfig.json');

    return ts.src()
        .pipe(typescript(ts))
        .pipe(gulp.dest('./bin/'));
});


//----------------------------- Build Templates ----------------------------------
gulp.task('templates', function() {
    return gulp.src(config.templates)
        //.pipe(flatten())
        .pipe(gulp.dest('./bin/modules'));

});

//------------------------------- Build styles ------------------------------------
gulp.task('styles', function () {
    var less_options = {
        compress: false
    };

    return gulp.src(config.styles)
        .pipe(less(less_options))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./bin/'));
});

//------------------------------- Build images -----------------------------------
gulp.task('images', function () {
    return gulp.src(config.images)
        .pipe(images())
        .pipe(gulp.dest('./bin/modules'));
});

//------------------------------- Build tests ------------------------------------
gulp.task('karma', function(done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        reporters: ['progress', 'teamcity', 'coverage']
    }, done).start();
} );

//---------------------------------- Watch ---------------------------------------
gulp.task('watch-ts', function() {
    gulp.watch(config.index, ['index']);
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.styles, ['styles']);
    gulp.watch(config.typescript, ['typescript']);
    gulp.watch(config.TStests, ['typescript']);
});

gulp.task('watch', function() {
    gulp.watch(config.index, ['index']);
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.styles, ['styles']);
});
//------------------------------- Clean files ------------------------------------
gulp.task('clean', function () {
    del.sync(['./bin']);
});

//------------------------------- Build all files --------------------------------
gulp.task('build-ts', ['libs', 'angular2','primeng', 'index', 'templates', 'styles', 'typescript','images']);
gulp.task('build', ['libs', 'angular2','primeng', 'index', 'templates', 'styles', 'images']);

//-------------------------------- Gulp Tasks ------------------------------------
gulp.task('dev', function()  {
    return runseq('clean', 'build', 'watch');
});

gulp.task('dev-ts', function()  {
    return runseq('clean', 'build-ts', 'watch-ts');
});

gulp.task('prod', function()  {
    return runseq('clean', 'build-ts');
});

gulp.task('test', function()  {
    return runseq('clean', 'build-ts', 'karma');
});

gulp.task('test-watch', function()  {
    return runseq('clean', 'build-ts', 'karma', 'watch');
});

gulp.task('default', function()  {
    return runseq('clean', 'build-ts','serve');
});

var webserver = require('gulp-webserver');

gulp.task('serve', function() {
    gulp.src(config.compiled)
        .pipe(webserver({
            host:'localhost',
            port: 8080,
            livereload: true,
            fallback: 'index.html',
            directoryListing: {
                enable: false,
                path: 'bin'
            },
            open: true
        }));
});
