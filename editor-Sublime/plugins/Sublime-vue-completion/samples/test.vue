<template>
  <div class="container">
    <p>{{msg}} - {{'aaaa' + 3 + 4 + 5}}</p>
    <p><router-link to="/goods/detail">url</router-link></p>
    <div class="box">
      <div v-text="msg"></div>
      <div v-html="msg"></div>
      <div v-bind:style="{color: color, fontSize: fontSize}"></div>
      <div :style="styleObject"></div>
    </div>
    <div class="box">
      <div v-if="num === 1">1</div>
      <div v-else-if="num === 2">2</div>
      <div v-else>3</div>
      <div v-show="num === 1">show statis</div>

      <div v-for="item in items">
        {{item.message}}
      </div>
    </div>
    <div class="box">
      <input v-model="msg" placeholder="edit me">
      <input v-model.lazy="msg" placeholder="edit me">
      <button v-on:click="show('click')">test event</button>
      <input v-on:keyup.enter="show('enter')" value="press enter key">
      <input @keyup.ctrl="show('ctrl+')" value="press with ctrl key">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'This is home page!'
    }
  },
  methods: {
    show: msg => {
      alert(msg)
    }
  }
}
</script>

<style>
.div {
  border: 1px solid #333;
}

#div p {
  border: 1px solid #333;
}
</style>

<style lang='scss' scoped>
.div {
  border: 1px solid #ddd;

  p {
    border: 1px solid #333;
  }
}
</style>

<style lang='sass' scoped>
.div
  border: 1px solid #ddd;

  p
    border: 1px solid #333;
</style>
