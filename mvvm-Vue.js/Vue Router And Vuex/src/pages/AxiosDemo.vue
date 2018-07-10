<template>
  <div class="module-wrap">
    <div>{{ 3+4 }}</div>
    <div>{{ 3+4 }}</div>
  </div>
</template>

<script>
import jsonp from 'jsonp'

export default {
  // 组件名称
  name: 'Axios',
  // 组件属性
  props: {
    id: {
      type: Number,
      default: 0
    },
    greetingText: {
      type: String,
      default: 'welcome',
    }
  },
  // 组件数据
  data() {
    // 返回数据
    return {
      pageData: {}
    }
  },
  // 计算属性
  computed: {
  },
  // 组件挂载完成
  created() {
    console.log('created:')

    // axios请求-get
    this.axios({
      method: 'get',
      url: '/static/test.txt',
      params: {
        a: '1',
        b: '2'
      }
    }).then((res) => {
      // res返回数据
      // {
      //   // `data` 由服务器提供的响应
      //   data: {},
      //   // `status` 来自服务器响应的 HTTP 状态码
      //   status: 200,
      //   // `statusText` 来自服务器响应的 HTTP 状态信息
      //   statusText: 'OK',
      //   // `headers` 服务器响应的头
      //   headers: {},
      //   // `config` 是为请求提供的配置信息
      //   config: {}
      // }
      console.log('axios-get:', res)
    }).catch((err) => {
      console.error('axios-get error:', err)
    })

    // axios请求-get
    // this.axios.get('/static/test-error1.txt?a=1&b=2')
    //   .then((res) => {
    //     console.log('axios-get:', res)
    //   })
    //   .catch((err) => {
    //     // console.error('axios-get error:', err)
    //   })

    // axios请求-get
    this.axios.get('/saas20/api/1/AptGuest/free/roomsearch/customer/rapidLogin/mobile')
      .then((res) => {
        console.log('axios-get:', res)
      }).catch((err) => {
        // console.error('axios-get error:', err)
      })

    this.axios.get('/static/test-error2.txt', {
      params: {
        a: '1',
        b: '2'
      }
    }).then((res) => {
      console.log('axios-get:', res)
    }).catch((err) => {
      // console.error('axios-get error:', err)
    })

    // axios请求-post
    // this.axios({
    //   method: 'post',
    //   url: '/static/post1.txt',
    //   data: {
    //     a: '1',
    //     b: '2'
    //   }
    // }).then((res) => {
    //   console.log('axios-post', res)
    // }).catch((err) => {
    //   console.log('axios-post error', err)
    // })

    // axios请求-post
    // this.axios.post('/static/post2.txt', {
    //   a: '1',
    //   b: '2'
    // }).then((res) => {
    //   console.log('axios-post', res)
    // }).catch((err) => {
    //   console.log('axios-post error', err)
    // })

    // 使用JSONP模块请求
    const url = 'https://passport.xidibuy.com/ucenter/jsonpLoginInfo'
    jsonp(url, { name: 'callback' }, (err, data) => {
      if (err) {
        console.error('jsonp error:', err.message)
      } else {
        console.log('jsonp data:', data)
      }
    })
  },
  // 组件方法
  methods: {
  },
}
</script>

<style lang='scss' scoped>
  @import "../assets/styles/base/_mixin.scss";

  .module-wrap {
    border: 1px solid #ddd;
    color: #333;
    background-color: #eee;
  }
</style>
