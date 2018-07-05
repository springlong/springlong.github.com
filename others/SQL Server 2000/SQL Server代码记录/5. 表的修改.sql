USE  [数据库名称]						--欲修改表所在的数据库的名称
GO

Alter Table [表名]						--欲修改表的名称
	Alter Column  [字段]  数据类型  条件	--欲修改字段的相关信息重置，除了字段名以外！
	GO

Alter Table [表名]						--欲修改表的名称
	Drop Column  [字段]					--欲删除字段的名称！
	GO
		
Alter Table [表名]						--欲修改表的名称
	Add [字段]  数据类型  条件			--欲修添加字段的相关信息！
	GO
