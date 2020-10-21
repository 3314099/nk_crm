import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
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
  autoLogin ({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  },
  async login ({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/auth/login', formData)
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
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logout ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  }
}

export const getters = {
  isAuthenficated: state => Boolean(state.token),
  token: state => state.token
}

function isJWTValid (token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  // console.log(jwtData)
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
