import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import ts from 'rollup-plugin-typescript2'

import { terser } from 'rollup-plugin-terser'
import template from 'rollup-plugin-generate-html-template'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

// import packageJSON from './package.json'
// html需要与资源文件在同一目录结构下

const isProduction = process.env.NODE_ENV === 'production'

const extensions = ['.js', '.ts', '.tsx']

const Plugins = isProduction
  ? [
    babel({
      extensions,
      exclude: 'node_modules/**'
    }),
    terser({
      compress: {
        pure_funcs: ['console.log']
      }
    })
  ]
  : [
    serve({ contentBase: './' }), // open: true
    livereload('./')
  ]

const getPath = (_path) => path.resolve(__dirname, _path)

// ts
const tsPlugin = ts({
  tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
  extensions
})

// eslint
const esPlugin = eslint({
  throwOnError: true,
  include: ['src/**/*.ts'],
  exclude: ['node_modules/**', 'lib/**']
})

// 基础配置
const commonConf = {
  input: getPath('./src/index.ts'),
  watch: {
    include: 'src/**'
  },
  plugins: [
    resolve(extensions),
    commonjs(),
    esPlugin,
    tsPlugin,
    template({
      template: './index.html',
      target: getPath('./example/public/index.html')
      // replaceVars: {
      //   __STYLE_URL__: `./lib/${packageJSON.name}.css`
      // }
    }),
    ...Plugins
  ]
}
// 需要导出的模块类型
const outputMap = [
  {
    file: './example/public/plugin/index.js', // 通用模块
    // file: !isProduction ? './example/public/plugin/index.js' : packageJSON.main, // 通用模块
    format: 'umd'
  }
]

// 开发环境会引入esm模块，导致编译出错。
// if (isProduction) {
//   outputMap.push({
//     file: packageJSON.module, // es6模块
//     format: 'es'
//   })
// }

const buildConf = (options) => Object.assign({}, commonConf, options)

export default outputMap.map((output) =>
  buildConf({ output: { name: 'DropManger', ...output } })
)
