<template>
	<a-layout-sider :collapsed="state.setting.setting" :collapsedWidth="0" :width="324">
		<a-tabs v-if="isTarget.length" v-model:activeKey="activeKey" size="small">
			<template v-for="tab in tabs" :key="tab.component">
				<template v-if="Object.keys(curComponent).length">
					<a-tab-pane v-if="isInclude(tab.component)" :tab="tab.label" :key="tab.component">
						<component :is="tab.component" :curComponent="curComponent" />
					</a-tab-pane>
				</template>
			</template>
		</a-tabs>
		<div v-else class="page-set">
			<div class="title">页面设置</div>
			<div class="content my-scroll">
				<a-row class="line" :gutter="[10, 10]">
					<a-col :span="6" class="name">屏幕大小</a-col>
					<a-col :span="9">
						<a-input-number v-model:value="canvasStyleData.width" size="small" />
					</a-col>
					<a-col :span="9">
						<a-input-number v-model:value="canvasStyleData.height" size="small" />
					</a-col>
				</a-row>
				<a-row class="line" :gutter="[10, 10]">
					<a-col :span="6">背景颜色</a-col>
					<a-col :span="18">
						<popuColor v-model:color="canvasStyleData.backgroundColor" />
					</a-col>
				</a-row>
			</div>
		</div>
	</a-layout-sider>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import events from './tabs/events.vue'
import bases from './tabs/bases.vue'
import dataSource from './tabs/dataSource.vue'
import animation from './tabs/animation.vue'
import popuColor from '@/components/popuColor/popuColor.vue'

export default defineComponent({
	components: {
		events,
		bases,
		dataSource,
		animation,
		popuColor
	},
	setup() {
		const { state } = useStore()
		const data = reactive({
			activeKey: 'bases',
			tabs: [
				{ label: '样式', component: 'bases' },
				{ label: '事件', component: 'events' },
				{ label: '数据', component: 'dataSource' },
				{ label: '动画', component: 'animation' }
			]
		})
		const curComponent = computed(() => {
			if (state.component.isTarget.length && state.component.curComponent !== null) {
				return state.component.curComponent
			}
			return {}
		})
		function isInclude (component:string) {
			if (Object.prototype.hasOwnProperty.call(curComponent.value, component)) {
				return true
			}
			return false
		}
		return {
			state,
			...toRefs(data),
			isInclude,
			curComponent,
			isTarget: computed(() => state.component.isTarget),
			canvasStyleData: computed(() => state.component.canvasStyleData)
		}
	}
})
</script>
<style lang="less" scoped>
@import './tabs/style.less';
.ant-tabs{
	/deep/.ant-tabs-nav .ant-tabs-tab{
		margin-right: 0;
	}
	/deep/.ant-tabs-bar{
		margin: 0 !important;
	}
}
.page-set{
	.title{
		height: 30px;
		line-height: 30px;
		background-color: #2e343c;
	}
	.content{
		height: calc(100vh - 70px);
		padding: 16px;
	}
}
</style>

