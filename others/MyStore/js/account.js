
var vm = new Vue({
  el: '#accountBox',
  data: {
    // 是否完成挂载
    isDone: false,
    // 商品标题
    goodsTitle: '安慕希原味酸奶205g*12瓶',
    // 商品价格
    goodsPrice: 53.9,
    // 商品佣金
    goodsCommission: 0.33,
    // 星力值倍数
    xinglizhiMultiple: 1,
    // 额外星力值
    extraXinglizhi: 0,
    // 星力值兑换比例
    ratio: 22,
    // 当下星钻价值
    xzPriceCurrent: 2.4,
    // 一年后星钻价值
    xzPriceOneYearLater: 10,
    // 三年后星钻价值
    xzPriceThreeYearLater: 30,
  },
  computed: {
    // 获得的星力值
    xinglizhi: function() {
      return parseFloat(this.goodsPrice) * this.xinglizhiMultiple + Math.round(this.extraXinglizhi);
    },
    // 星钻数量
    xzCount: function() {
      return this.xinglizhi/this.ratio;
    },
    // 星钻当下价值
    xzValue: function() {
      return this.xzCount*this.xzPriceCurrent;
    },
    // 当下商品花费
    goodsPayMoney: function() {
      return parseFloat(this.goodsPrice) - this.xzValue - (this.goodsCommission || 0);
    },
    // 当下节省的费用
    goodsSaveMoney: function() {
      return this.xzValue + this.goodsCommission;
    },

    // 一年后星钻价值
    xzValueOneYearLater: function() {
      return this.xzCount*this.xzPriceOneYearLater;
    },
    // 一年后商品花费
    goodsPayMoneyOneYearLater: function() {
      return parseFloat(this.goodsPrice) - this.xzValueOneYearLater - (this.goodsCommission || 0);
    },
    // 一年后节省的费用
    goodsSaveMoneyOneYearLater: function() {
      return this.xzValueOneYearLater + this.goodsCommission;
    },

    // 三年后星钻价值
    xzValueThreeYearLater: function() {
      return this.xzCount*this.xzPriceThreeYearLater;
    },
    // 三年后商品花费
    goodsPayMoneyThreeYearLater: function() {
      return parseFloat(this.goodsPrice) - this.xzValueThreeYearLater - (this.goodsCommission || 0);
    },
    // 三年后节省的费用
    goodsSaveMoneyThreeYearLater: function() {
      return this.xzValueThreeYearLater + this.goodsCommission;
    },
  },
  mounted() {
    this.isDone = true;
  },
});