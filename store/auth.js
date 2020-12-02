import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  emailIsFree: true,
  user: {}
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
  async login ({ commit, dispatch, state }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/auth/login', formData)
      dispatch('setToken', token)
      commit('setUser', storeUser(token))
      // dispatch('fetchUserData', storeUser(token).id)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createUser ({ dispatch, commit, state }, formData) {
    try {
      const response = await this.$axios.$post('/api/auth/create', formData)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('chgBuzyEmail', err.response.data.email, { root: true })
      commit('setAlert', err.response.data.message, { root: true })
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
  async fetchUserData ({ commit, dispatch }, userId) {
    try {
      const data = await this.$axios.$get(`/api/auth/fetchUserData/${userId}`)
      commit('logs/logs/chgLogsState', data.logs, { root: true })
      commit('user/properties/sections/chgSections', orderItems(data.sections), { root: true })
      commit('user/properties/groups/chgGroups', orderItems(data.groups), { root: true })
      commit('user/properties/categories/chgCategories', orderItems(data.categories), { root: true })
      commit('user/properties/categories/chgCategoriesGroups', orderItems(data.categoriesGroups), { root: true })
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
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
  return jwtDecode(token) || {}
}

function storeUser (token) {
  const decodedToken = decodeToken(token)
  return {
    id: decodedToken._id,
    lastName: decodedToken.lastName,
    email: decodedToken.email,
    name: decodedToken.name,
    role: decodedToken.role
  }
}
function orderItems (items) {
  return items.map((item, index) => {
    item.order = index + 1
    return item
  })
}
