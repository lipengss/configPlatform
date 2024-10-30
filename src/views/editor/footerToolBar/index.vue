<template>
  <div class="bot-footer">
    <a-button class="mg-r" size="small" @click="reset">
      <svg-icon icon-class="reset" />
    </a-button>
    <a-select v-model:value="state.component.canvasStyleData.scale" size="small" style="width: 80px">
      <a-select-option v-for="item in data.scales" :key="item.value">{{ item.label }}</a-select-option>
    </a-select>
  </div>
</template>
<script setup lang="ts">
  import { useStore } from 'vuex'
  import { reactive, nextTick } from 'vue'
  const { state } = useStore()

  const data = reactive({
    scale: 100,
    scales: [
      { label: '60%', value: 0.6 },
      { label: '80%', value: 0.8 },
      { label: '100%', value: 1 },
      { label: '120%', value: 1.2 },
      { label: '150%', value: 1.5 },
      { label: '200%', value: 2 }
    ]
  })
  function reset() {
    initDomRect()
  }
  function initDomRect() {
  nextTick(() => {
    const scrollWrap:any = document.querySelector('.scroll-wrapper')
    const bigWrap:any = document.querySelector('.big-wrapper')
    scrollWrap.scrollLeft = bigWrap.clientWidth / 2 - scrollWrap.clientWidth / 2
    scrollWrap.scrollTop = bigWrap.clientHeight / 2 - scrollWrap.clientHeight / 2

    const canvas:any = document.querySelector('.canvas')
    const vw = scrollWrap.clientWidth /  (canvas.clientWidth + 20)
    const vh = scrollWrap.clientHeight / (canvas.clientHeight + 20)
    const scale = vw < vh ? vw : vh
    state.component.canvasStyleData.scale = scale
  })
}

</script>
<style lang="less" scoped>
.bot-footer {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 4px;
  border-top: 1px solid #000;
  background-color: #222528;
  .mg-r{
    margin-right: 10px;
  }
}

</style>