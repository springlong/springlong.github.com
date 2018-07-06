import sublime, sublime_plugin
import string


class PleasurazyAPICompletionsPackage():
  def init(self):
    self.api = {}
    self.settings = sublime.load_settings('fed-setting.sublime-settings')
    self.API_Setup = self.settings.get('completion_active_list')

    # Caching completions
    if self.API_Setup:
      for API_Keyword in self.API_Setup:
        self.api[API_Keyword] = sublime.load_settings('fed-api-' + API_Keyword + '.sublime-settings')


# In Sublime Text 3 things are loaded async, using plugin_loaded() callback before try accessing.
pleasurazy = PleasurazyAPICompletionsPackage()

if int(sublime.version()) < 3000:
  pleasurazy.init()
else:
  def plugin_loaded():
    global pleasurazy
    pleasurazy.init()


def remove_html_css_completions():
    # 移除Sublime自带的CSS提示
    for completer in ["CSS.css_completions.CSSCompletions"]:
        completions = sublime_plugin.all_callbacks['on_query_completions']
        for i, instance in enumerate (completions):
            typestr = str(instance)
            if typestr.find(completer) >= 0:
                print('delete Completion:', typestr)
                del completions[i]
sublime.set_timeout(remove_html_css_completions, 2000)


class PleasurazyAPICompletionsPackageEventListener(sublime_plugin.EventListener):
  global pleasurazy

  def on_query_completions(self, view, prefix, locations):
    self.completions = []

    for API_Keyword in pleasurazy.api:
      # If completion active
      if (pleasurazy.API_Setup and pleasurazy.API_Setup.get(API_Keyword)):
        scope = pleasurazy.api[API_Keyword].get('scope')
        if scope and view.match_selector(locations[0], scope):
          self.completions += pleasurazy.api[API_Keyword].get('completions')

    if not self.completions:
      return []

    # extend word-completions to auto-completions
    compDefault = [view.extract_completions(prefix)]
    compDefault = [(item, item) for sublist in compDefault for item in sublist if len(item) > 3]
    compDefault = list(set(compDefault))
    completions = list(self.completions)
    completions = [tuple(attr) for attr in self.completions]
    completions.extend(compDefault)
    return (completions)
