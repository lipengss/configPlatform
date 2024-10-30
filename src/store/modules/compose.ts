export default {
  namespaced: true,
  state: {
    editor: null
  },
  mutations: {
    getEditor(state: any) {
      state.editor = document.querySelector('#editor')
    }
  }
}
