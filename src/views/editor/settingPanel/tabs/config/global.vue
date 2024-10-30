<template>
  <div class="global">
    <a-row align="middle" :gutter="[10, 10]">
      <a-col :span="6">系列标记</a-col>
      <a-col :span="18">
        <a-switch v-model:checked="legend.show" size="small" @change="switchChange('label')" />
      </a-col>
      <template v-if="legend.show">
        <a-col :span="6">图形宽度</a-col>
        <a-col :span="10">
          <a-slider size="small" v-model:value="legend.itemWidth" :max="60" />
        </a-col>
        <a-col :span="8">
          <a-input-number v-model:value="legend.itemWidth" size="small" />
        </a-col>
        <a-col :span="6">图形高度</a-col>
        <a-col :span="10">
          <a-slider size="small" v-model:value="legend.itemHeight" :max="60" />
        </a-col>
        <a-col :span="8">
          <a-input-number v-model:value="legend.itemHeight" size="small" />
        </a-col>
        <a-col :span="6">排列方式</a-col>
        <a-col :span="18">
          <a-radio-group v-model:value="legend.orient" size="small">
            <a-radio-button value="horizontal">水平</a-radio-button>
            <a-radio-button value="vertical">垂直</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="6">图形类型</a-col>
        <a-col :span="18">
          <a-select v-model:value="legend.icon" style="width: 100%" size="small">
            <a-select-option v-for="item in legendType" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">水平对齐</a-col>
        <a-col :span="18">
          <a-radio-group v-model:value="legend.left" size="small">
            <a-radio-button value="left"><svg-icon icon-class="left-align" /></a-radio-button>
            <a-radio-button value="center"><svg-icon icon-class="center-align" /></a-radio-button>
            <a-radio-button value="right"><svg-icon icon-class="right-align" /></a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="6">垂直对齐</a-col>
        <a-col :span="18">
          <a-radio-group v-model:value="legend.top" size="small">
            <a-radio-button value="top"><svg-icon icon-class="top-align" /></a-radio-button>
            <a-radio-button value="middle"><svg-icon icon-class="middle-align" /></a-radio-button>
            <a-radio-button value="bottom"><svg-icon icon-class="bottom-align" /></a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :span="6">字体颜色</a-col>
        <a-col :span="18">
          <popuColor v-model:color="legend.textStyle.color" />
        </a-col>
        <a-col :span="6">字体大小</a-col>
        <a-col :span="10">
          <a-slider style="width: 100%" size="small" v-model:value="legend.textStyle.fontSize" :max="60" />
        </a-col>
        <a-col :span="8">
          <a-input-number v-model:value="legend.textStyle.fontSize" size="small" />
        </a-col>
        <a-divider />
      </template>
      <template v-if="!!grid">
        <a-col :span="6">图表边距</a-col>
        <a-col :span="18">
          <div class="margin">
            <div><a-input-number v-model:value="grid.left" size="small" /></div>
            <div class="center">
              <div><a-input-number v-model:value="grid.top" size="small" /></div>
              <div class="box">
                <div class="child"></div>
              </div>
              <div><a-input-number v-model:value="grid.bottom" size="small" /></div>
            </div>
            <div><a-input-number v-model:value="grid.right" size="small" /></div>
          </div>
        </a-col>
      </template>
    </a-row>
    <a-collapse>
      <a-collapse-panel v-for="(ser, index) in series" :key="index" :header="ser.name">
        <a-row align="middle" :gutter="[10, 10]">
          <a-col :span="6">系列名称</a-col>
          <a-col :span="18">
            <a-input v-model:value="ser.name" size="small" />
          </a-col>
          <template v-if="type === 'pie'">
            <a-col :span="6">饼图半径</a-col>
            <a-col :span="9">
              <a-input addon-before="in" v-model:value="ser.radius[0]" size="small" />
            </a-col>
            <a-col :span="9">
              <a-input addon-before="out" v-model:value="ser.radius[1]" size="small" />
            </a-col>
            <a-col :span="6">边框宽度</a-col>
            <a-col :span="9">
              <a-slider size="small" v-model:value="ser.itemStyle.borderWidth" :max="20" />
            </a-col>
            <a-col :span="9">
              <a-input-number v-model:value="ser.itemStyle.borderWidth" size="small" :step="1" />
            </a-col>
            <a-col :span="6">圆角半径</a-col>
            <a-col :span="18">
              <a-input-number v-model:value="ser.itemStyle.borderRadius" size="small" :step="1" />
            </a-col>
            <a-col :span="6">边框颜色</a-col>
            <a-col :span="18">
              <popuColor v-model:color="ser.itemStyle.borderColor" />
            </a-col>
            <a-col :span="24">
              <a-collapse v-model="childActives" @change="childCollapseChange">
                <a-collapse-panel key="pieLabel" :disabled="!ser.label.show">
                  <template #header>
                    <a-switch v-model:checked="ser.label.show" size="small" @change="switchChange('pieLabel')" /> 文本标签
                  </template>
                  <a-row align="middle" :gutter="[0, 10]">
                    <a-col :span="7">内容格式</a-col>
                    <a-col :span="17">
                      <a-textarea v-model:value="ser.label.formatter"></a-textarea>
                    </a-col>
                    <a-col :span="7">字体大小</a-col>
                    <a-col :span="9">
                      <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                    </a-col>
                    <a-col :span="8">
                      <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                    </a-col>
                    <a-col :span="6">字体粗细</a-col>
                    <a-col :span="18">
                      <a-select v-model:value="ser.label.fontWeight" size="small" style="width:100%">
                        <a-select-option v-for="item in weights" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="6">字体颜色</a-col>
                    <a-col :span="18">
                      <popuColor v-model:color="ser.label.color" />
                    </a-col>
                    <a-col :span="6">标签位置</a-col>
                    <a-col :span="18">
                      <a-select v-model:value="ser.label.position" size="small" style="width:100%">
                        <a-select-option v-for="item in pieLabelPositions" :key="item" :value="item">{{ item }}</a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </a-col>
          </template>
          <template v-if="type === 'bar' || type === 'strip'">
            <a-col :span="7">柱条宽度</a-col>
            <a-col :span="9">
              <a-slider style="width: 100%" size="small" v-model:value="ser.barWidth" :step="1" :max="60" />
            </a-col>
            <a-col :span="8">
              <a-input-number v-model:value="ser.barWidth" size="small" />
            </a-col>
            <a-col :span="7">柱条圆角</a-col>
            <a-col :span="17">
              <a-slider style="width: 100%" size="small" v-model:value="ser.itemStyle.borderRadius" :step="1" :max="100" />
            </a-col>
            <a-col :span="7">柱间距</a-col>
            <a-col :span="9">
              <a-slider style="width: 100%" size="small" v-model:value="ser.barGap" :step="0.1" :max="1" />
            </a-col>
            <a-col :span="8">
              <a-input-number v-model:value="ser.barGap" size="small" :step="0.1" />
            </a-col>
            <a-col :span="24">
              <a-collapse v-model="childActives" @change="childCollapseChange">
                <a-collapse-panel :key="`label${index}`" :disabled="!ser.label.show">
                  <template #header>
                    <a-switch v-model:checked="ser.label.show" size="small" @change="switchChange('label')" />  标签
                  </template>
                  <a-row align="middle" :gutter="[10, 10]">
                    <a-col :span="7">字体大小</a-col>
                    <a-col :span="9">
                      <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                    </a-col>
                    <a-col :span="8">
                      <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                    </a-col>
                    <a-col :span="7">字体颜色</a-col>
                    <a-col :span="17">
                      <popuColor v-model:color="ser.label.color" />
                    </a-col>
                    <a-col :span="7">标签位置</a-col>
                    <a-col :span="17">
                      <a-select v-model:value="ser.label.position" size="small" style="width:100%">
                        <a-select-option v-for="item in labelPositions" :key="item" :value="item">{{ item }}</a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </a-col>
          </template>
          <template v-if="type === 'line'">
            <a-col :span="7">平滑曲线</a-col>
            <a-col :span="17">
              <a-switch v-model:checked="ser.smooth" size="small" />
            </a-col>
            <a-col :span="7">线宽</a-col>
            <a-col :span="9">
              <a-slider style="width: 100%" size="small" v-model:value="ser.lineStyle.width" :step="1" :min="1" :max="60" />
            </a-col>
            <a-col :span="8">
              <a-input-number v-model:value="ser.lineStyle.width" size="small" :step="1" />
            </a-col>
            <a-col :span="7">区域色</a-col>
            <a-col :span="17">
              <popuColor v-model:color="ser.areaStyle.color.colorStops[0].color" />
            </a-col>
            <a-col :span="24">
              <a-collapse v-model="childActives" @change="childCollapseChange">
                <a-collapse-panel key="mark" :disabled="!ser.showSymbol">
                  <template #header>
                    <a-switch v-model:checked="ser.showSymbol" size="small" @change="switchChange('mark')" />  记号显示
                  </template>
                  <a-row align="middle" :gutter="[10, 10]">
                    <a-col :span="7">数值显示</a-col>
                    <a-col :span="17">
                      <a-switch v-model:checked="ser.label.show" size="small" />
                    </a-col>
                    <template v-if="ser.label.show">
                      <a-col :span="7">字体大小</a-col>
                      <a-col :span="9">
                        <a-slider style="width: 100%" size="small" v-model:value="ser.label.fontSize" :step="1" :min="6" :max="60" />
                      </a-col>
                      <a-col :span="8">
                        <a-input-number v-model:value="ser.label.fontSize" size="small" :step="1" />
                      </a-col>
                      <a-col :span="7">字体颜色</a-col>
                      <a-col :span="17">
                        <popuColor v-model:color="ser.label.color" />
                      </a-col>
                      <a-col :span="7">标签位置</a-col>
                      <a-col :span="17">
                        <a-select v-model:value="ser.label.position" size="small" style="width:100%">
                          <a-select-option v-for="item in labelPositions" :key="item" :value="item">{{ item }}</a-select-option>
                        </a-select>
                      </a-col>
                    </template>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </a-col>
          </template>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts">
