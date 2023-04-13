/** @type {import("prettier").Config} */
const config = {
  plugins: ['@ianvs/prettier-plugin-sort-imports', "prettier-plugin-tailwindcss"],
  // arrowParens: 'always',
  // printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  // semi: false,
  // trailingComma: 'all',
  // useTabs: false,
  // tabWidth: 2,
//  tailwindConfig: './packages/tailwind',
//  importOrder: [
//   '^(preact/(.*)$)|^(preact$)',
//   '<THIRD_PARTY_MODULES>',
//   '',
//   '^@iidentifii/(.*)$',
//   '',
//   '^~/utils/(.*)$',
//   '^~/components/(.*)$',
//   '^~/styles/(.*)$',
//   '^~/(.*)$',
//   '^[./]',
//  ],
//  importOrderSeparation: false,
//  importOrderSortSpecifiers: true,
//  importOrderBuiltinModulesToTop: true,
//  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
//  importOrderMergeDuplicateImports: true,
//  importOrderCombineTypeAndValueImports: true,
};

module.exports = config;
