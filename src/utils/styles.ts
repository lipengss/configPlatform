import { sin, cos } from '@/utils/translate'
import { BaseSty } from '@/interface/components'
export function getStyle(style: BaseSty, filter:Array<string>) {
  const needUnit = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
    'position'
  ]
  const result:any = {}
  Object.keys(style).forEach((key: string) => {
    if (!filter.includes(key)) {
      if (key !== 'rotate') {
        result[key] = style[key]
        needUnit.includes(key) && (result[key] += 'px')
        result.position = 'absolute'
      } else {
        result.transform = `${key}(${style[key]}deg)`
      }
    }
  })
  return result
}

// 获取一个组件旋转rotate后的样式
export function getComponentRotatedStyle(style: any) {
  style = { ...style }
  if (style.rotate !== 0) {
    const newWdith = style.width * cos(style.rotate) + style.height * sin(style.rotate)
    const diffX = (style.width - newWdith) / 2
    style.left += diffX
    style.right = style.left + newWdith

    const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
    const diffY = (newHeight - style.height) / 2
    style.top -= diffY
    style.bottom = style.top + newHeight

    style.width = newWdith
    style.height = newHeight
  } else {
    style.bottom = style.top + style.height
    style.right = style.left + style.width
  }
  return style
}
