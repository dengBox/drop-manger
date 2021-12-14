// utils is a library of generic helper functions non-specific to axios

const toS = Object.prototype.toString

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray (val: any) {
  return toS.call(val) === '[object Array]'
}

export default {
  isArray
}
