<template>
  <div class="content">
    <p>$route.fullPath: {{ $route.fullPath }}</p>
    <p>这是登录页面</p>
    <p><button @click="doLogin">点击进行登录</button></p>
  </div>
</template>

<script>
export default {
  name: 'Nested',
  data() {
    // 返回数据
    return {
      pageData: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    console.group('beforeRouteEnter', 'login')
    console.groupEnd()
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.group('beforeRouterUpdate', 'login')
    console.groupEnd()
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.group('beforeRouteLeave', 'login')
    console.groupEnd()
    next()
  },
  methods: {
    doLogin() {
      // 登录凭证
      localStorage.setItem('sessionKey', 'asdfasdf')

      if (this.$route.query.redirect) {
        this.$router.replace(this.$route.query.redirect)
      } else {
        this.$router.replace('/user/')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "../assets/styles/base/_mixin.scss";

.content {
  width: 100%;
  min-height: 100px;
  padding: 20px;
  margin: 0 auto;
  color: #fff;
  background-color: #345A86;

  a {
    color: #1F6CE8;
  }
}
</style>
