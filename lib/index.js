
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
  function bindEvent(target, eventName, cb) {
      target.addEventListener(eventMap[eventName], cb);
  }
  function unbindEvent(target, eventName, cb) {
      target.removeEventListener(eventMap[eventName], cb);
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "body{background-color:#000}#wrap{width:1000px;height:800px;margin:10px auto;border:1px solid #0f0}#wrap #dropEl{width:100px;height:100px;border:1px solid #fff}";
  styleInject(css_248z);

  // if (process.env.NODE_ENV === 'production') {
  //   import('../public/scss/index.scss').then(res => {
  //     console.log('加载文档样式')
  //   })
  // }
  const globleConfig = {
      el: null,
      type: 'position',
      useHtmlDrop: false,
      activeClass: 'boshen_active_drop',
      hook: {
          dropStart: () => {
              console.log('drop:start');
          },
          dropMove: () => {
              console.log('drop:move');
          },
          dropEnd: () => {
              console.log('drop:end');
          }
      }
  };
  class DropManger {
      dropState = 'unstart';
      config = deepCopy(globleConfig);
      activePosition = {};
      bindEvent = {
          start: this.dragStart.bind(this),
          move: this.dragMove.bind(this),
          end: this.dragEnd.bind(this)
      };
      constructor(options) {
          this._init(options);
      }
      _init(opt) {
          if (!opt.el)
              log('error', 'Please pass in the moving object');
          this.margeConfig(this.config, opt);
          bindEvent(this.config.el || window, 'start', this.bindEvent.start);
      }
      // --------life style-------
      destory() {
          if (this.dropState !== 'unstart') {
              unbindEvent(this.config.el || window, 'start', this.bindEvent.start);
          }
      }
      // --------methods----------
      dragStart(event) {
          bindEvent(window, 'move', this.bindEvent.move);
          bindEvent(window, 'end', this.bindEvent.end);
          this.dropState = 'start';
          this.getPosition(this.config.el);
          this.config.el.classList.add(this.config.activeClass);
          this.config.hook.dropStart();
      }
      dragMove(event) {
          this.dropState = 'move';
          this.config.hook.dropMove();
      }
      dragEnd(event) {
          unbindEvent(window, 'move', this.bindEvent.move);
          unbindEvent(window, 'end', this.bindEvent.end);
          this.dropState = 'end';
          this.config.el.classList.remove(this.config.activeClass);
          this.config.hook.dropEnd();
      }
      // --------untils-----------
      getPosition(el) {
          console.log(el.getBoundingClientRect());
      }
      // 默认认为 target 与 options 为相同数据结构
      margeConfig(target, options) {
          const arr = isObject(target) ? Object.keys(target) : target;
          arr.forEach((k) => {
              // 深度合并
              isobject(k)
                  ? this.margeConfig(target[k], options[k])
                  : options[k] && (target[k] = options[k]);
          });
      }
  }

  return DropManger;

}));
