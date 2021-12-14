module.exports = {
  // preset: 'ts-jest',
  testMatch: ['**/tests/**/*.[jt]s?(x)'],
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'test bxh-color-tool'
    }]
  ],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    '^.+\\.js$': 'babel-jest'
    // '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
