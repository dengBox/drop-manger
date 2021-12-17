<template>
  <div id="wrap" ref="wrap">
    <div :class="['dropEl', `dropEl-${item}`]" v-for="item in itemList" :key="item"></div>
    <mouse-menu ref="mouseMenu" v-show="showMenu" :z-index="zIndex" @on-change-zindex="changeIndex" />
  </div>
</template>

<script>
import MouseMenu from '@/components/MouseMenu.vue'

let currentEl = null

export default {
  name: '',
  components: {
    MouseMenu
  },
  data () {
    return {
      showMenu: false,
      itemList: [
        1, 2, 3
      ],
      zIndex: 0
    }
  },
  mounted () {
    this.$refs.wrap.addEventListener('contextmenu', this.prevent)
    this.$refs.wrap.addEventListener('click', this.hideMenu)
    const wrap = document.querySelector('#wrap')
    this.init(wrap)
  },
  beforeDestroy () {
    this.$refs.wrap.removeEventListener('contextmenu', this.prevent)
    this.$refs.wrap.removeEventListener('click', this.hideMenu)
  },
  methods: {
    prevent (event) {
      event.preventDefault()
    },
    init (wrap) {
      for (const el of document.querySelectorAll('.dropEl')) {
      // eslint-disable-next-line no-new
        new window.DropManger({
          el,
          wrap,
          type: 'transform',
          hook: {
            rightClick: (manger, event) => {
              currentEl = manger.config.el
              this.zIndex = Number(currentEl.style.zIndex) || 0
              const menuStyle = this.$refs.mouseMenu.$el.style
              /**
               * 1. 要做阈值判断，临近边界需要重新计算位置
               * 2. pageX包含滚动条, clientX不包含滚动条
               */
              menuStyle.top = event.clientY + 4 + 'px'
              menuStyle.left = event.clientX + 4 + 'px'
              this.$nextTick(() => {
                this.showMenu = true
              })
            }
          }
        })
      }
    },
    changeIndex (index) {
      /**
       * 改变层级
       * 1. 改变position的z-index
       * 2. 改变dom顺序(最后渲染在最上层，需更改所有dom 3D属性)
       *    a. 修改itemList，让vue重新渲染
       *    b. 手动操作dom
       */
      if (!currentEl) console.error('currentEl is empty')
      if (typeof index === 'number') {
        currentEl.style.zIndex = index
        this.zIndex = index
      } else {
        currentEl.style.zIndex = 11
      }
      // this.$refs.wrap.appendChild(currentEl)
    },
    hideMenu () {
      this.showMenu = false
    }
  }
}
</script>

<style scoped lang="scss">
#wrap {
  height: 600px;
  box-shadow: 0 0 10px #eee;
  // position: relative;
  .dropEl {
    width: 100px;
    height: 100px;
    background-color:  #faa;
    cursor: pointer;
    position: relative;
    &-2 {
      // left: 110px;
      background-color: #afa;
    }
    &-3 {
      // left: 220px;
      background-color: #aaf;
    }
  }
  .boshen_active_drop {
    transition: box-shadow .3s;
    box-shadow: 0 0 10px #0ff;
  }
}
</style>
