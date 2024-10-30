<template>
  <div>
    <Divider title="基础样式" />
    <a-row align="middle" class="block" :gutter="[10, 10]">
      <a-col :span="6" class="name">图表尺寸</a-col>
      <a-col :span="9">
        <a-input-number v-model:value="bases.width" :size="size" />
      </a-col>
      <a-col :span="9">
        <a-input-number v-model:value="bases.height" :size="size" />
      </a-col>
      <template v-if="bases.chart">
        <a-col :span="6">背景颜色</a-col>
        <a-col :span="18">
          <popuColor v-model:color="bases.chart.backgroundColor" />
        </a-col>
      </template>
      <!-- <a-col :span="6" class="name">图表位置</a-col> -->
      <!-- <a-col :span="9">
        <a-input-number v-model:value="bases.transformNum[0]" :size="size" @change="translateX" />
      </a-col>
      <a-col :span="9">
        <a-input-number v-model:value="bases.transformNum[1]" :size="size" @change="translateY" />
      </a-col>
      <a-col :span="6" class="name">旋转角度</a-col>
      <a-col :span="9">
        <a-input-number v-model:value="bases.transformNum[2]" :size="size" @change="rotate" />
      </a-col> -->
      <!-- <a-col :span="9">
        <a-button class="icon-btn" :size="size"><svg-icon icon-class="horizontal" /></a-button>
        <a-button class="icon-btn" :size="size"><svg-icon icon-class="vertical" /></a-button>
      </a-col> -->
      <a-col :span="6" class="name">不透明度</a-col>
      <a-col :span="9">
        <a-slider style="width: 100%" :size="size" v-model:value="bases.opacity" :min="0" :max="1" :step="0.1" />
      </a-col>
      <a-col :span="9">
        <a-input-number :size="size" v-model:value="bases.opacity" :min="0" :max="1" :step="0.1" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Divider from '@/components/Divider/Divider.vue'
import popuColor from '@/components/popuColor/popuColor.vue'
export default defineComponent({
  components: {
    Divider,
    popuColor
  },
  props: {
    size: {
      type: String,
      default: 'small'
    },
    bases: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { transform } = props.bases
    const translateX = (value:number) => {
      console.log(value)
    }
    const translateY = (value:number) => {

    }
    const rotate = (value:number) => {

    }
    return {
      translateX,
      translateY,
      rotate
    }
  }
})
</script>
<style lang="less" scoped>
@import '../style.less';
</style>