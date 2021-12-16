# drop-manger
2D editor drag tool

## development

1. yarn serve （启动库开发）
2. cd ./example && yarn serve （启动文档开发）

## design

本库需要完成以下目标
1. [ ] dom拖拽功能实现
2. [ ] 支持HTML5-drop
3. [ ] 拖拽与规则分离
4. [x] 纯js实现，无技术依赖

## issues
1. 含有滚动条场景

## usage

1. 默认拖拽元素是相对于父元素进行定位，也就是本身需要 position: absolute;
