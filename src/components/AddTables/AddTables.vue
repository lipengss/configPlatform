<template>
  <div style="width: 100%;">
    <a-table :data-source="dataSource" row-key="id" :scroll="{ x: 293 }" tableLayout="fixed" :pagination="false" bordered size="small">
      <template v-for="item in columns" :key="item.dataIndex">
        <a-table-column :title="item.title" width="70px" align="center" :fixed="item.fixed">
          <template #default="{ record }">
            <span
              v-if="item.type === 'text'"
            >{{ record[item.dataIndex] }}</span>
            <a-input
              v-if="item.type === 'input'"
              v-model:value="record[item.dataIndex]"
              size="small"
              :placeholder="item.placeholder"
            />
            <a-button
              v-if="item.type === 'button'"
              @click="staticDelect(record)"
              size="small"
              type="primary"
              danger
            >
              <svg-icon icon-class="delete" />
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-button type="primary" size="small" style="margin-top: 10px" block @click="addList"><PlusOutlined /> 新增 </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    PlusOutlined
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const staticDelect = (rowData: any) => {
      const index = props.dataSource.findIndex((item: any) => item.id === rowData.id)
      if (index !== -1) props.dataSource.splice(index, 1)
    }
    const addList = () => {
      const filterKeys = props.columns.filter((item: any) => item.key !== 'operation')
       const model:any = {
         id: Date.now()
       }
      filterKeys.forEach((item: any) => {
        if (item.type === 'number') {
          model[item.key] = 0
        } else {
           model[item.key] = ''
        }
      })
      props.dataSource.push(model)
    }

    return {
      addList,
      staticDelect
    }
  }
})
</script>
