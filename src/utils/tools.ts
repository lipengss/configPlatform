interface Base {
  [key: string]: any
}
export function styleTrans(styles:any) {
  const pxs = ['fontSize', 'borderRadius', 'borderWidth']
  const result:any = {}
  for (const key in styles) {
    if (pxs.includes(key)) {
      result[key] = styles[key] + 'px'
    } else {
      result[key] = styles[key]
    }
  }
  return result
}