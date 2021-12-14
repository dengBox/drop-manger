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
  return toS.call(val) === '[object Object]'
}

export function isobject (val: any) {
  const v = toS.call(val)
  return v === '[object Array]' || v === '[object Object]'
}

export function deepCopy (data:any) {
  const t = !isArray(data) ? isObject(data) ? 'object' : 'other' : 'array'
  let o:any

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}
