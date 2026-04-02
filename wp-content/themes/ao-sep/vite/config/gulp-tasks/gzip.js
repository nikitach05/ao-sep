export const gzip = () => (
  app.gulp
    .src(`${app.path.srcFolder}/.htaccess`)
    .pipe(app.gulp.dest(app.path.buildFolder))
);