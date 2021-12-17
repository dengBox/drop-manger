export type eventType = 'start' | 'move' | 'end'
export type unitType = 'px' | 'mm' | 'cm'

export interface Hook {
  dropStart: () => {},
  dropMove: () => {},
  dropEnd: () => {},
}

export interface Options {
  el: Element,
  wrap: Element,
  type: 'position' | 'transform',
  useHtmlDrop: Boolean,
  hook: Hook,
  activeClass: string,
  unit: unitType,
  noConsole: Boolean
}

export interface Position {
  mouse: {
    x: number, // left
    y: number // top
  },
  dom: {// 相对于容器的位置
    offX: number, // left
    offY: number, // top
    width: number,
    height: number
  }
}
