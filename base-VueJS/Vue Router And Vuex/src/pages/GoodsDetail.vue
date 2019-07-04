<template>
  <div class="content">
    <p>{{ $route.fullPath }}</p>
    <p>这是商品详情页 - {{ $route.name }}</p>
    <p>商品id：{{ id }}</p>
    <p><a @click.prevent="goBack">返回上一页</a></p>
    <p><a @click.prevent="goToByUrl">跳转-字符串路径</a></p>
    <p><a @click.prevent="goToByObj">跳转-描述地址的对象</a></p>
    <p><a @click.prevent="goToByReplace">跳转-替换当前页url</a></p>
    <p><router-link to="/">返回首页</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'GoodsDetail',
  props: {},
  data() {
    // 返回数据
    return {
      pageData: {}
    }
  },
  methods: {
    goBack() {
      // this.$router.go(-1) 相当于 this.$router.back()，浏览记录后退
      // this.$router.go(0) 刷新页面
      // this.$router.go(1) 相当于 this.$router.forward()，浏览记录前进
      window.history.length > 1 ? this.$router.back() : this.$router.push('/')
    },
    goToByUrl() {
      // 推送新的导航记录
      this.$router.push('/shoesbag/c10093/?order=1&page=1&action=router-push')
    },
    goToByObj() {
      // 推送新的导航记录
      this.$router.push({
        name: 'GoodsDetail',
        params: { id: '12345' },
        query: { action: 'router-push' }
      }, () => {
        console.log('跳转成功')
      }, () => {
        console.log('导航终止')
      })
    },
    goToByReplace() {
      // 替换当前导航记录
      this.$router.replace('/shoesbag/c10093/?order=1&page=1&action=router-push', () => {
        console.log('跳转成功')
      }, () => {
        console.log('导航终止')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "../assets/styles/base/_mixin.scss";

.content {
  width: 100%;
  min-height: 500px;
  padding: 20px;
  margin: 0 auto;
  color: #fff;
  background-color: #B9AFAF;

  a {
    color: #1F6CE8;
    cursor: pointer;
  }
}
</style>
