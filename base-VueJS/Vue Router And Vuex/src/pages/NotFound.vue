<template>
  <div class="content">
    <p>404 Not Found</p>
    <p><router-link to="/">返回首页</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    // 返回数据
    return {
      pageData: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    console.group('beforeRouteEnter', 'not-found')
    console.groupEnd()
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.group('beforeRouterUpdate', 'not-found')
    console.groupEnd()
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.group('beforeRouteLeave', 'not-found')
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

  span {
    font-size: 24px;
    line-height: 2em;
  }

  a {
    color: #1F6CE8;
  }
}
</style>
