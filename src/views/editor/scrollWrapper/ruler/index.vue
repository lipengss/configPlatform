<template>
  <SketchRule
    :thick="ruler.thick"
    :scale="ruler.scale"
    :width="ruler.width"
    :height="ruler.height"
    :start-x="ruler.startX"
    :start-y="ruler.startY"
    :corner-active="true"
    :lines="ruler.lines"
    :palette="{
      bgColor: '#1a1a1a'  
    }"
  />
</template>
<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'

const props = defineProps({
  ruler: { type: Object, default: () => {}}
})

const ruler = computed(() => {
  return {
    thick: 20,
    scale: 1,
    width: 1402,
    height:600,
    startX: 0,
    startY: 0,
    lines: {
      h: [],
      v: []
    },
    ...props.ruler
  }
})

</script>
<style lang="less" scoped>
/deep/.indicator{
  .value{
    background-color: #0d0d0d;
  }
}
</style>