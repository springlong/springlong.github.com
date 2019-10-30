
window.dataFood = {
  name: '食品零食',
  goods: [
    ...(window['dataBrand_甄伴'] || []),
    ...(window['dataBrand_伊利'] || []),
    ...(window['dataBrand_蒙牛'] || []),
    ...(window['dataBrand_海底捞'] || []),
    ...(window['dataBrand_小七陈卤'] || []),
  ]
};
