<template>
  <Layout class="wrap">
    <Sider>
      <router-link to="/preview">preview</router-link>
      <br />
    </Sider>
    <Content class="right-content">
      <router-view />
    </Content>
  </Layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Common',
  data () {
    return {
    }
  },
  components: {
    // ShLeftMenu
  },
  computed: {
    ...mapState({
      // tabList: ({ tabList }) => tabList,
    })
  },
  watch: {
  },
  methods: {
    ...mapMutations(['']),
    ...mapActions(['']),
    loginOut () {}
  }
}
</script>
<style scoped lang="scss">
.wrap{
  height: 100%;
  ::v-deep .ivu-layout-sider-children {
    padding: 10px;
  }
  background: #000;
}
</style>
