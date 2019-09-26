
# [Yarn](https://yarn.bootcss.com/)

Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

```shell
brew install yarn
```

或：

```shell
npm install -g yarn
```

安装完 yarn 后同理也要设置镜像源：

```shell
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
安装完 yarn 之后就可以用 yarn 代替 npm 了，常用 yarn 命令：

```shell
# 查看当前版本
yarn -v
yarn --version

# 查看帮助
yarn -h
yarn --help

# 安装依赖包
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

# 将依赖项分别添加到 dependencies、devDependencies、peerDependencies 和 optionalDependencies 类别中：
yarn add [package]
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional

# 全局安装
yarn global add [package]

# 升级依赖包
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

# 移除依赖包
yarn remove [package]

# 安装项目的全部依赖
yarn
yarn install

# 主要版本号+1。
yarn version --major

# 小版本号+1
yarn version --minor

# 补丁版本号+1
yarn version --patch
```

