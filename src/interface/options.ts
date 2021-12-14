
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
  activeClass: string
}

export type eventType = 'start' | 'move' | 'end'
