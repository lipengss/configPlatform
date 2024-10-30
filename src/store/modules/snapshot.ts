
import store from '../index'
import { cloneDeep } from 'lodash'
interface State {
  snapshotData: any,
  snapshotIndex: number
}
export default {
  namespaced: true,
  state: {
    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1 // 快照索引
  },
  mutations: {
    undo(state: State) {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--
        const componentData = cloneDeep(state.snapshotData[state.snapshotIndex])
        store.commit('component/setComponentData', componentData)
      }
    },
    clear(state: State) {
      state.snapshotIndex = -1
      state.snapshotData = []
    },
    // 添加新快照
    recordSnapshot(state: State) {
      state.snapshotData[++state.snapshotIndex] = cloneDeep(store.state.component.componentData)
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
      }
    }
  }
}
