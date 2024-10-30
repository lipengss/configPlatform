<template>
  <div class="preview" :style="{
    ...pageStyles,
    transform: transform
  }" loading ref="previewRef">
    <a-spin :spinning="spinning" size="large" tip="正在加载数据...">
      <template v-for="item in componentData" :key="item.id">
        <component
          :is="item.component"
          :style="getStyle(item.bases, [])"
          :prop-value="item.propValue"
          :element="item"
        />
      </template>
    </a-spin>
  </div>
  <Moveable
    className="moveabless"
    :container="previewRef"
    :resizable="true"
    :draggable="true"
    :rotatable="true"
    :snapVertical="true"
    :snapHorizontal="true"
  />
</template>
<script lang="ts">
import { getStyle } from '@/utils/styles'
import { notification } from 'ant-design-vue'
import Moveable from 'vue3-moveable'
import { FaceComponent } from '@/interface/components'
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
interface pageStyle {
  [key: string]: any,
  width: string,
  height: string,
  backgroundColor: string
}
export default defineComponent({
  components: {
    Moveable
  },
  setup() {
    const { query } = useRoute()
    const previewRef = ref(null)
    const state = reactive({
      spinning: false,
      pageStyles:<pageStyle> {},
      componentData:<any> [],
      transform: 'scale(1) translate(-50%, -50%)'
    })
    // 画板样式
    const setPageStyle = (stys: any) => {
      for (const key in stys) {
        if (key === 'backgroundColor') {
          state.pageStyles['backgroundColor'] =  stys['backgroundColor']
        } else {
          state.pageStyles[key] = stys[key] + 'px'
        }
      }
    }
    function render(components:any[]) {
      components.forEach((component: FaceComponent) => {
        state.componentData.push(component)
      })
    }
    // 路由传参
    const data:any = query.data
    const pageData:any = query.pageData
    render(JSON.parse(data))
    setPageStyle(JSON.parse(pageData))
    onMounted(() => {
      window.addEventListener('resize', () => {
        setScale()
      })
      getScale()
    })
    function getScale() {
      const { width, height } = JSON.parse(pageData)
      const vw = window.innerWidth / width
      const vh = window.innerHeight / height
      const scale = vw < vh ? vw : vh
      state.transform = `scale(${scale}) translate(-50%, -50%)`
      return scale
    }
    function setScale() {
      const scale = getScale()
      state.transform = `scale(${scale}) translate(-50%, -50%)`
    }
    // 数据请求
    // state.spinning = true
    // fetch(`api/product/${query.id}`).then(async res => {
    //   state.spinning = false
    //   const { code, data, desc } = await res.json()
    //   if (code !== 0) return notification['error']({ message: '接口报错', duration: 6, description: desc })
    //   render(data.components)
    //   setPageStyle(data.pageData)
    // }, () => {})
    return {
      getStyle,
      previewRef,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less" scoped>
.preview{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  transition: 0.3s;
}
</style>
