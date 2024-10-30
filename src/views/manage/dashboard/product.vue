<template>
  <a-card hoverable>
    <template #cover>
      <img :src="item.cover" alt="" width="300" height="140">
      <div class="hover-active">
        <div class="line">
          <a-button type="text" size="small" title="预览"><svg-icon icon-class="preview" /></a-button>
          <a-button type="text" size="small" title="发布"><svg-icon icon-class="release" /></a-button>
        </div>
        <div class="line">
          <a-button type="primary" class="edit" @click="editor">编辑</a-button>
        </div>
        <div class="line">
          <a-button type="text" size="small" @click="remove"><svg-icon icon-class="delete" /></a-button>
          <a-button type="text" size="small" @click="copy"><svg-icon icon-class="copy" /></a-button>
        </div>
      </div>
    </template>
    <a-card-meta>
      <template #title>
        <span class="title" @click="onRename(item.id)">
          <template v-if="isActive === item.id">
            <a-input ref="inputRef" v-model:value="item.title" size="small" @blur="onRenameChange(item.id)" @pressEnter="onRenameChange(item.id)" />
          </template>
          <template v-else>
            <svg-icon icon-class="edit" />
            {{ item.title }}
          </template>
        </span>
        <span class="status">
          <i class="round" :class="{'push': item.status === 'push'}" />
          {{ item.status === 'push' ? '已发布' : '未发布' }}
        </span>
      </template>
    </a-card-meta>
  </a-card>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, nextTick, ref } from 'vue'
export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, context) {
    const { push } = useRouter()
    const isActive = ref(0)
    const inputRef:any = ref(null)
    const { product, id } = props.item
    const editor = () => {
      push({
        path: `/editor/${product}`
      })
    }
    const remove = () => {
      context.emit('deletes', id)
    }
    function copy () {}
    function onRename(id:number) {
      isActive.value = id
      nextTick(() => {
        inputRef.value.input.focus()
      })
      
    }
    function onRenameChange(id:number) {
      if (props.item.title === '') return
      isActive.value = 0
    }
    return {
      isActive,
      editor,
      remove,
      copy,
      onRename,
      inputRef,
      onRenameChange
    }
  }
})
</script>
<style lang="less" scoped>
.ant-card{
  /deep/.ant-card-cover{
    border-bottom: 1px solid #303030;
    position: relative;
    .hover-active{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      animation: all .5s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgba(0,0,0,.8);
      .line{
        padding: 6px 6px;
      }
      .line:first-child{
        text-align: right;
      }
      .line:nth-child(2){
        text-align: center;
        .edit{
          padding: 0 30px;
        }
      }
      .line:last-child{
        text-align: center;
      }
    }
    &:hover{
      .hover-active{
        opacity: 1;
      }
    }
  }
  /deep/.ant-card-body{
    padding: 16px 10px;
    .ant-card-meta-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title{
        font-size: 14px;
        flex: 1;
      }
      .status{
        display: flex;
        align-items: center;
        .round{
          width: 8px;
          height: 8px;
          margin-left: 6px;
          margin-right: 6px;
          border-radius: 50%;
          display: inline-block;
          background-color: #666;
        }
        .push{
          background-color: #2681db;
        }
        font-size: 12px;
      }
    }
  }
}
</style>
