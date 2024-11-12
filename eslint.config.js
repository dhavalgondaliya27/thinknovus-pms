const builtinModules = require('module').builtinModules;
const nodePlugin = require('eslint-plugin-node');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.env',
      '/package-lock.json',
      '.github',
      '/.idea',
      'kube',
      '.gitignore',
      '/public',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: (() => {
        const globals = {};
        builtinModules.forEach((mod) => {
          globals[mod] = 'readonly';
        });
        globals.process = 'readonly';
        return globals;
      })(),
    },
    rules: {
      // 'no-console': 'warn',
      'no-unused-vars': 'error',
      'no-empty': 'error',
      'no-undef': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      // 'linebreak-style': ['error', 'unix'],
      // Node.js Specific Rules
      'node/no-missing-import': 'error',
      'node/process-exit-as-throw': 'error',
      // Best Practices
      complexity: ['warn', 10],
      'max-depth': ['warn', 4],
      'max-lines': ['warn', 100],
      'max-nested-callbacks': ['warn', 4],
      'max-params': ['warn', 4],
      // 'max-statements': ['warn', 10],
      // 'no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'warn',
      // Potential Errors
      'no-unsafe-negation': 'error',
    },
  },
  {
    plugins: {
      node: nodePlugin,
    },
  },
];
