const Mock = require('mockjs')
const tableList = require('./datas/tablelist')
const fastLogin = require('./datas/fastLogin')
const sendcode = require('./datas/sendcode')

module.exports = () => {
  return {
    fastLogin,
    sendcode,
  }
}
