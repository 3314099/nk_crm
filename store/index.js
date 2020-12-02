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
