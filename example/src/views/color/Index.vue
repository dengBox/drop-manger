<template>
  <div class="page">
    <Form class="top-form" :model="formModel" inline :label-width="120">
      <form-item prop="blendMode" label="选择混合模式：">
        <RadioGroup v-model="formModel.blendMode">
          <Radio label="mix-blend-mode">父元素叠加</Radio>
          <Radio label="background-blend-mode">仅本身叠加</Radio>
        </RadioGroup>
      </form-item>
      <form-item prop="modeAttr" label="选择混合属性：">
        <Select v-model="formModel.modeAttr" style="width:200px" @on-change="changeMode">
          <Option v-for="item in modeList" :value="item.value" :key="item.value" :label="item.label" />
        </Select>
        <Tooltip class="tips" :content="currentDes">
          <span class="tips-inner">属性描述：{{currentDes}}</span>
        </Tooltip>
      </form-item>
      <form-item prop="modeImg" label="选择混合图片：" v-if="!isSingle">
        <Select  v-model="formModel.modeImg" multiple style="width:500px">
          <Option v-for="item in imgMap" :value="item.label" :key="item.label" :label="item.label" />
        </Select>
      </form-item>
      <form-item prop="modeOffset" label="输入重叠距离：" v-if="!isSingle">
        <input-number :max="30" :min="10" v-model="formModel.modeOffset" />
      </form-item>
      <Button @click="toRender" style="float: right;" type="primary">绘制</Button>
    </Form>
    <div class="page-wrap">
      <div ref="wrap" :class="['wrap', {'wrap-single': isSingle }]">
        <template v-if="isSingle">
          <div class="inner inner-1" ref="result">
            1
            <div :style="innerStyle" class="inner inner-2">
              2
              <div :style="innerStyle" class="inner inner-3">3</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div :style="innerStyle" class="inner inner-4" ref="result"></div>
          <!-- <canvas id="canvas-wrap"></canvas> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * css 颜色叠加
 * 1. mix-blend-mode（与父元素颜色叠加）
 *    a: 父元素本身不能添加该属性，否则是白色
 *    b: 会根据父元素大小截断子元素的内容，相当于overflow: hidden;
 * 2. background-blend-mode（元素本身多颜色叠加）
 *    a: 需要计算背景图位置及叠加顺序
 *    b: 有些许色差
 *    c: 纯色叠加与AI软件叠加有较大差异（算法不一致）
 */

