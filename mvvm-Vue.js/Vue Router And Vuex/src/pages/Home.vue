<template>
  <div class="content">
    <p>这是首页！- {{ pageTitle }}</p>
    <p>路由props传递：{{ name }} - {{ todo }}</p>
    <p><router-link to="/?search=1">首页：参数1</router-link></p>
    <p><router-link to="/?search=2">首页：参数2</router-link></p>
    <p><router-link to="/?search=2#abc">首页：参数3</router-link></p>
    <p><router-link to="/beauty/?order=3&page=1">列表页：个人护理</router-link></p>
    <p><router-link to="/shoesbag/c10093/?order=4&page=2">列表页：鞋靴配饰-服饰配件</router-link></p>
    <p><router-link to="/jiafang/c10774/?order=5&page=3">列表页：家居家纺-睡衣</router-link></p>
    <p><router-link to="/named/">命名视图</router-link></p>
    <p><router-link to="/vuex/">Vuex demo</router-link></p>
    <p><router-link to="/axios/">Axios demo</router-link></p>
    <p><router-link to="/login/">登录</router-link></p>
    <p><router-link to="/user/">个人中心（嵌套路由）</router-link></p>
    <p><router-link to="/component/mobile/">组件封装（mobile）</router-link></p>
    <p><router-link to="/component/pc/">组件封装（pc）</router-link></p>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Home',
  // 组件接收的props 属性
  props: {
    name: { type: String, default: '' },
    todo: { type: String, default: '' },
  },
  // 组件初始数据
  data() {
    console.group('执行data()')

    // 组件实例
    console.log('this:', this)

    // DOM元素
    console.log('this.$el:', this.$el)

    // data数据
    console.log('this.$data:', this.$data)

    // props属性
    console.log('this.$props:', this.$props)

    // 状态管理器
    console.log('this.$store:', this.$store)

    // 路由器
    console.log('this.$router', this.$router)

    // 路由器的配置对象，即传给new VueRouter() 的配置对象
    console.log('this.$router.options', this.$router.options)

    // 配置了 router 的 Vue 根实例
    console.log('this.$router.app', this.$router.app)

    // 路由器的模式 hash/history
    console.log('this.$router.mode', this.$router.mode)

    // 当前路由对应的路由信息对象，同 this.$route
    console.log('this.$router.currentRoute', this.$router.currentRoute)

    // 当前路由对应的路由信息对象
    console.log('this.$route', this.$route)

    // this.$route 路由信息字段演示
    const routeInfo = {
      // 页面名称
      name: 'goodsList',
      // 路由地址
      path: '/goods/list',
      // 完整的路由地址
      fullPath: '/goods/food/list?type=1&page=1&status=0#test1',
      // 动态路径参数
      params: {
        cate: 'food'
      },
      // 查询参数
      query: {
        type: '1',
        page: '1',
        status: '0',
      },
      // hash字符串
      hash: '#test1',
      // 路由匹配列表
      // 在嵌套路由中，可以匹配多个路由
      matched: [],
      // 如果存在重定向，即为重定向来源的路由的名字
      redirectedFrom: ''
    }
    console.log('this.$route 路由信息字段演示：', routeInfo)

    console.groupEnd()

    return {
      pageTitle: 'page title',
      pageData: {},
    }
  },
  // 侦听器
  watch: {
    // 监听路由的变化，在导航完成后触发
    // 直接传方法的名称提供侦听器的执行函数
    // $route: 'getData',

    // 监听路由的变化，在导航完成后触发
    // 使用回调函数提供侦听器的执行函数
    $route(newVal, oldVal) {
      console.group('watch $route')
      console.log('this', this)
      console.log('newVal', newVal)
      console.log('oldVal', oldVal)
      console.groupEnd()

      // 路由变更，重新获取数据
      this.getData()
    }
  },
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
  beforeCreate() {
    console.group('生命周期: beforeCreate')
    console.log('this:', this)
    console.log('this.$el', this.$el) // 无法访问
    console.log('this.$data:', this.$data)
    console.groupEnd()
  },
  // 在实例创建完成后被立即调用。
  // 在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
  // 然而，挂载阶段还没开始，$el 属性目前不可见。
  created() {
    console.group('生命周期: created')
    console.log('this:', this)
    console.log('this.$el', this.$el) // 无法访问
    console.log('this.$data:', this.$data)
    console.groupEnd()

    // 组件创建完后获取数据
    this.getData()
  },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() {
    console.group('生命周期: beforeMount')
    console.log('this:', this)
    // 由于路由模式下在挂载之前页面中并不存在挂载目标,因此this.$el此时依旧无法访问
    console.log('this.$el', this.$el) // 页面中当前存在的挂载目标
    console.groupEnd()
  },
  // 挂载完成，el 被新创建的 vm.$el 替换
  mounted() {
    console.group('生命周期: mounted')
    console.log('this:', this)
    console.log('this.$el', this.$el) // 被渲染完成之后的新DOM元素
    console.groupEnd()
  },
  // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  // 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
  beforeUpdate() {
    console.group('生命周期: beforeUpdate')
    console.log('this:', this)
    console.log('this.$el.innerHTML', this.$el.innerHTML)
    console.groupEnd()
  },
  // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
  // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
  updated() {
    console.group('生命周期: updated')
    console.log('this:', this)
    console.log('this.$el.innerHTML', this.$el.innerHTML)
    console.groupEnd()
  },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() {
    console.group('生命周期: beforeDestroy')
    console.log('this:', this)
    console.groupEnd()
  },
  // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  destroyed() {
    console.group('生命周期: destroyed')
    console.log('this:', this)
    console.groupEnd()
  },
  // 在渲染该组件的对应路由被 confirm 前调用
  // 不！能！获取组件实例的 `this`
  // 因为当守卫执行前，组件实例还没被创建
  beforeRouteEnter(to, from, next) {
    console.group('beforeRouteEnter:')
    console.log('this:', this)
    console.groupEnd()

    // 继续下一步执行
    // next()

    // beforeRouteEnter 守卫 不能 访问 this，
    // 因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。
    // 不过，你可以通过传一个回调给 next来访问组件实例。
    // 在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
    // 注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。
    // 对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。
    next((vm) => {
      // 通过vm访问组件实例
      console.group('beforeRouteEnter-回调:', vm)
      console.groupEnd()
    })
  },
  // 在当前路由改变，但是该组件被复用的情况下调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 另外当变更路由的search和hash时,也会存在组件被复用的情况.
  // 可以访问组件实例 `this`
  // 当变更后的路由与当前的路由相匹配时，不会进行重载，
  // 原来的组件实例会被复用，data()将不会执行
  // 可以在这个钩子函数中进行捕获，来响应数据的变化
  beforeRouteUpdate(to, from, next) {
    console.group('beforeRouteUpdate:')
    console.log('this:', this)

    // 即将要进入的目标 路由对象
    console.log('to:', to)

    // 当前导航正要离开的路由
    console.log('from:', from)

    // 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    console.log('next:', next)

    console.groupEnd()

    // 继续下一步执行
    next()
  },
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
  beforeRouteLeave(to, from, next) {
    console.group('beforeRouteLeave:')
    console.log('this:', this)
    console.groupEnd()

    // 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
    // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    // if (answer) {
    //   next()
    // } else {
    //   next(false)
    // }

    // 继续下一步执行
    next()
  },
  // 方法定义
  methods: {
    // 获取页面数据
    getData() {
      setTimeout(() => {
        this.pageTitle = `page title - ${new Date().getTime()}`
      }, 100)
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
  background-color: #333;

  a {
    color: #1F6CE8;
  }
}
</style>
