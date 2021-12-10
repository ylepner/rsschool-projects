module.exports = {
  extends: ['airbnb'],
  env: {
    jest: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'no-undef': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    "import/prefer-default-export": 0,
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "class-methods-use-this": 0,
    "react/prop-types": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
  },
}