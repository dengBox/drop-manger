import pkg from '../package.json'

describe('antd dist files', () => {
  it('should have data-manger.version', () => {
    const antd = require('../docs/index')
    expect(antd.version).toBe(pkg.version)
  })
})
