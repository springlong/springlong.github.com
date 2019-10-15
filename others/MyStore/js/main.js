// title - 网页标题
// keywords - 搜索关键词（简写k）
// showPrice - 是否显示价格信息
// vipLevel - 星链会员等级
// goodsType - 展示的商品分类
// filterType = 'cheapBySale' - 仅显示星链售价比天猫淘宝售价，便宜的商品
// filterType = 'cheapByPay' - 仅显示星链售价比天猫淘宝支付价格，便宜的商品
// filterType = 'cheapByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，便宜的商品
// filterType = 'expensiveBySale' - 仅显示星链售价比天猫淘宝售价，贵的商品
// filterType = 'expensiveByPay' - 仅显示星链售价比天猫淘宝支付价格，贵的商品
// filterType = 'expensiveByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，贵的商品

// showPrice=1&vipLevel=0&filterType=3&keywords=&title=

var searchObj = getUrlSearch() || {};
var goodsType = searchObj.goodsType;
var keywords = searchObj.keywords || searchObj.k;
var isNotType = goodsType === undefined;
console.log('searchObj', searchObj);

// 置换网页标题
if (searchObj.title) {
  document.title = decodeURIComponent(searchObj.title);
}

// 初始化Vue示例
var vm = new Vue({
  el: '#goodsBox',
  data: {
    // 是否完成挂载
    isDone: false,
    // 平台类型
    platformType: {
      jd: { name: '京东' },
      tmall: { name: '天猫' },
      star: { name: '星链' },
    },
    // 星链会员等级
    vipLevel: searchObj.vipLevel || '0',
    // 商品组合
    goodsGroup: [
      isNotType || goodsType === 'datakitchenMaterial' ? window.datakitchenMaterial : undefined,  // 厨房用料
      isNotType || goodsType === 'datakitchenCookers' ? window.datakitchenCookers : undefined,  // 厨房用具
      isNotType || goodsType === 'dataFood' ? window.dataFood : undefined,  // 食品零食
      isNotType || goodsType === 'dataDrinks' ? window.dataDrinks : undefined,  // 酒水饮料
      isNotType || goodsType === 'dataDaily' ? window.dataDaily : undefined,  // 日常用品
      isNotType || goodsType === 'dataClean' ? window.dataClean : undefined,  // 清洁卫生
      isNotType || goodsType === 'dataWash' ? window.dataWash : undefined,  // 洗护用品
      isNotType || goodsType === 'dataBeautiful' ? window.dataBeautiful : undefined,  // 美妆用品
      isNotType || goodsType === 'dataMaternal' ? window.dataMaternal : undefined,  // 母婴用品
      isNotType || goodsType === 'dataJewelry' ? window.dataJewelry : undefined,  // 珠宝首饰
      isNotType || goodsType === 'dataDress' ? window.dataDress : undefined,  // 服饰鞋包
      isNotType || goodsType === 'dataBedroom' ? window.dataBedroom : undefined,  // 家居家纺
      isNotType || goodsType === 'dataFurniture' ? window.dataFurniture : undefined,  // 家用家具
      isNotType || goodsType === 'dataHomeElectronic' ? window.dataHomeElectronic : undefined,  // 电器设备
      isNotType || goodsType === 'dataElectronicDigital' ? window.dataElectronicDigital : undefined,  // 电子数码
      isNotType || goodsType === 'dataOhters' ? window.dataOhters : undefined,  // 其它用品
    ],
  },
  computed: {
    // 最终使用的数据
    useGroupData: function() {
      const adjustData = adjustGoodsGroup(this.goodsGroup);
      let useGroupData = adjustData;

      // 根据关键词筛选数据
      if (keywords) {
        const searchKeywords = decodeURIComponent(keywords);
        const searchGroup = {
          name: decodeURIComponent(searchObj.title || `【龙泉的星链商城】为您推荐：${searchKeywords}`),
          goods: []
        };

        if (!searchObj.title) {
          document.title = decodeURIComponent(`龙泉为您推荐：${searchKeywords}`);
        }

        adjustData.forEach((groupItem) => {
          if (groupItem && groupItem.goods && groupItem.goods.length >= 1) {
            groupItem.goods.forEach((goodsItem) => {
              if (goodsItem.keywords.indexOf(searchKeywords) !== -1) {
                searchGroup.goods.push(goodsItem);
              }
            });
          }
        });

        useGroupData = [searchGroup];
      }

      return useGroupData;
    },
  },
  mounted() {
    this.isDone = true;
  },
});

