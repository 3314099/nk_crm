export const state = () => ({
  snackBar: ''
})

export const mutations = {
  changeSnackBar (state, payload) {
    state.snackBar = payload
  }
}

export const actions = {
  changeSnackBar ({ commit }, payload) {
    commit('changeSnackBar', payload)
  }
}

export const getters = {
  snackBar: state => state.snackBar
}
