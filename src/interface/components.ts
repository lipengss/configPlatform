// 组件大类
export interface FaceType {
  [key: string]: any,
  echarts: FaceSide,
  info: FaceSide,
  table: FaceSide,
  control: FaceSide,
  like: FaceSide
}
// 大类包含的字段
export interface FaceSide {
  name: string,
  icon: string,
  clas: string,
  tabs?: Array<FaceComponent>,
  components: Array<FaceComponent>
}
// 组件包含的字段
export interface FaceComponent {
  title: string,
  type?: string,
  image?: FaceBg,
  compoent?: string,
  components?: Array<string>,
  options?: any,
  bases?: BaseSty,
  dataSource?:any,
  events?: any,
  animation?: any
}
// 组件样式包含的字段
export interface BaseSty {
  [key: string]: any,
  width?: number | string,
  height?: number | string,
  left?: number | string,
  top?: number | string,
  rotate?: number | string,
  rotateX?: number | string,
  rotateY?: number | string,
  opacity?: number | string
}


