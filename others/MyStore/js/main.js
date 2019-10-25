// title - 网页标题
// keywords - 搜索关键词（简写k）
// type - 展示的商品分类

// vip = '0' - 显示所有会员级别价格
// vip = '1' - 显示一星会员价格
// vip = '3' - 显示三星会员价格
// vip = '5' - 显示五星会员价格

// diff = '0' - 比较标准销售价
// diff = '1' - 比较一星会员价格
// diff = '3' - 比较三星会员价格
// diff = '5' - 比较五星会员价格

// filter = 'cheapBySale' - 仅显示星链售价比天猫淘宝售价，便宜的商品
// filter = 'cheapByPay' - 仅显示星链售价比天猫淘宝支付价格，便宜的商品
// filter = 'cheapByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，便宜的商品
// filter = 'expensiveBySale' - 仅显示星链售价比天猫淘宝售价，贵的商品
// filter = 'expensiveByPay' - 仅显示星链售价比天猫淘宝支付价格，贵的商品
// filter = 'expensiveByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，贵的商品

// vip=0&filter=cheapByVip&keywords=&title=

var searchObj = getUrlSearch() || {};
var type = searchObj.dataType || searchObj.type;
var keywords = searchObj.keywords || searchObj.k;
var filterType = searchObj.filterType || searchObj.filter;
var compareDiff = '0,1,3,5'.indexOf(searchObj.diff) === -1 ? '1' : searchObj.diff;
var isNotType = type === undefined;
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
    vipLevel: searchObj.vip || '0',
    // 商品组合
    goodsGroup: [
      isNotType || type === 'datakitchenMaterial' ? window.datakitchenMaterial : undefined,  // 厨房用料
      isNotType || type === 'datakitchenCookers' ? window.datakitchenCookers : undefined,  // 厨房用具
      isNotType || type === 'dataFood' ? window.dataFood : undefined,  // 食品零食
      isNotType || type === 'dataDrinks' ? window.dataDrinks : undefined,  // 酒水饮料
      isNotType || type === 'dataDaily' ? window.dataDaily : undefined,  // 日常用品
      isNotType || type === 'dataClean' ? window.dataClean : undefined,  // 清洁卫生
      isNotType || type === 'dataWash' ? window.dataWash : undefined,  // 洗护用品
      isNotType || type === 'dataBeautiful' ? window.dataBeautiful : undefined,  // 美妆用品
      isNotType || type === 'dataMaternal' ? window.dataMaternal : undefined,  // 母婴用品
      isNotType || type === 'dataJewelry' ? window.dataJewelry : undefined,  // 珠宝首饰
      isNotType || type === 'dataDress' ? window.dataDress : undefined,  // 服饰鞋包
      isNotType || type === 'dataBedroom' ? window.dataBedroom : undefined,  // 家居家纺
      isNotType || type === 'dataFurniture' ? window.dataFurniture : undefined,  // 家用家具
      isNotType || type === 'dataHomeElectronic' ? window.dataHomeElectronic : undefined,  // 电器设备
      isNotType || type === 'dataElectronicDigital' ? window.dataElectronicDigital : undefined,  // 电子数码
      isNotType || type === 'dataOhters' ? window.dataOhters : undefined,  // 其它用品
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

        const arrKeys = searchKeywords.split(' ');
        adjustData.forEach((groupItem) => {
          if (groupItem && groupItem.goods && groupItem.goods.length >= 1) {
            groupItem.goods.forEach((goodsItem) => {
              let isMatch = true;
              arrKeys.some((key) => {
                if (goodsItem.keywords.indexOf(key) === -1) {
                  isMatch = false;
                  return true;
                }
                return false;
              });
              if (isMatch) {
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
        let firstStarGoodsItem;
        let secondOtherGoodsItem;
        goodsItem.showPrice = true;

        // 计算不同级别会员的商品价格
        goodsItem.pictures.forEach((picItem, index) => {
          if (picItem.type === 'star') {
            const commissionLevelOne = (picItem.commission || 0) / 1.2;
            picItem.commissionLevelOne = (commissionLevelOne).toFixed(2);
            picItem.commissionLevelThree = (commissionLevelOne*1.1).toFixed(2);
            picItem.commissionLevelFive = (commissionLevelOne*1.2).toFixed(2);
            picItem.vipPriceLevelOne = (picItem.goodsPrice - commissionLevelOne).toFixed(2);
            picItem.vipPriceLevelThree = (picItem.goodsPrice - commissionLevelOne*1.1).toFixed(2);
            picItem.vipPriceLevelFive = (picItem.goodsPrice - commissionLevelOne*1.2).toFixed(2);
            picItem.goodsPriceStr = parseFloat(picItem.goodsPrice).toFixed(2);

            if (index === 0) {
              firstStarGoodsItem = picItem;
            }
          }
          if (index === 1) {
            secondOtherGoodsItem = picItem;
          }
        });

        // 判断星链在售商品比其他平台的商品售价相差多少
        // compareDiff = '0' - 比较标准销售价
        // compareDiff = '1' - 比较一星会员价格
        // compareDiff = '3' - 比较三星会员价格
        // compareDiff = '5' - 比较五星会员价格
        if (secondOtherGoodsItem !== undefined && compareDiff) {
          const salePrice = secondOtherGoodsItem.goodsPrice || 0;
          const payPrice = secondOtherGoodsItem.couponPrice || salePrice;
          firstStarGoodsItem.canShowDiff = true;

          if (compareDiff == '0') {
            firstStarGoodsItem.diffPrice = salePrice - firstStarGoodsItem.goodsPrice;
            firstStarGoodsItem.diffTitle = '标准销售价';
          }
          if (compareDiff == '1') {
            firstStarGoodsItem.diffPrice = payPrice - firstStarGoodsItem.vipPriceLevelOne;
            firstStarGoodsItem.diffTitle = '一星会员价';
          }
          if (compareDiff == '3') {
            firstStarGoodsItem.diffPrice = payPrice - firstStarGoodsItem.vipPriceLevelThree;
            firstStarGoodsItem.diffTitle = '三星会员价';
          }
          if (compareDiff == '5') {
            firstStarGoodsItem.diffPrice = payPrice - firstStarGoodsItem.vipPriceLevelFive;
            firstStarGoodsItem.diffTitle = '五星会员价';
          }

          firstStarGoodsItem.diffPriceStr = Math.abs(firstStarGoodsItem.diffPrice).toFixed(2);

          if (firstStarGoodsItem.diffPrice === 0) {
            firstStarGoodsItem.diffClassFlag = 'same';
            firstStarGoodsItem.diffPriceFlag = '售价一致';
            firstStarGoodsItem.diffPriceStr = '';
          }
          if (firstStarGoodsItem.diffPrice > 0) {
            firstStarGoodsItem.diffClassFlag = 'cheap';
            firstStarGoodsItem.diffPriceFlag = '优惠:';
          }
          if (firstStarGoodsItem.diffPrice < 0) {
            firstStarGoodsItem.diffClassFlag = 'expensive';
            firstStarGoodsItem.diffPriceFlag = '偏贵:';
          }
        }

        // 判断星链的售价格是否比其他平台的销售价格便宜
        goodsItem.isCheapBySale = true;
        goodsItem.pictures.some((picItem) => {
          const salePrice = picItem.goodsPrice || 0;
          if (picItem.type !== 'star' && salePrice < firstStarGoodsItem.goodsPrice) {
            goodsItem.isCheapBySale = false;
            return true;
          }
          return false;
        });

        // 判断星链的支付价格是否比其他平台的支付价格便宜
        goodsItem.isCheapByPay = true;
        goodsItem.pictures.some((picItem) => {
          const payPrice = picItem.couponPrice || picItem.goodsPrice || 0;
          if (picItem.type !== 'star' && payPrice < firstStarGoodsItem.goodsPrice) {
            goodsItem.isCheapByPay = false;
            return true;
          }
          return false;
        });

        // 判断星链的一星会员价格是否比其他平台的支付价格便宜
        goodsItem.isCheapByVip = true;
        goodsItem.pictures.some((picItem) => {
          const payPrice = picItem.couponPrice || picItem.goodsPrice || 0;
          if (picItem.type !== 'star' && payPrice < firstStarGoodsItem.vipPriceLevelOne) {
            goodsItem.isCheapByVip = false;
            return true;
          }
          return false;
        });

        // filter = 'cheapBySale' - 仅显示星链售价比天猫淘宝售价，便宜的商品
        if (filterType === 'cheapBySale' && goodsItem.isCheapBySale) {
          filterGoods.push(goodsItem);
        }

        // filter = 'cheapByPay' - 仅显示星链售价比天猫淘宝支付价格，便宜的商品
        if (filterType === 'cheapByPay' && goodsItem.isCheapByPay) {
          filterGoods.push(goodsItem);
        }

        // filter = 'cheapByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，便宜的商品
        if (filterType === 'cheapByVip' && goodsItem.isCheapByVip) {
          filterGoods.push(goodsItem);
        }

        // filter = 'expensiveBySale' - 仅显示星链售价比天猫淘宝售价，贵的商品
        if (filterType === 'expensiveBySale' && !goodsItem.isCheapBySale) {
          filterGoods.push(goodsItem);
        }

        // filter = 'expensiveByPay' - 仅显示星链售价比天猫淘宝支付价格，贵的商品
        if (filterType === 'expensiveByPay' && !goodsItem.isCheapByPay) {
          filterGoods.push(goodsItem);
        }

        // filter = 'expensiveByVip' - 仅显示星链一星会员价格比天猫淘宝支付价格，贵的商品
        if (filterType === 'expensiveByVip' && !goodsItem.isCheapByVip) {
          filterGoods.push(goodsItem);
        }
      });

      if (filterType) {
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