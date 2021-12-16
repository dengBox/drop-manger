const { dependencies } = require('./package')

function getNpmVersion (name, modules = dependencies) {
  // 目前仅考虑^1.2.3 | ~1.2.3
  return modules[name].replace(/[^~x]/, '')
}

let hostname = ''
switch (process.env.NODE_ENV) {
  case 'production':
    hostname = 'qiniu'
    break
  case 'test':
    hostname = 'testqiniu'
    break
  default:
    hostname = 'testqiniu'
}

const privateAssets = {
  css: [
    // `https://${hostname}.xxx.com/xxx-ui/${getNpmVersion('xxx-ui')}/index.css`,
    // `https://${hostname}.xxx.com/xxx-business-ui/${getNpmVersion('xxx-business-ui')}/index.css`
  ],
  js: [
    // `https://${hostname}.xxx.com/xxx-ui/${getNpmVersion('xxx-ui')}/index.umd.min.js`,
    // `https://${hostname}.xxx.com/xxx-business-ui/${getNpmVersion('xxx-business-ui')}/index.umd.min.js`
  ]
}
module.exports = privateAssets