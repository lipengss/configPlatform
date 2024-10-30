<template>
  <a-select
    v-model:value="select"
    :bordered="true"
    :open="element.bases.control.open"
    :placeholder="element.bases.control.placeholder"
    :style="{
      border: '1px solid #eee',
      backgroundColor: '#eee'
    }"
  >
    <a-select-option
      v-for="select in element.bases.control.options"
      :key="select.value"
      :value="select.value"
    >{{ select.label }}</a-select-option>
  </a-select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    element: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const select = ref(undefined)
    return {
      select
    }
  }
})
</script>
<style lang="less" scoped>
.ant-select{
  width: 100%;
  text-align: left;
}
</style>
