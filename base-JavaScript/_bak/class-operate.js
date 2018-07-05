var Extend = {};

/**
 * 判断类型是否为：元素节点（即HTML标签元素）
 * @param  {任意类型}  value 需要判断的值
 * @return {Boolean}
 */
Extend.isElement = function(value)
{
    return value && value.nodeType === 1;
};

/**
 * 判断类型是否为：一个有效的字符串（即非全空格成员）
 * @param  {任意类型}  value 需要判断的值
 * @return {Boolean}
 */
Extend.isValidString = function(value)
{
    return typeof(value) === "string" && !/^\s*$/.test(value);
};

/**
 * 为元素添加类名值
 * @param {HTMLElement} obj 目标元素
 * @param {String} name 类名值
 * @return {undefined}
 */
Extend.addClass = function(obj, name)
{
    if(Extend.isElement(obj) && Extend.isValidString(name))
    {
        var className = obj.className;
        if((" " + className + " ").indexOf(" " + name + " ") === -1) 
        {
            obj.className = className + " " + name;
        }
    }
};

/**
 * 为元素移除某个类名值
 * @param {HTMLElement} obj 目标元素
 * @param {String} name 类名值
 * @return {undefined}
 */
Extend.removeClass = function(obj, name)
{
    if(Extend.isElement(obj) && Extend.isValidString(name))
    {
        var className = " " + obj.className + " ";
        name = " " + name + " ";
        while(className.indexOf(name) !== -1)
        {
            className = className.replace(name, " "); //注意：这里不能使用正则进行全局替换，因为那样在类名字符串存在连续多个相同的类名时最终会保留一个
        }
        obj.className = className.trim();
    }
};

/**
 * 为元素切换类名值
 * @param {HTMLElement} obj 目标元素
 * @param {String} name 类名值
 * @return {undefined}
 */
Extend.toggleClass = function(obj, name)
{
    Extend.hasClass(obj, name) ? Extend.removeClass(obj, name) : Extend.addClass(obj, name);
};

/**
 * 判断元素是否存在某个类名值
 * @param {HTMLElement} obj 目标元素
 * @param {String} name 类名值
 * @return {Boolean}
 */
Extend.hasClass = function(obj, name)
{
    return Extend.isElement(obj) && Extend.isValidString(name) && (" " + obj.className + " ").indexOf(" " + name + " ") !== -1;
};