USE master
GO

--Drop  DataBase 数据库名										--删除指定数据库


--DBCC  ShrinkDatabase(数据库名,收缩后剩余空间的可用百分比) 		--收缩数据库


--sp_Attach_DB 所需附加数据库的名称, '数据库文件地址1','数据库文件地址2','...' 


--sp_DeTach_DB  所需分离的数据库的名称,True/False					--其中True/False，表示是否更新统计信息，建议使用True！


--SP_AddumpDevice 'Disk','逻辑名称','物理路径'					--添加备份设备！


--SP_DropDevice  '备份设备的逻辑名称',delfile						--删除备份设备，delfile参数表示同时删除物理文件！


GO		
--运行！
