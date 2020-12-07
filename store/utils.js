export const state = () => ({
  searchField: '',
  secondSearchField: '',
  commentField: '',
  colorPicker: {},
  colorsArray: [],
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
  chgSecondSearchField (state, payload) {
    state.secondSearchField = payload
  },
  chgCommentField (state, payload) {
    state.commentField = payload
  },
  chgColorPicker (state, payload) {
    state.colorPicker = payload
  },
  chgColorsArray (state, payload) {
    state.colorsArray = payload
  },
  chgLoading (state, payload) {
    state.loading = payload
  },
  resetUtils (state) {
    state.colorPicker = {}
  },
  resetFields (state) {
    state.searchField = ''
    state.secondSearchField = ''
    state.commentField = ''
  },
  resetV (state, payload) {
    state.resetV = payload
  },
  resetButtons (state) {
    state.firstVisibleBtn = 'all'
    state.secondVisibleBtn = 'all'
    state.firstSortBtn = 'drag'
    state.secondSortBtn = 'drag'
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
}

export const getters = {
  searchField: state => state.searchField,
  secondSearchField: state => state.secondSearchField,
  commentField: state => state.commentField,
  colorsArray: state => state.colorsArray,
  colorPicker: state => state.colorPicker,
  loading: state => state.loading,
  resetV: state => state.resetV,
  firstVisibleBtn: state => state.firstVisibleBtn,
  secondVisibleBtn: state => state.secondVisibleBtn,
  firstSortBtn: state => state.firstSortBtn,
  secondSortBtn: state => state.secondSortBtn
}
