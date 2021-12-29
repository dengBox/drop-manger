!<template>
  <div class="page">
    <Form class="top-form" :model="formModel" inline :label-width="120">
      <form-item prop="selectColor" label="输入宽度：">
        <input-number :max="9999" :min="1" v-model="formModel.colorWidth" />
      </form-item>
      <form-item prop="selectColor" label="输入高度：">
        <input-number :max="9999" :min="1" v-model="formModel.colorHeight" />
      </form-item>
      <form-item prop="selectColor" label="选择颜色：">
        <ColorPicker v-model="formModel.selectColor" />
      </form-item>
      <Button @click="toRender" style="float: right;" type="primary">保存</Button>
    </Form>
    <div class="page-wrap">
      <canvas ref="content"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateImg',
  data () {
    return {
      formModel: {
        colorWidth: 300,
        colorHeight: 300,
        selectColor: '#FF0000'
      }
    }
  },
  methods: {
    toRender () {
      const { colorWidth: w, colorHeight: h, selectColor: color } = this.formModel
      const c = this.renderImg(w, h, this.formModel.selectColor)
      c.style.display = 'block'
      const elink = document.createElement('a')
      elink.download = `${color}_${w}px_${h}px`
      elink.style.display = 'none'
      elink.href = c.toDataURL() // URL.createObjectURL(c.toBlob()) && URL.revokeObjectURL(elink.href)
      document.body.appendChild(elink)
      elink.click()
    },
    renderImg (w, h, color, x = 0, y = 0) {
      const c = this.$refs.content
      c.width = w
      c.height = h
      const ctx = c.getContext('2d') // getContext('webgl')
      ctx.fillStyle = color
      ctx.fillRect(x, y, w, h)
      return c
    }
  }
}
</script>

<style scoped lang="scss">
.page-wrap {
  canvas {
    box-sizing: content-box;
    border: 1px solid #ccc;
    display: none;
  }
}
</style>
