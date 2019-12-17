
var vm = new Vue({
  el: '#goldBox',
  data: {
    // 是否完成挂载
    isDone: false,
    // 选择日期
    selectedDate: '20191209',
    // 黄金价格表
    goldPriceList: {
      '20191209': { value: '20191209', name: '2019年12月09日', '50': 18699, '100': 37039, '200': 73729, repo: 331.69 },
      '20191208': { value: '20191208', name: '2019年12月08日', '50': 18919, '100': 37479, '200': 74589, repo: 335.74 },
      '20191207': { value: '20191207', name: '2019年12月07日', '50': 18919, '100': 37479, '200': 74589, repo: 335.74 },
      '20191206': { value: '20191206', name: '2019年12月06日', '50': 18919, '100': 37479, '200': 74589, repo: 335.74 },
      '20191205': { value: '20191205', name: '2019年12月05日', '50': 18939, '100': 37519, '200': 74669, repo: 336.13 },
      '20191204': { value: '20191204', name: '2019年12月04日', '50': 19000, '100': 37700, '200': 74900, repo: 336.81 },
      '20191203': { value: '20191203', name: '2019年12月03日', '50': 18800, '100': 37200, '200': 73990, repo: 332.36 },
      '20191202': { value: '20191202', name: '2019年12月02日', '50': 18600, '100': 37000, '200': 73700, repo: 331.42 },
      '20191201': { value: '20191201', name: '2019年12月01日', '50': 18594, '100': 36875, '200': 73430, repo: 330.44 },
    },
    // 选择重量
    selectedWeight: '200',
    // 重量列表
    weightList: [
      { value: 50, name: '50克' },
      { value: 100, name: '100克' },
      { value: 200, name: '200克' },
    ],
    // 选择倍数
    selectedMultiple: 1.5,
    // 倍数列表
    multipleList: [
      { value: 2.5, name: '2.5倍' },
      { value: 2, name: '2倍' },
      { value: 1.5, name: '1.5倍' },
      { value: 1.2, name: '1.2倍' },
      { value: 1, name: '1倍' },
    ],
    // 预期价格
    selectedExpectPrice: '2',
    // 预期价格列表
    expectPriceList: [
      { value: 1.2, name: '1.2元/GSL' },
      { value: 1.5, name: '1.5元/GSL' },
      { value: 1.8, name: '1.8元/GSL' },
      { value: 1.9, name: '1.9元/GSL' },
      { value: 2, name: '2元/GSL' },
      { value: 2.1, name: '2.1元/GSL' },
      { value: 2.2, name: '2.2元/GSL' },
      { value: 2.3, name: '2.3元/GSL' },
      { value: 2.4, name: '2.4元/GSL' },
      { value: 2.5, name: '2.5元/GSL' },
      { value: 2.8, name: '2.8元/GSL' },
      { value: 3, name: '3元/GSL' },
      { value: 4, name: '4元/GSL' },
      { value: 5, name: '5元/GSL' },
      { value: 6, name: '6元/GSL' },
      { value: 7, name: '7元/GSL' },
      { value: 8, name: '8元/GSL' },
      { value: 9, name: '9元/GSL' },
      { value: 10, name: '10元/GSL' },
    ],
  },
  computed: {
    // 当前选择项
    selectedItem: function() {
      return this.goldPriceList[this.selectedDate];
    },
    // 支付金额
    payMoney: function() {
      return this.selectedItem[this.selectedWeight];
    },
    // 回购金额
    repoMoney: function() {
      return Math.round(this.selectedItem.repo * this.selectedWeight);
    },
    // 花费成本
    chenbenMoney: function() {
      return Math.round(this.payMoney - this.repoMoney);
    },
    // 星力值
    xinglizhi: function() {
      return Math.round(this.payMoney*this.selectedMultiple);
    },
    // 信息展示列表
    infoList: function() {
      const infoList = [];

      for (var i = 20; i <= 50; i += 1) {
        var xzCount = Math.round(this.xinglizhi / i);
        var chengben = (this.chenbenMoney / xzCount).toFixed(4);
        var gslPrice = Math.round(this.selectedExpectPrice);
        var lirun = xzCount * gslPrice - this.chenbenMoney;
        var taoli = Math.round(xzCount - this.chenbenMoney/gslPrice);

        infoList.push({
          bili: i,
          xzCount,
          chengben,
          lirun,
          taoli,
        })
      }

      return infoList;
    }
  },
  mounted() {
    this.isDone = true;
  },
});
