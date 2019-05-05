module.exports = {
  plugins: [['relay', { artifactDirectory: './tests/__generated__' }]],
  presets: ['@babel/preset-env', '@babel/preset-flow'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  }
};
