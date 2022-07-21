module.exports = {
  root: true,
  plugins: ['react-native', 'filename-rules'],
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  rules: {
    indent: ["error", 2, { "SwitchCase": 1 }],
    'prettier/prettier': 0,
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    curly: ['error', 'multi-line'],
    semi: ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-unneeded-ternary': 'error',
    'no-nested-ternary': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react-native/no-unused-styles': 2,
    'no-param-reassign': 'error',
    'no-single-element-style-arrays': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['arrowFunctions'] }],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'filename-rules/match': [2, { '.tsx': 'pascalcase', '.ts': 'pascalcase' }]
  },
};
