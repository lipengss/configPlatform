<template>
  <a-drawer
    width="80%"
    title="画板中的数据"
    placement="right"
    v-model:visible="sourceCode"
    :destroyOnClose="true"
    contentWrapperStyle="padding: 10px"
    @close="close"
  >
    <div class="drawer-scroll my-scroll">
      <Codemirror :dataValue="componentData" height="600px" />
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'
import Codemirror from '@/components/Codemirror/Codemirror.vue'
const { state, commit } = useStore()
const sourceCode = computed(() => state.setting.sourceCode)
const componentData = computed(() => state.component.componentData)
const close = ():void => commit('setting/toggleCollapsed', 'sourceCode')

</script>
