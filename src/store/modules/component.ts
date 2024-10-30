interface comp {
	component: any,
	index: number
}
interface sty {
	top: number,
	left: number,
	width: number,
	height: number,
	rotate: number
}
export default {
	namespaced: true,
	state: {
		// 画布组件数据
		componentData: [],
		editMode: false,
		// 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
		curComponent: null,
		isTarget: [],
		curComponentIndex: null,
		canvasStyleData: {
			width: 1920,
			height: 1080,
			scale: 1,
			backgroundColor: '#0d2a42'
		}
	},
	getters: {},
	mutations: {
		// 添加组件数据
		addComponentData(state: any, data: comp ) {
			if (data.index !== undefined) {
				state.componentData.splice(data.index, 0, data.component)
			} else {
				state.componentData.push(data.component)
			}
		},
		clearComponent(state: any) {
			state.componentData = []
			state.curComponent = null
		},
		setTargets(state: any, arr:any) {
			state.isTarget = arr
		},
		// 页面设置
		setCanvasStyleData(state: any, data: { key: string, value: string }): void {
			state.canvasStyleData[data.key] = data.value
		},
		// 设置当前选中的组件
		setCurComponent(state: any, data: comp) {
			state.curComponent = data.component
			state.curComponentIndex = data.index
		},
		// 设置当前组件的样式
		setShapeStyle(state: any, style: sty) {
			if (style.top) state.curComponent.bases.top = style.top
			if (style.left) state.curComponent.bases.left = style.left
			if (style.width) state.curComponent.bases.width = style.width
			if (style.height) state.curComponent.bases.height = style.height
			if (style.rotate) state.curComponent.bases.rotate = style.rotate
		},
		setComponentData(state: any, componentData = []) {
			state.componentData = componentData
		},
		addComponent(state: any, data: comp ) {
			if (data.index !== undefined) {
				state.componentData.splice(data.index, 0, data.component)
			} else {
				console.log(data.component)
				state.componentData.push(data.component)
			}
		},
		deleteComponent(state: any, index: number) {
			if (index === undefined) {
				index = state.curComponentIndex
			}
			if (index === state.curComponentIndex) {
				state.curComponentIndex = null
				state.curComponent = null
			}
			state.componentData.splice(index, 1)
		}
	}
}
