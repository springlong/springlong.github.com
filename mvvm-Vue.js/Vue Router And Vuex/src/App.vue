<template>
  <div id="app">
    <EleHeader />
    <div class="container">
      <router-view />
      <div class="named-view">
        <router-view name="part1" />
        <router-view name="part2" />
      </div>
    </div>
    <EleFooter />
  </div>
</template>

<script>
import EleHeader from '@/components/Header'
import EleFooter from '@/components/Footer'

export default {
  // 组件名称
  name: 'App',
  // 定义子组件
  components: {
    EleHeader,
    EleFooter,
  },
}
</script>

<style lang="scss">
@import "./assets/styles/base/_mixin.scss";

body, html {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #e8ebe7;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
