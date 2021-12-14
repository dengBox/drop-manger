export type eventType = 'start' | 'move' | 'end'
export type unitType = 'px' | 'mm' | 'cm'

export interface Hook {
  dropStart: () => {},
  dropMove: () => {},
  dropEnd: () => {},
}

export interface Options {
  el: Element,
  type: 'position' | 'transform',
  useHtmlDrop: Boolean,
  hook: Hook,
  activeClass: string,
  unit: unitType
}

export interface Position {
  mouse: {
    x: number, // left
    y: number // top
  },
  dom: {
    x: number, // left
    y: number, // top
    width: number,
    height: number
  }
}
