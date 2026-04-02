import svg from 'gulp-svg-sprite';

export const sprites = () => app.gulp
    .src(app.path.src.svgicons)
    .pipe(
        app.plugins.plumber(
        app.plugins.notify.onError({
            title: 'SVG',
            message: 'Error: <%= error.message %>',
        }),
        ),
    )
    .pipe(svg({
        shape: {
            dest: ""
        },
        mode: {
            stack: {
                sprite: "../img/svg-sprite/sprite.svg"
            }
        }
    }))
    .pipe(app.gulp.dest(`${app.path.assetsFolder}`));