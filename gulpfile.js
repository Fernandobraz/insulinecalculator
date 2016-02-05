var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

gulp.task('styles', function(){
  gulp.src(['src/stylesheets/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets/'))
    // .pipe(browserSync.reload({stream:true}))
});

gulp.task("database", function () {
  exec('mongod --dbpath ./data', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
  });
});

gulp.task("server", ['database'], function() {
  return nodemon({
    script: "./bin/www",
    watch: ["src/", "src/jsx/", "routes/"],
    delay: 50
  });
});

gulp.task('scripts', function(){
  return gulp.src('src/javascripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'))
    // .pipe(browserSync.reload({stream:true}))
});

// gulp.task('browser-sync', function() {
//   browserSync({
//     server: {
//        baseDir: "./"
//     }
//   });
// });

// gulp.task('bs-reload', function () {
//   browserSync.reload();
// });


gulp.task('default', ["scripts", "styles"]);