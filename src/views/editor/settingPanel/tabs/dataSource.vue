<template>
  <div class="data-config my-scroll">
    <Divider title="数据源" />
    <div class="block">
      <a-row align="middle" :gutter="[10, 10]">
        <a-col :span="6">数据交互</a-col>
        <a-col :span="18">
          <a-select v-model:value="curComponent.dataSource.dataType" style="width:100%" placeholder="选择数据交互方式">
            <a-select-option value="ajax">api请求</a-select-option>
            <a-select-option value="webSocket">实时数据</a-select-option>
            <a-select-option value="static">静态数据</a-select-option>
          </a-select>
        </a-col>
        <template v-if="curComponent.dataSource.dataType === 'ajax'">
          <a-col :span="6">域名地址</a-col>
          <a-col :span="18">
            <a-select v-model:value="curComponent.dataSource.domain" style="width:100%" placeholder="选择域名">
              <a-select-option value="">http://www.baidu.con</a-select-option>
              <a-select-option value="">https://www.fastmock.site/mock/4f0737cf332a1290110941d6aafc42b5/lowcode</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="6">请求类型</a-col>
          <a-col :span="18">
            <a-select v-model:value="curComponent.dataSource.method" style="width:100%" placeholder="选择请求类型">
              <a-select-option value="GET">GET</a-select-option>
              <a-select-option value="POST">POST</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="6">接口地址</a-col>
          <a-col :span="18">
            <a-input v-model:value="curComponent.dataSource.api" placeholder="填写接口地址" />
          </a-col>
          <a-col :span="6">自动请求</a-col>
          <a-col :span="4">
            <a-switch v-model:checked="curComponent.dataSource.isAuto" size="small" />
          </a-col>
          <a-col :span="10">
            <a-input-number size="small" :disabled="!curComponent.dataSource.isAuto" v-model:value="curComponent.dataSource.interval" :min="1" />
          </a-col>
          <a-col :span="4"> 秒</a-col>
          <a-col :span="24">
            <a-button type="primary" size="small" @click="apiTest" :loading="testLoading" block>接口测试</a-button>
          </a-col>
        </template>
        <statics v-if="curComponent.dataSource.dataType === 'static'" :curComponent="curComponent" />
      </a-row>
      <template v-if="curComponent.dataSource.dataType === 'webSocket'">
        webSocket
      </template>
      <Divider title="数据响应结果（只读）" />
      <div>
        <Codemirror :dataValue="curComponent.bases.chart.dataset.source" height="300px" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { notification } from 'ant-design-vue'
import { defineComponent, reactive, toRefs } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import statics from './config/statics.vue'
import Divider from '@/components/Divider/Divider.vue'
import Codemirror from '@/components/Codemirror/Codemirror.vue'
export default defineComponent({
  components: {
    statics,
    Divider,
    Codemirror,
    PlusOutlined
  },
  props: {
    curComponent: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { chart } = props.curComponent.bases
    const dataState:any = reactive({
      testLoading: false,
    })
    const apiTest = () => {
      const { api, method } = props.curComponent.dataSource
      dataState.testLoading = true
      fetch(`api/${api}`, { method: method }).then(async res => {
        dataState.testLoading = false
        const { code, data, desc } = await res.json()
        if (code !== 0) return notification['error']({ message: '接口请求错误', duration: 5, description: desc })
        notification['success']({ message: '接口测试成功', duration: 1, description: desc })
        chart.dataset.source = data
      })
    }
    return {
      apiTest,
      ...toRefs(dataState)
    }
  }
})
</script>
<style lang="less" scoped>
@import './style.less';
.block{
  width: 100%;
}
</style>
