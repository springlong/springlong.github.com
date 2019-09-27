var vm = new Vue({
  el: '#goodsBox',
  data: {
    goodsGroup: [
      window.datakitchenMaterial,  // 厨房用料
      window.datakitchenCookers,  // 厨房用具
      window.dataFood,  // 食品零食
      window.dataDrinks,  // 酒水饮料
      window.dataDaily,  // 日常用品
      window.dataClean,  // 清洁卫生
      window.dataClean,  // 美妆用品
      window.dataMaternal,  // 母婴用品
      window.dataJewelry,  // 珠宝首饰
      window.dataDress,  // 服饰鞋包
      window.dataBedroom,  // 家居家纺
      window.dataFurniture,  // 家用家具
      window.dataHomeElectronic,  // 电器设备
      window.dataElectronicDigital,  // 电子数码
      window.dataOhters,  // 其它用品
    ]
  }
});