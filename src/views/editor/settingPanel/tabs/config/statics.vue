<template>
  <a-row :gutter="[10, 10]">
    <template v-for="item in tableColumns" :key="item.id">
      <a-col :span="24" v-if="item.type !== 'button'">
        <a-input v-model:value="item.title" :disabled="true" size="small">
          <template #addonBefore>
            {{ item.desc }}
          </template>
        </a-input>
      </a-col>
    </template>
    <a-col :span="12"><a-button type="primary" ghost block @click="addSeries">添加系列</a-button></a-col>
    <a-col :span="12"><a-button type="primary" ghost block danger @click="delSeries" :disabled="tableColumns.length <= 3">删除系列</a-button></a-col>
    <a-col :span="24">
      <add-tables :data-source="curComponent.bases.chart.dataset.source" :columns="tableColumns" />
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { cloneDeep } from 'lodash'
import { Chart } from '@/custom-components/chart'
import { computed, defineComponent, reactive, toRefs } from 'vue'
import AddTables from '@/components/AddTables/AddTables.vue'
export default defineComponent({
  components: {
    AddTables
  },
  props: {
    curComponent: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const chart = props.curComponent.bases.chart
    const { line, bar, pie} = new Chart().series
    const data:any = reactive({ line, bar, pie })
    const { dimensions, source } = chart.dataset
    //  ----------------- 计算 ----------------- 
    const tableColumns = computed(() => {
      const obj:any = { product: '类目' }
      return dimensions.map((item:string, index:number) => {
        return {
          title: item,
          dataIndex: item,
          type: 'input',
          id: index,
          desc: obj[item] || '系列',
          disDel: true
        }
      }).concat([{ title: '操作', type: 'button', id: dimensions.length, fixed: 'right' }])
    })
    // ----------------- 事件 ----------------- 
    const addSeries = () => {
      const series = 'series' + tableColumns.value.length
      dimensions.push(series)
      let i = chart.series.length
      console.log(data[props.curComponent.type])
      chart.series.push({
        ...cloneDeep(data[props.curComponent.type]),
        fields: dimensions[i - 1],
        name: '系列' + ++i
      })
    }
    const delSeries = () => {
      const pop = dimensions.pop()
      chart.series.pop()
      source.forEach((item:any) => {
        for (let key in item) {
          if (key === pop) delete item[key]
        }
      })
    }
    return {
      tableColumns,
      addSeries,
      delSeries
    }
  }
})
</script>
<style lang="less" scoped>
.svg-delete{
  color: #ff4d4f;
  cursor: pointer;
}
</style>

