var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync").create();
var clean = require("gulp-clean");
var deploy = require("gulp-gh-pages");

/**
 * Push build to gh-pages
 */

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(deploy());
});

// plugin for lossy jpg compression
var imageminMozjpeg = require("imagemin-mozjpeg");

// Compile SCSS
gulp.task("css:compile", function () {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(
      sass
        .sync({
          outputStyle: "expanded",
        })
        .on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
      })
    )
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
});

gulp.task("css:copy", function () {
  return gulp.src("./src/scss/*.css").pipe(gulp.dest("./public/css"));
});

// CSS
gulp.task("css", gulp.series("css:compile"));

// Minify JavaScript
gulp.task("js:minify", function () {
  return gulp
    .src(["./src/js/*.js", "!./src/js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.stream());
});

// JS
gulp.task("js", gulp.series("js:minify"));

// Task to copy files and assets

// Optimize images
gulp.task("copy:images", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(
      imagemin([
        imageminMozjpeg({
          quality: 90,
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("./public/img"));
});

gulp.task("copy:favicons", function () {
  return gulp
    .src("./src/favicons/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./public/favicons"));
});

gulp.task("copy:files", function () {
  return gulp
    .src([
      "./src/*.*",
      "./src/*/*.woff",
      "./src/*/*.min.css",
      "./src/*/*.min.js",
      "!./src/**/*.html",
    ])
    .pipe(gulp.dest("./public/"));
});

// Files
gulp.task("copy", gulp.series("copy:images", "copy:favicons", "copy:files"));

gulp.task("html:minify", function () {
  return gulp
    .src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public/"))
    .pipe(browserSync.stream());
});

gulp.task("html", gulp.series("html:minify"));

gulp.task("build", gulp.series("css", "js", "copy", "html"));
// Configure the browserSync task
gulp.task(
  "browserSync",
  gulp.series("build", function () {
    browserSync.init({
      server: {
        baseDir: "./public",
      },
      port: "8080",
    });
  })
);

// Clean /public
gulp.task("clean", function () {
  return gulp
    .src("public", { allowEmpty: true }, { read: false })
    .pipe(clean());
});

// Dev task without copying
gulp.task(
  "serve",
  gulp.series(gulp.parallel("css", "js", "html"), function () {
    gulp.watch("./src/scss/*.scss", gulp.series("css"));
    gulp.watch("./src/js/*.js", gulp.series("js"));
    gulp.watch("./src/**/*.html", gulp.series("html"));
    browserSync.init({
      server: {
        baseDir: "./public",
      },
      port: "8080",
    });
  })
);

// Dev task
gulp.task(
  "default",
  gulp.series(gulp.parallel("build", "browserSync"), function () {
    gulp.watch("./src/scss/*.scss", gulp.series("css"));
    gulp.watch("./src/js/*.js", gulp.series("js"));
    gulp.watch("./src/**/*.html", gulp.series("html"));
  })
);
