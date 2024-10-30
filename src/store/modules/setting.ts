export default {
  namespaced: true,
  state:{
    layer: true,
    component: false,
    setting: false,
    sourceCode: false
  },
  mutations: {
    toggleCollapsed(state: any, key: string) {
      state[key] = !state[key]
    },
    setDate(state: any, data: { key: string, value: string }) {
      state[data.key] = data.value
    }
  }
}