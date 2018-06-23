var gulp = require("gulp");

var connect = require('gulp-connect');

var browserSync = require("browser-sync").create();

gulp.task("runserver", function() {

	console.log("server mazter staring...");
/*
	connect.server({
		port: 4000,
		host: 'mazter.com'
	});
*/
	browserSync.init({
		server: {
			//baseDir: "./"
			root: '.',
			livereload: true,
			port:3001
		}
	});
	gulp.watch("./index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Cajaingreso/index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Citahistorial/index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Citainscripcion/index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Cliente/index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Cuentausuario/index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Especialidad/index.html").on("change", browserSync.reload);
	gulp.watch("./app/views/Odontologo/index.html").on("change", browserSync.reload);
});
