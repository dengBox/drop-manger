<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
    })
  },
  mounted () {
  },
  methods: {
    ...mapMutations([''])
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
}
#nprogress {
  .bar {
    background: red !important;
  }
}
</style>
