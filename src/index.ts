import { isObject, isobject } from './helpers/utils'
import { Options } from './interface/options'
import { DropState } from './interface/state'
import { log } from './helpers/log'
import { bindEvent, unbindEvent } from './helpers/event'

// 开发文档时 引入样式（umd模式不支持code-split）
import '../docs/scss/index.scss'

// if (process.env.NODE_ENV === 'production') {
//   import('../public/scss/index.scss').then(res => {
//     console.log('加载文档样式')
//   })
// }

const defaultConfig = {
  el: null,
  type: 'position',
  useHtmlDrop: false,
  hook: {}
}

export default class DropManger {
  dropState: DropState = 'unstart'
  constructor (options: Options) {
    this._init(options)
  }

  _init (opt: Options) {
    if (!opt.el) log('error', 'Please pass in the moving object')
    this.margeConfig(opt, defaultConfig)

    bindEvent(defaultConfig.el || window, 'start', this.startStart)
    bindEvent(defaultConfig.el || window, 'move', this.startMove)
    bindEvent(defaultConfig.el || window, 'end', this.startEnd)
  }

  // --------life style-------

  destory () {
    if (this.dropState !== 'unstart') {
      unbindEvent(defaultConfig.el || window, 'start', this.startStart)
      unbindEvent(defaultConfig.el || window, 'move', this.startMove)
      unbindEvent(defaultConfig.el || window, 'end', this.startEnd)
    }
  }

  // --------methods----------
  startStart () {
    this.dropState = 'start'
  }

  startMove () {
    this.dropState = 'move'
  }

  startEnd () {
    this.dropState = 'end'
  }

  // --------untils-----------
  // 默认认为 target 与 options 为相同数据结构
  margeConfig (target: any, options: any) {
    const arr = isObject(target) ? Object.keys(target) : target
    arr.forEach((k:any) => {
      // 深度合并
      isobject(k)
        ? this.margeConfig(target[k], options[k])
        : options[k] && (target[k] = options[k])
    })
  }
}
