import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  emailIsFree: true,
  user: null
})

export const mutations = {
  clear (state) {
    state.emailIsFree = true
    state.user = null
  },
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  },
  setUser (state, user) {
    state.user = user
  },
  clearUser (state) {
    state.user = null
  }
}

export const actions = {
  async login ({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/auth/login', formData)
      dispatch('setToken', token)
      commit('setUser', storeUser(token))
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
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
  setAdminRoles () {
  },
  setUser ({ commit, user }) {
    commit('setUser', user)
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logout ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    commit('clear')
    commit('admin/users/clear', null, { root: true })
    Cookies.remove('jwt-token')
  },
  autoLogin ({ dispatch, commit }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    if (isJWTValid(token)) {
      dispatch('setToken', token)
      commit('setUser', storeUser(token))
    } else {
      dispatch('logout')
    }
  },
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  isAdmin: state => Boolean(state.user.role === 'admin'),
  token: state => state.token,
  user: state => state.user
}

function isJWTValid (token) {
  if (!token) {
    return false
  }
  const jwtData = decodeToken(token) || {}
  const expires = jwtData.exp || 0
  const now = new Date().getTime()
  return now < expires
}

function decodeToken (token) {
  const decodedToken = jwtDecode(token) || {}
  return decodedToken
}

function storeUser (token) {
  const decodedToken = decodeToken(token)
  const newUser = {
    id: decodedToken._id,
    lastName: decodedToken.lastName,
    email: decodedToken.email,
    name: decodedToken.name,
    role: decodedToken.role
  }
  return newUser
}
