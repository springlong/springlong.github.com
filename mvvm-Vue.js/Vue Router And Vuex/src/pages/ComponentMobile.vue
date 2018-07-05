<template>
  <div class="content">
    <p>text a messate</p>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'ModuleName',
  // 组件属性
  props: {
    id: { type: String, required: true },
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
  },
  // 在当前路由改变，但是该组件被复用的情况下调用
  beforeRouteUpdate: (to, from, next) => {
    next()
  },
  // 组件方法
  methods: {
  },
}
</script>

<style lang='scss' scoped>
@import "../assets/styles/base/_mixin.scss";

.content {
  min-height: 500px;
  border: 1px solid #ddd;
  background-color: #eee;
}
</style>
