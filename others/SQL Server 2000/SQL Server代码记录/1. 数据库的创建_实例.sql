USE master
GO

--注意：数据文件以及日志文件的保存路径必须存在
--在创建完新的数据库之后，请记得及时备份master数据库！

Create Database newDatabase3
On Primary
(
	Name='newDatabase_Data',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Data.MDF',
	Size=1,
	MaxSize=Unlimited,
	FileGrowth=10%
),
(
	Name='newDatabase_Data2',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Data2.NDF',
	Size=1,
	MaxSize=10,
	FileGrowth=10%
),
(
	Name='newDatabase_Data3',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Data3.NDF',
	Size=1,
	MaxSize=Unlimited,
	FileGrowth=10%
),
FileGroup Secondary
(
	Name='newDatabase_Data4',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Data4.NDF',
	Size=1MB,
	FileGrowth=1MB
),
(
	Name='newDatabase_Data5',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Data5.NDF',
	Size=1024KB,
	MaxSize=10MB,
	FileGrowth=1MB
)

Log On
(
	Name='newDatabase_Log',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Log.LDF',
	Size=1MB,
	MaxSize=Unlimited,
	FileGrowth=1MB
),
(
	Name='newDatabase_Log2',
	FileName='E:\SQL Server 2000\newDatabase3\newDatabase_Log2.LDF',
	Size=1MB,
	MaxSize=Unlimited,
	FileGrowth=10%
)


