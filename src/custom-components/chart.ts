import { uniqueId } from 'lodash'
class Colors {
  [x: string]: string | string[]
  constructor(textColor?: string, bgColor?: string, themeColor?:string, viceColor?:string, colorList?:string[]) {
    this.textColor = textColor || '#666666'
    this.bgColor = bgColor || '#2f3133'
    this.themeColor = bgColor || '#0e76ff'
    this.viceColor = bgColor || '#666666'
    this.colorList = bgColor || ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  }
}
export class Chart extends Colors {
  [x: string]: string | string[] | any
  constructor(textColor?: string, bgColor?: string, themeColor?:string, viceColor?:string, colorList?:string[]) {
    super(textColor, bgColor ,themeColor, viceColor, colorList)
    // 文字颜色
    this.textColor = textColor
    // 背景颜色
    this.bgColor = bgColor
    // 主题颜色
    this.themeColor = themeColor
    // 副色
    this.viceColor = viceColor
    // 色系
    this.colorList = colorList
  }
  get grid() {
    return {
      top: 20,
      left: 10,
      bottom: 10,
      right: 10,
      backgroundColor: 'red',
      containLabel: true
    }
  }
  get xAxis() {
    return {
      type: 'category',
      show: true,
      splitLine: {
        show: false,
        lineStyle: {
          color: this.viceColor,
          width: 1,
          type: 'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: this.viceColor,
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: this.textColor,
        fontSize: 12,
        margin: 8
      },
      boundaryGap: true
    }
  }
  get yAxis() {
    return {
      type: 'value',
      show: true,
      splitLine: {
        show: false,
        lineStyle: {
          color: this.viceColor,
          width: 1,
          type: 'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: this.viceColor,
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: false
      },
      inverse: false,
      axisLabel: {
        color: this.textColor,
        fontSize: 12,
        margin: 8
      },
      splitNumber: 4,
      boundaryGap: 0
    }
  }
  get legend() {
    return {
      show: true,
      itemGap: 10,
      itemWidth: 14,
      itemHeight: 14,
      left: 'right',
      top: 'top',
      icon: 'roundRect',
      orient: 'horizontal',
      textStyle: {
        color: this.textColor,
        fontSize: 12
      }
    }
  }
  get series() {
    return {
      pie: {
        type: 'pie',
        name: '系列1',
        fields: 'count',
        radius: ['0%', '75%'],
        itemStyle: {
          borderWidth: 0,
          borderRadius: 0,
          borderColor: 'transparent'
        },
        label: {
          show: true,
          fontSize: 12,
          formatter: '{d}%',
          color: this.textColor,
          fontWeight: 'mormal',
          position: 'inside'
        }
      },
      bar: {
        type: 'bar',
        name: '系列1',
        fields: 'count',
        barWidth: 14,
        barGap: 0,
        label: {
          show: false,
          position: 'insideTop',
          fontSize: 12,
          color: this.textColor
        },
        itemStyle: {
          borderRadius: 0
        }
      },
      line: {
        type: 'line',
        name: '系列1',
        fields: 'count',
        smooth: false,
        showSymbol: true,
        lineStyle: {
          width: 2,
        },
        label: {
          show: false,
          position: 'insideTop',
          fontSize: 12,
          color: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'transparent' // 0% 处的颜色
            }, {
              offset: 1, color: 'transparent' // 100% 处的颜色
            }]
          }
        }
      }
    }
  }
  get tooltip() {
    return {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(50, 50, 50, 0.5)',
      borderColor: '#fff',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14,
      }
    }
  }
  // 数据源
  get dataSource() {
    return {
      dataType: 'static',
      domain: 'https://www.fastmock.site/mock/4f0737cf332a1290110941d6aafc42b5/lowcode',
      api: '/gdp',
      method: 'GET',
      isAuto: false,
      interval: 1
    }
  }
  // 模拟数据 labels X轴标签名 fields 字段名称
  mockData(labels:string[], fields:string[], max = 200, min = 60) {
    const result: any[] = []
      labels.forEach(label => {
        const obj:any = { product: label, id: uniqueId('chary_') }
        fields.forEach(field => {
          if (field !== 'product') {
            obj[field] = Math.floor(Math.random() * (max - min)) + min
          }
        })
        result.push(obj)
      })
      return result
  }
}