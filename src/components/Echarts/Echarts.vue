<template>
  <div
    ref="echartsRoot"
    class="echarts"
    :style="{ width: sty.width, height: sty.height }"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, watch, toRefs, ref } from 'vue'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '150px'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    let myChart:any = null
    const echartsRoot = ref(null)
    const state = reactive({
      sty: {
        width: props.width,
        height: props.height
      }
    })
    onMounted(() => {
      const domEchart = echartsRoot.value
      if(!domEchart) return
      myChart = echarts.init(domEchart, '', {renderer: 'svg'})
      myChart.setOption(props.options, true)
    })
    watch(props.options, (opt) => {
      myChart.setOption(opt, true)
    }),
    watch(() => props.width, (w) => {
      state.sty.width = w
      myChart.resize()
    })
    watch(() => props.height, (h) => {
      state.sty.height = h
      myChart.resize()
    })
    return {
      ...toRefs(state),
      echartsRoot
    }
  }
})
</script>
