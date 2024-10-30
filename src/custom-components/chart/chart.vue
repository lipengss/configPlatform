<template>
  <Echarts :width="width" :height="height" :options="options" />
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, ref, reactive, watch, toRefs } from 'vue'
import Echarts from '@/components/Echarts/Echarts.vue'
export default defineComponent({
  components: {
    Echarts
  },
  props: {
    element: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { path }= useRoute()
    const { bases } = props.element
    const data:any = reactive({
      options: bases.chart
    })
    let width = ref(bases.width + 'px')
    let height = ref(bases.height + 'px')
    const onWatch = () => {
      watch(() => props.element.bases.chart, (options) => {
        data.options = options
      }, { deep: true})
      watch(bases, (sty) => {
        width.value = sty.width + 'px'
        height.value = sty.height + 'px'
      })
    }
    if (path !== '/preview') onWatch()
    return {
      width,
      height,
      ...toRefs(data)
    }
  }
})
</script>
