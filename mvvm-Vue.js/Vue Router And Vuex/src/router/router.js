import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import User from '@/pages/User'
import UserHome from '@/pages/UserHome'
import UserProfile from '@/pages/UserProfile'
import UserSafe from '@/pages/UserSafe'
import NotFound from '@/pages/NotFound'
import VuexDemo from '@/pages/VuexDemo'
import ComponentMobile from '@/pages/ComponentMobile'
import ComponentPC from '@/pages/ComponentPC'

// 路由懒加载
// 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了。
// 结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。
//
// 把组件按组分块
// 有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。
// 只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
// Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
const GoodsList = () => import(/* webpackChunkName: "goods" */ '@/pages/GoodsList')
const GoodsDetail = () => import(/* webpackChunkName: "goods" */ '@/pages/GoodsDetail')

// 使用Vue Router插件
Vue.use(VueRouter)

// 定义的一些简单模板
//     用于测试使用
const NamedDefault = { //   asdfadsf
  template: '<div>命名视图：NamedDefault</div>',
}
const NamedPart1 = {
  emplate: '<div>命名视图：NamedPart1</div>',
}
const NamedPart2 = {
  template: '<div>命名视图：NamedPart2</div>',
}

// 创建一个VueRouter实例
const router = new VueRouter({
  // 路由模式
  // hash 模式：默认模式，使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
  // history 模式：这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。（IE10+）
  // 不过history这种模式要玩好，还需要后台配置支持。
  // 因为我们的应用是个单页客户端应用，如果后台没有正确的配置，
  // 当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
  // 所以呢，你要在服务端增加一个覆盖所有情况的候选资源：
  // 如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
  // abstract 模式: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
  mode: 'history',
  // 应用的基础路径
  // 例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  base: '/',
  // 全局配置 <router-link> 的默认『激活 class 类名』
  // 默认值: "router-link-active"
  // 当 <router-link> 对应的路由被当前url包含时，将自动设置该 class 属性值
  // 例如：/test/ 被 /test/abc/ 包含
  // 例如：/ 被 /test/abc/ 包含
  // 例如：/te/ 不被 /test/abc/ 包含
  linkActiveClass: 'router-link-active',
  // 全局配置 <router-link> 精确激活的默认的 class。
  // 默认值: "router-link-exact-active"
  // 当 <router-link> 对应的路由的 path+search+hash 与当前url完全相等时，将自动设置该 class 属性值
  linkExactActiveClass: 'router-link-exact-active',
  // 当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。
  // 默认值为 true。
  // 在 IE9 中，设置为 false 会使得每个 router-link 导航都触发整页刷新。
  // 它可用于工作在 IE9 下的服务端渲染应用，因为一个 hash 模式的 URL 并不支持服务端渲染。
  fallback: true,
  //
  // 提供自定义查询字符串的解析函数。覆盖默认行为。
  // 文档不详，需要看源码才知道具体用途
  // parseQuery() { },
  //
  // 提供自定义查询字符串反解析函数。覆盖默认行为。
  // 文档不详，需要看源码才知道具体用途
  // stringifyQuery() { },
  //
  // 路由列表
  // 匹配优先级：有时候，同一个路径可以匹配多个路由，
  // 此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。
  routes: [
    // 首页
    {
      // 路由的路径
      path: '/',
      // 路由的命名
      // 有时候，通过一个名称来标识一个路由显得更方便一些，
      // 特别是在链接一个路由，或者是执行一些跳转的时候。
      name: 'Home',
      // 路由使用的组件
      component: Home,
      // 路由组件传参
      // 在组件中使用 $route 会使之与其对应路由形成高度耦合，
      // 从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
      // 我们可以使用 props 将组件和路由解耦。
      // 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
      props: { name: 'list page', todo: 'test props obj' },
      // 路由独享的守卫
      // 可以在路由配置上直接定义 beforeEnter 守卫
      beforeEnter(to, from, next) {
        console.group('beforeEnter:')
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
    },
    // 登录页面
    {
      path: '/login/',
      name: 'Login',
      component: Login,
    },
    // 个人中心页面
    {
      path: '/user/',
      name: 'User',
      component: User,
      // 定义元数据
      // 嵌套路由中，可以只在父级添加meta元数据，
      // 当子级被匹配的时候，父级也会匹配到，
      // 可以通过 $route.matched 这个数组来访问当前匹配到的路由记录。
      // 我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。
      meta: { requireAuth: true },
      // 定义嵌套路由（可以多层嵌套）
      children: [
        { name: 'UserHome', path: '', component: UserHome },
        // when /user/profile is matched
        { name: 'UserProfile', path: 'profile', component: UserProfile },
        // when /user/safe is matched
        { name: 'UserSafe', path: 'safe', component: UserSafe },
      ],
    },
    // 定义命名视图
    {
      path: '/named/',
      name: 'Named',
      // 有时候想同时 (同级) 展示多个视图，而不是嵌套展示，
      // 例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。
      // 你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。
      // 如果 router-view 没有设置名字，那么默认为 default。
      // 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。
      // 确保正确使用 components 配置 (带上 s)：
      components: {
        default: NamedDefault,
        part1: NamedPart1,
        part2: NamedPart2,
      },
    },
    // Vuex demo页面
    {
      path: '/vuex/',
      name: 'VuexDemo',
      component: VuexDemo
    },
    // 移动端组件
    {
      path: '/component/mobile/',
      name: 'ComponentMobile',
      component: ComponentMobile
    },
    // PC端组件
    {
      path: '/component/pc/',
      name: 'ComponentPC',
      component: ComponentPC
    },
    // 详情页
    {
      // 动态路由匹配-key
      // “动态路径参数”可以使用冒号:进行标记
      // 当匹配到一个路由时，参数值将被设置到 this.$route.params 对象，键值名称就是key
      // 你可以在一个路由中设置多个“路径参数”，对应的值都会设置到 $route.params 对象中
      //
      // 例如：'/user/:username/post/:post_id'
      // 路由：'/user/evan/post/123'
      // $route.params对象：{ username: 'evan', post_id: 123 }
      //
      // 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。
      // 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。
      // 不过，这也意味着组件的生命周期钩子不会再被调用。
      // 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象。
      path: '/detail/:id.html',
      // 设置别名
      alias: '/goods/:id.html',
      name: 'GoodsDetail',
      component: GoodsDetail,
      // 如果 props 被设置为 true，route.params 将会被设置为组件属性
      props: true,
    },
    // 列表页
    {
      // 动态路由匹配-index
      // “动态路径参数”也可以使用括号()进行标记
      // 当匹配到一个路由时，参数值将被设置到 this.$route.params 对象，键值名称是括号出现的索引顺序
      //
      // 动态路由匹配可以是key和index的组合
      //
      // 例如：'/user/:username/post/(\\d+)'
      // 路由：'/user/evan/post/123'
      // $route.params对象：{ username: 'evan', 0: 123 }
      //
      path: '/([a-z]+)/(c\\d+)?',
      name: 'GoodsList',
      component: GoodsList,
      // 你可以创建一个函数返回 props。
      // 这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
      props: route => ({
        levelOne: route.params[0],
        levelTwo: route.params[1],
        order: route.query.order,
        page: route.query.page,
      }),
    },
    // 针对其它未知路径，重定向到首页
    // { path: '*', redirect: '/' },
    // { path: '*', redirect: { name: 'Home', query: { action: '404' } },
    // {
    //   path: '*',
    //   redirect: (to) => {
    //     // 方法接收 目标路由 作为参数
    //     console.log('redirect', to)
    //     // return 重定向的 字符串路径/路径对象
    //     return { name: 'Home', query: { action: '404', from: to.fullPath } }
    //   }
    // },
    // 针对其它未知路径，展示404页面
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
  // 定义滚动行为，默认情况下不会触发滚动
  // 注意: 这个功能只在支持 history.pushState 的浏览器中可用（IE10+）。
  // scrollBehavior 方法接收 to 和 from 路由对象。
  // 第三个参数 savedPosition，当且仅当popstate导航（通过浏览器的 前进/后退 按钮触发）时才可用
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      // 滚动到页面记录的位置处
      return savedPosition
    }

    const position = {}

    if (to.hash) {
      // 滚动到hash所在位置
      position.selector = to.hash
    } else {
      // 滚动到顶部
      position.x = 0
      position.y = 0
    }

    return position
  },
})

