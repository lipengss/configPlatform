<template>
	<a-config-provider :locale="locale">
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
	import { ref } from 'vue'
	import zhCN from 'ant-design-vue/es/locale/zh_CN'
	const locale = ref(zhCN)
</script>
<style lang="less">
#app {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #bcc9d4;
	user-select: none;
}
</style>
