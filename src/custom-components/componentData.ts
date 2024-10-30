import { Components, bg } from './components'
import { FaceType } from '@/interface/components'


const opt = {
  textColor: '#8adde1',
  bgColor: '#2f3133',
  themeColor: '#0b74ff',
  viceColor: '#38bca6',
  colorList: ['#38bca6', '#f06862', '#bdfdff', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
}
const components = new Components(opt)
// 类型： chart  
export const componentData:FaceType = {
  echarts: {
    name: '图表',
    icon: 'BarChartOutlined',
    clas: 'tab',
    tabs: [
      {
        title: '全部',
        type: 'all',
        components: []
      },
      {
        title: '柱状图',
        type: 'bar',
        components: []
      },
      {
        title: '条形图',
        type: 'strip',
        components: []
      },
      {
        title: '折线图',
        type: 'line',
        components: []
      },
      {
        title: '区域图',
        type: 'area',
        components: []
      },
      {
        title: '饼环图',
        type: 'pie',
        components: []
      },
      {
        title: '散点图',
        type: 'point',
        components: []
      },
      {
        title: '雷达图',
        type: 'radar',
        components: []
      },
      {
        title: '关系图',
        type: 'relation',
        components: []
      },
      {
        title: '其他',
        type: 'other',
        components: []
      },
    ],
    components: [
      ...components.pies,
      ...components.bars,
      ...components.lines,
      ...components.strip
    ]
  },
  info: {
    name: '信息',
    icon: 'ApartmentOutlined',
    clas: 'component',
    components: [
      {
        title: '通用标题',
        image: bg('info/info1.png')
      },
      {
        title: '跑马灯',
        image: bg('info/info2.png')
      },
      {
        title: '词云',
        image: bg('info/info3.png')
      },
      {
        title: '业务指标趋势',
        image: bg('info/info4.png')
      }
    ]
  },
  table: {
    name: '表格',
    icon: 'TableOutlined',
    clas: 'component',
    components: [
      {
        title: '轮播列表',
        image: bg('table/table1.png')
      },
      {
        title: '键值表格',
        image: bg('table/table2.png')
      }
    ]
  },
  control: {
    name: '控件',
    icon: 'SecurityScanOutlined',
    clas: 'component',
    components: [
      ...components.control,
      {
        title: '开关',
        image: bg('control/switch.png')
      },
      {
        title: 'Tab列表',
        image: bg('control/tab.png')
      },
      {
        title: '时间轴',
        image: bg('control/axis.png')
      },
      {
        title: '单选框',
        image: bg('control/checkbox.png')
      },
      {
        title: '时间选择器',
        image: bg('control/date.png')
      },
      {
        title: '输入框',
        image: bg('control/input.png')
      },
      {
        title: '进度条',
        image: bg('control/progress.png')
      }
    ]
  },
  like: {
    name: '收藏',
    icon: 'StarOutlined',
    clas: 'component',
    components: []
  }
}