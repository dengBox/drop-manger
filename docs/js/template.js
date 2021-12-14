const App = {
  template: `
    <div>app</div>
  `,
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}

new window.Vue({
  render: (h) => h(App)
}).$mount('#app')
