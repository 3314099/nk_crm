export const state = () => ({
  editMode: null,
  editItem: null
})

export const mutations = {
  chgEditMode (state, payload) {
    state.editMode = payload.mode
    state.editItem = payload.item
  }
}

export const actions = {
  chgEditMode ({ commit }, payload) {
    commit('chgEditMode', payload)
  }
}

export const getters = {
  editMode: state => state.editMode,
  editItem: state => state.editItem
}
