import { os } from '../helpers/utils'
import { eventType } from '../interface/options'

const _os = os()

const eventMap = _os === 'pc'
  ? {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  }
  : {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend'
  }

export function bindEvent (target: Element | Window, eventName: eventType, cb:any) {
  target.addEventListener(eventMap[eventName], cb)
}
export function unbindEvent (target: Element| Window, eventName: eventType, cb:any) {
  target.removeEventListener(eventMap[eventName], cb)
}
