<template>
  <a-layout class="manage-layout">
    <header-tool-bar />
    <a-layout class="main">
      <layer-panel />
      <component-panel />
      <a-layout-content
        class="layout-content"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @mousedown="handleMouseDown"
        @mouseup="deselectCurComponent"
      >
        <div id="layout-child">
          <scroll-wrapper />
        </div>
        <footer-tool-bar />
      </a-layout-content>
      <setting-panel />
    </a-layout>
    <source-code />
  </a-layout>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { notification } from 'ant-design-vue'
import { uniqueId, cloneDeep } from 'lodash'
import headerToolBar from './headerToolBar/index.vue'
import layerPanel from './layerPanel/index.vue'
import componentPanel from './componentPanel/index.vue'
import settingPanel from './settingPanel/index.vue'
import scrollWrapper from './scrollWrapper/index.vue'
import sourceCode from './sourceCode/index.vue'
import footerToolBar from '@/views/editor/footerToolBar/index.vue'
import { componentData } from '@/custom-components/componentData'

const { params } = useRoute()
const spinning = ref(false)
const { state, commit } = useStore()
const canvasStyleData: any = computed(() => state.component.canvasStyleData)

// 释放组件
function handleDrop(e: any) {
  const transfer = e.dataTransfer
  const index = transfer.getData('index').split('_')
  const downOffsetX = transfer.getData('downOffsetX')
  const downOffsetY = transfer.getData('downOffsetY')
  const curSide = componentData[index[0]]
  const component = curSide.clas === 'tab' ? cloneDeep(curSide.tabs[index[1]].components[index[2]]) : cloneDeep(curSide.components[index[1]])
  component.id = uniqueId('component_')
  console.log(`translate(${e.offsetX - downOffsetX}px, ${e.offsetY - downOffsetY}px)`)
  component.bases.transform = `translate(${e.offsetX - downOffsetX}px, ${e.offsetY - downOffsetY}px)`
  commit('component/addComponentData', { component })
}
// // 组件在目标区域中移动时触发
function handleDragOver(e: any) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
// 鼠标按下事件
function handleMouseDown(e):void {
  console.log('触发大盒子的鼠标摁下事件了')
  e.stopPropagation()
  e.preventDefault()
  commit('component/setTargets', [])
}
// 鼠标抬起事件
function deselectCurComponent():void {
  console.log('触发大盒子的鼠标抬起事件了', state.component.isTarget.length)
  if (!state.component.isTarget.length) {
    commit('component/setTargets', [])
    commit('component/setCurComponent', { component: null, index: null })
  }
}
// 获取数据
function getData() {
  commit('component/clearComponent')
  spinning.value = true
  fetch(`api/product/${params.id}`).then(async res => {
    spinning.value = false
    const { code, data, desc } = await res.json()
    if (code !== 0) return notification['error']({ message: '接口报错', duration: 6, description: desc })
    data.components.forEach((component: any) => {
      commit('component/addComponentData', { component })
    })
    for (const key in data.pageData) {
      if (Object.prototype.hasOwnProperty.call(canvasStyleData.value, key)) {
        commit('component/setCanvasStyleData', { key: key, value: data.pageData[key] })
      }
    }
  }, () => {})
}
getData()
</script>
<style lang="less" scoped>
.manage-layout{
  overflow: hidden;
  background: url(../../assets/point_bg.png);
  .main{
    .layout-content {
      display: flex;
      height: calc(100vh - 40px);
      flex-direction: column;
      #layout-child{
        flex: 1;
        position: relative;
        overflow: hidden;
      }
    }
  }
}
.drawer-scroll{
  height: calc(100vh - 103px);
  overflow-y: scroll;
}
</style>