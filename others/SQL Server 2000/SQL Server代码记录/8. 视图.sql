Use 数据库名
Go

--创建视图

/*
Create  View  视图名							--若要修改视图，则将Create关键字改为Alter关键字即可！

--With  Encryption							--加上该语句表示加密该视图，使其不作为复制的一部分
	
As
	Select语句

--With  Check  Option						--加上该语句表示对视图的所有插入、更新等操作必须符合该视图的查询条件
*/



--sp_helpText 视图名称							--查看视图的创建文本

--sp_help 视图名称								--查看视图的相关信息

--sp_depends 视图名称							--查看视图的依赖关系

--sp_rename 旧名称,新名称						--更改视图的名称

--Drop View 视图名称								--移除视图

