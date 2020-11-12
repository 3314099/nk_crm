export const state = () => ({
  searchField: '',
  commentField: '',
  colorPicker: {},
  loading: false,
  resetV: false
})

export const mutations = {
  chgSearchField (state, payload) {
    state.searchField = payload
  },
  chgCommentField (state, payload) {
    state.commentField = payload
  },
  chgColorPicker (state, payload) {
    state.colorPicker = payload
  },
  chgLoading (state, payload) {
    state.loading = payload
  },
  resetUtils (state) {
    state.colorPicker = {}
    state.loading = false
  },
  resetFields (state) {
    state.searchField = ''
    state.commentField = ''
  },
  resetV (state, payload) {
    state.resetV = payload
  }
}

export const actions = {
  chgSearchField ({ commit }, payload) {
    commit('chgSearchField', payload)
  },
  chgCommentField ({ commit }, payload) {
    commit('chgCommentField', payload)
  },
  chgColorPicker ({ commit }, payload) {
    commit('chgColorPicker', payload)
  },
  chgLoading ({ commit }, payload) {
    commit('chgLoading', payload)
  },
  resetUtils ({ commit }) {
    commit('resetUtils')
  },
  resetFields ({ commit }) {
    commit('resetFields')
  },
  resetV ({ commit }, payload) {
    commit('resetV', payload)
  }
}

export const getters = {
  searchField: state => state.searchField,
  commentField: state => state.commentField,
  colorPicker: state => state.colorPicker,
  loading: state => state.loading,
  resetV: state => state.resetV
}
