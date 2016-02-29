var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	minifyCss = require('gulp-minify-css');	




gulp.task('less', function()
{
	return gulp.src('css/less/nclr-styles.min.less')
		.pipe(less({
			filename : 'nclr-styles.min.css', 
		}))
		// .pipe(minifyCss())
		.pipe(gulp.dest('css'))
});