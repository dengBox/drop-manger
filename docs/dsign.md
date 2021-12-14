## 状态管理器

### 全量存储数据

1. 数据深拷贝
2. 数据量大

### 增量纪录

1. 纪录每次更新的 action、data（data 是增量的）

### example

```javascript
// 更新队列
const stack = [];
// 当前撤回的游标
const nowIndex = stack[stack.length - 1];

// 需要更新的状态
const globalData = {
  data: 1,
  name: "张三",
};

// 执行数据变更
globalData.data += 1;

// stack增加
stack = [
  [
    // 更新数据不止一个
    {
      action: "/data", // 类型与编辑器应用场景强相关，此处只做示例使用
      data: 2,
    },
  ],
];

// 执行撤回(stack的最后一步重做)
nowIndex - 1;

stack[nowIndex].forEach((change) => {
  globalData[change] = change.data;
});

// 执行重做(stack的最后一步重做)

nowIndex + 1;

stack[nowIndex].forEach((change) => {
  globalData[change] = change.data;
});
```
