var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    slim = require("gulp-slim")
    notify = require("gulp-notify"),
    browserSync = require("browser-sync").create(),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss');
    // sourcemaps = require('gulp-sourcemaps');
    // cleanCSS = require('gulp-clean-css');
    ;

gulp.task('stylus', function () {
  return gulp.src('app/stylus/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({browsers:['last 3 versions']}))
    .pipe(gulp.dest('app/css'))
    .pipe(notify('stylus converted'))
    .pipe(browserSync.reload({stream:true}))
    ;
});

gulp.task('slim', function(){
  gulp.src('app/slim/*.slim')
    .pipe(slim({pretty: true}))
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