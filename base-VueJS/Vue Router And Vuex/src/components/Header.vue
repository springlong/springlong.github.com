<template>
  <header class="header">
    {{ msg }}
  </header>
</template>

<script>
export default {
  name: 'EleHeader',
  data() {
    return {
      msg: '这是头部！',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.header {
  height: 100px;
  line-height: 100px;
  color: #fff;
  background-color: green;
}
</style>
