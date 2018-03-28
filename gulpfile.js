var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  gulpimagemin = require('gulp-imagemin'),
  imagemin = require('imagemin'),
  pngquant = require('imagemin-pngquant'),
  mozjpeg = require('imagemin-mozjpeg'),
  htmlmin = require('gulp-htmlmin'),
  connect = require('gulp-connect'),   //livereload
  pump = require('pump');

gulp.task('css', function(cb) {
  pump([
    gulp.src('src/sass/*.scss'),
    sass(),
    cssmin(),
    gulp.dest('css'),
    connect.reload()
  ], cb);
});

gulp.task('js', function() {
  pump([
    gulp.src('src/js/*.js'),
    uglify(),
    gulp.dest('js'),
    connect.reload()
  ]);
});

//深度压缩png文件
imagemin(['src/images/*.png'], 'images', {use: [pngquant({
  quality: '65-80',  // 图片品质
  speed: 4   
})]}).then();

// 深度压缩jpg图片
imagemin(['src/images/*.jpg'], 'images', {
  use: [
      mozjpeg()
  ]
})

// 压缩jpeg,gif等其他格式图片
gulp.task('img', function() {
  pump([
    gulp.src('src/images/*.{jpeg,gif}'),
    gulpimagemin(),
    gulp.dest('images'),
    connect.reload()
  ]);
});

gulp.task('html', function() {
  pump([
    gulp.src('src/*.html'),
    htmlmin(),
    gulp.dest(''),
    connect.reload()
  ]);
});

//自动刷新页面
gulp.task('connect', function() {
  pump([
    connect.server({
      livereload: true,
      host: '192.168.51.69'
    })
  ]);
});

gulp.task('watch', function() {
  gulp.watch('src/sass/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/*.{jpg,png,jpeg,gif}', ['img']);
  gulp.watch('src/*.html', ['html']);
});

// gulp.task('dev', function(){
//   gulp.start('watch');
// });
gulp.task('dev',['css', 'js', 'img', 'html', 'watch', 'connect']);


