<template>
  <div>
    <ul class="menu">
      <li class="menu-item" v-for="m in menu" :key="m.path">
        <router-link :to="m.path">{{m.title}}</router-link>
        <p class="item-desc">{{m.description}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menu: [
        {
          path: '/editor',
          title: '设计器',
          description: '2D设计器'
        },
        {
          path: '/docs',
          title: '文档中心',
          description: '详细的文档说明'
        },
        {
          path: '/test',
          title: '测试页面',
          description: '一些测试页面'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.router-wrap{
  height: 100%;
  ::v-deep .ivu-layout-sider-children {
    padding: 10px;
  }
}
</style>
