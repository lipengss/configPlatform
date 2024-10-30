<template>
  <div class="colors">
    <a-row align="middle" :gutter="[10, 10]" v-for="(item, index) in color" :key="index">
      <a-col :span="24" class="name">系列{{ index + 1 }}</a-col>
      <a-col :span="7">填充色</a-col>
      <a-col :span="17">
        <popuColor v-model:color="color[index]" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import popuColor from '@/components/popuColor/popuColor.vue'
export default defineComponent({
  components: {
    popuColor
  },
  props: {
    color: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    console.log(props.color)
  }
})
</script>
<style lang="less" scoped>
.ant-row{
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #282a2d;
}
</style>