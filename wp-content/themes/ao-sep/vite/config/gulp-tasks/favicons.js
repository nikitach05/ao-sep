import favicons from "gulp-favicons";

export const favicon = () => (
  app.gulp
    .src(`${app.path.src.images}/favicons/*.{ico,jpg,jpeg,png}`)
    .pipe(favicons({
        icons: {
            appleIcon: true,
            favicons: true,
            online: false,
            appleStartup: false,
            android: false,
            firefox: false,
            yandex: false,
            windows: false,
            coast: false
        }
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}/favicons/`))
);