// 返回调整后的商品数据
function adjustGoodsGroup(originalData) {
  const goodsGroup = [];
  originalData.forEach((groupItem) => {
    if (groupItem && groupItem.goods && groupItem.goods.length >= 1) {
      const filterGoods = [];

      groupItem.goods.forEach((goodsItem) => {
        if (goodsItem.goodsPrice) {
          // 计算不同级别会员的商品价格
          const commissionLevelOne = (goodsItem.commission || 0) / 1.2;
          goodsItem.showPrice = searchObj.showPrice !== '0';
          goodsItem.commissionLevelOne = (commissionLevelOne).toFixed(2);
          goodsItem.commissionLevelThree = (commissionLevelOne*1.1).toFixed(2);
          goodsItem.commissionLevelFive = (commissionLevelOne*1.2).toFixed(2);
          goodsItem.vipPriceLevelOne = (goodsItem.goodsPrice - commissionLevelOne).toFixed(2);
          goodsItem.vipPriceLevelThree = (goodsItem.goodsPrice - commissionLevelOne*1.1).toFixed(2);
          goodsItem.vipPriceLevelFive = (goodsItem.goodsPrice - commissionLevelOne*1.2).toFixed(2);
          goodsItem.goodsPriceStr = parseFloat(goodsItem.goodsPrice).toFixed(2);

          // 判断星链的售价格是否比其他平台的销售价格便宜
          goodsItem.isCheapBySale = true;
          goodsItem.pictures.some((picItem) => {
            const salePrice = picItem.goodsPrice || 0;
            if (picItem.type !== 'star' && salePrice < goodsItem.goodsPrice) {
              goodsItem.isCheapBySale = false;
              return true;
            }
            return false;
          });

          // 判断星链的支付价格是否比其他平台的支付价格便宜
          goodsItem.isCheapByPay = true;
          goodsItem.pictures.some((picItem) => {
            const payPrice = picItem.couponPrice || picItem.goodsPrice || 0;
            if (picItem.type !== 'star' && payPrice < goodsItem.goodsPrice) {
              goodsItem.isCheapByPay = false;
              return true;
            }
            return false;
          });

          // 判断星链的一星会员价格是否比其他平台的支付价格便宜
          goodsItem.isCheapByVip = true;
          goodsItem.pictures.some((picItem) => {
            const payPrice = picItem.couponPrice || picItem.goodsPrice || 0;
            if (picItem.type !== 'star' && payPrice < goodsItem.vipPriceLevelOne) {
              goodsItem.isCheapByVip = false;
              return true;
            }
            return false;
          });

          // filterType = 'cheapBySale' - 仅显示星链售价比天猫淘宝售价，便宜的商品
          if (searchObj.filterType === 'cheapBySale' && goodsItem.isCheapBySale) {
            filterGoods.push(goodsItem);
          }

          // filterType = 'cheapByPay' - 仅显示星链售价比天猫淘宝支付价格，便宜的商品
          if (searchObj.filterType === 'cheapByPay' && goodsItem.isCheapByPay) {
            filterGoods.push(goodsItem);
          }

          // filterType = 'cheapByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，便宜的商品
          if (searchObj.filterType === 'cheapByVip' && goodsItem.isCheapByVip) {
            filterGoods.push(goodsItem);
          }

          // filterType = 'expensiveBySale' - 仅显示星链售价比天猫淘宝售价，贵的商品
          if (searchObj.filterType === 'expensiveBySale' && !goodsItem.isCheapBySale) {
            filterGoods.push(goodsItem);
          }

          // filterType = 'expensiveByPay' - 仅显示星链售价比天猫淘宝支付价格，贵的商品
          if (searchObj.filterType === 'expensiveByPay' && !goodsItem.isCheapByPay) {
            filterGoods.push(goodsItem);
          }

          // filterType = 'expensiveByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，贵的商品
          if (searchObj.filterType === 'expensiveByVip' && !goodsItem.isCheapByVip) {
            filterGoods.push(goodsItem);
          }
        }
      });

      if (searchObj.filterType) {
        groupItem.goods = null;
        groupItem.goods = filterGoods;
      }
    }
    goodsGroup.push(groupItem);
  });
  return goodsGroup;
}


/**
 * 获取URL中指定参数的值
 * 如果找不到目标参数，则返回undefined
 * 如果缺省参数名称，将返回search组成的对象
 * @param  {String} strUrl  url地址
 * @param  {String} strName 参数名称
 * @return {String|Object|undefined}
 */
function getUrlSearch(strUrl, strName) {
  // 参数智能化选择
  // 如果不传参数，则表示默认使用当前网页url，并返回search组成的对象
  if (arguments.length === 0) {
    strUrl = location.href;
    strName = undefined;
  }
  // 如果传递一个参数，则需要判断传递的是url还是参数名称
  else if (arguments.length === 1) {
    // 表示url
    if (strUrl.indexOf('http') === 0 || strUrl.indexOf('//') === 0) {
      strName = undefined;
    } else {
      strName = strUrl;
      strUrl = location.href;
    }
  }

  // url去除hash
  strUrl = strUrl.replace(/#.*$/, '');

  var strSplit = strUrl.split('?'),
    strQuery = strSplit.length > 1 ? strSplit[1] : "",
    arrQuery = strQuery === '' ? [] : strQuery.split('&'),
    objQuery = {},
    arrPart, strValue, i, len, name, value;

  // 将search字符串转换为对象
  for (i = 0, len = arrQuery.length; i < len; i++) {
    arrPart = arrQuery[i];
    name = arrPart.replace(/=.*$/, '');
    value = arrPart.replace(/^[^=]*=/, '');
    objQuery[name] = value || '';
  }

  // 返回对象
  if (strName === undefined) {
    return objQuery;
  }
  // 返回指定参数
  else {
    strValue = objQuery[strName];

    try {
      return strValue === undefined ? undefined : decodeURIComponent(strValue);
    } catch (e) {
      return ""; //使用decodeURIComponent在解码URL中文字符碰到%AF等字符时会抛出URIError: URI malformed异常，虽然可以通过unescape方法解码但最后由于UTF-8编码问题会造成乱码，所以最终索性输出空字符串。
    }
  }
}