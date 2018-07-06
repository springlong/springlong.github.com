
const {Mock, Random} = require('./mock.js');

/**
 * 循环生成对象列表
 * @param  {string} names 对象成员名称列表，多个成员用逗号隔开，最后可以添加生成规则
 * @param  {Object} data  对象成员的值，可以是任意类型
 * @return {Object}
 */
function createMockObject (names, data) {
	var result = {},
		nameParts = names.split('|'),
		namePartValues = nameParts[0].split(','),
		namePartRule = nameParts[1] || '',
		nameUse;

	if(namePartRule !== ''){
		namePartRule = '|' + namePartRule
	}

	for(var i = 0, len = namePartValues.length; i < len; i++){
		nameUse = namePartValues[i] + namePartRule
		result[nameUse] = data
	}

	return result
}

// Mock自定义
// Mock将数值字符串赋给对象时，都会处理成Number类型，需要注意下
Random.extend({
    goodsName: function() {
    	var arrGoodsNames = [
			'新西兰原产MCDONALD 美利奴羊毛双色帽子',
			'新西兰原产MERINOMINK 美利奴羊毛混纺针织围巾',
			'意大利原产alico 阿里克sportSummit系列专业防水登山鞋 宽版',
			'德国fashy巴特·辛普森卡通套儿童热水袋暖水袋',
			'asdfasdfasdfasdfasdfasdf123123123123123123asdfasdfasdfasdfasfdasd123123',
			'日本原产Tojiro藤次郎不锈钢可拆式厨房料理剪刀FK-843',
			'韩国原产elago高精度手机平板触控商务手写笔Rustic系列',
			'韩国原产QUEEN SENSE高压锅压力锅ONE系列4.5升',
			'法国原产BLANC DES VOSGES密织全棉精品四件套(礼盒装)',
			'澳大利亚原产CHIC EMPIRE羊皮雪地靴中筒靴',
			'德国fashy送爱人之选 爱心型天鹅绒套热水袋暖水袋',
			'asdfasdfasdfasdfasdfasdfasdfasdfasdfqwerasdfasdfasdfasdfasdf'
		]
		return this.pick(arrGoodsNames)
    },
    goodsImage: function() {
		var arrGoodsImages = [
			'../../../assets/images/goods-1398.jpg',
			'../../../assets/images/goods-1946.jpg',
			'../../../assets/images/goods-2875.jpg',
			'../../../assets/images/goods-10388.jpg',
			'../../../assets/images/goods-11673.jpg',
			'../../../assets/images/goods-11982.jpg',
			'../../../assets/images/goods-14029.jpg',
			'../../../assets/images/goods-14359.jpg',
			'../../../assets/images/goods-15244.jpg',
			'../../../assets/images/goods-15309.jpg',
			'../../../assets/images/goods-19063.jpg',
			'../../../assets/images/goods-20241.jpg',
			'../../../assets/images/goods-20305.jpg',
			'../../../assets/images/goods-20948.jpg'
		];
		return this.pick(arrGoodsImages)
   },
   goodsId: function() {
   	return Random.integer(10000,99999)+''
   },
   goodsPrice: function() {
   	return Random.integer(100,666) + '.' + Random.integer(0,9) + Random.integer(1,9)
   },
   numberId: function() {
   	return String(Random.integer(1000,9999)+'')
   }
})

// 导出 mock 数据
module.exports = {

	// 基础数据，当使用mock且mock中未定义时，使用这里的数据
	'base': {"code": -1, "msg": "请求失败", data: null},

	// 数据demo
	'demo': Mock.mock({"code": 0, "msg": "", "data": {"currPage": 1, "totalPage": 4, "totalNum": 80, "pageNum": 20, "items":
		createMockObject('2018-01-12,2018-01-02,2018-01-01|8-10', [{
			'id': '@integer(1000,9999)',
			'goodsId': '@integer(10000,99999)',
			'goodsImage': '@goodsImage',
			'goodsName': '@goodsName',
			'goodsPrice': '@goodsPrice'
		}])
	}}),

	// 数据demo-分页时可通过回调函数处理数据
	'demo/page': function(data) {
		return Mock.mock({"code": 0, "msg": "", "data": {"currPage": data.page, "totalPage": 4, "totalNum": 80, "pageNum": 20, "items":
			createMockObject('2018-01-12,2018-01-02,2018-01-01|8-10', [{
				'id': '@integer(1000,9999)',
				'goodsId': '@integer(10000,99999)',
				'goodsImage': '@goodsImage',
				'goodsName': '@goodsName',
				'goodsPrice': '@goodsPrice'
			}])
		}})
	},

	// 你的数据
	'your_ajax_url': Mock.mock({"code":0, "msg": "", "data": {

	}}),
}
