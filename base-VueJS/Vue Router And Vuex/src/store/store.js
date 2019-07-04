import Vue from 'vue'
import Vuex from 'vuex'

// 安装 Vuex
Vue.use(Vuex)

// 初始化 Vuex 实例
// Vuex中的state和getters，将配合作为Vue组件实例中的计算属性进行访问
export default new Vuex.Store({
  // 数据状态
  state: {
    count: 1,
    loginState: 0,
    msg: 'test the vuex',
    dialog: true,
    todos: [
      { id: 1, text: 'msg1', done: true },
      { id: 2, text: 'msg2', done: false },
    ],
  },
  // 针对 state 的取值函数（可进行一些过滤操作）
  getters: {
    // 定义一个 getter
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    },
    // 可以接受 getters 作为第二个参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 可以返回一个函数
    getTodoById: (state) => {
      return (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }
  },
  // 变更 state 的处理函数
  // 在 Vuex 中，mutation 都是同步事务
  mutations: {
    incremet(state) {
      state.count += 1
    },
    // 接受一个载荷对象
    updateMs(state, payload) {
      state.msg += payload.appendStr
    },
  },
})
