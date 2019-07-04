<template>
  <div class="content">
    <p>text a messate</p>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'PopupAsk',
  // 组件属性
  props: {
    id: { type: String, required: true }
  },
  // 组件数据
  data() {
    // 返回数据
    return {
      pageData: {}
    };
  },
  // 计算属性
  computed: {},
  // 组件挂载完成
  created() {},
  // 在当前路由改变，但是该组件被复用的情况下调用
  beforeRouteUpdate: (to, from, next) => {
    next();
  },
  // 组件方法
  methods: {}
};
</script>

<style lang='scss' scoped>
.bottom-ask {
}

.bottom-ask--show .bottom-ask--mask {
  display: block;
}

.bottom-ask--show .bottom-ask--container {
  transform: translate3d(0, 0, 0);
}

.bottom-ask--mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.bottom-ask--container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  min-height: 754rpx;
  padding-top: 60rpx;
  background-color: #fff;
  transform: translate3d(0, 100%, 0);
  transform-origin: center;
  transition: all 0.3s ease;
}

.bottom-ask_title {
  font-size: 36rpx;
  line-height: 1;
  text-align: center;
  color: #222;
}

.bottom-ask_close {
  position: absolute;
  right: 30rpx;
  top: 46rpx;
  width: 24rpx;
  height: 24rpx;
  padding: 20rpx;
}

.bottom-ask_close::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -14rpx;
  width: 28rpx;
  height: 2rpx;
  background-color: #4f4f4f;
  transform: rotate(45deg);
  transform-origin: 50% 50%;
}

.bottom-ask_close::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -14rpx;
  width: 28rpx;
  height: 2rpx;
  background-color: #4f4f4f;
  transform: rotate(-45deg);
  transform-origin: 50% 50%;
}

.bottom-ask_cont {
  box-sizing: border-box;
  padding: 67rpx 50rpx 0 0;
}

.bottom-ask_cont_label {
  position: relative;
  display: block;
  padding-left: 124rpx;
  padding-top: 15rpx;
  padding-bottom: 15rpx;
}

.bottom-ask_cont_label radio {
  position: absolute;
  left: 50rpx;
  top: 15rpx;
  opacity: 0;
  width: 44rpx;
  height: 44rpx;
}

.bottom-ask_cont_icon {
  box-sizing: border-box;
  position: absolute;
  left: 50rpx;
  top: 15rpx;
  width: 44rpx;
  height: 44rpx;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin-right: 30rpx;
}

.bottom-ask_cont_icon.checked {
  border-color: #bca35e;
  background-color: #bca35e;
}

.bottom-ask_cont_icon_hook {
  position: absolute;
  left: 7.5rpx;
  top: 22rpx;
  width: 15rpx;
  height: 5rpx;
  background: #fff;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  transform: rotate(45deg);
}

.bottom-ask_cont_icon_hook::after {
  content: "";
  display: block;
  width: 20rpx;
  height: 5rpx;
  background: #fff;
  transform: rotate(-90deg) translateX(50%) translateY(50%);
}

.bottom-ask_cont_text {
  font-size: 30rpx;
  line-height: 44rpx;
  color: #222;
}

.bottom-ask_cont_msg {
  padding-bottom: 25rpx;
  margin-top: 5rpx;
  font-size: 26rpx;
  line-height: 40rpx;
  color: #777;
}

.bottom-ask_btn {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  font-size: 34rpx;
  line-height: 100rpx;
  text-align: center;
  color: #fff;
  background-color: #bda25f;
}
</style>
