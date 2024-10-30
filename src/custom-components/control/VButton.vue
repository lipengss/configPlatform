<template>
  <a-button
    ref="btnRef"
    shape="round"
    :style="style"
    >{{ element.bases.control.propValue }}</a-button>
</template>
<script lang="ts">
import { styleTrans } from '@/utils/tools'
import { defineComponent, ref, onMounted, computed } from 'vue'
export default defineComponent({
  props: {
    element: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const btnRef = ref(null)
    const style = computed(() => {
      
      return styleTrans(props.element.bases.control.style)
    })
    
    onMounted(() => {
      const btn: any = btnRef.value
      const events = props.element.events
      events.forEach((item: any) => {
        btn.$el.addEventListener(item.type, () => {
          alert(item.type)
        })
      })
    })
    return {
      btnRef,
      style
    }
  }
})
</script>

<style lang="less" scoped>
.ant-btn{
  width: 100%;
  height: inherit;
}
</style>
