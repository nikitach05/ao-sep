// Импортируем модули
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import ifPlugin from 'gulp-if';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import GulpRunner from 'gulp-run';

// Экспортируем объект
export const plugins = {
  notify,
  if: ifPlugin,
  newer,
  plumber,
  rename,
  replace,
  run: GulpRunner,
};