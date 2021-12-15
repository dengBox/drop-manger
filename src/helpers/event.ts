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

export function stopEvent (event:any) {
  event.stopPropagation()
}

export function preventEvent (event:any) {
  event.preventDefault()
}

export function bindEvent (target: Element | Window, eventName: eventType, cb:any) {
  target.addEventListener(eventMap[eventName], cb, { passive: false })
}
export function unbindEvent (target: Element| Window, eventName: eventType, cb:any) {
  target.removeEventListener(eventMap[eventName], cb)
}
