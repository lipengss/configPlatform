<template>
  <div class="wrapper">
    <ruler :ruler="{
      width: state.component.canvasStyleData.width,
      height: state.component.canvasStyleData.height,
      scale: state.component.canvasStyleData.scale,
      thick: stateData.canvas.thick,
      startX: stateData.canvas.startX,
      startY: stateData.canvas.startY
    }" />
    <div class="scroll-wrapper" @wheel="onWheel" @scroll="onScroll">
      <div class="big-wrapper">
        <div class="canvas" :style="canvasStyle">
          <v-canvas />
        </div>
        <div class="space" v-if="stateData.isSpace" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ruler from './ruler/index.vue'
import VCanvas from '../canvas/canvas.vue'
import { useStore } from 'vuex'
import { computed, nextTick, onMounted, reactive } from 'vue'
import elementResizeDetectorMaker from 'element-resize-detector'
const { state } = useStore()
const stateData:any = reactive({
  wrapper: {
    width: 0,
    height: 0
  },
  canvas: {
    thick: 20,
    startX: 0,
    startY: 0
  },
  isSpace: false
})
const canvasStyle = computed(() => {
  const { width, height, scale, backgroundColor } = state.component.canvasStyleData
  return {
    width: `${width}px`,
    height: `${height}px`,
    transform: `
      translate(-${width / 2}px, -${height / 2}px)
      scale(${scale})
    `,
    backgroundColor: backgroundColor
  }
})
onMounted(() => {
  initDomRect()
  let erd = elementResizeDetectorMaker()
  erd.listenTo(document.querySelector('.wrapper'), function(element:any) {
    stateData.wrapper.width = element.offsetWidth
    stateData.wrapper.height = element.offsetHeight
    initDomRect()
  })
})
// 空格事件摁下
document.body.onkeydown = (event) => {
  if (event.code === 'Space') {
    event.preventDefault()
    stateData.isSpace = true
    const antLayoutContent:any = document.querySelector('.ant-layout-content')
    const scrollWrap:any = document.querySelector('.scroll-wrapper')
    scrollWrap.style.cursor = 'grab'
    // 鼠标摁下
    scrollWrap.onmousedown = (down:any) => {
      down.preventDefault()
      const { offsetX, offsetY, clientX, clientY, layerX, layerY } = down
      // 当鼠标摁下时 包裹滚动盒子的左边距 + 当前光标距离盒子的左边距 + 滚动盒的左边距 减去 移动时候的光标位置
      const downX = antLayoutContent.offsetLeft + offsetX + scrollWrap.offsetLeft
      const downY = antLayoutContent.offsetTop + offsetY + scrollWrap.offsetTop
      // 移动
      scrollWrap.onmousemove = (move:any) => {
        scrollWrap.scrollLeft = downX - move.clientX
        scrollWrap.scrollTop = downY - move.clientY
      }
    }
    // 鼠标抬起
    scrollWrap.onmouseup = (up:any) => stop(scrollWrap)
  }
}
// 空格事件抬起
document.body.onkeyup = (event) => {
  if (event.code === 'Space') {
    const scrollWrap:any = document.querySelector('.scroll-wrapper')
    scrollWrap.style.cursor = 'default'
    stateData.isSpace = false
    stop(scrollWrap)
  }
}
// 停止
function stop(dom:any) {
  dom.onmousedown = null
  dom.onmousemove = null
}
// 顺表滚轮事件
function onWheel(e:any) {
  if (e.ctrlKey || e.metaKey) {
    const { scale } = state.component.canvasStyleData
    e.preventDefault()
    state.component.canvasStyleData.scale = parseFloat(Math.max(0.2, scale - e.deltaY / 1000).toFixed(2))
    onScroll()
  }
}
function onScroll() {
  const { left, top, width, height }:any = document.querySelector('.scroll-wrapper')?.getBoundingClientRect()
  stateData.wrapper.width = width
  stateData.wrapper.height = height
  const canvas:any = document.querySelector('.canvas')?.getBoundingClientRect()
  const { scale } = state.component.canvasStyleData
  const x = Math.round((left - canvas.left) / scale)
  const y = Math.round((top - canvas.top) / scale)
  stateData.canvas.startX = x
  stateData.canvas.startY = y

}
function initDomRect() {
  nextTick(() => {
    const scrollWrap:any = document.querySelector('.scroll-wrapper')
    const bigWrap:any = document.querySelector('.big-wrapper')
    scrollWrap.scrollLeft = bigWrap.clientWidth / 2 - scrollWrap.clientWidth / 2
    scrollWrap.scrollTop = bigWrap.clientHeight / 2 - scrollWrap.clientHeight / 2
    const canvas:any = document.querySelector('.canvas')
    const vw = scrollWrap.clientWidth / (canvas.clientWidth + 20)
    const vh = scrollWrap.clientHeight / (canvas.clientHeight + 20)
    const scale = vw < vh ? vw : vh
    state.component.canvasStyleData.scale = scale
  })
}
function getDom(name:string) {
  return document.querySelector(name)
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  .scroll-wrapper{
    position: absolute;
    left: 22px;
    top: 22px;
    right: 0;
    bottom: 0;
    overflow: scroll;
    &::-webkit-scrollbar {
      width : 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: #666;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #434b55;
      border-radius: 6px;
    }
    &::-webkit-scrollbar-corner{
      box-shadow: inset 0 0 5px #434b55;
    }
    .big-wrapper{
      width: 10000px;
      height: 8000px;
      position: absolute;
      left: 0;
      top: 0;
      background: url(../../../assets/point_bg.png) repeat;
      .canvas{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-150px, -100px);
        transform-origin: center;
        background-color: rgba(0,0,0,.5);
      }
      .space{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }
    }
  }
}
</style>