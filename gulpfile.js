const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

// clean Build folder

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Optimize Images

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.svgo(),
      ])
    );
};

exports.images = images;

// Make WebP images

const makewebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
};

exports.makewebp = makewebp;

//Make Svg sprite

const sprite = () => {
  return gulp
    .src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
};

exports.sprite = sprite;

// Copy fonts, pictures, scripts to Build folder

const copy = () => {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.ico",
        "source/*.html",
      ],
      { base: "source" }
    )

    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "source",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

// npm start - default

exports.default = gulp.series(styles, server, watcher);

// Build

exports.build = gulp.series(clean, styles, images, copy);
