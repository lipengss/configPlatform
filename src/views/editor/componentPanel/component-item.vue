<template>
	<div class="component-item">
		<div class="title">{{ component.title }}</div>
		<div class="component" draggable="true" :data-index="index" @dragstart="handleDragStart" :style="{
			backgroundImage: component.image,
			backgroundSize: 'auto 100%',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center'
		}" />
	</div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
	component: {
		type: Object,
		default: () => {}
	},
	index: {
		type: String,
		default: ''
	}
})
const handleDragStart = (e: any): void => {
	const transfer = e.dataTransfer
	const index = e.target.dataset.index
	transfer.setData('index', index)
	// 鼠标摁下  获取光标在组件内偏移的位置
	transfer.setData('downOffsetX', e.offsetX)
	transfer.setData('downOffsetY', e.offsetY)
}
</script>
<style lang="less" scoped>
.component-item {
	margin-bottom: 16px;
	border-radius: 3px;
	overflow: hidden;
	background-color: #17191c;
	.title {
		font-size: 12px;
		line-height: 22px;
		text-align: left;
		padding: 0 6px;
		background-color: #212326;
	}
	.component {
		min-height: 80px;
	}
}
</style>
