<template>
  <footer class="footer">
    {{ msg }}
  </footer>
</template>

<script>
export default {
  name: 'EleFooter',
  data() {
    return {
      msg: '这是尾部！',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.footer {
  height: 100px;
  line-height: 100px;
  color: #fff;
  background-color: green;
}
</style>
