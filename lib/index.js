
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
  function isObject(val) {
      return toS.call(val) === '[object object]';
  }
  function isobject(val) {
      return typeof val;
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
      target.addEventListener(eventMap[eventName], cb);
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

  var css_248z = "body{background-color:#000}";
  styleInject(css_248z);

  // if (process.env.NODE_ENV === 'production') {
  //   import('../public/scss/index.scss').then(res => {
  //     console.log('加载文档样式')
  //   })
  // }
  const defaultConfig = {
      el: null,
      type: 'position',
      useHtmlDrop: false,
      hook: {}
  };
  class DropManger {
      dropState = 'unstart';
      constructor(options) {
          this._init(options);
      }
      _init(opt) {
          if (!opt.el)
              log('error', 'Please pass in the moving object');
          this.margeConfig(opt, defaultConfig);
          bindEvent(defaultConfig.el || window, 'start', this.startStart);
          bindEvent(defaultConfig.el || window, 'move', this.startMove);
          bindEvent(defaultConfig.el || window, 'end', this.startEnd);
      }
      // --------life style-------
      destory() {
          if (this.dropState !== 'unstart') {
              unbindEvent(defaultConfig.el || window, 'start', this.startStart);
              unbindEvent(defaultConfig.el || window, 'move', this.startMove);
              unbindEvent(defaultConfig.el || window, 'end', this.startEnd);
          }
      }
      // --------methods----------
      startStart() {
          this.dropState = 'start';
      }
      startMove() {
          this.dropState = 'move';
      }
      startEnd() {
          this.dropState = 'end';
      }
      // --------untils-----------
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
