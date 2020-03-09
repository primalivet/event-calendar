module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard', 
    'standard-react',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: [
    'jsx-a11y',
    'react-hooks'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