export default {
  name: 'TestColor',
  data () {
    return {
      formModel: {
        blendMode: 'mix-blend-mode',
        modeAttr: 'normal',
        modeImg: ['img-1', 'img-2', 'img-3'],
        modeOffset: 10
      },
      currentDes: '最终颜色永远是顶层颜色，无论底层颜色是什么。其效果类似于两张不透明的纸重叠（overlapping）在一起。',
      modeList: [
        // https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode
        {
          value: 'normal',
          label: '正常',
          description: '最终颜色永远是顶层颜色，无论底层颜色是什么。其效果类似于两张不透明的纸重叠（overlapping）在一起。'
        },
        {
          value: 'multiply',
          label: 'multiply',
          description: '最终颜色为顶层颜色与底层颜色相乘的结果。如果叠加黑色层，则最终层必为黑色层，叠加白色层不会造成变化。其效果类似于在透明薄膜上重叠印刷的两个图像。'
        },
        {
          value: 'screen',
          label: 'screen',
          description: '最终的颜色是反转顶层颜色和底层颜色，将反转后的两个颜色相乘，再反转相加得到的和得到的结果。黑色层不会造成变化，白色层导致白色最终层。其效果类似于（被投影仪）投射到投影屏幕上的两个图像。'
        },
        {
          value: 'overlay',
          label: 'overlay',
          description: '如果底层颜色比顶层颜色深，则最终颜色是 multiply 的结果，如果底层颜色比顶层颜色浅，则最终颜色是 screen 的结果。此混合模式相当于顶层与底层互换后的 hard-light。'
        },
        {
          value: 'darken',
          label: 'darken',
          description: '最终颜色是由每个颜色通道下，顶底两层颜色中的最暗值所组成的颜色。'
        },
        {
          value: 'lighten',
          label: 'lighten',
          description: '最终颜色是每个颜色通道下，顶底两层颜色中的最亮值所组成的颜色。'
        },
        {
          value: 'color-dodge',
          label: 'color-dodge',
          description: '最终颜色是将底部颜色除以顶部颜色的反色的结果。黑色前景不会造成变化。前景如果是背景的反色，会得到白色（fully lit color，完全亮起的颜色，应当为白色）。此混合模式类似于 screen，但是，前景只需要和背景的反色一样亮，最终图像就会变为全白。'
        },
        {
          value: 'color-burn',
          label: 'color-burn',
          description: '最终颜色是反转底部颜色，将反转后的值除以顶部颜色，再反转除以后的值得到的结果。白色的前景不会导致变化，前景如果是背景的反色，会得到黑色。此混合模式类似于 multiply，但是，前景只需要和背景的反色一样暗，最终图像就会变为全黑。'
        },
        {
          value: 'hard-light',
          label: 'hard-light',
          description: '如果顶层颜色比底层颜色深，则最终颜色是 multiply 的结果，如果顶层颜色比底层颜色浅，则最终颜色是 screen 的结果。此混合模式相当于顶层与底层互换后的 overlay。其效果类似于在背景层上（用前景层）打出一片刺眼的聚光灯。'
        },
        {
          value: 'soft-light',
          label: 'soft-light',
          description: '最终颜色类似于 hard-light 的结果，但更加柔和一些。此混合模式的表现类似 hard-light。其效果类似于在背景层上（用前景层）打出一片发散的聚光灯。'
        },
        {
          value: 'difference',
          label: 'difference',
          description: '最终颜色是 两种颜色中较浅的颜色 减去 两种颜色中较深的颜色 得到的结果。黑色层不会造成变化，而白色层会反转另一层的颜色。'
        },
        {
          value: 'exclusion',
          label: 'exclusion',
          description: '最终颜色类似于 difference，但对比度更低一些。和 difference 相同，黑色层不会造成变化，而而白色层会反转另一层的颜色。'
        },
        {
          value: 'hue',
          label: 'hue',
          description: '最终颜色由顶部颜色的色调和底部颜色的饱和度与亮度组成。'
        },
        {
          value: 'saturation',
          label: 'saturation',
          description: '最终颜色由顶部颜色的色调和底部颜色的饱和度与发光度组成。饱和度为零的纯灰色背景层不会造成变化。'
        },
        {
          value: 'color',
          label: 'color',
          description: '最终颜色由顶部颜色的色调与饱和度和底部颜色的亮度组成。此效果保留了灰度级别，可用于为前景着色。（The effect preserves gray levels and can be used to colorize the foreground.）'
        },
        {
          value: 'luminosity',
          label: 'luminosity',
          description: '最终颜色由顶部颜色的亮度和底部颜色的色调和饱和度组成。此混合模式相当于顶层与底层互换后的 color。'
        }
      ],
      imgMap: [
        {
          value: require('@/assets/images/img-1.png'),
          label: 'img-1'
        },
        {
          value: require('@/assets/images/img-2.png'),
          label: 'img-2'
        },
        {
          value: require('@/assets/images/img-3.png'),
          label: 'img-3'
        },
        {
          value: require('@/assets/images/img-4.png'),
          label: 'img-4'
        },
        {
          value: require('@/assets/images/img-5.png'),
          label: 'img-5'
        },
        {
          value: require('@/assets/images/img-6.png'),
          label: 'img-6'
        },
        {
          value: require('@/assets/images/img-7.png'),
          label: 'img-7'
        },
        {
          value: require('@/assets/images/img-8.png'),
          label: 'img-8'
        }
      ]
    }
  },
  computed: {
    isSingle () {
      return this.formModel.blendMode === 'mix-blend-mode'
    },
    innerStyle () {
      return this.isSingle
        ? {
          'mix-blend-mode': this.formModel.modeAttr
        }
        : {
          'height': this.formModel.modeImg.length * 60 + 'px',
          'background-blend-mode': this.formModel.modeAttr,
          'background-position': this.formModel.modeImg.map((item, i) => `0px ${i * (60 - this.formModel.modeOffset)}px`).toString(),
          'background-image': this.imgMap.filter(img => this.formModel.modeImg.find(m => img.label === m)).map(i => `url(${i.value})`).toString()
        }
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    changeMode (mode) {
      this.currentDes = this.modeList.find(m => m.value === mode)?.description || ''
    },
    toRender () {
      console.log(this.$refs.result)
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
    .tips {
      margin-left: 10px;
      color: #f4a460;
      font-size: 12px;
      cursor: pointer;
      &-inner {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 200px;
        white-space: nowrap;
        line-height: 1;
      }
      ::v-deep .ivu-tooltip-inner {
        max-width: none;
      }
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    &-single {
      .inner {
        position: absolute;
        height: 200px;
      }
    }
    .inner {
      width: 380px;
      &-1 {
        background-color: #009944;
      }
      &-2 {
        top: 50px;
        background-color: #E60012;
      }
      &-3 {
        top: 100px;
        background-color: #7F1084;
      }
      &-4 {
        border: 1px solid #ddd;
        // background-image:
        // url('../../assets/images/img-3.png'),
        // url('../../assets/images/img-2.png'),
        // url('../../assets/images/img-1.png');
        // background-position: 0px 0px, 0px 50px, 0px 100px;
        background-repeat: no-repeat;
      }
    }
    #canvas-wrap {
      margin-left: 10px;
      border: 1px solid #ddd;
    }
  }
}
</style>
