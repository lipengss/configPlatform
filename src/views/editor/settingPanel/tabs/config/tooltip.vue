<template>
  <div class="tooltip">
    <a-row align="middle" :gutter="[10, 10]">
      <a-col :span="7">文字大小</a-col>
      <a-col :span="8">
        <a-slider size="small" v-model:value="tooltip.textStyle.fontSize" :max="60" />
      </a-col>
      <a-col :span="9">
        <a-input-number v-model:value="tooltip.textStyle.fontSize" size="small" />
      </a-col>
      <a-col :span="7">文字颜色</a-col>
      <a-col :span="17">
        <popuColor v-model:color="tooltip.textStyle.color" />
      </a-col>
      <a-col :span="7">弹框边宽</a-col>
      <a-col :span="8">
        <a-slider size="small" v-model:value="tooltip.borderWidth" :max="60" />
      </a-col>
      <a-col :span="9">
        <a-input-number v-model:value="tooltip.borderWidth" size="small" />
      </a-col>
      <a-col :span="7">弹框边框色</a-col>
      <a-col :span="17">
        <popuColor v-model:color="tooltip.borderColor" />
      </a-col>
      <a-col :span="7">弹框背景色</a-col>
      <a-col :span="17">
        <popuColor v-model:color="tooltip.backgroundColor" />
      </a-col>
      <a-col :span="7">指示器类型</a-col>
      <a-col :span="17">
        <a-select
          :size="size"
          v-model:value="tooltip.axisPointer.type"
          style="width: 100%"
        >
          <a-select-option v-for="select in pointers" :key="select.value" :value="select.value">{{ select.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { pointers } from '../data'
import { defineComponent } from 'vue'
import popuColor from '@/components/popuColor/popuColor.vue'
export default defineComponent({
  components: {
    popuColor
  },
  props: {
    size: {
      type: String,
      default: 'small'
    },
    tooltip: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    return {
      pointers
    }
  }
})
</script>
<style lang="less" scoped>
@import '../style.less';
</style>
