## rgb | cnmyk颜色叠加

### 背景

目前在编辑器中导入pdf会存在 C、M、Y、K完全分离图层的场景（印刷约定格式pdf）。
原有解析pdf值会解析元素本身含有的颜色，无法呈现叠加的效果。

### 思路

**2D**
1. 根据特有pdf文件，解析为svg-dom结构，根据特定DSL解析特定颜色与矩阵信息
2. 使用css background进行叠加
   1. 重叠区域涉及不规则图形计算
   2. ?!!
3. 调整叠加区域层级最高，遮挡到该区域形成叠加色

**3D**
1. 根据特有pdf文件，解析为svg-dom结构，根据特定DSL解析特定颜色与矩阵信息
   1. 重叠区域涉及不规则图形计算
   2. ?!!
2. 将矩阵与RGB相加 （k === A）
3. 使用计算后的blob进行canvas绘制

### 实现

**计算叠加区域**
example：A 叠加到 B, B既有父元素aWrap

1. 元素 A 进行了 x、y 位移 （matrix(1, 0, 0, 1, x, y)）
2. 根据 A 生成元素 C （含有A元素最后一次交互的矩阵信息）
3. 将元素 C 插入到 B 的父元素 aWrap 下，调整最高层级
4. aWrap设置overflow: hidden

**颜色转码**

1. CMYK_RGB
2. RGB_CMYK

**计算叠加色**

**叠加色实现**
1. css 颜色叠加
   1. mix-blend-mode（与父元素颜色叠加）
      a: 父元素本身不能添加该属性，否则是白色
      b: 会根据父元素大小截断子元素的内容，相当于overflow: hidden;
   2. background-blend-mode（元素本身多颜色叠加）
      a: 需要计算背景图位置及叠加顺序
      b: 有些许色差
      c: 纯色叠加与AI软件叠加有较大差异（算法不一致）
2. js 计算
   1. 获取A: width - height的区间
   2. 获取B: width - height的区间
   3. 取得重复区间，进行叠加获取点位信息（自定义叠加规则）  
      1. 潘通色叠加
      2. 不同色叠加
         1. 明到暗
         2. 暗到明
      3. 同色叠加
      4. 材质叠加
   4. 重组为一张图像（无关图形规则与否）

exapmle: A 叠加到 B
const designList = [
  {
    width: '100px',
    height: '100px',
    top: '0px',
    left: 0px
  },
  {
    width: '100px',
    height: '100px',
    top: '20px',
    left: 20px
  }
]

### issues

1. 性能
2. 
