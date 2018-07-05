/*--创建规则：

Create  Rule  [规则名称] 
As   
	规则表达式												--规则表达式必须使用变量，如：@age>=28

*/

--EXEC  sp_bindrule  '[规则名称]' ,  '[表名].[列名]'			--将规则绑定到指定表的指定列上！

--EXEC  sp_unbindrule   '[表名].[列名] '						--将指定表的指定列解除规则的绑定！






/*--创建默认值：

Create  Default  [默认值名称]  As   '默认值'

*/

--EXEC  sp_bindefault  '[默认值名称]'  ,  '[表名].[列名]'		--将默认值绑定到指定表的指定列上！

--EXEC  sp_unbindefault  '[表名].[列名]'						--将指定表的指定列解除默认值的绑定！
