// utils is a library of generic helper functions non-specific to axios

const toS = Object.prototype.toString

export function os ():string {
  return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
    ? 'mobile'
    : 'pc'
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray (val: any) {
  return toS.call(val) === '[object Array]'
}

export function isObject (val: any) {
  return toS.call(val) === '[object object]'
}

export function isobject (val: any) {
  return typeof val
}
