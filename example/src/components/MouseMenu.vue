<template>
  <ul class="mouse-menu-wrap">
    <li class="mouse-menu-item" @click="changeIndex">置顶</li>
    <li class="mouse-menu-item">层级
      <input-number :max="10" :min="0" :value="zIndex" @on-change="changeIndex" @click.native.stop />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MouseMenu',
  props: {
    zIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeIndex (index) {
      /**
       * 改变层级
       * 1. 限制最多10级
       * 2. 置顶为11级
       */
      this.$emit('on-change-zindex', index)
    }
  }
}
</script>

<style scoped lang="scss">
.mouse-menu-wrap {
  width: 180px;
  background: #fdd;
  position: fixed;
  padding: 10px;
  z-index: 999;
  border-radius: 4px;
  .mouse-menu-item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    transition: background-color .3s;
    &:hover {
      color: #000;
      background-color: #ddd;
    }
    &:first-child {
      border-top: 1px solid #eee;
    }
  }
}
</style>
