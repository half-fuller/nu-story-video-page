var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    webserver = require('gulp-webserver');
    image = require('gulp-image');

    gulp.task('lint', function (argument) {
      return gulp.src('src/js/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
    });

    gulp.task('sass', function () {
      return gulp.src('src/scss/*.scss')
          .pipe(sass())
          .pipe(autoprefixer())
          .pipe(gulp.dest('dist/css'));
    });

    gulp.task('scripts', function () {
      return gulp.src('src/js/*.js')
          .pipe(concat('main.js'))
          .pipe(gulp.dest('dist'))
          .pipe(rename('main.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist/js'));
    });

    gulp.task('jade', function () {
      return gulp.src('src/*.jade')
          .pipe(jade({pretty: true}))
          .pipe(rename('index.html'))
          .pipe(gulp.dest('dist'));
    });

    gulp.task('image', function () {
      return gulp.src('src/img/*')
          .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            advpng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true
          }))
          .pipe(gulp.dest('dist/img'));
    })

    gulp.task('watch', function () {
      gulp.watch('src/js/*.js', ['lint', 'scripts']);
      gulp.watch('src/js/**/*.js', ['lint', 'scripts']);
      gulp.watch('src/scss/*.scss', ['sass']);
      gulp.watch('src/**/*.scss', ['sass']);
      gulp.watch('src/*.jade', ['jade']);
      gulp.watch('src/**/*.jade', ['jade']);
      gulp.watch('src/img/*', ['image']);
    });

    gulp.task('webserver', function () {
      gulp.src('dist')
          .pipe(webserver({
            livereload:true,
            open: true
          }));
    });

    gulp.task('default', ['lint', 'sass', 'scripts', 'jade', 'image']);

    gulp.task('serve', ['default', 'webserver', 'watch']);
