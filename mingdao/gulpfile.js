const gulp=require('gulp');
const uglify=require('gulp-uglify');
const babel=require('gulp-babel');
const minifyCss = require('gulp-minify-css');
const minifyHtml = require('gulp-minify-html');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
//const connect = require('gulp-connect');

gulp.task('minifyHtml',function(){
    gulp.src('./app/index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('./dist'));
        //.pipe(connect.reload());//通过浏览器自动刷新
})
gulp.task('public',function(){
    gulp.src('./app/js/vendor/jquery-1.11.3.js')
        .pipe(uglify())
        //.pipe(concat('public.js'))
        .pipe(gulp.dest('./dist/js/vendor'))
        .pipe(rename('public.min.js'))
        .pipe(gulp.dest('./dist/js/vendor'));
        //.pipe(connect.reload());
})
gulp.task('uglify',function(){
    gulp.src('./app/js/index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist/js'));
        //.pipe(connect.reload());
})
gulp.task('minifyCss',function(){
    gulp.src('./app/css/*.css')
        .pipe(minifyCss())
        .pipe(concat('all.css'))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('./dist/css'));
        //.pipe(connect.reload());
})
gulp.task('publicCss',function(){
    gulp.src('./app/css/vendor/reset.css')
        .pipe(minifyCss())
        //.pipe(concat('public.js'))
        .pipe(gulp.dest('./dist/css/vendor'))
        .pipe(rename('public.min.css'))
        .pipe(gulp.dest('./dist/css/vendor'));
    //.pipe(connect.reload());
})
gulp.task('imagemin', function () {
    return gulp.src('./app/images/*')
        .pipe(imagemin()) //压缩图片
        .pipe(gulp.dest('./dist/images'));//将图片拷贝进生产/图片文件夹
        //.pipe(connect.reload());
});
gulp.task('watch',function(){
    gulp.watch('./app/index.html',[minifyHtml]);
    gulp.watch('./app/js/*.js',[uglify]);
    gulp.watch('./app/css/*.css',[minifyCss]);
    gulp.watch('./app/images/*',[imagemin]);
})
//gulp.task('server',function(){
//    connect.server({
//        root:'./dist',
//        port:8080,
//        livereload: true//实时更新
//    })
//});
gulp.task('default',['minifyHtml','uglify','minifyCss','publicCss','public','imagemin','watch']);