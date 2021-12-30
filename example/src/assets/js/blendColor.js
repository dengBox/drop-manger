
export default class BlendColor {
  _canvas = null
  _cmykScale = 100
  _rgbScale = 255
  el = null
  blendData = []
  constructor (options) {
    this._init(options)
  }

  _init (opt) {
    if (!opt?.el) {
      throw new Error('Parameter must contain el')
    } else if (!window) {
      throw new Error('BlendColor moust be in browser')
    }
    this.el = opt.el
    this.blendData = opt.blendData
    // this.draw()
    this._makeContent(this.el)
  }
  _destroy () {
    if (!this.el || !this._canvas) {
      return
    }
    this.el.removeChild(this._canvas)
    this._canvas = null
    this.el = null
  }
  // --------- methods ----------
  async draw (drawType = 'toMax') {
    if (!this.blendData || this.blendData?.length < 1) return
    const ctx = this._canvas.getContext('2d')
    const imgData = ctx.createImageData(this._canvas.width, this._canvas.height)

    for (let design of this.blendData) {
      const img = await this._makeImg(design.url)
      ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
      ctx.drawImage(img, design.x, design.y, design.width, design.height)
      this._blend(drawType, imgData, design, ctx)
    }

    ctx.putImageData(imgData, 0, 0)
    this._showContent(this._canvas)
  }
  // --------- until ----------
  _blend (type, result, d, ctx) {
    /**
     * 方案：
     * 0. 获取区间进行运算
     * 1. 将rgb转为cmyk
     * 2. cmyk根据规则分别计算
     * 3. cmyk转rgb
     */
    // console.log('rgb', [203, 171, 130])
    // console.log('RGB_CMYK', this.RGB_CMYK([203, 171, 130]))
    // console.log('CMYK_RGB', this.CMYK_RGB([0, 15.763546798029557, 35.960591133004925, 20.392156862745104]))
    const newData = ctx.getImageData(d.x, d.y, d.width, d.height)
    const offset = d.x * 4 + d.y * this._canvas.width * 4
    const step = d.width * 4
    switch (type) {
      case 'toMax':
        this._mapData(result.data, newData.data, offset, step, (oV, nV) => {
          return [
            oV[0] > nV[0] ? oV[0] : nV[0],
            oV[1] > nV[1] ? oV[1] : nV[1],
            oV[2] > nV[2] ? oV[2] : nV[2],
            oV[3] > nV[3] ? oV[3] : nV[3]
          ]
        })
        break
      case 'toMean':
        this._mapData(result.data, newData.data, offset, step, (oV, nV) => {
          return [
            oV[0] + nV[0] / 2,
            oV[1] + nV[1] / 2,
            oV[2] + nV[2] / 2,
            oV[3] + nV[3] / 2
          ]
        })
        break
    }
  }
  _makeContent (el) {
    if (!this._canvas) {
      const style = window.getComputedStyle(el)
      const canvas = document.createElement('canvas')
      canvas.width = parseInt(style.width)
      canvas.height = parseInt(style.height)
      el.appendChild(canvas)
      this._canvas = canvas
    }
    this._hideContent(this._canvas)
  }
  _makeImg (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.crossOrigin = ''
      img.onload = () => {
        resolve(img)
      }
      img.onerror = err => {
        reject(err)
      }
    })
  }
  _showContent (c) {
    c.style.display = 'block'
  }
  _hideContent (c) {
    c.style.display = 'none'
  }
  /**
   *
   * @param {Array} o 整块画布
   * @param {Array} n 要覆盖的区间
   * @param {Number} offset n 相对于 o 的偏移index
   * @param {Number} step n的区间
   * @param {Function} cb 每次循环回调
   * @returns void
   */
  _mapData (o, n, offset, step, cb) {
    const len = n.length
    if (len < 1) return o

    for (let l = len - 1; l > -1; l--) {
      if ((l + 1) % 4 === 0 && l > 0) {
        const nL = l % step + offset + (parseInt(l / step) * this._canvas.width) * 4
        const oV = this.RGB_CMYK([o[nL - 3], o[nL - 2], o[nL - 1]])
        const nV = this.RGB_CMYK([n[l - 3], n[l - 2], n[l - 1]])
        // o[nL] === 0 表示当前像素为透明 Math.round(o[nL] / 255 * 100) / 100
        const result = this.CMYK_RGB(o[nL] === 0 ? [nV[0], nV[1], nV[2], nV[3]] : cb(oV, nV))
        o[nL - 3] = result[0]
        o[nL - 2] = result[1]
        o[nL - 1] = result[2]
        o[nL] = n[l]
      }
    }
  }
  CMYK_RGB ([c, y, m, k]) {
    return [
      this._rgbScale * (1.0 - c / this._cmykScale) * (1.0 - k / this._cmykScale),
      this._rgbScale * (1.0 - y / this._cmykScale) * (1.0 - k / this._cmykScale),
      this._rgbScale * (1.0 - m / this._cmykScale) * (1.0 - k / this._cmykScale)
    ]
  }
  RGB_CMYK ([r, g, b]) {
    if (r === 0 && g === 0 && b === 0) return [0, 0, 0, this._cmykScale]

    let c = 1 - r / this._rgbScale
    let m = 1 - g / this._rgbScale
    let y = 1 - b / this._rgbScale

    const k = Math.min(c, m, y)
    c = (c - k) / (1 - k)
    m = (m - k) / (1 - k)
    y = (y - k) / (1 - k)

    return [c * this._cmykScale, m * this._cmykScale, y * this._cmykScale, k * this._cmykScale]
  }
}

// const fileReader = new FileReader()
// fileReader.onload = function (event) {
//   const buffer = event.target.result
//   console.log(new Uint8Array(buffer))
// }
// fileReader.readAsArrayBuffer(file)