import { labelPositions, legendType, pieLabelPositions, weights } from '../data'
import popuColor from '@/components/popuColor/popuColor.vue'
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  components: {
    popuColor
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    grid: {
      type: Object,
      default: () => {}
    },
    legend: {
      type: Object,
      default: () => {}
    },
    series: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const data = reactive({
      childActives: []
    })
    const switchChange = (axis:string) => {
      const index = data.childActives.findIndex((item: string) => item === axis)
      index !== -1 && data.childActives.splice(index, 1)
    }
    const childCollapseChange = (keys:any) => {
      data.childActives = keys
    }
    return {
      ...toRefs(data),
      weights,
      legendType,
      labelPositions,
      pieLabelPositions,
      switchChange,
      childCollapseChange
    }
  }
})
</script>

<style lang="less" scoped>
@import '../style.less';
.margin{
  display: flex;
  align-items: center;
  border: 1px dashed #666;
  padding: 8px;
  .center{
    flex: 1;
    text-align: center;
    .box{
      width: 100%;
      height: 50px;
      padding: 8px;
      .child{
        width: 100%;
        height: 100%;
        border: 1px solid #666;
      }
    }
  }
  /deep/.ant-input-number{
    width: 40px;
    text-align: center;
    &:hover{
      .ant-input-number-handler-wrap{
        display: none;
      }
    }
    .ant-input-number-input{
      text-align: center;
    }
  }
}
/deep/.ant-input-group-addon{
  padding: 0 4px;
}
</style>