<template>
  <div
    :class="{
      'form-select': true,
      'form-select--active': showSelect,
    }"
  >
    <div
      class="form-select-hd"
      @click="handleToggle"
    >
      <input
        v-model="selectedLabel"
        :placeholder="placeholder"
        readonly="readonly"
        class="form-select-hd-value"
      >
      <div class="form-select-hd-arrow" />
    </div>
    <div class="form-select-bd">
      <div class="form-select-cont">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    // 下拉框的当前值
    value: { type: [String, Number], required: false, default: '' },
    // 占位文本
    placeholder: { type: String, required: false, default: '' },
    // 手动设置是否显示下拉框
    showDrop: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      showSelect: false,
      selectedLabel: '',
      cachedOptions: [],
    }
  },
  provide() {
    return {
      select: this
    }
  },
  watch: {
    showDrop(val) {
      this.showSelect = val
    },
    value(val, oldVal) {
      this.setSelected()
    }
  },
  mounted() {
    this.setSelected()
  },
  created() {
    this.$on('handleOptionClick', this.handleOptionClick)
    this.$on('setSelected', this.setSelected)
  },
  methods: {
    setSelected() {
      this.cachedOptions.some((item) => {
        if (item.value === this.value) {
          this.selectedLabel = item.labelText
          return true
        }
        return false
      })
    },
    handleToggle() {
      this.showSelect = !this.showSelect
    },
    handleOptionClick(option) {
      this.showSelect = false
      this.selectedLabel = option.labelText
      this.$emit('input', option.value)

      if (this.value !== option.value) {
        this.$emit('change', option.value);
      }
    }
  }
}
</script>

<style lang="less">
  @import "../static/style/_mixin.less";

  .form-select {
    position: relative;
    display: inline-block;
  }

  .form-select--active {
    .form-select-hd-arrow {
      transform: rotate(180deg);
    }

    .form-select-bd {
      pointer-events: auto;
      opacity: 1;
      transform: scaleY(1);
    }
  }

  .form-select-hd {
    position: relative;
    background: #FFFFFF;
  }

  .form-select-hd-value {
    box-sizing: border-box;
    width: 100%;
    padding: 0 83px 0 37px;
    border: 1px solid #E4E6EC;
    border-radius: 5px;
    font-size: 28px;
    line-height: 74px;
    color: #9E9E9E;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .form-select-hd-arrow {
    .less-arrow(bottom, @width: 11px, #6F6964, 2px, #fff);
    position: absolute;
    top: 50%;
    right: 25px;
    margin-top: -11px / 2;
    transition: all ease-out .2s;
  }

  .form-select-bd {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    border: 1px solid #E4E6EC;
    border-bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-bottom: -3px;
    background-color: #fff;
    opacity: 0;
    transform: scaleY(0.5);
    transform-origin: 0 100% 0;
    pointer-events: none;
    transition: all ease-out .2s;
  }

  .form-select-cont {
    padding: 29px 0 13px;
  }

  .form-select-option {
    height: 66px;
    font-size: 28px;
    line-height: 66px;
    text-align: center;
    color: #181818;
  }

  .form-select-option-active {
    color: #EBA12B;
    background: #F9F9F9;
  }
</style>
