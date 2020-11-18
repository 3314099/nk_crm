export const state = () => ({
  alertMessage: '',
  alertsList: [],
  modal: '',
  error: '',
  response: null,
  message: null,
  buzyEmail: null,
  messageList: []
})

export const mutations = {
  setAlert (state, payload) {
    state.alertMessage = payload
  },
  setModal (state, payload) {
    state.modal = payload
  },
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
  nuxtServerInit ({ dispatch }) {
    dispatch('auth/autoLogin')
  },
  setAlert ({ commit }, payload) {
    commit('setAlert', payload)
  },
  setModal ({ commit }, payload) {
    commit('setModal', payload)
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
  alertMessage: state => state.alertMessage,
  modal: state => state.modal,
  response: state => state.response,
  buzyEmail: state => state.buzyEmail,
  message: state => state.message,
  messageList: state => state.messageList
}
