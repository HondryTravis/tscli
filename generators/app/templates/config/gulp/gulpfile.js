const gulp = require('gulp')
const rollup = require('rollup')
const del = require('del')
const pump = require('pump')
const less = require('gulp-less')
const watch = require('gulp-watch')
const browser = require('browser-sync').create(), reload = browser.reload;
const rollupTypescript = require('rollup-plugin-typescript')

const devEnv = ['development','production'];
const clear = () => {
  return del(['./dist'])
}
/**
 *
 * @param { string } entry  必须
 * @param { string } outDir 必须
 * @param { string } moduleName 必须
 */
const rollupBuild = (entry, outDir, moduleName) => {
  return rollup.rollup({
    input: entry,
    plugins: [
      rollupTypescript()
    ]
  }).then(bundle => {
    return bundle.write({
      file: outDir,
      format: 'es',
      name: moduleName,
      sourcemap: true
    })
  })
}

const css = (done) => {
  return pump([
    gulp.src('./src/theme/**/*.less'),
    less(),
    gulp.dest('./dist/css'),
    reload({ stream: true })
  ], done)
}
const typescript = (done) => {
  rollupBuild('./src/index.ts', './dist/index.js', 'index'),
  reload({ stream: true })
  done()
}
const html = done => {
  pump([
    gulp.src('./index.html'),
    gulp.dest('./dist'),
    reload({ stream: true })
  ],done)
}
const watchAll = () => {
  watch('./src/theme/**/*.less', gulp.series(css,  reload))
  watch('./src/**/*.ts', gulp.series(typescript, reload))
  watch('./*.html', gulp.series(html, reload))
}
const browerServer = done => {
  browser.init({
    server: {
      baseDir: "./",
      tunnel: true
    },
    port: 8888,
    ui: {
      port: 8080,
    }
  });
  watchAll();
  done()
}

gulp.task('default', gulp.series(html, css, typescript, browerServer));
