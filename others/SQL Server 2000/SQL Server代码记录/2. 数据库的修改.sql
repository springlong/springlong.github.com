USE master
GO

Alter Database  欲修改的数据库名称

/*
Modify File							--修改数据文件
(Name='',							--欲修改的数据文件名称
	Size= ,							--修改原数据文件的大小(注意：不能小于当前文件的大小）
	MaxSize= ,						--修改元数据文件大小的最大值
	FileGrowth=						--修改原数据文件的增长方式
)
*/

/*
Modify File							--修改日志文件
(Name='',							--欲修改的日志文件名称
	Size= ,							--修改原日志文件的大小(注意：不能小于当前文件的大小）
	MaxSize= ,						--修改原日志文件大小的最大值
	FileGrowth=						--修改原日志文件的增长方式
)
*/

/*
Remove File '数据文件名称'					--删除数据文件
*/

/*
Remove File '日志文件名称'					--删除日志文件
*/

/*
Remove FileGroup 文件组的名称				--删除文件组(注意：在删除文件组时，必须保证该分组内没有数据文件！）
*/

/*
Add FileGroup 文件组的名称					--添加文件组
*/

/*
Add File					--添加数据文件
(Name='',								--欲添加的数据文件的名称
	FileName='',						--欲添加的数据文件的保存路径
	Size= ,								--欲添加的数据文件的大小
	MaxSize= ,							--欲添加的数据文件大小的最大值
	FileGrowth=							--欲添加的数据文件的增长方式
),
(Name='',								--欲添加的数据文件的名称
	FileName='',						--欲添加的数据文件的保存路径
	Size= ,								--欲添加的数据文件的大小
	MaxSize= ,							--欲添加的数据文件大小的最大值
	FileGrowth=							--欲添加的数据文件的增长方式
) To FileGroup 文件组的名称				--以上欲添加的数据文件所属的文件组！
*/

/*
Add Log File				--添加日志文件
(Name='',								--欲添加的日志文件的名称
	FileName='',						--欲添加的日志文件的保存路径
	Size= ,								--欲添加的日志文件的大小
	MaxSize= ,							--欲添加的日志文件大小的最大值
	FileGrowth=							--欲添加的日志文件的增长方式
),
(Name='',								--欲添加的日志文件的名称
	FileName='',						--欲添加的日志文件的保存路径
	Size= ,								--欲添加的日志文件的大小
	MaxSize= ,							--欲添加的日志文件大小的最大值
	FileGrowth=							--欲添加的日志文件的增长方式
)
*/

GO