# IOS 运行环境

使用 React Native 开发 APP，基于其 React 开发体验，使得其在项目的开发效率和平台转移上，非常亲和而且高效。

但是每一个参与 React Native 的开发者，在进入项目开发之前，都会被各种安装和报错所折磨，下面以 IOS 环境为例，罗列出常见的错误及解决方案，希望在往后的 React Native 的开发旅途中，不再困惑和焦虑。

## CocoaPods 常见问题及解决方案

### pod install 版本依赖不一致

```shell
[!] CocoaPods could not find compatible versions for pod "SSZipArchive":
  In snapshot (Podfile.lock):
    SSZipArchive (= 2.2.2, ~> 2.2)

  In Podfile:
    CodePush (from `../node_modules/react-native-code-push`) was resolved to 5.4.0, which depends on
      SSZipArchive (~> 2.1)

It seems like you've changed the constraints of dependency `SSZipArchive` inside your development pod `CodePush`.
You should run `pod update SSZipArchive` to apply changes you've made.
```

**关键信息：**
`CocoaPods could not find compatible versions for pod`。

**错误描述：**
包与包之间的依赖关系使得同一个包的版本混乱，导致 CocoaPods 无法找到兼容的版本。

**解决办法：**
将包的依赖版本修改一致即可。

### pod install 安装超时

```shell
[!] Error installing Folly
[!] /usr/bin/git clone https://github.com/facebook/folly.git /var/folders/s5/g3sn76hd291_t2_ds4ng8xq00000gn/T/d20190711-36007-1opj707 --template= --single-branch --depth 1 --branch v2018.10.22.00

Cloning into '/var/folders/s5/g3sn76hd291_t2_ds4ng8xq00000gn/T/d20190711-36007-1opj707'...
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```

**关键信息：**
`RPC failed; curl`
`The remote end hung up unexpectedly`

`RPC`: Remote Procedure Call，远程过程调用，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。

`curl`: cURL 是一个利用 URL 语法在命令行下工作的文件传输工具。

**错误描述：**
由于 pod install 安装都是从 github 上安装代码仓库，而 github 上的代码库访问速度通常很慢，特别是仓库文件过大时，常常导致远程访问被断开。

**解决办法：**
1、配置 git 的 `最低速度` 和 `最低速度时间`。

```shell
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

2、在 pod install 时执行下面的命令：

```shell
pod install --no-repo-update --verbose
```

`--no-repo-update`: 取消 CocoaPods repo 的更新，从而加快安装速度，但如果第一次 install 还是要去 github clone 代码。

`--verbose`: 作用就是打印出执行过程中详细的信息。

3、但是真正导致安装失败，还是因为 github 访问太慢了，可以尝试代理的方式处理下：

[Tips pod install速度慢的终极解决方案](https://blog.csdn.net/u012265444/article/details/83212038)

4、再次运行 `pod install` 重新安装。


## XCode 常见问题及解决方案

在正式运行 `IOS` 之前，首先需要确保项目的 `ios` 目录下存在 `Frameworks` 目录。如果没有，请手动创建。

### Print: Entry, ":CFBundleIdentifier", Does Not Exist

```shell
** BUILD FAILED **

The following build commands failed:
        Ld /Users/yangtuan/Works/bnb-boss/ios/build/Build/Products/Debug-iphonesimulator/ReactNativeStarterKit.app/ReactNativeStarterKit normal x86_64
(1 failure)

Installing build/Build/Products/Debug-iphonesimulator/ReactNativeStarterKit.app
An error was encountered processing the command (domain=NSPOSIXErrorDomain, code=22):
Failed to install the requested application
The bundle identifier of the application could not be determined.
Ensure that the application's Info.plist contains a value for CFBundleIdentifier.
Print: Entry, ":CFBundleIdentifier", Does Not Exist
```

**关键信息：**
`Print: Entry, ":CFBundleIdentifier", Does Not Exist`

**错误描述：**
问题所在是因为 React Native 采用国内镜像安装时，导致某些包没有安装好。

根据 React Native 的不同版本，查看依赖的第三方包的情况：
[https://github.com/facebook/react-native/blob/0.58-stable/scripts/ios-install-third-party.sh](https://github.com/facebook/react-native/blob/0.58-stable/scripts/ios-install-third-party.sh)

```shell
fetch_and_unpack glog-0.3.5.tar.gz https://github.com/google/glog/archive/v0.3.5.tar.gz 61067502c5f9769d111ea1ee3f74e6ddf0a5f9cc "\"$SCRIPTDIR/ios-configure-glog.sh\""
fetch_and_unpack double-conversion-1.1.6.tar.gz https://github.com/google/double-conversion/archive/v1.1.6.tar.gz 1c7d88afde3aaeb97bb652776c627b49e132e8e0
fetch_and_unpack boost_1_63_0.tar.gz https://github.com/react-native-community/boost-for-react-native/releases/download/v1.63.0-0/boost_1_63_0.tar.gz c3f57e1d22a995e608983effbb752b54b6eab741
fetch_and_unpack folly-2018.10.22.00.tar.gz https://github.com/facebook/folly/archive/v2018.10.22.00.tar.gz
```

以0.58的版本来说，主要是 `glog-0.3.5.tar.gz`、`double-conversion-1.1.6.tar.gz`、`boost_1_63_0.tar.gz`、`folly-2018.10.22.00.tar.gz` 这四个包。

一般情况下，是因为 `boost_1_63_0.tar.gz` 包下载不完整造成的。因此， `boost_1_63_0.tar.gz` 这个包必须要在这个网站 [http://www.boost.org/users/history/version_1_63_0.html](http://www.boost.org/users/history/version_1_63_0.html) 进行手动下载。

**解决办法：**
重新安装 React Native 所依赖的第三方包。

1、删除关联包和缓存
```shell
rm -rf node_modelus/ && rm -rf ~/.rncache
```

2、创建文件夹并手动安装包
```
手动创建~/.rncache文件夹，并将下载好的glog-0.3.5.tar.gz、double-conve
rsion-1.1.6.tar.gz、boost_1_63_0.tar.gz、folly-2018.10.22.00.tar.gz手工放入文件夹下。
```

3、npm
```
npm i 或者yarn，安装全部的依赖。
```

4、link
```
如果有link等操作的话，还要记得执行。
```


### linker command failed with exit code 1 (use -v to see invocation)

```shell
ld: 252 duplicate symbols for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

该问题主要是因为项目中重复导入了某些文件，可尝试以下两种解决方案：

```
1. 设置 `Product` -> `Clear Build Folder`，清除构建目录之后，再执行构建尝试（如果不行可以多次尝试）。
```

```
2. 设置 `Project` -> `Pods` 下所有第三方库的 `Build Active Architecture Only` 为 `YES`。
```