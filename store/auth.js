export const state = () => ({
  token: true,
  emailIsFree: true
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  login ({ commit, dispatch }, formData) {
    try {
      const { token } = this.$axios.$post('/api/auth/admin/login', formData)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async createUser ({ commit, state }, formData) {
    try {
      const response = await this.$axios.$post('/api/auth/create', formData)
      commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  logout ({ commit }) {
    commit('clearToken')
  }
}

export const getters = {
  isAuthenficated: state => Boolean(state.token)
}
