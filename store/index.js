export const state = () => ({
  error: null,
  response: null,
  message: null,
  buzyEmail: null,
  messageList: []
})

export const mutations = {
  setError (state, payload) {
    state.error = payload
  },
  setResponse (state, payload) {
    state.response = payload
  },
  clearResponse (state) {
    state.error = null
    state.response = null
  },
  chgBuzyEmail (state, payload) {
    state.buzyEmail = payload
  },
  chgMessage (state, payload) {
    state.message = payload
  }
}

export const actions = {
  setError ({ commit }, payload) {
    commit('setError', payload)
  },
  setResponse ({ commit }, payload) {
    commit('setResponse', payload)
  },
  chgBuzyEmail ({ commit }, payload) {
    commit('chgBuzyEmail', payload)
  },
  chgMessage ({ commit }, payload) {
    commit('chgMessage', payload)
  },
  clearResponse ({ commit }) {
    commit('clearResponse')
  }
}

export const getters = {
  error: state => state.error,
  response: state => state.response,
  buzyEmail: state => state.buzyEmail,
  message: state => state.message,
  messageList: state => state.messageList
}
