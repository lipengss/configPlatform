<template>
  <a-layout class="manage">
    <a-layout-header class="header">
      <div class="logo">
        <div class="text">PICOHOOD</div>
      </div>
      <a-menu v-model:selectedKeys="current" mode="horizontal" @select="onMenuSelect">
        <a-menu-item v-for="item in manages" :key="item.name">
          <template #icon>
            <svg-icon :icon-class="item?.meta?.icon" />
          </template>
          {{ item?.meta?.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout class="main-content">
      <a-layout-sider :width="240">
        <component :is="current + 'Aside'" />
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import assetsAside from './assets/aside.vue'
import dashboardAside from './dashboard/aside.vue'
import dataAside from './data/aside.vue'

export default defineComponent({
  components: {
    assetsAside,
    dashboardAside,
    dataAside
  },
  setup() {
    const { push, currentRoute, options } = useRouter()
    const manages = options.routes.filter(item => item.name === 'manage')[0].children
    const current = ref([currentRoute.value.name])

    function onMenuSelect(current: any) {
      current.value = [current.key]
      push({ path: current.key })
    }
    return {
      manages,
      current,
      onMenuSelect
    }
  }
})
</script>
<style lang="less" scoped>
.manage{
  height: 100%;
  display: flex;
  flex-direction: column;
  .header{
    background-color: #141414;
    padding: 0;
    .logo {
      width: 240px;
      height: 100%;
      float: left;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      .text{
        width: 100%;
        height: 24px;
        line-height: 24px;
        background: rgba(255, 255, 255, 0.3);
      }
    }
    .ant-menu-horizontal{
      border-bottom: none;
    }
  }
  .main-content{
    flex: 1;
    background-color: #171b22;
  }
}
</style>