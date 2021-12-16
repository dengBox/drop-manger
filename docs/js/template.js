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
      dropManage: null
    }
  },
  mounted () {
    const wrap = document.querySelector('#wrap')
    this.dropManage = new window.DropManger()
    for (const el of document.querySelectorAll('.dropEl')) {
        this.dropManage.createNode({
          el,
          wrap,
          type: 'transform'
        })
    }
  },
  methods: {
  }
}

new window.Vue({
  render: (h) => h(App)
}).$mount('#app')
