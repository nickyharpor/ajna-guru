const config = {
  multipass: true,
  js2svg: {
    eol: 'crlf',
    finalNewline: true
  },
  plugins: [
    { name: 'preset-default' },
    { name: 'convertStyleToAttrs' },
    { name: 'removeViewBox' },
    { name: 'removeDimensions' },
    { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } }
  ]
}

module.exports = config