// 全局前置守卫
// 当一个导航被触发时，全局前置守卫将按照创建的顺序进行调用。
// 守卫是异步解析执行的，导航在所有守卫 resolve 完之前一直都处于 等待中。
router.beforeEach((to, from, next) => {
  console.group('beforeEach:')

  // 即将要进入的目标 路由对象
  console.log('to:', to)

  // 当前导航正要离开的路由
  console.log('from:', from)

  // 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  console.log('next:', next)

  console.groupEnd()

  // next()
  // 进行管道中的下一个钩子。
  // 如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

  // 可以在这里检测所需访问的页面是否需要权限
  if (to.matched.some(item => item.meta.requireAuth)) {
    const isLoggedIn = localStorage.getItem('sessionKey')

    if (!isLoggedIn) {
      next({
        path: '/login/',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }

  // 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
  // next(false)

  // 跳转到一个不同的地址。
  // 当前的导航被中断，然后进行一个新的导航。
  // 你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home'
  // 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
  // next('/detail/16530.html')
  // next({name: 'GoodsDetail', params: {id: '334455'}})

  // 如果传入 next 的参数是一个 Error 实例，
  // 则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
  // next(error)

  // 确保要调用 next 方法，否则钩子就不会被 resolved。
})

// 全局解析守卫
// 在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局解析守卫。
// 该守卫在导航被确认之前，同时在所有的组件内守卫和异步路由组件被解析之后，被调用。
router.beforeResolve((to, from, next) => {
  console.group('beforeResolve:')

  // 即将要进入的目标 路由对象
  console.log('to:', to)

  // 当前导航正要离开的路由
  console.log('from:', from)

  // 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  console.log('next:', next)

  console.groupEnd()

  // 继续下一步执行
  next()
})

// 全局后置钩子
// 和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
router.afterEach((to, from) => {
  console.group('afterEach:')

  // 即将要进入的目标 路由对象
  console.log('to:', to)

  // 当前导航正要离开的路由
  console.log('from:', from)

  console.groupEnd()
})

// 浏览器访问一个新页面或者刷新页面时,
// 完整的导航解析流程:
// 1. 导航被触发
// 2. 调用全局的 beforeEach 守卫
// 3. 在路由配置里调用 beforeEnter 守卫
// 4. 解析异步路由组件
// 5. 在被激活的组件里调用 beforeRouteEnter 守卫
// 6. 调用全局的 beforeResolve 守卫
// 7. 导航被确认
// 8. 调用全局的 afterEach 钩子
// 9. 触发DOM更新，执行组件内部生命周期
// 10. 用创建好的实例调用 beforeRouteEnter 守卫中传给next的回调函数

// 当页面跳转到另一个页面时,
// 导航的解析流程,将在调用全局的 beforeEach 守卫之前,
// 先行调用离开组件的 beforeRouteLeave 守卫,并且在该守卫中可以阻止页面发生跳转

// 当变更后的路由与当前的路由相匹配时，不会进行组件重载，
// 原来的组件实例会被复用，data()将不会执行
// 在这种情况下,导航的解析流程如下:
// 1. 导航被触发
// 2. 调用全局的 beforeEach 守卫
// 3. 在重用的组件里调用 beforeRouteUpdate 守卫
// 4. 调用全局的 beforeResolve 守卫
// 5. 导航被确认
// 6. 调用全局的 afterEach 钩子
// 7. 触发DOM更新，执行组件内部生命周期
//
// 下列守卫将不会触发:
// 组件的 beforeRouteLeave 守卫
// 路由配置中的 beforeEnter 守卫
// 组件的 beforeRouteEnter 守卫

// 点击相同导航链接,Vue Router将不会做任何变更!

export default router
