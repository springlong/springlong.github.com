
## 常用git命令


查看帮助

	git help   		  // 查看git所支持的所有命令
	git help add    // 查看git add命令的帮助信息
	git version 	  // 查看版本号


初始化仓库

	git init 		    // 在当前目录下新建一个Git仓库。创建了一个.git 的隐藏目录，仓库的所有数据都放在这个目录里。


查看最近的操作日志

	git log           // 查看当前目录的日志
	git log test.txt  // 查看指定文件的日志
	git log images    // 查看指定目录的日志
	git log --pretty=oneline  // 让日志呈一行显示，默认情况下为多行显示


查看当前目录下的修改情况

	git status


查看与上一版本文件的差异

	git diff 					 // 查看当前目录下所有文件与上一版的差异
	git diff HEAD -- readme.txt  // 查看工作区和版本库里面最新版本的区别


添加文件到git仓库的暂存区

	git add test.txt   // 添加指定文件
	git add images     // 添加指定目录


从暂存区或工作区中删除文件或目录

	git rm --cached test.txt    // 从暂存区中删除
	git rm -f test.txt          // 从工作区和版本库中删除

	git rm --cached images      // 从暂存区删除指定目录
	git rm -f images            // 从工作区和版本库中删除指定目录


在暂存区以及工作区中移动或重命名文件/目录

	git mv test.txt test.html   // 将指定文件重命名
	git mv images pictures      // 将指定目录重命名


将暂存区中的修改提交到本地仓库（版本库）

	git commit -m "message"     // 提交当前目录下的所有变更到仓库，并通过-m选项附带message
	git commit -a -m "message"  // 通过-a选项，将自动从所有已知文件中添加“更改”，并自动从工作树中删除索引中的“rm”文件，然后执行实际提交


撤销文件在工作区的全部修改
让这个文件回到最近一次git commit或git add时的状态

	git checkout -- readme.txt


将本地仓库（版本库）回退到指定的版本

	git reset --hard HEAD^          // 回退到上一个版本
	git reset --hard HEAD^^         // 回退到上上一个版本
	git reset --hard HEAD~100       // 回退到上100个版本
	git reset --hard <commit_id>    // 回退到指定的版本号


查看命令历史，以便确定要回到未来的哪个版本

	git reflog


将git远程仓库克隆一份到当前目录

	git clone <远程仓库地址>


将本地分支的更新，推送到远程主机

	git push <远程主机名> <本地分支名>:<远程分支名>


取回远程主机某个分支的更新，再与本地的指定分支合并

	git pull <远程主机名> <远程分支名>:<本地分支名>


更新服务器的数据到本地

	git fetch 	 // 相当于是从远程获取最新版本到本地，不会自动merge


将当前工作区的修改储藏起来
现在你想切换分支，但是你还不想提交你正在进行中的工作；所以你储藏这些变更。

	git stash save "message" 		// 将当前工作区的变更储藏起来,并恢复到最近的版本状态
	git stash list  				// 要查看现有的储藏
	git stash apply 				// 应用最近版本的储藏内容(储藏的内容仍然在储藏栈上)
	git stash apply stash@{2} 		// 应用指定版本的储藏内容(储藏的内容仍然在储藏栈上)
	git stash drop stash@{0}        // 将指定版本的储藏内容从储藏栈中移除
	git stash pop  					// 应用储藏，同时立刻将其从储藏栈中移走




