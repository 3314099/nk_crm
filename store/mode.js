export const state = () => ({
  editMode: null,
  editItem: null,
  contentMode: null
})

export const mutations = {
  chgEditMode (state, payload) {
    state.editMode = payload.mode
    state.editItem = payload.item
  },

  chgContentMode (state, payload) {
    state.contentMode = payload.contentMode
  }
}

export const actions = {
  chgEditMode ({ commit }, payload) {
    commit('chgEditMode', payload)
  },
  chgContentMode ({ commit }, payload) {
    commit('chgContentMode', payload)
  }
}

export const getters = {
  editMode: state => state.editMode,
  editItem: state => state.editItem,
  contentMode: state => state.contentMode
}
