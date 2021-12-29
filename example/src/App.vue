<template>
  <div id="app">
    <app-header />
    <router-view class="router-wrap" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #333;
}
#nprogress {
  .bar {
    background-color: red !important;
  }
}
</style>
