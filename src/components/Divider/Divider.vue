<template>
  <a-divider class="my-divider" :orientation="position">{{ title }}</a-divider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    position: {
      type: String,
      default: 'left' // left || right || center
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {},
})
</script>

<style lang="less" scoped>
.my-divider{
  font-size: 13px !important;
  margin: 10px 0 !important;
  &::before{
    width: 0% !important;
  }
  /deep/.ant-divider-inner-text{
    padding-left: 1em;
    position: relative;
    &::before{
      content: '';
      width: 8px;
      height: 8px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: #2681ff;
    }
  }
}
</style>