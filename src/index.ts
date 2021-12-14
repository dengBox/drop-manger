import until from './helpers/utils'
import { Options } from './interface'

// 开发文档时 引入样式（umd模式不支持code-split）
import '../docs/scss/index.scss'

// if (process.env.NODE_ENV === 'production') {
//   import('../public/scss/index.scss').then(res => {
//     console.log('加载文档样式')
//   })
// }

console.log('', until)

export default class DataManger {
  constructor (options: Options) {
    console.log(options)
  }
}
