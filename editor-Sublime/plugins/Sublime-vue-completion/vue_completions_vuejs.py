import sublime, sublime_plugin
import re
import types

def match(rex, str):
    # 返回正则匹配结果
    m = rex.match(str)
    if m:
        return m.group(0)
    else:
        return None

class GetSettingsPrepare():
    def init(self):

        # 读取自己的设置文件
        settings = sublime.load_settings('vue_completions.sublime-settings')
        # print('settings:', settings)

        # 标签私有属性的配置对象
        tag_data = settings.get('tag_data')
        component_data = settings.get('component_data')
        tag_data.update(component_data)

        # 标签的全局属性
        html_attributes = settings.get('html_attributes')
        directive = settings.get('directive')
        global_attributes = []
        global_attributes.extend(html_attributes)
        global_attributes.extend(directive)

        # 标签列表
        tag_list = list(tag_data.keys())

        # 自定义标签的completion列表
        custom_completion = settings.get('custom_completion')

        # 按标签首字母，对标签的comple列表进行分组
        self.prefix_completion_tag_dict = {}

        for tag in tag_list:
            prefix = tag[0]
            tag_completion = make_completion(tag)
            custom_list = []

            # 将自定义标签的completion列表合并到tag_dict
            for item in custom_completion:
                tag_name = item[0].split('\t')
                custom_tag = tag_name[0]
                tag_name = tag_name[0].split(':')[0]
                if custom_tag == tag:
                    tag_completion = 'false'
                if tag_name == tag:
                    custom_list.append(item)

            # 如果自定义的completion为原标签，则覆盖
            # 否则还需要将原标签的completion注入到tag_dict
            if tag_completion != 'false':
                self.prefix_completion_tag_dict.setdefault(prefix, []).append(tag_completion)
            self.prefix_completion_tag_dict.setdefault(prefix, []).extend(custom_list)

        # 获取标签对应的属性列表
        self.tag_data = tag_data
        self.html_attributes = html_attributes
        self.directive = directive
        self.global_attributes = global_attributes

        # 打印测试
        # print(self.tag_data)
        # print(self.global_attributes)
        # print(self.prefix_completion_tag_dict)


# Sublime Text 3的资源加载都是异步，在试图访问之前使用 plugin_loaded() 的回调
setting_cache = GetSettingsPrepare()

if int(sublime.version()) < 3000:
  setting_cache.init()
else:
  def plugin_loaded():
    global setting_cache
    setting_cache.init()


class TagCompletions(sublime_plugin.EventListener):
    global setting_cache

    def on_query_completions(self, view, prefix, locations):
        # 该函数当sublime触发自动完成时被执行
        # 在该回调函数中可以返回complete列表，用于sublime的自动完成提示
        #
        # view: 视图对象，提供相关操作函数
        # prefix: 当前输入的匹配字符串，匹配字符串为被换行符\n，制表符\t，空格' '，点号'.'，冒号':'隔断
        # locations: 当前输入的位置，由于可以多行编辑，所以这里是一个数组

        # 仅针对JS有效
        if not view.match_selector(locations[0], "source.js"):
            return []

        # 返回complete列表
        return self.get_completions(view, prefix, locations)

    def get_completions(self, view, prefix, locations):

        # flags-sublime.INHIBIT_WORD_COMPLETIONS
        # 抑制文档中的单词生成的completion列表
        #
        # flags-sublime.INHIBIT_EXPLICIT_COMPLETIONS
        # 抑制从.sublime-completions中生成的completion列表

        # 获取ch，表示当前匹配字符串的前一个字符是什么
        pt = locations[0] - len(prefix) - 1
        ch = view.substr(sublime.Region(pt, pt + 1))
        completion_list = []

        # 打印测试
        print('get_completions:', {'prefix':prefix, 'locations':locations, 'ch':ch})

        # 抑制单词的completion列表以及.sublime-completions列表
        flags = 0
        if ch == '$':
            flags = sublime.INHIBIT_WORD_COMPLETIONS | sublime.INHIBIT_EXPLICIT_COMPLETIONS

        completion_list = [
            ('console.log \tJSProp', 'console.log'),
            ('console.info \tJSProp', 'console.info'),
            ('console.debug \tJSProp', 'console.debug'),
            ('console.warn \tJSProp', 'console.warn'),
            ('console.error \tJSProp', 'console.error'),
            ('console.group \tJSProp', 'console.group'),
            ('console.groupEnd \tJSProp', 'console.groupEnd'),
            ('console.table \tJSProp', 'console.table'),
            ('console.trace \tJSProp', 'console.trace'),
            ('console.time \tJSProp', 'console.time'),
            ('console.timeEnd \tJSProp', 'console.timeEnd'),
            ('console.count \tJSProp', 'console.count'),
            ('console.profile \tJSProp', 'console.profile'),
            ('console.profileEnd \tJSProp', 'console.profileEnd'),
            ('console.dir \tJSProp', 'console.dir'),
            ('console.clear \tJSProp', 'console.clear'),

            ('name \tVue', 'name'),
            ('props \tVue', 'props'),
            ('data \tVue', 'data'),
            ('methods \tVue', 'methods'),
            ('watch \tVue', 'watch'),
            ('template \tVue', 'template'),

            ('mode \tVueRouter', 'mode'),
            ('hash \tVueRouter', 'hash'),
            ('history \tVueRouter', 'history'),
            ('routes \tVueRouter', 'routes'),
            ('path \tVueRouter', 'path'),
            ('fullPath \tVueRouter', 'fullPath'),
            ('alias \tVueRouter', 'alias'),
            ('name \tVueRouter', 'name'),
            ('meta \tVueRouter', 'meta'),
            ('props \tVueRouter', 'props'),
            ('component \tVueRouter', 'component'),
            ('components \tVueRouter', 'components'),
            ('scrollBehavior \tVueRouter', 'scrollBehavior'),
            ('savedPosition \tVueRouter', 'savedPosition'),
            ('children \tVueRouter', 'children'),
            ('redirect \tVueRouter', 'redirect'),
            ('query \tVueRouter', 'query'),
            ('params \tVueRouter', 'params'),
            ('matched \tVueRouter', 'matched'),
            ('$router \tVueRouter', 'router'),
            ('$route \tVueRouter', 'route'),
            ('beforeEach \tVueRouter', 'beforeEach'),
            ('beforeEnter \tVueRouter', 'beforeEnter'),
            ('beforeResolve \tVueRouter', 'beforeResolve'),
            ('afterEach \tVueRouter', 'afterEach'),
            ('beforeRouteEnter  \tVueRouter', 'beforeRouteEnter'),
            ('beforeRouteUpdate  \tVueRouter', 'beforeRouteUpdate'),
            ('beforeRouteLeave  \tVueRouter', 'beforeRouteLeave'),
            ('to \tVueRouter', 'to'),
            ('from \tVueRouter', 'from'),
            ('next \tVueRouter', 'next'),
            ('push \tVueRouter', 'push'),
            ('replace \tVueRouter', 'replace'),
            ('go \tVueRouter', 'go'),


            ('axios \taxios', 'axios'),
            ('method \taxios', 'method'),
            ('url \taxios', 'url'),
            ('then \taxios', 'then'),
            ('catch \taxios', 'catch'),
            ('params \taxios', 'params'),
            ('data \taxios', 'data'),
        ]

        return (completion_list, flags)
