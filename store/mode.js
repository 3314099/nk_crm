export const state = () => ({
  editMode: 'default',
  editItem: {},
  contentMode: null,
  tabMode: {
    tab: '',
    content: 'default'
  },
  pageMode: '/'
})

export const mutations = {
  chgEditMode (state, payload) {
    state.editMode = payload.mode
    state.editItem = payload.item
  },
  chgContentMode (state, payload) {
    state.contentMode = payload.contentMode
  },
  chgTabMode (state, payload) {
    state.tabMode = payload
  },
  chgPageMode (state, payload) {
    state.pageMode = payload
  },
  resetMode (state) {
    state.editMode = 'default'
    state.editItem = {}
    state.tabMode = {}
  }
}

export const actions = {
  chgEditMode ({ commit }, payload) {
    commit('chgEditMode', payload)
  },
  chgContentMode ({ commit }, payload) {
    commit('chgContentMode', payload)
  },
  chgTabMode ({ commit }, payload) {
    commit('chgTabMode', payload)
  },
  chgPageMode ({ commit }, payload) {
    commit('chgPageMode', payload)
  },
  resetMode ({ commit }) {
    commit('resetMode')
  }
}

export const getters = {
  editMode: state => state.editMode,
  editItem: state => state.editItem,
  contentMode: state => state.contentMode,
  tabMode: state => state.tabMode
}
