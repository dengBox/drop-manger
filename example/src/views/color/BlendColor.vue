<template>
  <div class="page">
    <Form class="top-form" :model="formModel" inline :label-width="120">
      <form-item prop="selectMode" label="选择混合模式：">
        <Select  v-model="formModel.selectMode" style="width:200px">
          <Option v-for="item in blendModes" :value="item.value" :key="item.value" :label="item.label" />
        </Select>
      </form-item>
      <form-item prop="selectMode" label="选择混合材质：">
        <Select  v-model="formModel.selectMaterial" style="width:200px">
          <Option v-for="item in blendMaterial" :value="item.value" :key="item.value" :label="item.label" />
        </Select>
      </form-item>
      <form-item prop="selectColor" label="选择混合颜色：">
        <Select  v-model="formModel.selectColor" style="width:200px">
          <Option v-for="item in blendColors" :value="item.value" :key="item.value">
            <span class="color-item" :style="{ backgroundColor: item.value}"></span>
            {{item.label}}
          </Option>
        </Select>
      </form-item>
      <Button @click="toRender" style="float: right;" type="primary">绘制</Button>
    </Form>
    <div class="page-wrap">
      <div class="init-warp">
        原图
        <img :src="img.url" alt="" v-for="img in blendData" :key="img.key">
      </div>
      <div ref="canvasWrap" id="content">
      </div>
    </div>
  </div>
</template>

<script>

import BlendColor from '@/assets/js/blendColor'

export default {
  name: 'BlendColor',
  data () {
    return {
      formModel: {
        selectMode: 'toMax',
        selectMaterial: 'corrugatedPaper',
        selectColor: '#f00'
      },
      blendModes: [
        {
          value: 'toMax',
          label: '取最大值'
        },
        {
          value: 'toMean',
          label: '取平均值'
        }
      ],
      blendMaterial: [
        {
          value: 'corrugatedPaper',
          label: '瓦楞纸',
          img: require('@/assets/images/corrugated-paper.jpeg')
        }
      ],
      blendColors: [
        {
          value: '#f00',
          label: '红色',
          img: require('@/assets/images/FF0000_300px_300px.png')
        },
        {
          value: '#0f0',
          label: '绿色',
          img: require('@/assets/images/00FF00_300px_300px.png')
        },
        {
          value: '#00f',
          label: '蓝色',
          img: require('@/assets/images/0000FF_300px_300px.png')
        },
        {
          value: '#fff',
          label: '白色',
          img: require('@/assets/images/FFFFFF_300px_300px.png')
        }
      ],
      blendTool: null
    }
  },
  computed: {
    blendData () {
      return [
        {
          key: 1,
          width: 128, // 128
          height: 128,
          x: 0, // 86
          y: 0,
          url: this.blendMaterial.find(m => m.value === this.formModel.selectMaterial)?.img
        },
        {
          key: 2,
          width: 300,
          height: 300,
          x: 0,
          y: 0,
          url: this.blendColors.find(m => m.value === this.formModel.selectColor)?.img
        }
      ]
    }
  },
  mounted () {
    this.blendTool = new BlendColor({
      el: this.$refs.canvasWrap,
      blendData: this.blendData
    })
    // this.blendTool.draw(this.formModel.selectMode)
    //   .then(() => {
    //     console.log('draw success')
    //   })
    //   .catch(err => {
    //     console.log('draw error', err)
    //   })
  },
  destroyed () {
    this.blendTool._destroy()
  },
  methods: {
    toRender () {
      this.blendTool._init({
        el: this.$refs.canvasWrap,
        blendData: this.blendData
      })
      this.blendTool.draw(this.formModel.selectMode)
        .then(() => {
          console.log('draw success')
        })
        .catch(err => {
          console.log('draw error', err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  .top-form {
    padding: 10px 0 0 0;
    ::v-deep .ivu-form-item-label {
      color: #fff;
    }
    .color-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
  .page-wrap {
    .init-warp {
      margin-right: 20px;
      border: 1px solid #ccc;
      overflow: auto;
      img {
        display: block;
      }
    }
    #content {
      width: 300px;
      height: 300px;
    }
  }
}
</style>

<style>
canvas {
  box-sizing: content-box;
  border: 1px solid #ccc;
}
</style>
