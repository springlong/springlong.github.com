USE  数据库名称							--欲创建表所在的数据库的名称，如果是中文名，最好加[]
GO

Create Table  [表的名称]					--欲创建表的名称，如果是中文名，最好加[]
(
	字段1  数据类型   条件（NULL|NOT NULL）,
	字段2  数据类型   条件（NULL|NOT NULL）,
	........
	字段n  数据类型	 条件（NULL|NOT NULL）,

	Constraint PK_主键名称 Primary Key(相应字段)  Clustered|NONClustered,				--欲创建表的主键信息！可以允许多个字段一同构建主键

	Constraint FK_外键名称 Foreign Key(相应字段） References 引用的表(相应字段),		--欲创建表的外键信息!

	Constraint IX_UNIQUE约束名称 Unique Clustered|NONClustered (UNIQUE约束的列名),   	--欲创建表的UNIQUE约束

	Constraint CK_检索名称 Check(检索约束表达式),										--欲创建表的检索约束！
) 
On FileGroup		--表将被放置在哪一文件组中？省略则默认为主文件组！
