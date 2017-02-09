var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    slim = require("gulp-slim"),
    notify = require("gulp-notify"),
    browserSync = require("browser-sync").create(),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css')
    ;
    
gulp.task('stylus', function () {
  return gulp.src('app/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
           compress: true,
           use:[nib(),jeet(),rupture()]
    }))
    .pipe(autoprefixer({browsers:['last 3 versions']}))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
    .pipe(notify('stylus converted'))
    .pipe(browserSync.reload({stream:true}))
    ;
});

gulp.task('slim', function(){
  gulp.src('app/slim/*.slim')
    .pipe(sourcemaps.init())
    .pipe(slim({pretty: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/"))
    .pipe(notify('slim converted'))
    .pipe(browserSync.reload({stream:true}))
    ;
});

gulp.task('uncss', function () {
    return gulp.src('app/css/style.css')
        .pipe(uncss({html: ['app/index.html']}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
  gulp.watch('app/slim/*.slim',['slim']);
  gulp.watch('app/stylus/*.styl',['stylus']);
  gulp.watch('app/*.html').on('change',browserSync.reload);
  gulp.watch('app/css/*.css').on('change',browserSync.reload);
});

gulp.task('default', ['slim', 'stylus', 'uncss', 'serve']);