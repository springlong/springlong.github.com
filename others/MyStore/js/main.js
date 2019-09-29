var searchObj = getUrlSearch() || {};

// 置换网页标题
if (searchObj.title) {
  document.title = decodeURIComponent(searchObj.title);
}

// 初始化Vue示例
var vm = new Vue({
  el: '#goodsBox',
  data: {
    // 平台类型
    platformType: {
      jd: { name: '京东' },
      tmall: { name: '天猫' },
      star: { name: '星链' },
    },
    // 商品组合
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
    ],
  },
  computed: {
    // 最终使用的数据
    useGroupData: function() {
      return searchObj.keywords ? this.filterKeywordsData : this.goodsGroup;
    },
    // 关键字展示数据
    filterKeywordsData: function(){
      if (searchObj.keywords) {
        const searchKeywords = decodeURIComponent(searchObj.keywords);
        const searchGroup = {
          name: decodeURIComponent(searchObj.title || `【龙泉的星链小店】为您推荐：${searchKeywords}`),
          goods: []
        };

        this.goodsGroup.forEach((groupItem) => {
          if (groupItem && groupItem.goods && groupItem.goods.length >= 1) {
            groupItem.goods.forEach((goodsItem) => {
              if (goodsItem.keywords.indexOf(searchKeywords) !== -1) {
                searchGroup.goods.push(goodsItem);
              }
            });
          }
        });

        return [searchGroup];
      }
      return this.goodsGroup;
    },
  }
});


/**
 * 获取URL中指定参数的值
 * 如果找不到目标参数，则返回undefined
 * 如果缺省参数名称，将返回search组成的对象
 * @param  {String} strUrl  url地址
 * @param  {String} strName 参数名称
 * @return {String|Object|undefined}
 */
function getUrlSearch(strUrl, strName) {
  console.log(strUrl);
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