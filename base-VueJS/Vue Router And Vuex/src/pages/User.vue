<template>
  <div class="content">
    <p>$route.fullPath: {{ $route.fullPath }}</p>
    <p>$route.name: {{ $route.name }}</p>
    <p>这是个人中心页面</p>
    <p>也是嵌套路由的demo案例</p>
    <router-view />
    <p><router-link to="/user/">个人中心-首页</router-link></p>
    <p><router-link to="/user/profile">个人中心-个人基本信息</router-link></p>
    <p><router-link to="/user/safe">个人中心-安全设置</router-link></p>
    <p><router-link to="/">返回首页</router-link></p>
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
    console.group('beforeRouteEnter', 'user')
    console.groupEnd()
    next()
    switch (next) {
      case '1':
        next()
        break
      case '2':
        next()
        break
      default:
        next()
        break
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.group('beforeRouterUpdate', 'user')
    console.groupEnd()
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.group('beforeRouteLeave', 'user')
    console.groupEnd()
    next()
  }
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
