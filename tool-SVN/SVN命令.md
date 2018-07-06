
## svn常用命令

查看帮助

	svn help          //查看svn所支持的所有命令
	svn help commit   //查看svn commit命令的帮助信息
	svn commit -?     //查看svn commit命令的帮助信息
	svn commit -h     //查看svn commit命令的帮助信息


查看最近的操作日志

	svn log           //查看当前目录的日志
	svn log test.txt  //查看指定文件的日志
	svn log images    //查看指定目录的日志

	svn log -r 4:20   //查看版本4到20的日志（递增显示）
	svn log -r 20:4   //查看版本20到4的日志（递减显示）
	svn log -l 20     //显示最近的最多20条的日志
	svn log -v -l 1   //显示最近一条日志的详细修改信息


查看当前目录下的修改情况

	svn status


更新服务器的数据到本地

	svn update           //更新当前目录下的所有文件内容
	svn update test.txt  //更新指定文件到本地
	svn update images    //更新指定目录到本地


添加本地数据到服务器

	svn add test.txt   //添加指定文件
	svn add images     //添加指定目录


对文件或目录进行重命名处理

	svn mv test.txt test.html   //将指定文件重命名
	svn mv images pictures      //将指定目录重命名


对文件或目录执行删除处理

	svn rm test.txt    //删除指定文件
	svn rm images      //删除指定目录


将本地更新的文件提交到服务器

	svn commit -m "message"   //提交当前目录下的所有变更到服务器


在上面代码中的目录部分，可以指定相对于根目录或者当前目录下的多级目录:

	svn update images/countrys/us    //相对于当前目录下的多级目录
	svn update wwwroot/webfiles/images/countrys/us    //相对于根目录下的多级目录