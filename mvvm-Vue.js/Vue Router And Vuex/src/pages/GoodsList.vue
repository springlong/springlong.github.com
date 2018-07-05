<template>
  <div class="content">
    <p>{{ $route.fullPath }}</p>
    <p>这是列表页 - {{ $route.name }}</p>
    <p>一级栏目：{{ levelOne }}</p>
    <p>二级栏目：{{ levelTwo }}</p>
    <p>查询参数：order={{ order }}</p>
    <p>查询参数：page={{ page }}</p>
    <p><router-link to="/detail/16530.html">详情页：16530</router-link></p>
    <p><router-link to="/goods/778899.html">详情页：778899</router-link></p>
    <p><router-link :to="{name: 'GoodsDetail', params: {id: '10256'}}">详情页:10256</router-link></p>
    <p>
      <router-link
        :to="{path: '/detail/18856.html', query: {with: 'task'}}"
        replace
      >
        详情页:18965
      </router-link>
    </p>
    <p>
      <router-link
        to="append"
        append
      >
        在路由path的基础上附加append
      </router-link>
    </p>
    <p>
      <router-link
        to="/detail/18856.html"
        tag="p"
      >
        使用其他标签代替默认的a标签
      </router-link>
    </p>
    <p>
      <router-link to="/shoesbag/c10093/">激活class的测试用例</router-link>
    </p>
    <p>
      <router-link
        to="/shoesbag/c10093/"
        exact
      >
        激活class的测试用例-exact
      </router-link>
    </p>
    <p>
      <router-link
        to="/shoesbag/c10093/?order=4&page=2"
        tag="span"
      >
        <a>将激活class应用在外层元素</a>
      </router-link>
    </p>
    <p>
      <router-link
        to="/"
        exact
      >
        返回首页
      </router-link>
    </p>

    <!--
    <router-link> 组件支持用户在具有路由功能的应用中 (点击) 导航。
    通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，
    可以通过配置 tag 属性生成别的标签。
    另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

    <router-link> 比起写死的 <a href="..."> 会好一些，理由如下：
    1. 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。
    2. 在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。
    3. 当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写 (基路径) 了。

    <router-link>属性 to
    类型: string | Location （required）
    表示目标路由的链接。当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。

    <router-link>属性 replace
    类型: boolean
    默认值: false
    设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。

    <router-link>属性 append
    类型: boolean
    默认值: false
    设置 append 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b

    <router-link>属性 tag
    类型: string
    默认值: "a"
    有时候想要 <router-link> 渲染成某种标签，例如 <li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。

    <router-link>属性 active-class
    类型: string
    默认值: "router-link-active"
    设置 链接激活时使用的 CSS 类名。
    默认值可以通过路由的构造选项 linkActiveClass 来全局配置。

    <router-link>属性 exact
    类型: boolean
    默认值: false
    "是否激活" 默认类名的依据是 inclusive match (全包含匹配)。
    举个例子，如果当前的url路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。
    按照这个规则，每个路由都会激活<router-link to="/">！
    想要链接使用 "exact 匹配模式"，则使用 exact 属性。

    <router-link>属性 exact-active-class
    类型: string
    默认值: "router-link-exact-active"、
    配置当链接被精确匹配的时候应该激活的 class。
    注意默认值也是可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的。

    <router-link>属性 event
    类型: string | Array<string>
    默认值: 'click'
    声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组。

    -->
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: {
    levelOne: { type: String, required: true },
    levelTwo: { type: String, required: true },
    order: { type: String, required: true },
    page: { type: String, required: true },
  },
  data() {
    window.router = this.$router;
    // 返回数据
    return {
      pageData: {},
      listData: []
    };
  },
  beforeRouteEnter(to, from, next) {
    console.group('beforeRouteEnter', 'goods-list');
    console.groupEnd();
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.group('beforeRouterUpdate', 'goods-list');
    console.groupEnd();
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.group('beforeRouteLeave', 'goods-list');
    console.groupEnd();
    next();
  }
};
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
  background-color: #345a86;

  a {
    color: #98b4d3;
  }

  .router-link-active {
    background-color: #666;
  }

  .router-link-exact-active {
    background-color: #eee;
  }
}
</style>
