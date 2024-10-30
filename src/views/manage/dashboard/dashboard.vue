<template>
  <div class="content">
    <a-button type="primary" @click="onCreate">PC端创建</a-button>
    <div class="slider">
      <div class="lt">
        全部应用<span class="count"> {{ cards.length }} </span>个
      </div>
      <div class="rt">
        <a-input-search
          v-model:value="search"
          placeholder="搜索"
          style="width: 180px; margin-right: 10px"
        />
        <a-select v-model:value="sort" style="width: 140px" placeholder="排序选择">
          <a-select-option value="time">按修改时间排序</a-select-option>
        </a-select>
      </div>
    </div>
    <a-list :grid="{ gutter: 16, column: 6 }" :data-source="cards">
      <template #renderItem="{ item }">
        <a-list-item>
          <product :item="item" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import product from './product.vue'
const search = ref('')
const sort = ref(undefined)
const { push } = useRouter()
const cards = ref([
  {
    title: '大屏监测',
    status: 'push',
    product: 10056,
    id: 1,
    cover: require('@/assets/img_empty.png')
  },
  {
    title: '用电监测',
    status: 'pending',
    product: 10057,
    id: 2,
    cover: require('@/assets/img_empty.png')
  },
  {
    title: '安全监测',
    status: 'push',
    product: 10058,
    id: 3,
    cover: require('@/assets/img_empty.png')
  }
])
function onCreate() {
  push({
    path: `/editor/11695`
  })
}

</script>
<style lang="less" scoped>
.content{
    padding:16px;
    text-align: left;
    .slider{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #434b55;
      margin-bottom: 16px;
      padding: 10px 0;
      .count{
        color: #2681db;
      }
      .lt{
        padding-left: 10px;
        position: relative;
        &::before{
          content: '';
          width: 2px;
          height: 14px;
          position: absolute;
          left: 0;
          top: 4px;
          background-color: #2681db;
        }
      }
    }
  }
</style>