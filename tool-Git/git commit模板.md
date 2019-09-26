
## git commit模板

在 SourceTree 中可以配置 commit 模板, 菜单路径为：`Source-偏好设置-提交` 。

在使用中主要用到前两段信息，`Type: <subject>` 是必须存在，`<Body>` 在需要时用于详细描述，非必要内容以及注释需要删掉。

```
# Type: <subject>

# <Body>

# <Footer>

# Type 字段包含:
#  feat：新功能（feature）
#  fix：修补bug
#  docs：文档（documentation）
#  style： 格式（不影响代码运行的变动）
#  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
#  test：增加测试
#  chore：构建过程或辅助工具的变动

# subject 是 commit 目的的简短描述，不超过50个字符
# Body 部分是对本次 commit 的详细描述，可以分成多行
# Footer 用来关闭 Issue 或以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法
```