<template>
  <ConfirmBottom
    v-model="show"
    :is-show-close="true"
  >
    <div class="zixun-tel">
      <div class="zixun-tel-text">
        <span class="label">管家:</span>
        <span class="tel">13099902020</span>
      </div>
      <div class="zixun-tel-button">
        <a
          href="tel:13099902020"
          class="zixun-tel-button-item"
        >呼叫</a>
      </div>
    </div>
  </ConfirmBottom>
</template>

<script>
import ConfirmBottom from '@/components/ConfirmBottom'

export default {
  name: 'ZixunTel',
  components: {
    ConfirmBottom
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      show: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.show = newVal
    },
    show(newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    handleClose() {
      this.show = false
      this.$emit('input', false)
    }
  },
}
</script>

<style lang="less">
  .zixun-tel {
    padding: 83px 0 0 0;
  }

  .zixun-tel-text {
    height: 60px;
    font-size: 0;
    text-align: center;

    .label {
      position: relative;
      top: -3px;
      display: inline-block;
      font-size: 36px;
      line-height: 36px;
      vertical-align: baseline;
      color: #9E9E9E;
    }

    .tel {
      display: inline-block;
      margin-left: 18px;
      font-family: Jdahei;
      font-size: 60px;
      line-height: 60px;
      vertical-align: baseline;
      color: #F5A623;
    }
  }

  .zixun-tel-button {
    margin: 79px 50px 0;
  }

  .zixun-tel-button-item {
    display: flex;
    display: block;
    width: 100%;
    height: 96px;
    border-radius: 10px;
    font-size: 34px;
    line-height: 96px;
    text-align: center;
    color: #FFFFFF;
    background-color: #f4ae56;
  }
</style>
