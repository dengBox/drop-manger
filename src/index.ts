import { isObject, isobject, deepCopy } from './helpers/utils'
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

const globleConfig = {
  el: null,
  type: 'position',
  useHtmlDrop: false,
  activeClass: 'boshen_active_drop',
  hook: {
    dropStart: () => {
      console.log('drop:start')
    },
    dropMove: () => {
      console.log('drop:move')
    },
    dropEnd: () => {
      console.log('drop:end')
    }
  }
}

export default class DropManger {
  dropState: DropState = 'unstart'
  config = deepCopy(globleConfig)
  activePosition: object = {}
  bindEvent = {
    start: this.dragStart.bind(this),
    move: this.dragMove.bind(this),
    end: this.dragEnd.bind(this)
  }

  constructor (options: Options) {
    this._init(options)
  }

  _init (opt: Options) {
    if (!opt.el) log('error', 'Please pass in the moving object')
    this.margeConfig(this.config, opt)
    bindEvent(this.config.el || window, 'start', this.bindEvent.start)
  }

  // --------life style-------

  destory () {
    if (this.dropState !== 'unstart') {
      unbindEvent(this.config.el || window, 'start', this.bindEvent.start)
    }
  }

  // --------methods----------
  dragStart (event:any) {
    bindEvent(window, 'move', this.bindEvent.move)
    bindEvent(window, 'end', this.bindEvent.end)
    this.dropState = 'start'
    this.getPosition(this.config.el)

    this.config.el.classList.add(this.config.activeClass)
    this.config.hook.dropStart()
  }

  dragMove (event:any) {
    this.dropState = 'move'
    this.config.hook.dropMove()
  }

  dragEnd (event:any) {
    unbindEvent(window, 'move', this.bindEvent.move)
    unbindEvent(window, 'end', this.bindEvent.end)
    this.dropState = 'end'
    this.config.el.classList.remove(this.config.activeClass)

    this.config.hook.dropEnd()
  }

  // --------untils-----------
  getPosition (el: Element) {
    console.log(el.getBoundingClientRect())
  }

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
