<template>
  <div id="wrap">
    <div class="dropEl"></div>
    <div class="dropEl"></div>
    <div class="dropEl"></div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    // document.oncontextmenu=function(event) {
    //   event.preventDefault()
    // }
    // document.onmousedown = function (event) {
    //   if (window.Event) {
    //     if (event.which == 2 || event.which == 3)
    //     return false;
    //   } else if (event.button == 2 || event.button == 3) {
    //     event.cancelBubble = true
    //     event.returnvalue = false
    //     return false
    //  }
    // }
    const wrap = document.querySelector('#wrap')
    for (const el of document.querySelectorAll('.dropEl')) {
      // eslint-disable-next-line no-new
      new window.DropManger({
        el,
        wrap,
        type: 'transform'
      })
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
#wrap {
  height: 600px;
  margin: 10px;
  box-shadow: 0 0 10px #eee;
  position: relative;
  .dropEl {
    width: 100px;
    height: 100px;
    background-color:  #faa;
    cursor: pointer;
    // position: absolute;
    &.dropEl:nth-child(2) {
      // left: 110px;
      background-color: #afa;
    }
    &.dropEl:nth-child(3) {
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
