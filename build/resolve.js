import nodeResolve from '@rollup/plugin-node-resolve'

export default () =>
  nodeResolve({
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    jsnext: true,
    preferBuiltins: true,
    browser: true,
  })
