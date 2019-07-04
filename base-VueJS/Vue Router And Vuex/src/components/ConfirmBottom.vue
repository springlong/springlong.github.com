<template>
  <yd-popup
    v-model="show"
    masker-opacity="0.5"
    position="bottom"
    width="90%"
  >
    <div class="confirm-bottom">
      <div class="confirm-bottom-cont">
        <slot />
      </div>
      <div
        v-if="isShowClose"
        class="confirm-bottom-close"
      >
        <div
          class="confirm-bottom-close-item"
          @click="handleClose"
        />
      </div>
      <div
        v-else
        class="confirm-bottom-btn"
      >
        <a
          class="confirm-bottom-btn-item"
          @click="handleCancel"
        >{{ cancelText }}</a>
        <a
          class="confirm-bottom-btn-item"
          @click="handleConfirm"
        >{{ confirmText }}</a>
      </div>
    </div>
  </yd-popup>
</template>

<script>
import { Popup } from 'vue-ydui/dist/lib.rem/popup'

export default {
  name: 'ConfirmBottom',
  components: {
    [Popup.name]: Popup,
  },
  props: {
    value: { type: Boolean, default: false, },
    isShowClose: { type: Boolean, default: false, },
    isClosedOnConfirm: { type: Boolean, default: false, },
    cancelText: { type: String, default: '取消' },
    confirmText: { type: String, default: '确认' },
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
      this.$emit('close')
    },
    handleCancel() {
      this.show = false
      this.$emit('input', false)
      this.$emit('cancel')
    },
    handleConfirm() {
      if (this.isClosedOnConfirm) {
        this.show = false
        this.$emit('input', false)
      }
      this.$emit('confirm')
    }
  },
}
</script>

<style lang="less">

</style>
