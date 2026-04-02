export const pathsRewriteHtml = () => (
  app.gulp
    .src(`${app.path.buildFolder}/**/*.html`)
    .pipe(app.plugins.replace(/\/scripts/gi, './scripts'))
    .pipe(app.plugins.replace(/\/styles/gi, './styles'))
    .pipe(app.plugins.replace(/\/img/gi, './img'))
    .pipe(app.gulp.dest(app.path.buildFolder))
);

export const pathsRewriteStyles = () => (
  app.gulp
    .src(`${app.path.build.styles}/**/*.css`)
    .pipe(app.plugins.replace(/\/img/gi, '../img'))
    .pipe(app.plugins.replace(/\/fonts/gi, '../fonts'))
    .pipe(app.gulp.dest(app.path.build.styles))
);