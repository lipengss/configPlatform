<template>
  <a-input v-model:value="color" size="small">
    <template #prefix>
      <a-popover trigger="click" placement="leftTop">
        <template #content>
          <ColorPicker v-model:pureColor="color" format="hex8" isWidget />
        </template>
        <div class="color-block">
          <div class="block" :style="{'background-color': color }" />
        </div>
      </a-popover>
    </template>
    <template #suffix>
      <a-button type="link" size="small" @click="copyText"><CopyOutlined /></a-button>
    </template>
  </a-input>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import { ColorInput } from 'tinycolor2'
import useClipboard from 'vue-clipboard3'
import { notification } from 'ant-design-vue'
import { CopyOutlined  } from '@ant-design/icons-vue'

const props = defineProps({
  color: {
    type: String,
    default: '#000'
  }
})
const emit = defineEmits(['update:color'])
const color = ref<ColorInput>(props.color)


watch(() => color.value, (color) => {
  emit('update:color', color)
})

const copyText = async () => {
  try {
    const { toClipboard } = useClipboard()
    await toClipboard(color)
    notification['success']({ message: '复制成功', duration: 1, description: color })
  }catch(error: any) {
    notification['error']({ message: '复制失败了', duration: 1, description: error })
  }
}

</script>
<style lang="less" scoped>
  .ant-input-affix-wrapper-sm{
    padding-left: 3px;
    padding-right: 0;
  }
  .color-block{
    width: 50px;
    height: 18px;
    margin-right: 6px;
    position: relative;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
    .block{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
    }
  }
</style>