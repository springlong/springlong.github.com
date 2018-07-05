<template>
  <div class="module-wrap">
    <div>嵌套路由：安全设置</div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'UserSafe',
  // 组件属性
  props: {},
  // 组件数据
  data() {
    // 返回数据
    return {
      pageData: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    console.group('beforeRouteEnter', 'user-safe')
    console.groupEnd()
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.group('beforeRouterUpdate', 'user-safe')
    console.groupEnd()
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.group('beforeRouteLeave', 'user-safe')
    console.groupEnd()
    next()
  }
}
</script>

<style lang='scss' scoped>
  @import "../assets/styles/base/_mixin.scss";

</style>
