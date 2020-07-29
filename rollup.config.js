import fs from 'fs-extra';
import path from 'path';
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import nodeResolve from '@rollup/plugin-node-resolve';
import packageInfo from './package.json';

// https://stackoverflow.com/questions/41212558/develop-tampermonkey-scripts-in-a-real-ide-with-automatic-deployment-to-openuser
// 打包去除 `@require file:// ` 路径
let banner = fs.readFileSync(path.join(__dirname, '/src/banner.user.js'), 'utf8')
banner = banner.split('\n').filter(line => !line.includes('file://')).join('\n')

export default {
  input: path.join(__dirname, './src/main.js'),
  output: {
    format: 'iife',
    file: path.join(__dirname, `./user-script/${packageInfo.name}.user.js`),
    banner
  },
  external: ['file-icons-js'],
  plugins: [
    json(),
    globals(),
    builtins(),
    nodeResolve({ browser: true }),
    commonjs(),
    esbuild({
      // All options are optional
      include: /\.js$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      watch: process.argv.includes('--watch'),
      sourceMap: false, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'es6', // default, or 'es20XX', 'esnext'
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
      }
    }),

  ]
}
