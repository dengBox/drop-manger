
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

  var css_248z = "body{background-color:#000}#wrap{width:1000px;height:800px;margin:10px auto;-webkit-box-shadow:0 0 10px #eee;box-shadow:0 0 10px #eee;position:relative}#wrap .dropEl{width:100px;height:100px;border:1px solid red;cursor:pointer;position:relative}#wrap .dropEl.dropEl:nth-child(2){border-color:#0f0}#wrap .dropEl.dropEl:nth-child(3){border-color:#00f}#wrap .boshen_active_drop{-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s;-webkit-box-shadow:0 0 10px #0ff;box-shadow:0 0 10px #0ff}";
  styleInject(css_248z);

  // if (process.env.NODE_ENV === 'production') {
  //   import('../public/scss/index.scss').then(res => {
  //     console.log('加载文档样式')
  //   })
  // }
  const globleConfig = {
      el: null,
      wrap: null,
      type: 'position',
      useHtmlDrop: false,
      activeClass: 'boshen_active_drop',
      unit: 'px',
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
  class DropNode {
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
          preventEvent(event);
          event = this.changeEvent(event);
          if (event.button && event.button === 2) {
              console.log('click-right');
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
          this.config.hook.dropStart();
      }
      dragMove(event) {
          preventEvent(event);
          event = this.changeEvent(event);
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
          this.config.hook.dropMove();
      }
      dragEnd(event) {
          preventEvent(event);
          event = this.changeEvent(event);
          unbindEvent(window, 'move', this.bindEvent.move);
          unbindEvent(window, 'end', this.bindEvent.end);
          this.dropState = 'end';
          this.config.el.classList.remove(this.config.activeClass);
          this.config.hook.dropEnd();
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
          const arr = isObject(target) ? Object.keys(target) : target;
          arr.forEach((k) => {
              // 深度合并
              isobject(k)
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
  class DropManger {
      nodeList = [];
      createNode(options) {
          const node = new DropNode(options);
          // 在新建节点时监听该节点 start 事件，用以控制 node 顺序
          bindEvent(node.config.el || window, 'start', () => {
              this.sortList(node);
              this.setNodeZIndex();
          });
          this.nodeList.push(node);
      }
      /**
       * 对 nodeList 进行排序
       * @param node 当前用户所选择节点，会将此节点移动至数组最后端
       */
      sortList(node) {
          const index = this.nodeList.indexOf(node);
          this.nodeList.splice(index, 1);
          this.nodeList.push(node);
      }
      // 设置节点 zIndex 来控制节点层叠顺序
      setNodeZIndex() {
          this.nodeList.forEach((item, index) => {
              item.config.el.style.zIndex = index * 10 + 1;
          });
      }
  }

  return DropManger;

}));
