<template>
  <div class="events my-scroll">
    <template v-for="event in curComponent.events" :key="event.id">
      <a-card title="事件" class="card">
        <template #extra>
          <svg-icon icon-class="delete" @click="deleteEvents(event.id)" />
        </template>
        <a-radio-group class="line" size="small" v-model:value="curComponent.bases.control.cursor">
          <a-radio-button value="default"><svg-icon icon-class="default" /></a-radio-button>
          <a-radio-button value="pointer"><svg-icon icon-class="pointer" /></a-radio-button>
        </a-radio-group>
        <a-select v-model:value="event.type">
          <template v-for="event in events" :key="event.value">
            <a-select-option :value="event.value">
              <span><svg-icon :icon-class="event.icon" style="margin-right: 10px" />{{ event.label }}</span>
            </a-select-option>
          </template>
        </a-select>
        <a-divider />
        <a-row class="line">
          <a-col :span="7">行为</a-col>
          <a-col :span="17">
            <a-select v-model:value="event.action.type" placeholder="请选择事件行为">
              <a-select-option value="url">跳转超链接</a-select-option>
              <a-select-option value="toggleComp">切换组件状态</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <template v-if="event.action.type === 'url'">
          <a-row class="line">
            <a-col :span="7">跳转</a-col>
            <a-col :span="17">
              <a-select v-model:value="event.action.url.jump" placeholder="请选择跳转方式">
                <a-select-option value="_blank">新开窗口</a-select-option>
                <a-select-option value="_self">当前页跳转</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row class="line">
            <a-col :span="24" style="margin-bottom: 10px">地址</a-col>
            <a-col :span="24">
              <a-textarea v-model:value="event.action.url.address" :rows="4" placeholder="请输入http/https协议的地址" allow-clear />
            </a-col>
          </a-row>
        </template>
        <template v-if="event.action.type === 'toggleComp'">
          切换组件状态
        </template>
      </a-card>
    </template>
    <a-button size="small" block type="primary" @click="addEvents">添加事件</a-button>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, computed, reactive, toRefs } from 'vue'
export default defineComponent({
  setup() {
    const { state } = useStore()
    const eventObj = {
      id: 0,
      type: 'click',
      action: {
        type: undefined,
        url: {
          jump: '_blank',
          address: 'https://www.baidu.com/'
        },
        toggleComp: {

        }
      }
    }
    const data = reactive({
      events: [
        { label: '单击', value: 'click', icon: 'click' },
        { label: '双击', value: 'dblclick', icon: 'dblclick' },
        { label: '长按', value: 'mouseup', icon: 'longPress' },
        { label: '右键', value: 'contextmenu', icon: 'contextmenu' }
      ]
    })
    const curComponent: any = computed(() => state.component.curComponent)
    const addEvents = () => {
      eventObj.id ++
      curComponent.value.events.push(JSON.parse(JSON.stringify(eventObj)))
    }
    const deleteEvents = (id: number) => {
      const events = curComponent.value.events
      const index  = events.findIndex((item:any) => item.id === id)
      events.splice(index, 1)
    }
    return {
      addEvents,
      deleteEvents,
      curComponent,
      ...toRefs(data)
    }
  }
})
</script>
<style lang="less" scoped>
@import './style.less';
.events{
  padding: 0 10px !important;
  .ant-btn{
    margin-bottom: 16px;
  }
  .ant-card{
    margin-bottom: 10px;
    /deep/.ant-card-head{
      min-height: 40px;
      .ant-card-head-title, .ant-card-extra{
        padding: 10px 0;
        font-size: 14px;
      }
      .ant-card-extra{
        cursor: pointer;
      }
    }
  }
}
</style>
