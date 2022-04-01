
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DropManger = factory());
})(this, (function () { 'use strict';

  // utils is a library of generic helper functions non-specific to axios
  const toS = Object.prototype.toString;
  function os() {
      return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
          ? 'mobile'
          : 'pc';
  }
  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
      return toS.call(val) === '[object Array]';
  }
  function isObject(val) {
      return toS.call(val) === '[object Object]';
  }
  function isobject(val) {
      const v = toS.call(val);
      return v === '[object Array]' || v === '[object Object]';
  }
  function deepCopy(data) {
      const t = !isArray(data) ? isObject(data) ? 'object' : 'other' : 'array';
      let o;
      if (t === 'array') {
          o = [];
      }
      else if (t === 'object') {
          o = {};
      }
      else {
          return data;
      }
      if (t === 'array') {
          for (let i = 0; i < data.length; i++) {
              o.push(deepCopy(data[i]));
          }
      }
      else if (t === 'object') {
          for (const i in data) {
              o[i] = deepCopy(data[i]);
          }
      }
      return o;
  }

  function log(errorType, msgTitle, msgContent = null) {
      console[errorType](msgTitle, msgContent || '');
  }

  const _os = os();
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
      };
  function preventEvent(event) {
      event.preventDefault();
  }
  function bindEvent(target, eventName, cb) {
      target.addEventListener(eventMap[eventName], cb, { passive: false });
  }
  function unbindEvent(target, eventName, cb) {
      target.removeEventListener(eventMap[eventName], cb);
  }

  const globleConfig = {
      el: null,
      wrap: null,
      type: 'position',
      useHtmlDrop: false,
      noConsole: false,
      activeClass: 'boshen_active_drop',
      unit: 'px',
      hook: {
          // life hook
          dropStart: (target) => {
              if (!target.config.noConsole)
                  console.log('drop:start');
          },
          dropMove: (target) => {
              if (!target.config.noConsole)
                  console.log('drop:move');
          },
          dropEnd: (target) => {
              if (!target.config.noConsole)
                  console.log('drop:end');
          },
          // other hook
          rightClick: (target) => {
              if (!target.config.noConsole)
                  console.log('right:click');
          }
      }
  };
  class DropManger {
      _os = os();
      dropState = 'unstart';
      config = deepCopy(globleConfig);
      activePosition = {
          mouse: {
              x: 0,
              y: 0
          },
          dom: {
              offX: 0,
              offY: 0,
              width: 0,
              height: 0
          }
      };
      bindEvent = {
          start: this.dragStart.bind(this),
          move: this.dragMove.bind(this),
          end: this.dragEnd.bind(this)
      };
      constructor(options) {
          this._init(options);
      }
      _init(opt) {
          this.margeConfig(this.config, opt);
          if (!opt.el && !this.config.noConsole)
              log('error', 'Please pass in the moving object');
          bindEvent(this.config.el || window, 'start', this.bindEvent.start);
      }
      // --------life style-------
      destory() {
          if (this.dropState !== 'unstart') {
              unbindEvent(this.config.el || window, 'start', this.bindEvent.start);
          }
      }
      // --------methods----------
      dragStart(e) {
          preventEvent(e);
          const event = this.changeEvent(e);
          if (event.button && event.button === 2) {
              this.config.hook.rightClick(this, event);
              return;
          }
          bindEvent(window, 'move', this.bindEvent.move);
          bindEvent(window, 'end', this.bindEvent.end);
          this.dropState = 'start';
          this.activePosition.mouse = {
              x: event.x,
              y: event.y
          };
          this.activePosition.dom = this.getPosition(this.config.el, this.config.wrap);
          this.config.el.classList.add(this.config.activeClass);
          const style = this.config.el.style;
          if (this.config.type === 'position') {
              if (!style.position) {
                  this.config.el.style.position = 'absolute';
              }
          }
          else {
              if (!style.transform) {
                  this.config.el.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
              }
          }
          this.config.hook.dropStart(this, e);
      }
      dragMove(e) {
          preventEvent(e);
          const event = this.changeEvent(e);
          // 要不要做防抖呢？（先不做吧）
          let x = event.x - this.activePosition.mouse.x;
          let y = event.y - this.activePosition.mouse.y;
          const style = this.config.el.style;
          if (this.config.type === 'position') {
              x += this.activePosition.dom.offX;
              y += this.activePosition.dom.offY;
              style.left = this.converUnit(x);
              style.top = this.converUnit(y);
          }
          else {
              // style.transform = `translate(${this.converUnit(x)}, ${this.converUnit(y)})`
              // matrix(1, 0, 0, 1, x, y)
              const matrixArr = style.transform.slice(7, -1).split(',');
              style.transform = `matrix(1, 0, 0, 1, ${Number(matrixArr[4]) + x}, ${Number(matrixArr[5]) + y})`;
              this.activePosition.mouse = {
                  x: event.x,
                  y: event.y
              };
          }
          this.dropState = 'move';
          this.config.hook.dropMove(this, e);
      }
      dragEnd(e) {
          preventEvent(e);
          // const event = this.changeEvent(e)
          unbindEvent(window, 'move', this.bindEvent.move);
          unbindEvent(window, 'end', this.bindEvent.end);
          this.dropState = 'end';
          this.config.el.classList.remove(this.config.activeClass);
          this.config.hook.dropEnd(this, e);
      }
      // --------untils-----------
      getPosition(el, wrapEl) {
          // 要不要做宽度高度最小值限定呢？（太小了不好点）
          const eV = el.getBoundingClientRect();
          const wV = wrapEl
              ? wrapEl.getBoundingClientRect()
              : {
                  x: 0,
                  y: 0,
                  width: 0,
                  height: 0
              };
          return {
              offX: eV.x - wV.x,
              offY: eV.y - wV.y,
              width: eV.width,
              height: eV.height
          };
      }
      // 默认认为 target 与 options 为相同数据结构
      margeConfig(target, options) {
          const isO = isObject(target);
          const arr = isO ? Object.keys(target) : target;
          arr.forEach((k) => {
              isobject(isO ? target[k] : k)
                  ? this.margeConfig(target[k], options[k])
                  : options[k] && (target[k] = options[k]);
          });
      }
      converUnit(value, type = this.config.unit) {
          // 换算单位
          return value + type;
      }
      changeEvent(event) {
          // event.changedTouches
          return this._os !== 'mobile'
              ? event
              : {
                  x: event.changedTouches[0].clientX,
                  y: event.changedTouches[0].clientY
              };
      }
  }

  return DropManger;

}));
