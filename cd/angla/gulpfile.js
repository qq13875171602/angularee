const gulp=require("gulp");
const jshint=require("gulp-jshint");
const concat=require("gulp-concat");
const watch=require("gulp-watch");
const uglify=require("gulp-uglify");
const clean=require("gulp-clean-css");
const browser=require("browser-sync");
const plumber=require("gulp-plumber");
const file=require("gulp-file-sync");
const del=require("del");

const bast="./";
const libbast=bast+"lib/";
const srcbast=bast+"src/";
const destbast=bast+"dest/";

const libcss=libbast+"css/";
const libjs=libbast+"js/";
const libfonts=libbast+"fonts/";

const srccss=srcbast+"css/";
const srchtml=srcbast+"html/";
const srcimage=srcbast+"image/";
const srcjs=srcbast+"js/";

const destcss=destbast+"css/";
const desthtml=destbast+"html/";
const destjs=destbast+"js/";
const destimage=destbast+"image/";
const destfots=destbast+"fonts/";

gulp.task("del",function () {
  del.sync([destbast+"**/*"],{
      forcec:true
  });
});

gulp.task("html",function () {
  gulp.src(srchtml+"index.html").pipe(gulp.dest(destbast));
  file(srchtml+"user",desthtml+"user");
});

gulp.task("debughtml",function () {
  gulp.src(srchtml+"index.debug.html").pipe(gulp.dest(destbast));
  file(srchtml+"user",desthtml+"user");
});

gulp.task("fonts",function () {
  file(libfonts,destfots);
});

gulp.task("image",function () {
  file(srcimage,destimage);
});

gulp.task("js",function () {
  var js=[];
  js.push(libjs+"jquery.min.js");
  js.push(libjs+"bootstrap.min.js");
  js.push(libjs+"angular.min.js");
  js.push(libjs+"angular-route.min.js");
  js.push(libjs+"angular-*.min.js");
  return gulp.src(js).pipe(concat("lib.min.js")).pipe(gulp.dest(destjs));
});

gulp.task("css",function () {
  return gulp.src(libcss+"**/*.css").pipe(concat("lib.min.css")).pipe(gulp.dest(destcss));
});

gulp.task("srccss",function () {
  return gulp.src(srccss+"**/*.css").pipe(plumber())
  .pipe(concat("app.min.css"))
  .pipe(clean())
  .pipe(plumber.stop())
  .pipe(gulp.dest(destcss));
});

gulp.task("srcjs",function() {
  return gulp.src(srcjs+"**/*.js").pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
  .pipe(concat("app.min.js"))
  .pipe(uglify())
  .pipe(plumber.stop())
  .pipe(gulp.dest(destjs));
});

gulp.task("debugsrcjs",function() {
  return gulp.src(srcjs+"**/*.js").pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
  .pipe(concat("app.min.js"))
  .pipe(uglify())
  .pipe(plumber.stop())
  .pipe(gulp.dest(destjs));
});

gulp.task("default",["del","html","fonts","image","js","css","srccss","srcjs"],function () {
  console.log('default');
});


gulp.task("debug",["del","html","debughtml","fonts","image","js","css","srccss","srcjs","debugsrcjs"],function () {
  console.log('default');
});

gulp.task("watch",function () {
  browser.init({
    server:{
      baseDir:destbast
    }
    ,port:3456
  });

  gulp.watch([destbast+"**/*"]).on("change",browser.reload);

  gulp.watch([srccss+"**/*.css"],function () {
    gulp.start("srccss");
  });

  gulp.watch([srcjs+"**/*.js"],function () {
      gulp.start("srcjs");
      //gulp.start("debugsrcjs");
  });

  gulp.watch([srchtml+"**/*.html"],function () {
      gulp.start("html");
      //gulp.start("debughtml");
  });

  gulp.watch([srcimage+"**/*.image"],function () {
    gulp.start("image");
  });

});