<template>
  <a-layout-sider class="layout-sider" :collapsed="componentPanel" :collapsedWidth="48" :width="324">
    <div class="side">
      <ul>
        <li v-for="(val, key) in componentData" :key="key" :class="{'side-active': data.sideActive === key }" @click="handleSideClick(key)">
          <!-- <component :is="val.icon" :com="val.icon" :key="val.icon" /> -->
          <BarChartOutlined v-if="val.icon === 'BarChartOutlined'" />
          <TableOutlined v-if="val.icon === 'TableOutlined'" />
          <StarOutlined v-if="val.icon === 'StarOutlined'" />
          <ApartmentOutlined v-if="val.icon === 'ApartmentOutlined'" />
          <SecurityScanOutlined v-if="val.icon === 'SecurityScanOutlined'" />
          <div class="title">{{ val.name }}</div>
        </li>
      </ul>
    </div>
    <div class="side-content" :class="{'collapsed': !componentPanel }">
      <template v-if="curSide.clas === 'tab'">
        <a-tabs v-model:activeKey="data.tabActive" :tabBarGutter="0" type="card" tabPosition="left" @change="handleTabChange">
          <a-tab-pane v-for="(tab, index) in curSide.tabs" :key="tab.type" :tab="tab.title">
            <div class="wrapper-component my-scroll">
              <div v-if="tab.components && tab.components.length">
                <template v-for="(component, idx) in tab.components" :key="`${data.sideActive}_${index}_${idx}`">
                  <component-item :component="component" :index="`${data.sideActive}_${index}_${idx}`" />
                </template>
              </div>
              <a-empty v-else description="暂无组件" :image="simpleImage" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
      <template v-else>
        <div class="wrapper-component my-scroll">
          <div v-if="curSide.components &&curSide.components.length">
            <template v-for="(component, index) in curSide.components" :key="component">
              <component-item :component="component" :index="`${data.sideActive}_${index}`" />
            </template>
          </div>
          <a-empty v-else description="暂无组件" :image="simpleImage" />
        </div>
      </template>
    </div>
  </a-layout-sider>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { Empty } from 'ant-design-vue'
import { computed, reactive } from 'vue'
import { componentData } from '@/custom-components/componentData'
import componentItem from '@/views/editor/componentPanel/component-item.vue'
import { BarChartOutlined, TableOutlined, StarOutlined, ApartmentOutlined, SecurityScanOutlined } from '@ant-design/icons-vue'
const { state, commit } = useStore()
    const data = reactive({
      scroll: null,
      sideActive: 'echarts',
      tabActive: 'all',
      componentData,
      tabs: [
        { title: '全部', key: 'all'},
        { title: '柱状', key: 'ss'}
      ]
    })
    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
    const curSide = computed(() => componentData[data.sideActive] || {})
    const componentPanel = computed(() => state.setting.component)

    const handleSideClick = (key:string) => {
      data.sideActive = key
      componentPanel.value && (commit('setting/toggleCollapsed', 'component'))
    }
    const setComponent = () => {
      const curSide = componentData[data.sideActive]
      const comp = curSide.tabs.find((item: any) => item.type === data.tabActive)
      comp.components = comp.type === 'all' ? curSide.components : curSide.components.filter((item:any) => item.type === data.tabActive)
    }
    setComponent()
    const handleTabChange = (key:string) => {
      data.tabActive = key
      setComponent()
    }
</script>

<style lang="less" scoped>
.layout-sider{
  /deep/.ant-layout-sider-children{
    display: flex;
    .side{
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      background-color: #191c21;
      ul{
        flex: 1;
        li{
          padding: 10px 12px;
          cursor: pointer;
          .title{
            font-size: 12px;
          }
          .anticon{
            font-size: 16px;
          }
        }
        li:last-child{
          border-top: 1px solid #303030;
        }
        .side-active{
          position: relative;
          background-color: #14161a;
          color: #2681ff;
          &::after{
            content: '';
            width: 3px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #2681ff;
          }
        }
      }
    }
    .side-content{
      opacity: 0;
      flex: 1;
      transition: all .2s;
      .ant-tabs-vertical{
        .ant-tabs-bar{
          border-right: none;
        }
        .ant-tabs-tab{
          border: none;
        }
        .ant-tabs-nav-wrap{
          background-color: #14161a;
        }
        .ant-tabs-tab{
          background-color: #14161a;
        }
        .ant-tabs-tab-active{
          background-color: #0a0b0d;
        }
        .ant-tabs-left-content{
          padding-left: 0;
          border-left: none;
          background-color: #0a0b0d;
        }
      }
      .wrapper-component{
        height: calc(100vh - 40px);
        padding: 16px;
        padding-bottom: 0;
        overflow-y: scroll;
        background-color: #0a0b0d;
      }
    }
    .collapsed{
      opacity: 1;
      transition: all .2s;
    }
  }
}
.side-content{
  .ant-tabs-vertical{
    height: calc(100vh - 40px);
  }
}
</style>