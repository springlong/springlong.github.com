# npm 的常用命令

node -v

	查看已安装Node的版本号。

npm -v

	查看已安装NPM的版本号

npm login

	登录NPM账户，会提示用户名、密码、邮箱。

npm init

	按照提示步骤初始化一个package.json配置文件。

npm publish <dirName>

	将当前目录下指定文件夹的项目文件发布到NPM服务器。如果已经存在同名项目，则会提示报错。

npm --force unpublish <dirName>

	撤销自己发布的包，删除后24小时内同名项目将不能再被publish。

npm install

	无任何参数的情况下，表示根据当前目录的package.json文件中定义的dependencies和devDependencies字段中定义的依赖包进行安装。

npm install -g <packageName>

	npm是安装node模块的工具，执行install命令

	-g表示在全局环境安装，以便任何项目都能使用它，如果仅需要在当前项目安装，不带该参数即可。

	安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

npm install <packageName> --force

	不管模块是否安装过，npm都要强制重新安装最新版本

npm install <packageName> --save

	使用--save标识在安装node模块之前会修改package.json文件的依赖关系字段，将当前模块信息写入到dependencies字段（生产阶段的依赖）。

npm install <packageName> --save-dev

	使用--save-dev标识在安装node模块之前会修改package.json文件的依赖关系字段，将当前模块信息写入到devDependencies字段（开发阶段的依赖）。

npm install jquery@1.7.2

	使用@符号安装指定版本的模块

npm uninstall -g <packageName>

	卸载全局已安装的node模块

npm uninstall --save <packageName>

	卸载包的同时从package.json依赖关系中解除依赖

npm update <packageName>

	更新已安装的模块（它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。）

npm update <packageName> -g

	更新所有已全局安装的软件包


npm list

	查找当前项目的本地模块


npm list -g

	查找全局安装的模块


npm view <packageName> version

	查看当前安装的某个模块的版本号


npm view <packageName> versions

	查看某个模块的所有版本号信息


npm outdated

	可以检测当前项目中包的当前版本和最新版本，通过他可以看到哪些包是过时的，但它并不会对本地软件包进行任何更改

	如果需要查找全局安装的包的情况，需要添加 -g 选项


npm run dev|build

	执行package.json配置文件中scripts字段指定的npm命令行缩写


node index.js
node index

	执行当前目录下的index.js文件


npm init

	会引导你创建一个package.json文件，包括名称、版本、作者这些信息等


npm link

	命令可以将一个任意位置的npm包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包。


npm i -g npm

	更新npm到最新版本


## 使用cnpm

将 npm 的 registry 注册表配置为淘宝的镜像源

因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。来自官网：“这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”

官方网址：
http://npm.taobao.org

安装命令:

	npm install -g cnpm --registry=http://registry.npm.taobao.org

cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。


## 使用nrm

nrm 是一个 NPM 源管理器，允许你快速地在如下 NPM 源间切换：
http://npm.taobao.org/
https://cnpmjs.org/

安装：

	npm install -g nrm

列出可选的源

	nrm ls

切换源

	nrm use

显示当前使用的源

	nrm current

添加源

	nrm add <registryName> <url>

删除源

	nrm del<registryName> <url>

测试源的速度

	nrm test


## 使用nvm进行node.js的版本控制

window下使用nvmw控制nodejs的版本:
https://github.com/coreybutler/nvm-windows
下载安装程序包进行安装！


Mac下安装详情请参见Github官方文档:
https://github.com/creationix/nvm


查看node运行在32位还是64位的环境模式

	nvm arch

安装指定版本的文件，version为"latest"表示安装最新版本node

	nvm install <version>

开启nodejs的版本控制

	nvm on

关闭nodejs的版本控制

	nvm off

列出当前可用的nodejs版本

	nvm list

使用指定版本的nodejs

	nvm use <version>

指定或者返回nodejs版本管理的目录

	nvm root [path]

查看nvm本身的版本

	nvm version