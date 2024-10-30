<template>
  <div id="editor" class="editor" ref="editorRef">
    <div 
      v-for="(item, index) in state.component.componentData"
      :class="['shape']"
      :id="item.id"
      :key="item.id"
      @mousedown="handleMouseDownShape($event, item, index)"
      :style="getShapeStyle(item.bases)"
    >
      <component :is="item.component" :element="item" :style="getComponentStyle(item.bases)" />
    </div>
    <Moveable
      className="moveable"
      :container="editorRef"
      :target="state.component.isTarget"
      :resizable="true"
      :draggable="true"
      :rotatable="true"
      :zoom="0.5"
      :isDisplaySnapDigit="true"
      :snappable="true"
      :snapThreshold="5"
      :snapVertical="true"
      :snapHorizontal="true"
      :elementSnapDirections="true"
      :horizontalGuidelines="[0, 200, 400]"
      :verticalGuidelines="[0, 200, 400]"
      :elementGuidelines="elementGuidelines"
      @drag="onDrag"
      @resize="onResize"
      @rotate="onRotate"
      @mousedown="handleMouseDownShape($event, state.component.curComponent, state.component.curComponentIndex)"
    />
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import Moveable from 'vue3-moveable'
import { BaseSty } from '@/interface/components'
import { ref, onMounted } from 'vue'
const { state, commit} = useStore()
const editorRef = ref(null)
const elementGuidelines:any = ref([])
onMounted(() => {
  initElementGuidelines()
})
function initElementGuidelines() {
  const arr:any = []
  const ids:any = state.component.componentData.map((item:any) => item.id)
  ids.forEach((item:string) => {
    arr.push(document.querySelector(`#${item}`))
  })
  elementGuidelines.value = arr
}
// 鼠标摁下
function handleMouseDownShape(e:any, component:any, index:number) {
  e.preventDefault()
  e.stopPropagation()
  initElementGuidelines()
  commit('component/setCurComponent', { component: component, index: index })
  commit('component/setTargets', [`#${component.id}`])
}
// 移动
function onDrag(e:any) {
  const currentNode:any = document.querySelector(`${state.component.isTarget}`)
  currentNode.style.transform = e.transform
  state.component.curComponent.bases.transform = e.transform
  state.component.curComponent.bases.transformNum = e.translate
}
// 旋转
function onRotate({ drag }:any) {
  state.component.curComponent.bases.transform = `${drag.transform}`
  state.component.curComponent.bases.transformNum = drag.translate
}
// 重置大小
function onResize(e:any) {
  e.target.style.width = e.width + 'px'
  e.target.style.height = e.height + 'px'
  e.target.style.transform = e.drag.transform
  state.component.curComponent.bases.width = e.width
  state.component.curComponent.bases.height = e.height
  state.component.curComponent.bases.transform = e.drag.transform
}
// 组件样式
const getComponentStyle = (style: any) => {
  const result:any = {}
  const needUnit = ['opacity']
  Object.keys(style).forEach((key: string) => {
    if (needUnit.includes(key)) {
      result[key] = style[key]
    }
  })
  return result
}
// 位置
const getShapeStyle = (style: any): any => {
  const result: BaseSty = {}
  const arr = ['width', 'height', 'transform', 'opacity']
  arr.forEach(attr => {
    if (attr !== 'transform') {
      result[attr] = style[attr] + 'px'
    } else {
      result.transform = style[attr]
    }
  })
  return result
}

</script>
<style lang="less" scoped>
.editor{
  height: 100%;
  .shape{
    position: relative;
    &::before{
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>