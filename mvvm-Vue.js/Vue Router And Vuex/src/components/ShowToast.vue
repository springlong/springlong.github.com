<template>
  <yd-popup
    v-model="show"
    masker-opacity="0"
    position="center"
    width="90%"
  >
    <div class="dialog-toast--wrap">
      <div
        :class="{'dialog-toast--text': type === 'text'}"
        class="dialog-toast"
      >
        <div
          v-if="type !== 'text'"
          :class="['dialog-toast-icon', 'dialog-toast-icon--' + type]"
        />
        <div class="dialog-toast-text">
          <slot>
            {{ text }}
          </slot>
        </div>
      </div>
    </div>
  </yd-popup>
</template>

<script>
  import { Popup } from 'vue-ydui/dist/lib.rem/popup'

  export default {
    name: 'ShowToast',
    components: {
      [Popup.name]: Popup,
    },
    props: {
      value: { type: Boolean, required: true },
      type: { type: String, required: false, default: 'text' },
      text: { type: String, required: false, default: '' },
      timeout: { type: Number, required: false, default: 200000 },
      maskerOpacity: { type: Number, required: false, default: 0 },
    },
    data() {
      return {
        show: this.value,
      }
    },
    watch: {
      value(val) {
        // 由于使用transition实现动画过渡
        // 且提示框高度会随着内容的不同而变化，因此会在手机上出现跳动的现象
        // 这里延迟执行，先让vue更新dom内容，再显示弹窗
        setTimeout(() => {
          this.show = val
          if (val) {
            this.handleCloseToast()
          }
        }, 0)
      },
      show(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      handleCloseToast() {
        clearTimeout(this.timerIdToast)
        this.timerIdToast = setTimeout(() => {
          this.show = false
        }, this.timeout)
      }
    },
  }
</script>

<style lang="less">
  .dialog-toast--wrap {
    display: flex;
    justify-content: center;
  }

  .dialog-toast {
    position: relative;
    box-sizing: border-box;
    width: 327px;
    padding-top: 177px;
    border-radius: 5px;
    margin: 0 auto;
    background: rgba(190,178,158,.95);
  }

  .dialog-toast--text {
    width: auto;
    min-width: 424px;
    max-width: 80%;
    padding: 50px 80px 46px;

    .dialog-toast-text {
      font-size: 34px;
      line-height: 60px;
    }
  }

  .dialog-toast-icon {
    position: absolute;
    top: 62px;
    left: 50%;
    width: 116px;
    height: 85px;
    margin-left: -58px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;

     + .dialog-toast-text {
      padding: 0 20px 53px;
    }
  }

  .dialog-toast-icon--success {
    background-image: url(../../src/static/images/icon-sc-tick.png);
  }

  .dialog-toast-text {
    font-size: 36px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }

</style>
