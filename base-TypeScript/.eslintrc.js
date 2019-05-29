module.exports = {
  // 由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，
  // 故我们需要安装 typescript-eslint-parser，替代掉默认的解析器
  parser: 'typescript-eslint-parser',
  plugins: [
    // 由于 typescript-eslint-parser 对一部分 ESLint 规则支持性不好，
    // 故我们需要安装 eslint-plugin-typescript，弥补一些支持性不好的规则。
    'typescript',
  ],
  extends: [
    // 使用 AlloyTeam ESLint 规则中的 TypeScript 版本，它已经为我们提供了一套完善的配置规则。
    'eslint-config-alloy/react',
    'eslint-config-alloy/typescript',
  ],
  rules: {
    // 缩进使用2个空格
    "indent": ["error", 2],
    '@typescript-eslint/indent': ['error', 2],
  }
}