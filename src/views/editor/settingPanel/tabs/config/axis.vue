<template>
  <div class="axis">
    <a-row align="middle" :gutter="[10, 10]">
      <a-col :span="7">颜色</a-col>
      <a-col :span="17">
        <popuColor v-model:color="axis.axisLabel.color" />
      </a-col>
      <a-col :span="7">字号</a-col>
      <a-col :span="8">
        <a-slider size="small" v-model:value="axis.axisLabel.fontSize" :min="12" :max="60" />
      </a-col>
      <a-col :span="9">
        <a-input-number :size="size" v-model:value="axis.axisLabel.fontSize" :min="12" />
      </a-col>
      <a-col :span="7">文字线距离</a-col>
      <a-col :span="8">
        <a-slider size="small" v-model:value="axis.axisLabel.margin" :max="60" />
      </a-col>
      <a-col :span="9">
        <a-input-number :size="size" v-model:value="axis.axisLabel.margin" />
      </a-col>
      <a-col :span="7">反向坐标轴</a-col>
      <a-col :span="17">
        <a-switch :size="size" v-model:checked="axis.inverse" />
      </a-col>
      <a-col :span="7">刻度</a-col>
      <a-col :span="17">
        <a-switch :size="size" v-model:checked="axis.axisTick.show" />
      </a-col>
      <template v-if="dire === 'xAxis' && axis.type === 'category'">
        <a-col :span="7">两边留白</a-col>
        <a-col :span="17">
          <a-switch :size="size" v-model:checked="axis.boundaryGap" />
        </a-col>
      </template>
    </a-row>
    <a-collapse v-model="activeKeys"  expandIconPosition="right" @change="collapseChange">
      <a-collapse-panel key="guide" :disabled="!axis.axisLine.show">
        <template v-slot:header>
          <a-switch :size="size" v-model:checked="axis.axisLine.show" @change="switchChange('guide')" />  辅助线
        </template>
        <a-row :gutter="[10, 10]">
          <a-col :span="7">颜色</a-col>
          <a-col :span="17">
            <popuColor v-model:color="axis.axisLine.lineStyle.color" />
          </a-col>
           <a-col :span="7">轴线线宽</a-col>
          <a-col :span="17">
            <a-input-number :size="size" v-model:value="axis.axisLine.lineStyle.width" :min="1" />
          </a-col>
          <a-col :span="7">轴线类型</a-col>
          <a-col :span="17">
            <a-select
            :size="size"
              v-model:value="axis.axisLine.lineStyle.type"
              style="width: 100%"
            >
              <a-select-option v-for="select in lineStyle" :key="select.value" :value="select.value">{{ select.label }}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-collapse-panel>
      <a-collapse-panel key="split" :disabled="!axis.splitLine.show">
        <template v-slot:header>
          <a-switch :size="size" v-model:checked="axis.splitLine.show" @change="switchChange('split')" />  分割线
        </template>
        <a-row :gutter="[10, 10]">
          <a-col :span="7">颜色</a-col>
          <a-col :span="17">
            <popuColor v-model:color="axis.splitLine.lineStyle.color" />
          </a-col>
          <a-col :span="7">轴线线宽</a-col>
          <a-col :span="17">
            <a-input-number :size="size" v-model:value="axis.splitLine.lineStyle.width" :min="1" />
          </a-col>
          <a-col :span="7">轴线类型</a-col>
          <a-col :span="17">
            <a-select
            :size="size"
              v-model:value="axis.splitLine.lineStyle.type"
              style="width: 100%"
            >
              <a-select-option v-for="select in lineStyle" :key="select.value" :value="select.value">{{ select.label }}</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts">
import { lineStyle } from '../data'
import { defineComponent, ref, Ref } from 'vue'
import popuColor from '@/components/popuColor/popuColor.vue'
export default defineComponent({
  components: {
    popuColor
  },
  props: {
    dire: {
      type: String,
      default: 'y'
    },
    size: {
      type: String,
      default: 'small'
    },
    axis: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const activeKeys:Ref<string[]> = ref([])
    const switchChange = (axis:string) => {
      const index = activeKeys.value.findIndex((item: string) => item === axis)
      index !== -1 && activeKeys.value.splice(index, 1)
    }
    const collapseChange = (keys:string[]) => {
      activeKeys.value = keys
    }
    return {
      lineStyle,
      activeKeys,
      switchChange,
      collapseChange
    }
  }
})
</script>
<style lang="less" scoped>
@import '../style.less';
</style>