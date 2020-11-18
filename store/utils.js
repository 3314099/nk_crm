export const state = () => ({
  searchField: '',
  commentField: '',
  colorPicker: {},
  loading: false,
  resetV: false,
  firstVisibleBtn: 'all',
  secondVisibleBtn: 'all',
  firstSortBtn: 'drag',
  secondSortBtn: 'drag',
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
  },
  chgFirstVisibleBtn (state, payload) {
    state.firstVisibleBtn = payload
  },
  chgSecondVisibleBtn (state, payload) {
    state.secondVisibleBtn = payload
  },
  chgFirstSortBtn (state, payload) {
    if (!state.searchField && payload === 'search') {
      payload = 'alphabet'
    }
    state.firstSortBtn = payload
  },
  chgSecondSortBtn (state, payload) {
    if (!state.searchField && payload === 'search') {
      payload = 'alphabet'
    }
    state.secondSortBtn = payload
  },
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
  resetV: state => state.resetV,
  firstVisibleBtn: state => state.firstVisibleBtn,
  secondVisibleBtn: state => state.secondVisibleBtn,
  firstSortBtn: state => state.firstSortBtn,
  secondSortBtn: state => state.secondSortBtn
}
