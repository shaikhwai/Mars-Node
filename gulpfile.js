var gulp = require("gulp");
var tsc  = require("gulp-typescript-compiler");
var nodemon = require("gulp-nodemon");

gulp.task("default", ["compile", "watch", "nodemon"]);


gulp.task("watch", function () {
   return gulp.watch("src/**/*.*", ["compile"]);
});

gulp.task("compile", function () {
    gulp.src('src/config/*')
        .pipe(gulp.dest('lib/config/'));
  return gulp
    .src("src/**/*.ts") 
    .pipe(tsc({
        "module": "commonjs",
        "target": "ES5",
        "noImplicitAny": false,
        "sourceMap": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "logErrors": true
    }))
    .pipe(gulp.dest("lib"));
});

gulp.task("nodemon", function () {
  nodemon({ script: "lib/index.js" });
});
