const App = {
  template: `
    <div id="wrap">
      <div id="dropEl"><div>
    </div>
  `,
  data () {
    return {
    }
  },
  mounted () {
    const drop = new window.DropManger({
      el: document.querySelector('#dropEl')
    })
  },
  methods: {
  }
}

new window.Vue({
  render: (h) => h(App)
}).$mount('#app')
