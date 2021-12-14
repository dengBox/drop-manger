const App = {
  template: `
    <div id="wrap">
      <div class="dropEl"></div>
      <div class="dropEl"></div>
      <div class="dropEl"></div>
    </div>
  `,
  data () {
    return {
    }
  },
  mounted () {
    const wrap = document.querySelector('#wrap')
    for (const el of document.querySelectorAll('.dropEl')) {
        new window.DropManger({
          el,
          wrap
        })
    }
  },
  methods: {
  }
}

new window.Vue({
  render: (h) => h(App)
}).$mount('#app')
