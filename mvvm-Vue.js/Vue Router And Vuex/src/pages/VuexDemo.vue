<template>
  <div class="module-wrap">
    <div>
      <p>状态管理</p>
      <p>count: {{ count }}</p>
      <p>loginState: {{ loginState }}</p>
      <p>msg: {{ msg }}</p>
      <p>dialog: {{ dialog }}</p>
      <p>dialogInfo: {{ dialogInfo }}</p>
      <p>dialogTest: {{ dialogTest }}</p>
      <p>todosInfo: {{ todosInfo }}</p>
      <p>doneCount: {{ doneCount }}</p>
      <p>doneTodos: {{ doneTodos }}</p>
      <p><button @click="handleCount">点击count+1</button></p>
      <p><button @click="handleMsg">点击更新msg</button></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  // 组件名称
  name: 'Vuex',
  // 组件属性
  props: {},
  // 组件数据
  data() {
    // 返回数据
    return {
      pageData: {}
    }
  },
  // 在计算属性中导出数据状态
  computed: Object.assign({
    test() {
      return `${this.pageTitle}count with test`
    },
    dialogTest() {
      return this.$store.state.dialog
    },
    todosInfo() {
      return `
        ${JSON.stringify(this.$store.getters.doneTodos)} |
        count: ${this.$store.getters.doneTodosCount} |
        func: ${JSON.stringify(this.$store.getters.getTodoById(2))}`
    },
    // 使用扩展运算符便捷导出，ES2018 现处于 ECMASCript 提案 stage-4 阶段
    ...mapState({
      dialogInfo: 'dialog'
    }),
    ...mapState(['dialog']),
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['doneTodos'])
  }, mapState({
    // 使用 mapState 导出 state
    // 箭头函数
    count: state => state.count,
    // 箭头函数
    loginState: state => state.loginState,
    // 传字符串参数 'msg' 等同于 'state => state.msg'
    msg: 'msg'
  }), mapGetters({
    // 使用 mapGetters 导出 state 取值函数
    doneCount: 'doneTodosCount'
  })),
  methods: {
    // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ...mapMutations(['incremet']),
    ...mapMutations({
      // 将 `this.upMsg()` 映射为 `this.$store.commit('updateMsg')`
      upMsg: 'updateMsg'
    }),
    handleCount() {
      // 执行stroe数据变更的触发函数
      // this.$store.commit('incremet')

      this.incremet()
    },
    handleMsg() {
      // 执行stroe数据变更的触发函数，并附在载荷对象
      // this.$store.commit('updateMsg', {appendStr: '-appendStr'})

      // 可以使用包含type属性的对象形式进行触发
      // 当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
      // this.$store.commit({
      //   type: 'updateMsg',
      //   appendStr: '-addstr'
      // })

      this.upMsg({
        appendStr: '-abcadd'
      })
    }
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
