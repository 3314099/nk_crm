export const state = () => ({
  users: [],
  usersNotes: [],
  fullNotes: []
})

export const mutations = {
  updateVUsers (state, payload) {
    state.users = payload
  },
  updateVUsersNotes (state, payload) {
    state.usersNotes = payload
  },
  updateFullNotes (state, payload) {
    state.fullNotes = payload
  }
}

export const actions = {
  chgFullNotes ({ commit }, payload) {
    commit('updateFullNotes', payload)
  },
  async fetchUsers ({ commit }) {
    try {
      const response = await this.$axios.$get('/api/users/admin')
      commit('updateVUsers', response)
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  async createUser ({ commit, state }, formData) {
    try {
      const response = await this.$axios.$post('/api/users/admin/create', formData)
      const users = state.users.concat(response.user)
      commit('updateVUsers', users)
      commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  async updateUser ({ commit, state }, user) {
    try {
      const response = await this.$axios.$put(`/api/users/admin/${user._id}`, user)
      const newUsers = state.users.map((item) => {
        return item._id === user._id ? user : item
      })
      commit('updateVUsers', newUsers)
      commit('setResponse', response, { root: true })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async deleteUser ({ commit, state }, id) {
    try {
      const response = await this.$axios.$delete(`/api/users/admin/${id}`)
      const users = state.users.filter(user => user._id !== id)
      const newNotes = state.fullNotes.filter(note => note.userId !== id)
      commit('updateVUsers', users)
      commit('updateFullNotes', newNotes)
      commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  async createUserNote ({ commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/users/admin/createNote', data)
      const newNotes = state.usersNotes.concat(response.note)
      commit('updateVUsersNotes', newNotes)
      // commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },

  async fetchUserById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/users/admin/getUserById/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchUsersNotes ({ commit }) {
    try {
      const response = await this.$axios.$get('/api/users/admin/getAllUsersNotes')
      commit('updateVUsersNotes', response)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetch ({ commit }) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async remove ({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async create ({ commit }, { title, text, image }) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchAdminById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addView ({ commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, { views })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async getAnalytics ({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
export const getters = {
  users: state => state.users,
  usersNotes: state => state.usersNotes,
  fullNotes: state => state.fullNotes
}
