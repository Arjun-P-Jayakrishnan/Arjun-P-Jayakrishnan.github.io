import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import fileInclude from "gulp-file-include";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import dartSass from "sass";

const scss = sass(dartSass);

/* ---------- HTML ---------- */
export function html() {
  return gulp
    .src("static/html/index.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "static/html",
      }),
    )
    .pipe(gulp.dest("./"));
}

/* ---------- CSS ---------- */
export function css() {
  return gulp
    .src("static/styles/index.scss")
    .pipe(sourcemaps.init())
    .pipe(scss().on("error", scss.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./"));
}

/* ---------- WATCH ---------- */
export function dev() {
  gulp.watch("static/html/**/*.html", html);
  gulp.watch("static/styles/**/*.scss", css);
}

/* ---------- BUILD ---------- */
export const build = gulp.series(html, css);

export default dev;
