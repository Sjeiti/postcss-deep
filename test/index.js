const fs = require('fs').promises
const path = require('path')

const expect = require('expect')
const postcss = require('postcss')
const postcssDeep = require('../index.js')

describe('postcssDeep', function() {
  xit('should replace :host:pseudo-class to :host(:pseudo-class)', function() {
    const src = fs.readFileSync(path.join(__dirname, 'src/index.css'))
    const dist = fs.readFileSync(path.join(__dirname, 'dist/index.css'))

    const output = postcss()
      .use(postcssDeep())
      .process(src)
      .css

    expect(output).toEqual(dist.toString())
  })
  it('should process `[deep]` selectors', done => {
    Promise.all(['src', 'dist'].map(folder=>fs.readFile(path.join(__dirname, folder+'/index.css'))))
    .then(results=>results.map(result=>result.toString()))
    .then(([src, dist])=>{
      const output = postcss()
        .use(postcssDeep())
        .process(src)
        .css
      expect(output).toEqual(dist.toString())
      done()
    })
  })
})
