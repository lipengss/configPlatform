<template>
  <a-collapse :bordered="false" class="dashboard-aside">
    <a-collapse-panel key="application" :showArrow="true">
      <template #header>
        <svg-icon icon-class="application" />
        应用列表
      </template>
      <ul class="list">
        <template v-for="item in groupList" :key="item.id">
          <li class="item" :class="{'active': active === item.id, 'enable': item.enable }" @click="active = item.id">
          <div v-if="item.type === 'text'" class="text">
            <span>{{ item.title }}</span>
            <span v-if="item.enable" class="action">
              <i @click="onEdit(item.id)">
                <svg-icon icon-class="edit" />
              </i>
              <i @click="onDelete(item.id)">
                <svg-icon icon-class="delete" />
              </i>
            </span>
            <span class="count">{{ item.count }}</span>
          </div>
          <div v-else>
            <a-input
              ref="inputRef"
              v-model:value="item.title"
              placeholder="输入分类名称"
              @blur="onInputChange(item.id)"
              @pressEnter="onInputChange(item.id)"
            />
          </div>
          </li>
        </template>
      </ul>
      <template #extra>
        <svg-icon icon-class="add" @click="addClass" />
      </template>
    </a-collapse-panel>
    <a-collapse-panel key="recycle" :show-arrow="false">
      <template #header>
        <svg-icon icon-class="recycle" />
        回收站
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
const active = ref(1)
const inputRef:any = ref(null)
const groupList = reactive([
  { title: '全部应用', enable: false, type: 'text', id: 1, count: 3 },
  { title: '新建分类', enable: true, type: 'text', id: 2, count: 0 },
  { title: '未分组', enable: false, type: 'text', id: 3, count: 3 }
])

function onInputChange(itemId:number) {
  const { title, id }: any = current(itemId)
  if (title === '') {
    groupList.splice(groupList.findIndex(item => item.id === id), 1)
    return
  }
  current(itemId).type = 'text'
}
function addClass(event:any) {
  event.stopPropagation()
  if(groupList.some(item => item.type === 'input')) return
  groupList.splice(groupList.length - 1, 0, {
    title: '',
    enable: true,
    type: 'input',
    id: Date.now(),
    count: 0
  })
  nextTick(() => inputRef.value.input.focus())
}
function onEdit(id: number) {
  if(groupList.some(item => item.type === 'input')) return
  current(id).type = 'input'
  nextTick(() => inputRef.value.input.focus())
}
function onDelete(id: number) {
  const { title } = current(id)
  Modal.confirm({
		title: title,
		icon: createVNode(ExclamationCircleOutlined),
		content: `${title}分组删除后，分组下的项会被移入未分组中。确认删除吗？`,
		okText: '删除',
		okType: 'danger',
		cancelText: '取消',
		okButtonProps: { type: 'primary' },
		onOk() {
      const index = groupList.findIndex(item => item.id === id)
      groupList.splice(index, 1)
		},
		onCancel() {}
	})
}
function current (id: number):any {
  return groupList.find(item => item.id === id)
}

</script>
<style lang="less" scoped>
.dashboard-aside{
  text-align: left;
  /deep/.ant-collapse-item{
    .ant-collapse-header{
      padding: 15px 12px 15px 40px !important;
    }
  }
  /deep/.ant-collapse-content{
    .ant-collapse-content-box{
      padding: 0;
    }
  }
  .list{
    .item{
      text-align: left;
      padding: 8px 10px 8px 16px;
      cursor: pointer;
      &:hover:not(.active){
        background-color: rgba(255, 255, 255, 0.08);
        .action{
          display: inline-block;
        }
      }
      .text{
        display: flex;
        align-items: center;
        justify-content: space-between;
        i{
          font-size: 12px;
          padding: 4px;
        }
      }
      .action{
        display: none;
      }
    }
    .enable{
      &:hover{
        .count{
          display: none;
        }
      }
      &.active{
        .count{
          display: none;
        }
      }
    }
    .active{
      background-color: #177ddc;
      .action{
        display: inline-block;
      }
    }
  }
}
</style>