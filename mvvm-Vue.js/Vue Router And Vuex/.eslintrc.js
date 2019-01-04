
// http://eslint.cn/docs/user-guide/configuring

// ESLint 允许你指定你想要支持的 JavaScript 语言选项。
// 默认情况下，ESLint 支持 ECMAScript 5 语法。
// 你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。

// 请注意，对 JSX 语法的支持不用于对 React 的支持。
// React 使用了一些特定的 ESLint 无法识别的 JSX 语法。
// 如果你正在使用 React 并且想要 React 语义支持，我们推荐你使用 eslint-plugin-react。

// 同样的，支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型）。
// 使用 { 'parserOptions': { 'ecmaVersion': 6 } } 来启用 ES6 语法支持；
// 要额外支持新的 ES6 全局变量，使用 { 'env':{ 'es6': true } }(这个设置会同时自动启用 ES6 语法支持)。

module.exports = {
  // 告诉 eslint 不再往父级目录查找配置文件
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录，直到根目录（包括根目录）或直到发现一个有'root': true的配置。
  // 如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。
  // 为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 'root': true。
  // ESLint 一旦发现配置文件中有 'root': true，它就会停止在父级目录中寻找。
  'root': true,

  // 指定环境的全局变量
  // 将其设置为 true，以保证在进行代码检测时不会把这些环境预定义的全局变量识别成未定义的变量而报错
  'env': {
    // 浏览器环境中的全局变量。
    'browser': true,
    // Node.js 全局变量和 Node.js 作用域。
    'node': true,
    // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
    'es6': true
  },

  // 指定javaScript语言类型和风格
  // 设置解析器选项能帮助 ESLint 确定什么是解析错误，所有语言选项默认都是 false。
  'parserOptions': {
    // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
    // Babel-ESLint - 一个对Babel解析器的包装，使其能够与 ESLint 兼容。
    // typescript-eslint-parser(实验) - 一个把 TypeScript 转换为 ESTree 兼容格式的解析器，这样它就可以在 ESLint 中使用了。这样做的目的是通过 ESLint 来解析 TypeScript 文件（尽管不一定必须通过所有的 ESLint 规则）。
    // 注意，在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。
    // 解析器会被传入 parserOptions，但是不一定会使用它们来决定功能特性的开关。
    'parser': 'babel-eslint',
    // ECMAScript 版本
    // 默认设置为'3,5'，你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。
    // 你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）。
    'ecmaVersion': 6,

    // 设置为 'script' (默认) 或 'module'（如果你的代码是 ECMAScript 模块)。
    // 如果不开启module，且使用import将报错：
    // [eslint] Parsing error: 'import' and 'export' may appear only with 'sourceType: module'
    'sourceType': 'module',

    // 想使用的额外的语言特性:
    'ecmaFeatures': {
      // 允许在全局作用域下使用 return 语句
      'globalReturn': false,
      // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
      'impliedStrict': false,
      // 启用 JSX
      'jsx': true,
      // 启用实验性的 object rest/spread properties 支持。
      // 重要：这是一个实验性的功能,在未来可能会有明显改变。
      // 建议你写的规则 不要 依赖该功能，除非当它发生改变时你愿意承担维护成本。
      'experimentalObjectRestSpread': true
    }
  },

  // ESLint 支持使用第三方插件。
  // 在使用插件之前，你必须使用 npm 安装它。
  // 并使用 plugins 配置字段来存放插件名字的列表。
  // 插件名称可以省略 eslint-plugin- 前缀。
  'plugins': [
    // 使用 eslint-plugin-vue 插件，
    // 用于配置Vue单页组件校验规则
    'vue'
  ],

  // eslint-plugin-vue 插件中包含了下面的配置内容：
  // 如果引入该插件，且相关配置内容可以在该文件中省略
  // parserOptions: {
  //   ecmaVersion: 2015,
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     jsx: true,
  //     experimentalObjectRestSpread: true
  //   }
  // },
  // env: {
  //   browser: true,
  //   es6: true
  // },

  // 继承并启用已经定制好的配置规则
  // 常见的编码参考规范通常是一个 npm 包，其输出eslint提供的已有规则配置，例如 eslint-config-airbnb-base
  // 此时 extends 属性值可以省略包名的前缀 eslint-config-。
  // 而很多特性往往需要定制一个eslint插件，通常会输出一个或多个命名的配置。例如 eslint-plugin-vue
  // 此时 extends 属性值的格式为：'plugin:包名/配置名称'
  // 书写的时候可以省略掉包名的前缀 eslint-plugin-。
  'extends': [
    // Airbnb风格配置规则
    // http://www.css88.com/archives/8345?eslint
    // 在 eslint-config-airbnb-base 的规则输出中自动引入并配置了 eslint-plugin-import 插件
    // eslint的默认规则列表并不提供 ES6 Module的 export/import 语法风格，
    // 需要通过 eslint-plugin-import 插件进行配置
    // https://github.com/benmosher/eslint-plugin-import
    'airbnb-base',
    // Vue单页组件配置规则
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // 这个插件提供了四个预定义的配置:
    // plugin:vue/base 设置和规则启用正确的ESLint解析。
    // plugin:vue/essential 在上述基础上，加上防止错误或意外行为的规则。
    // plugin:vue/strongly-recommended 在上述基础上，加上规则可以显著提高代码的可读性以及开发体验。
    // plugin:vue/recommended 在上述基础上，加上执行主观社区默认值的规则，以确保一致性。
    'plugin:vue/recommended',
  ],

  // ESLint 支持在配置文件添加共享设置。
  // 你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。
  // 如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。
  'settings': {
    // 配置 import 导入模块时路径的解析器，
    // 以确保 eslint 校验规则时能够正确找到import导入的模块
    'import/resolver': {
      // 使用 eslint-import-resolver-webpack 插件
      // 将由config配置文件中饭的resolve字段进行解析器的配置
      // resolve: {
      //   extensions: ['.js', '.vue', '.json'],
      //   alias: {
      //     'vue$': 'vue/dist/vue.esm.js',
      //     '@': resolve('src'),
      //   }
      // },
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      },
      // 使用 eslint-import-resolver-node 插件
      // 'node': {
      //   // 省略扩展名时，将自动从下列扩展名中进行匹配
      //   'extensions': [
      //     '.js',
      //     '.jsx',
      //   ],
      // }
    },
  },

  // ESLint 附带有大量的规则。
  // 你可以使用注释或配置文件修改你项目中要使用的规则。
  // 要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
  //
  // 'off' 或 0 - 关闭规则
  // 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
  // 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  //
  // 你也可以在代码中通过 /* eslint-disable no-alert, no-console */ 之类的形式针对某处代码禁用某条规则
  'rules': {
    // vue规则，强制在结束标记前保持一致的空格
    // vue插件的规则设置中不包含该规则配置，需要自定义
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-spacing.md
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always',
    }],

    // vue规则，强制结束标记之前是否换行
    // vue插件的规则设置中不包含该规则配置，需要自定义
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-newline.md
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],

    // vue规则，强制prop属性名称格式
    // vue插件的规则设置中不包含该规则配置，需要自定义
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/prop-name-casing.md
    'vue/prop-name-casing': ['error', 'camelCase'],

    // 定义Vue组件属性的书写顺序
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/order-in-components.md
    // 官方风格指南参考：
    // https://cn.vuejs.org/v2/style-guide/index.html#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F-%E6%8E%A8%E8%8D%90
    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        // 在 plugin:vue/recommended 中设定的默认值的基础上添加路由钩子
        ['beforeRouteEnter', 'beforeRouteUpdate', 'beforeRouteLeave'],
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }],

    // 每行属性的数量要求
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/max-attributes-per-line.md
    // "vue/max-attributes-per-line": ['error', {
    //   // 单行允许的属性数量
    //   // "singleline": 0,
    //   "singleline": 3,
    //   // 多行允许的属性数量
    //   "multiline": {
    //     // 多行书写时每行允许的属性数量
    //     "max": 1,
    //     // 是否允许多行属性情况，属性与标签同行
    //     "allowFirstLine": false
    //   }
    // }],

    // 使用import导入模块时，
    // 如果下列扩展名列表设置为never，则可以省略扩展名
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],

    // 用来设置当导入在 package.json 文件中
    // dependencies, devDependencies, optionalDependencies 或者 peerDependencies 等字段没有声明的外部模块时，
    // 是否给予错误提醒
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', {
      // 设置为false，
      // 表示禁止import位于devDependencies字段声明的模块
      'devDependencies': false,
      // 当使用一个globs数组时，
      // 如果被链接的文件的名称与数组中的单个glob匹配，
      // 则设置为true(没有错误报告)，否则设置为false。
      'optionalDependencies': ['test/unit/index.js'],
    }],

    // 一个模块只有一个导出时，最好使用 default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    // 'import/prefer-default-export': 'error',
    'import/prefer-default-export': 0,

    // 绝对路径导入的模块必须在最前面进行导入
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    // 'import/first': 'error',

    // 导入默认导出时，命名必须是export default的标识符
    // 例如：import ddd from './router'
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    // 'import/no-named-as-default': 'warn',

    // 规则点不是很确认，后期跟踪
    // import foo, {bar} from './foo.js'
    // import {bar} from './foo.js'
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
    // 'import/no-named-as-default-member': 'warn',

    // require()动态引入资源的路径中不能是变量，必须是一个字符串常量
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    // 'import/no-dynamic-require': 'error',

    // 开发模式下允许debugger
    // http://eslint.cn/docs/rules/no-debugger
    // debugger 语句用于告诉 JavaScript 执行环境停止执行并在代码的当前位置启动调试器。随着现代调试和开发工具的出现，使用调试器已不是最佳实践。产品代码不应该包含 debugger，因为它会导致浏览器停止执行代码并打开一个适当的调试器。
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 禁止使用console
    // http://eslint.cn/docs/rules/no-console
    // 'no-console': 'warn',
    // 'no-console': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 强制使用一致的缩进风格。默认是 4个空格。
    // http://eslint.cn/docs/rules/indent
    // 下面设置使用两个空格的缩进
    // 'indent': ['error', 2, {
    //   'SwitchCase': 1,
    //   'VariableDeclarator': 1,
    //   'outerIIFEBody': 1,
    //   'FunctionDeclaration': {
    //     'parameters': 1,
    //     'body': 1
    //   },
    //   'FunctionExpression': {
    //     'parameters': 1,
    //     'body': 1
    //   }

    // 禁用 tab
    // http://eslint.cn/docs/rules/no-tabs
    // 'no-tabs': 'error',

    // 必须使用分号
    // http://eslint.cn/docs/rules/semi
    // 'semi': 1,
    'semi': 0,

    // 添加结尾的逗号
    // const foo = { a: 1, b: 2 }
    // const bar = {
    //   a: 1,
    //   b: 2,
    // }
    // http://eslint.cn/docs/rules/comma-dangle
    // 'comma-dangle': ['error', {
    //   arrays: 'always-multiline',
    //   objects: 'always-multiline',
    //   imports: 'always-multiline',
    //   exports: 'always-multiline',
    //   functions: 'always-multiline',
    // }],
    'comma-dangle': 0,

    // 强制使用一致的反勾号、双引号或单引号 (quotes)
    // http://eslint.cn/docs/rules/quotes
    // 字符串选项：
    // "double" (默认) 要求尽可能地使用双引号
    // "single" 要求尽可能地使用单引号
    // "backtick" 要求尽可能地使用反勾号
    // 对象选项：
    // "avoidEscape": true 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
    // "allowTemplateLiterals": true 允许字符串使用反勾号
    // 'quotes': ['error', 'single', { avoidEscape: true }],

    // 建议使用const
    // 如果一个变量不会被重新赋值，最好使用const进行声明。
    // http://eslint.cn/docs/rules/prefer-const
    // 'prefer-const': ['error', {
    //   destructuring: 'any',
    //   ignoreReadBeforeAssign: true,
    // }],

    // 要求必须有基数，强制parseInt()提供第二个参数
    // http://eslint.cn/docs/rules/radix
    // 此规则有两个选项：
    // "always"强制提供一个基数（默认的）
    // "as-needed"禁止提供基数10
    // 'radix': 'error',

    // 禁止混合使用不同的操作符
    // http://eslint.cn/docs/rules/no-mixed-operators
    // 该规则有两个选项。
    // groups (string[][]) - 指定要检查的操作符分组。groups 选项是分组的列表，分组是二进制运算符的列表。默认操作符分组定义为算术、位、比较、逻辑和关系运算符。
    // allowSamePrecedence (boolean) - 指定是否允许混合运算符具有相同的优先级。默认为 true。
    // 'no-mixed-operators': ['error', {
    //   groups: [
    //     ['+', '-', '*', '/', '%', '**'],
    //     ['&', '|', '^', '~', '<<', '>>', '>>>'],
    //     ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
    //     ['&&', '||'],
    //     ['in', 'instanceof']
    //   ],
    //   allowSamePrecedence: false
    // }],

    // 禁止未使用过的表达式
    // http://eslint.cn/docs/rules/no-unused-expressions
    // 'no-unused-expressions': ['error', {
    //   'allowShortCircuit': false,
    //   'allowTernary': false,
    //   'allowTaggedTemplates': false,
    // }],
    'no-unused-expressions': ['warn', {
      // 设置为true，允许&&和||运算符的短路运算
      'allowShortCircuit': true,
      // 设置为true，允许三目运算符
      'allowTernary': true
    }],

    // 禁止使用嵌套的三元表达式
    // http://eslint.cn/docs/rules/no-nested-ternary
    // 'no-nested-ternary': 'error',

    // 禁止未使用过的变量
    // https://eslint.cn/docs/rules/no-unused-vars
    // 'no-unused-vars': [ 'warn', {
    //   'vars': 'all',
    //   'args': 'after-used',
    //   'ignoreRestSiblings': true
    // }],
    'no-unused-vars': [ 'warn', {
      // 此配置项有两个值：
      // all 检测所有变量，包括全局环境中的变量。这是默认值。
      // local 仅仅检测本作用域中声明的变量是否使用，允许不使用全局环境中的变量。
      'vars': 'all',
      // args 选项有三个值：
      // after-used - 最后一个参数必须使用。如：一个函数有两个参数，你使用了第二个参数，ESLint 不会报警告。
      // all - 所有命名参数必须使用。
      // none - 不检查参数。
      'args': 'none'
    }],

    // 行最大长度
    // http://eslint.cn/docs/rules/max-len
    // 'max-len': ['error', 100, 2, {
    //   'ignoreUrls': true,
    //   'ignoreComments': false,
    //   'ignoreRegExpLiterals': true,
    //   'ignoreStrings': true,
    //   'ignoreTemplateLiterals': true,
    // }],
    'max-len': ['warn', 150, 2, {
      'comments': 150
    }],

    // 要求使用骆驼拼写法
    // http://eslint.cn/docs/rules/camelcase
    // 该规则有一个对象选项：
    // "properties": "always" (默认) 强制属性名称为驼峰风格
    // "properties": "never" 不检查属性名称
    // 'camelcase': ['error', { properties: 'never' }],

    // 禁用行尾空格 （--fix）
    // http://eslint.cn/docs/rules/no-trailing-spaces
    // 'no-trailing-spaces': ['error', {
    //   // 是否允许在空行使用空白符
    //   'skipBlankLines': false,
    //   // 是否允许在注释块中使用空白
    //   'ignoreComments': false
    // }],

    // 禁止多个空格
    // http://eslint.cn/docs/0.24.1/rules/no-multi-spaces
    // 'no-multi-spaces': ['error', {
    //   // ignoreEOLComments: false, // TODO: uncomment once v3 is dropped
    // }],

    // 要求中缀操作符周围有空格 (space-infix-ops)
    // http://eslint.cn/docs/rules/space-infix-ops
    // 'space-infix-ops': 'error',

    // 要求或禁止块内填充
    // http://eslint.cn/docs/rules/padded-blocks
    // 'always' (默认) 要求块语句和类的开始或末尾有空行
    // 'never' 禁止块语句和类的开始或末尾有空行
    // 'padded-blocks': ['error', 'never'],

    // 禁止注释和代码出现在同一行
    // http://eslint.cn/docs/rules/no-inline-comments
    // 'no-inline-comments': 0,
    // 'no-inline-comments': 1,

    // 强制行注释的位置
    // http://eslint.cn/docs/rules/line-comment-position
    // 'line-comment-position': ['off', {
    //   // position 选项有两个设置：
    //   // above (默认) 强制行注释只在代码上方，单独成行。
    //   // beside 强制行注释只在代码行后面。
    //   'position': 'above',
    //   'ignorePattern': ',
    //   'applyDefaultPatterns': true,
    // }],

    // 强制注释周围有空行
    // http://eslint.cn/docs/rules/lines-around-comment
    // 'lines-around-comment': 0,
    // 'lines-around-comment': ['error', {
    //   // (默认) 要求在块级注释之前有一空行
    //   'beforeBlockComment': true,
    //   // 要求在行级注释之前有一空行
    //   'beforeLineComment': true,
    // }],

    // 不允许多个空行
    // http://eslint.cn/docs/rules/no-multiple-empty-lines
    // 该规则有一个对象选项：
    // "max" (默认为 2) 强制最大连续空行数。
    // "maxEOF" 强制文件末尾的最大连续空行数。
    // "maxBOF" 强制文件开始的最大连续空行数。
    // 'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

    // 大括号风格要求 (--fix)
    // http://eslint.cn/docs/rules/brace-style
    // 在 Javascript 中，one true brace style也是最常见的一种，它将大括号放在控制语句或声明语句同一行的位置。
    // one true brace style的一种常见的变体形式叫做 Stroustrup，if-else中的else语句，连同catch 和 finally，都必须在右括号后另起一行
    // 另一种风格叫做Allman， 括号必须单独成行且没有任何缩进：
    // 该规则有一个字符串选项：
    // "1tbs" (默认) 强制 one true brace style
    // "stroustrup" 强制 Stroustrup style
    // "allman" 强制 Allman style
    // 该规则可以有例外情况，用对象表示：
    // "allowSingleLine": true (默认 false) 允许块的开括号和闭括号在同一行
    // 'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],

    // 强制在注释中 // 或 /* 使用一致的空格
    // http://eslint.cn/docs/rules/spaced-comment
    // 'spaced-comment': ['error', 'always', {
    //   'line': {
    //     'exceptions': ['-', '+'],
    //     'markers': ['=', '!'],
    //   },
    //   'block': {
    //     'exceptions': ['-', '+'],
    //     'markers': ['=', '!'],
    //     'balanced': true,
    //   }
    // }],

    // 强制对多行注释使用特定风格
    // http://eslint.cn/docs/rules/multiline-comment-style
    // 'multiline-comment-style': 0,
    // 'starred-block' (默认): 禁止使用连续的行注释来表示块注释。另外，要求块注释的每行之前有一个 *。
    // 'bare-block': 禁止使用连续的行注释来表示块注释，并且禁止块注释每行前有一个'*'。
    // 'separate-lines': 禁用块注释，使用连续的行注释。
    // 'multiline-comment-style': ['error', 'starred-block'],

    // 要求或禁止命名的 function 表达式
    // http://eslint.cn/docs/rules/func-names
    // 'func-names': ['error', 'always'],

    // 避免使用一元递增和递减运算符(++, --)
    // http://eslint.cn/docs/rules/no-plusplus
    // 'no-plusplus': 1,

    // 操作符的赋值规则,always始终采用Shorthand形式
    // yes-Shorthand: x += y
    // no-Separate: x = x + y
    // http://eslint.cn/docs/rules/operator-assignment
    // 'operator-assignment': ['error', 'always'],

    // 函数的括号前是否使用空格
    // http://eslint.cn/docs/rules/space-before-function-paren
    // const x = function () {};
    // const y = function a() {};
    // 'space-before-function-paren': ['error', {
    //   'anonymous': 'always',
    //   'named': 'never',
    //   'asyncArrow': 'always'
    // }],

    // 禁止在返回语句中赋值 (no-return-assign)
    // http://eslint.cn/docs/rules/no-return-assign
    // 'no-return-assign': ['error', 'always'],

    // 禁用 Script URL (no-script-url)
    // http://eslint.cn/docs/rules/no-script-url
    // 'no-script-url': 'error',

    // 强制函数中的变量在一起声明或分开声明 (one-var)
    // http://eslint.cn/docs/rules/one-var
    // 该规则有一个选项，可以是字符串或对象。
    // 字符串选项：
    // "always" (默认) 要求每个作用域有一个变量声明
    // "never" 要求每个作用域有多个变量声明
    // "consecutive" 每个作用域允许出现多个变量声明，但对连续的变量声明要求合并为单个声明
    // 对象选项：
    // "var": "always" 要求每个函数有一个 var 声明
    // "var": "never" 要求每个函数有多个 var 声明
    // "var": "consecutive" 要求连续的 var 声明合并为一个
    // "let": "always" 要求每个块有一个 let 声明
    // "let": "never" 要求每个块有多个 let 声明
    // "let": "consecutive" 要求连续的 let 声明合并为一个
    // "const": "always" 要求每个块有一个 const 声明
    // "const": "never" 要求每个块有多个 const 声明
    // "const": "consecutive" 要求连续的 const 声明合并为一个
    // "separateRequires": true 强制 requires 分开声明
    // 对象选项：
    // "initialized": "always" 要求每个作用域的初始化的变量有一个变量声明
    // "initialized": "never" 要求每个作用域的初始化的变量有多个变量声明
    // "initialized": "consecutive" 对已经初始化的变量，要求其连续的变量声明合并为一个声明
    // "uninitialized": "always" 要求每个作用域的未初始化的变量有一个变量声明
    // "uninitialized": "never" 要求每个作用域的未初始化的变量有多个变量声明
    // "uninitialized": "consecutive" 对未初始化的变量，要求其连续的变量声明合并为一个声明
    // 'one-var': ['error', 'never'],

    // 禁止在 else 前有 return (no-else-return)
    // 如果 if 块中包含了一个 return 语句，else 块就成了多余的了。可以将其内容移至块外。
    // 该规则旨在突出含有 return 语句的 if 语句后的不必要的代码。因此，当else 语句出现在含有 return 语句的 if 语句之后，该规则将发出警告。
    // http://eslint.cn/docs/rules/no-else-return
    // 'no-else-return': 'error',

    // 禁止空块语句 (no-empty)
    // http://eslint.cn/docs/rules/no-empty
    // 'no-empty-pattern': 'error',

    // 要求使用 === 和 !== (eqeqeq)
    // http://eslint.cn/docs/rules/eqeqeq
    // 'eqeqeq': ['error', 'always', { null: 'ignore' }],

    // 强制数组方法的回调函数中有 return 语句 (array-callback-return)
    // http://eslint.cn/docs/rules/array-callback-return
    // 该规则发现以下方法的回调函数，然后检查return语句的使用。
    // Array.from
    // Array.prototype.every
    // Array.prototype.filter
    // Array.prototype.find
    // Array.prototype.findIndex
    // Array.prototype.map
    // Array.prototype.reduce
    // Array.prototype.reduceRight
    // Array.prototype.some
    // Array.prototype.sort
    // 以上类型的数据。
    // 'array-callback-return': 'error',

    // 要求使用一致的 return 语句 (consistent-return)
    // http://eslint.cn/docs/rules/consistent-return
    // 'consistent-return': 'error',

    // 禁止对 function 的参数进行重新赋值
    // http://eslint.cn/docs/rules/no-param-reassign
    // 'no-param-reassign': ['error', {
    //   'props': true,
    //   'ignorePropertyModificationsFor': [
    //     'acc', // for reduce accumulators
    //     'e', // for e.returnvalue
    //     'ctx', // for Koa routing
    //     'req', // for Express requests
    //     'request', // for Express requests
    //     'res', // for Express responses
    //     'response', // for Express responses
    //     '$scope', // for Angular 1 scopes
    //   ]
    // }],
    'no-param-reassign': ['error', {
      'props': true,
      // 可以忽略规则限制的参数属性
      'ignorePropertyModificationsFor': [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnValue
      ]
    }],

    // 要求箭头函数的参数使用圆括号
    // http://eslint.cn/docs/rules/arrow-parens
    // 字符串选项：
    // 'always' (默认) 要求在所有情况下使用圆括号将参数括起来。
    // 'as-needed' 当只有一个参数时允许省略圆括号。
    // 'as-needed' 选项的对象属性：
    // 'requireForBlockBody': true 修改 as-needed 规则以便如果函数体在一个指令块中（被花括号括起来）要求使用圆括号把参数括起来。
    // 'arrow-parens': ['error', 'as-needed', {
    //   requireForBlockBody: true,
    // }],

    // 要求箭头函数体使用大括号
    // http://eslint.cn/docs/rules/arrow-body-style
    // 该规则有一到两个选项。
    // 第一个选项是个字符串，可以是：
    // 'always' 强制在箭头函数体周围使用大括号
    // 'as-needed' 当大括号是可以省略的，强制不使用它们 (默认)
    // 'never' 禁止在函数体周围出现大括号 (将箭头函数限制为返回结果的表达式)
    // 第二个选项是个对象，
    // 当第一个选项是 'as-needed'，可以进行更加细粒度的配置。
    // 目前，唯一有效的选项是一个布尔属性 requireReturnForObjectLiteral。
    // 默认为 false。如果设置为 true，它要求使用大括号，并且显示返回对象字面量。
    // 'arrow-body-style': ['error', 'as-needed', {
    //   requireReturnForObjectLiteral: false,
    // }],
    'arrow-body-style': 0,

    // 强制在函数括号内使用一致的换行
    // http://eslint.cn/docs/rules/function-paren-newline
    // 'function-paren-newline': 0,

    // 禁止使用特定的语法
    // http://eslint.cn/docs/rules/no-restricted-syntax
    // 'no-restricted-syntax': [
    //   'error',
    //   {
    //     // 不要使用 for-in 遍历对象
    //     // 使用 Object.keys() / Object.values() / Object.entries() 来生成数组，以便可以迭代对象。
    //     selector: 'ForInStatement',
    //     message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    //   },
    //   {
    //     // 不要使用 iterators（迭代器） 。
    //     // 请使用高阶函数，如 map() / every() / filter() / find() / findIndex() / reduce() / some() / … 来迭代数组
    //     // 而不是像  for-in 或 for-of 这样的循环。
    //     selector: 'ForOfStatement',
    //     message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
    //   },
    //   {
    //     selector: 'LabeledStatement',
    //     message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    //   },
    //   {
    //     selector: 'WithStatement',
    //     message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    //   },
    // ],

    // 禁用不必要的构造函数
    // http://eslint.cn/docs/rules/no-useless-constructor
    // ES2015 为没有指定构造函数的类提供了默认构造函数。
    // 因此，没有必要提供一个空的构造函数或只是简单的调用父类这样的构造函数。
    // 'no-useless-constructor': 'error',
    'no-useless-constructor': 0,

    // 不允许修改类声明的变量 (no-class-assign)
    // http://eslint.cn/docs/rules/no-class-assign
    // 'no-class-assign': 'error',

    // 强制类方法使用 this
    // 如果一个类方法不使用 this，可以安全的做为静态函数出现。
    // http://eslint.cn/docs/rules/class-methods-use-this
    // 'class-methods-use-this': ['error', {
    //   exceptMethods: [],
    // }],
    'class-methods-use-this': 0,

    // 禁止使用 new 以避免产生副作用
    // 此规则旨在通过禁止使用 new 关键字调用构造函数但却不将结果赋值给一个变量来保持一致性和约定。
    // http://eslint.cn/docs/rules/no-new
    // 'no-new': 'error',

    // 禁止标识符中有悬空下划线
    // http://eslint.cn/docs/rules/no-underscore-dangle
    // JavaScript 对于属性或方法而言并没有私有的概念。
    // 虽然下划线开头通常意味着 ‘private’（私有）是通用的惯例，事实上，
    // 这些属性是完全公开的，是公开API的一部分。
    // 这个惯例可能会导致开发人员错误地认为这不重要或者测试也不必要。
    // 简而言之：如果你想让其 “private”, 必须使其不可见。
    // 该规则有一个对象选项：
    // 'allow' 允许指定标识符使用悬空下划线
    // 'allowAfterThis': false (默认) 禁止在 this 对象的成员变量上使用悬空下划线
    // 'allowAfterSuper': false (默认) 禁止在 super 对象的成员变量上使用悬空下划线
    // 'enforceInMethodNames': false (默认) 允许在方法名中使用悬空下划线
    // 'no-underscore-dangle': ['error', {
    //   allow: [],
    //   allowAfterThis: false,
    //   allowAfterSuper: false,
    //   // enforceInMethodNames: false, // TODO: uncoment and enable, semver-minor once v3 is dropped
    // }],

    // 建议使用模板而非字符串连接
    // 以编程方式构建字符串时，请使用模板字符串而不是字符串连接。
    // 为什么？模板字符串为你提供了更好的可读性，简洁的语法，正确的换行符和字符串插值功能。
    // http://eslint.cn/docs/rules/prefer-template
    // 'prefer-template': 'error',
    'prefer-template': 'off',

    // 优先使用数组和对象解构
    // http://eslint.cn/docs/rules/prefer-destructuring
    // 该规则有两个配置对象。
    // 第一个对象参数决定了该规则要应用的解构类型。
    // 该规则的两个属性， array 和 object 可以独立地开启或关闭对每种类型的解构需求。默认情况下，均为 true。
    // 该规则第二对象参数，包含一个键，enforceForRenamedProperties 用来决定 object 解构是否应用于重命名的变量。
    // // 'prefer-destructuring': 0,
    'prefer-destructuring': ['off', {
      // 变量声明
      'VariableDeclarator': {
        'array': false,
        'object': true,
      },
      // 赋值表达式
      'AssignmentExpression': {
        'array': true,
        'object': true,
      },
    }, {
      'enforceForRenamedProperties': false,
    }],

    // 强制使用一致的换行符风格
    // http://eslint.cn/docs/rules/linebreak-style
    // 在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。对应的控制字符为 '\n' (LF) 和 '\r\n'(CRLF)。
    // 很多版本控制系统（如 git 和 subversion）可以自动的保证正确的结尾。然而如果要涵盖所有情况，你可以激活此规则。
    // 'linebreak-style': ['error', 'unix'],
    'linebreak-style': 0,

    // 要求遵循大括号约定
    // http://eslint.cn/docs/rules/curly
    // 当代码块只有一条语句时，JavaScript 允许省略大括号。
    // 然而，很多人认为，在块区域前后时刻保留大括号是一种最佳实践，即使他们是可有可无的，因为省略大括号会导致错误，并且降低代码的清晰度。
    // 选项：
    // all: 始终使用大括号，默认选项，当 if、else、for、while 或 do 不使用大括号包裹代码时，会给出警告。
    // multi：你可以指定当块中有多条语句时才使用大括号，而当代码块中只有一条语句时只会给出警告。
    // multi-line：你可以放宽规则，允许在单行中省略大括号，而if、else if、else、for、while 和 do，在其他使用中依然会强制使用大括号。
    // multi-or-nest：如果 if、else if、else、for、while 和 do 的代码主体中只包含一条语句，你可以使用另外一个配置来强制省略大括号。同时在其他的情况下，强制使用大括号。
    // consistent：当在使用任何 multi* 选项时，你可以添加一个参数来强制 if、else if 和 else 中所有的代码块使用或者不使用大括号。
    // 'curly': ['error', 'multi-line'],

    // 强制在对象的花括号内使用一致的换行符
    // http://eslint.cn/docs/rules/object-curly-newline
    // 该规则有一个字符串选项
    // 'always' 要求花括号内有换行符
    // 'never' 禁止花括号内有换行符
    // 或一个对象选项：
    // 'multiline': true (默认)如果在属性内部或属性之间有换行符，就要求有换行符
    // 'minProperties' 如果属性的数量至少为给定的数值，要求有换行符。默认情况下，如果一个对象包含换行符并且属性的数量少于给定的数量，该规则也会报错误。然而，如果设置 consistent 选项为 true，则该选项将不起作用。
    // 'consistent': true 要求使用花括号，或者不使用或括号直接使用换行。注意启用该选项将改变 minProperties 选项的行为。(查看上面的 minProperties，获取更多信息)
    // 你可以为字面量、解构赋值和命名的导入导出指定不同的选项：
    // 'ObjectExpression' 对象字面量的配置。
    // 'ObjectPattern' 对象的解构赋值模式的配置。
    // 'ImportDeclaration' 配置命名的导入
    // 'ExportDeclaration' 配置命名的导出
    // 'object-curly-newline': ['off', {
    //   ObjectExpression: { minProperties: 3, multiline: true, consistent: true },
    //   ObjectPattern: { minProperties: 3, multiline: true, consistent: true }
    // }],
    'object-curly-newline': ['warn', {
      'multiline': true,
      'consistent': true
    }],

    // 要求对象字面量简写语法 (--fix)
    // http://eslint.cn/docs/rules/object-shorthand
    // 该规则有一个选项。可以设置为下列值之一：
    // 'always' (默认) 只要有可能，简写就应该被使用。
    // 'methods' 保证方法简写被使用（同样适用于 generators ）。
    // 'properties' 保证属性简写被使用 (键和变量名称相匹配的情况).
    // 'never' 保证对象字面量中的任何属性和方法都不使用简写。
    // 'consistent' 保证对象字面量的简写或非简写一致性。
    // 'consistent-as-needed' 保证对象字面量的简写或非简写一致性，但尽可能的全部使用简写。
    // 另外，该规则有个可选配置对象：
    // 'avoidQuotes': true 表示对象的键是字符串时，倾向于长格式的语法。(默认: false)。注意该选项只在 'always'、'methods' 或 'properties' 选项下才有效。
    // 'ignoreConstructors': true 可以用来阻止报告构造函数出现的错误。 (默认情况下，该规则把构造函数当成普通的函数。) 注意该选项只在 'always' 或 'methods' 选项下才有效。
    // 'avoidExplicitReturnArrows': true 表示函数属性相对于显式返回的箭头函数更倾向于方法。 (默认情况下，两者皆可)注意该选项只在 'always' 或 'methods' 选项下才有效。
    // 'object-shorthand': ['error', 'always', {
    //   avoidQuotes: true,
    //   ignoreConstructors: false,
    // }],

    // 禁止直接使用 Object.prototypes 的内置属性
    // http://eslint.cn/docs/rules/no-prototype-builtins
    // 禁止：foo.hasOwnProperty("bar")
    // 允许：Object.prototype.hasOwnProperty.call(foo, "bar")
    // 'no-prototype-builtins': 'error',

    // 禁用 continue
    // http://eslint.cn/docs/rules/no-continue
    // continue 语句终止当前的循环的此次迭代或带标签的循环，执行循环中的下一个迭代。
    // 不正确的使用会降低代码可测性、可读性以及可维护性。应使用结构化的控制语句如 if 来代替。
    'no-continue': 'error',

    // 要求对象字面量属性名称使用引号 (--fix)
    // http://eslint.cn/docs/rules/quote-props
    // 该规则有两个选项，一个是字符串，一个是对象。
    // 字符串选项：
    // "always" (默认) 要求对象字面量属性名称都使用引号
    // "as-needed" 当没有严格要求时，禁止对象字面量属性名称使用引号
    // "consistent" 要求对象字面量属性名称使用一致的引号，要么全部用引号，要么都不用
    // "consistent-as-needed" 如果有属性名称要求使用引号，则所有的属性名称都要使用引号；否则，禁止所有的属性名称使用引号
    // 对象选项：
    // "keywords": true 如果关键字作为对象属性名称，要求使用引号 (当 as-needed 或 consistent-as-needed 时生效)
    // "unnecessary": true (默认) 如果没有严格要求，禁止对象属性名称使用引号 (当as-needed 时生效)
    // "unnecessary": false 如果没有严格要求，允许对象属性名称使用引号 (当 as-needed 时生效)
    // "numbers": true 当数字作为对象属性名称时，要求使用引号 (只当 as-needed 时生效)
    // 'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

    // 强制在花括号中使用一致的空格 (--fix)
    // http://eslint.cn/docs/rules/object-curly-spacing
    // 该规则有两个选项，一个是字符串，一个是对象。
    // 字符串选项：
    // 'never' (默认) 不允许花括号中有空格
    // 'always' 要求花括号内有空格 (除了 {})
    // 对象选项：
    // 'arraysInObjects': true 要求以数组元素开始或结尾的对象的花括号中有空格 (当第一个选项为 never 时生效)
    // 'arraysInObjects': false 禁止以数组元素开始或结尾的对象的花括号中有空格 (当第一个选项为 always 时生效)
    // 'objectsInObjects': true 要求以对象元素开始或结尾的对象的花括号中有空格 (当第一个选项为 never 时生效)
    // 'objectsInObjects': false 禁止以对象元素开始或结尾的对象的花括号中有空格 (当第一个选项为 always 时生效)
    // 'object-curly-spacing': ['error', 'always'],

    // react and jsx

    // 要求jsx的代码层级的缩进 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    // 'react/jsx-indent': ['error', 2],

    // 要求jsx标签属性的缩进 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    // 'react/jsx-indent-props': ['error', 2],

    // 要求jsx自闭合标签的位置 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    // line-aligned: 必须与包含开始标记的行对齐。
    // 'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

    // 要求jsx的闭合标签必须与开头标签对齐 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
    // 'react/jsx-closing-tag-location': 'error',

    // 要求在关闭标签之前是否需要空格 (--fix)
    // 可使用'react/jsx-tag-spacing'规则代替
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md
    // 'react/jsx-space-before-closing': ['off', 'always'],

    // 要求标签的空格形式 (--fix)
    // <div></div> <input />
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    // 'react/jsx-tag-spacing': ['error', {
    //   closingSlash: 'never',
    //   beforeSelfClosing: 'always',
    //   afterOpening: 'never',
    // }],
    // 'react/jsx-tag-spacing': ['error', {
    //   closingSlash: 'never',
    //   beforeSelfClosing: 'always',
    //   afterOpening: 'never',
    //   // 该规则非默认设置，为附加
    //   beforeClosing: 'never',
    // }],

    // 禁止{}嵌入语法两端出现空格，但是允许多行书写 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    // 'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],

    // 禁止等号两端存在空格 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
    // 'react/jsx-equals-spacing': ['error', 'never'],

    // 禁止多个属性之间存在多余的空格（--fix）
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md
    // 'react/jsx-props-no-multi-spaces': ['warn'],

    // 要求一行最多书写属性的数量 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    // 参数配置：
    // maximum: 最大数量限制
    // when: 检测时机
    // -- always: 总是检测最大数量限制
    // -- multiline: 只有当属性被多行书写时才进行检测
    // 'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

    // 要求第一个属性是否换行书写 (--fix)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    // multiline-multiprop配置项：只有当多行属性书写时才要求第一个属性换行书写
    // 'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

    // 如果你声明了state，但是没有使用它，将会给出警告
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md
    // 'react/no-unused-state': 'error',

    // 每个文件只声明一个组件可以提高组件的可读性和可重用性。
    // ignoreStateless: 该配置项允许在文件中出现多个无状态组件 (Stateless Component)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
    // 'react/no-multi-comp': ['error', { ignoreStateless: true }],

    // Enforce boolean attributes notation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    // 'react/jsx-boolean-value': ['error', 'never', { always: [] }],

    // Prevent missing parentheses around multilines JSX （--fix）
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    // 'react/jsx-wrap-multilines': ['error', {
    //   declaration: true,
    //   assignment: true,
    //   return: true,
    //   arrow: true,
    // }],

    // Enforce props alphabetical sorting（--fix）
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    // 'react/jsx-sort-props': ['off', {
    //   ignoreCase: true,
    //   callbacksLast: false,
    //   shorthandFirst: false,
    //   shorthandLast: false,
    //   noSortAlphabetically: false,
    //   reservedFirst: true,
    // }],

    // 使用了propTypes时，对于定义了的prop且为非必填元素，那么必须通过defaultProps指定默认值
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    // 'react/require-default-props': 'error',
  },
  // 有时，你可能需要更精细的配置，
  // 比如，如果同一个目录下的文件需要有不同的配置。
  // 因此，你可以在配置中使用 overrides 键，
  // 它只适用于匹配特定的 glob 模式的文件，使用你在命令行上传递的格式
  'overrides': [{
    // 匹配文件
    // Vue单页组件配置规则
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'files': ['*.vue'],
    // 排除指定文件
    'excludedFiles': ['*.test.js'],
    // 应用规则
    'rules': {
      // 强制<script>标签中使用一致的缩进
      // vue插件的规则设置中不包含该规则配置，需要自定义
      // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md
      'vue/script-indent': ['warn', 2, {
        // 设置顶级语句的缩进层级，默认为0（即与script标签保持同一级别）
        'baseIndent': 0,
        // switch语句中case和default与switch之间保留的缩进级别，默认为0（即与switch保持同一级别）
        'switchCase': 1,
      }],
      // vue/script-indent规则与eslint自带的indent规则冲突
      // 需要禁用掉
      'indent': 'off',
    }
  }]
}
