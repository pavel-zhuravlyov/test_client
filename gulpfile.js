var ENV = process.env.APP_ENV || 'development';

if (ENV === 'development') {
  require('dotenv').load();
}

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    deploy = require('gulp-gh-pages'),
    ngConfig = require('gulp-ng-config'),
    fs = require('fs'),
    config = require('./config.js');

var html_files = [
        'app/views/**/*'
    ],
    css_files = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'app/styles/**/*'
    ],
    js_files = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.js',
        'bower_components/ng-token-auth/dist/ng-token-auth.min.js',
        'bower_components/angular-cookie/angular-cookie.min.js',
        'bower_components/ui-router/release/angular-ui-router.min.js',
        'app/scripts/**/*'
    ];

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
    gulp.watch(html_files, ['html']).on('change', browserSync.reload);
    gulp.watch(css_files, ['styles']).on('change', browserSync.reload);
    gulp.watch(js_files, ['scripts']).on('change', browserSync.reload);
});

gulp.task('styles', function() {
    gulp.src(css_files)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/assets/css'));
});


gulp.task('scripts', function() {
    gulp.src(js_files)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('html', function() {
    gulp.src(html_files)
        .pipe(gulp.dest('public'));
});

gulp.task('config', function() {
    fs.writeFileSync('./config.json',
        JSON.stringify(config[ENV]));
    gulp.src('./config.json')
        .pipe(
            ngConfig('config')
        )
        .pipe(gulp.dest('./app/scripts/'))
});

gulp.task('default', ['html', 'styles', 'scripts', 'config']);

gulp.task('serve', ['default', 'server']);

gulp.task('deploy', function() {
    return gulp.src("./public/**/*")
        .pipe(deploy());
});
