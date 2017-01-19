import gulp from 'gulp';
import del from 'del';
import path from 'path';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();

const paths = {
    js: ['index.js', './**/*.js', '!dist/**', '!node_modules/**', '!bower_components/**'],
    nonJs: ['client/**', '!client/**/*.js']
}

gulp.task('clean', () => {
    del(['dist/**']);
});

gulp.task('babel', () => {
    return gulp.src([...paths.js, '!gulpfile.babel.js'])
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', () => {
    return gulp.src([...paths.nonJs])
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist/client'));
});

gulp.task('nodemon', ['clean', 'copy', 'babel'], () => {
    plugins.nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**', 'bower_components/**/*.js'],
        tasks: ['copy', 'babel']
    });
});

gulp.task('default', ['clean'], () => {
    runSequence(
        ['copy', 'babel']
    );
});
