const rollupTypescript = require('rollup-plugin-typescript')
const config = function (options) {
  const { input, file } = options
  return {
    input,
    plugins: [
      rollupTypescript()
    ],
    output: {
      file,
      format: 'es'
    }
  }
}
const options = {
  input: './src/index.ts',
  file: './dist/index.js'
}
module.exports = config(options)
