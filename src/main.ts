import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import './registerServiceWorker'
import router from './router'
import store from './store/index'
// UI 库
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// 拾色器
import colorPicker from 'vue3-colorpicker'
import "vue3-colorpicker/style.css"

// 全局样式
import './style/index.less'
// svg 组件
import './assets/icons/index'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'
app.component('svg-icon', SvgIcon)

// 控件
import VButton from '@/custom-components/control/VButton.vue'
import VSelect from '@/custom-components/control/VSelect.vue'
// 柱状图
import VChart from '@/custom-components/chart/chart.vue'
app.component('v-button', VButton)
app.component('v-select', VSelect)
app.component('v-chart', VChart)

app.use(antd)
app.use(store)
app.use(router)
app.use(colorPicker)
app.mount('#app')
