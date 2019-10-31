
window.dataBedroom = {
  name: '家居家纺',
  goods: [
    {
      title: '商品标题',
      keywords: ['关键字'],
      goodsPrice: '商品售价',
      vipPrice: '会员售价',
      pictures: []
    }
  ]
};


window.dataDaily = {
  name: '日常用品',
  goods: [
    {
      title: '商品标题',
      keywords: ['关键字'],
      goodsPrice: '商品售价',
      vipPrice: '会员售价',
      pictures: []
    }
  ]
};


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


window.dataMaternal = {
  name: '母婴用品',
  goods: [
    ...(window['dataBrand_美素佳儿'] || []),
    ...(window['dataBrand_伊利_金领冠'] || []),
  ]
};


window.dataWash = {
  name: '洗护用品',
  goods: [
    {
      title: 'Herbacin-德国小甘菊-新柔皙护手霜-20ml-2支装',
      keywords: ['Herbacin', '德国小甘菊', '护手霜'],
      pictures: [
        {
          type: 'star',
          goodsPrice: 29.9,
          commission: 0.39,
          image: './images/dataWash/Herbacin-德国小甘菊-新柔皙护手霜-20ml-2支装.PNG',
          url: 'https://friend.380star.com/goods.do?goodsid=7377342&flag=0&storeid=244721&shareuserid=655864&addspuserid=655864',
        },
        {
          type: 'tmall',
          goodsPrice: 23.9*2,
          couponPrice: 23.9*2-5,
          image: './images/dataWash/Herbacin-德国小甘菊-新柔皙护手霜-20ml-2支装-tmall-tmcs.PNG',
          url: 'https://m.tb.cn/h.enykjdr?sm=9de486',
        },
      ]
    },
    {
      title: 'Herbacin-德国贺本清-小甘菊-护手霜-75ml-2支',
      keywords: ['Herbacin', '德国小甘菊', '护手霜'],
      pictures: [
        {
          type: 'star',
          goodsPrice: 59,
          commission: 1.32,
          image: './images/dataWash/Herbacin-德国贺本清-小甘菊-护手霜-75ml-2支.PNG',
          url: 'https://friend.380star.com/goods.do?goodsid=6646715&flag=0&storeid=244721&shareuserid=655864&addspuserid=655864',
        },
        {
          type: 'tmall',
          goodsPrice: 59*2,
          image: './images/dataWash/Herbacin-德国贺本清-小甘菊-护手霜-75ml-2支-tmall-tmcs.PNG',
          url: 'https://m.tb.cn/h.eny9yDp?sm=cb4eed',
        },
      ]
    },
  ]
};


window.datakitchenCookers = {
  name: '厨房用具',
  goods: [
    {
      title: '商品标题',
      keywords: ['关键字'],
      goodsPrice: '商品售价',
      vipPrice: '会员售价',
      pictures: []
    }
  ]
};


window.datakitchenMaterial = {
  name: '厨房用料',
  goods: [
    ...(window['dataBrand_海天'] || []),
    ...(window['dataBrand_伊通河'] || []),
    ...(window['dataBrand_先农氏'] || []),
    ...(window['dataBrand_神农百谷'] || []),
    ...(window['dataBrand_金龙鱼'] || []),
    ...(window['dataBrand_香纳兰'] || []),
    ...(window['dataBrand_拾光稻田'] || []),
    ...(window['dataBrand_丑粮'] || []),
    ...(window['dataBrand_金禾世家'] || []),
    ...(window['dataBrand_叶盛贡米'] || []),
  ]
};
