<template>
  <div
    :class="{
      'form-select-option': true,
      'form-select-option-active': itemSelected
    }"
    @click="handleClick"
  >
    <slot>
      {{ labelText }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FormSelectOption',
  props: {
    value: { type: [String, Number], required: true, default: '' },
    label: { type: [String, Number], required: false, default: undefined },
  },
  inject: ['select'],
  data() {
    return { }
  },
  computed: {
    itemSelected() {
      return this.select.value === this.value
    },
    labelText() {
      return this.label === undefined ? this.value : this.label
    }
  },
  watch: {
    value() {
      this.dispatch('FormSelect', 'setSelected', [this])
    }
  },
  created() {
    this.select.cachedOptions.push(this);
  },
  methods: {
    handleClick() {
      this.dispatch('FormSelect', 'handleOptionClick', [this])
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit(...[eventName].concat(params))
      }
    }
  }
}
</script>
