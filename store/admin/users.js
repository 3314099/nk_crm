export const state = () => ({
  users: [],
  usersNotes: [],
  fullNotes: []
})

export const mutations = {
  clear (state) {
    state.users = []
    state.usersNotes = []
    state.fullNotes = []
  },
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
  async fetchUsers ({ commit }) {
    try {
      const response = await this.$axios.$get('/api/users/admin')
      commit('updateVUsers', response)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createUser ({ commit, state }, formData) {
    try {
      const response = await this.$axios.$post('/api/users/admin/create', formData)
      const users = state.users.concat(response.user)
      commit('updateVUsers', users)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
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
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async deleteUser ({ commit, state }, id) {
    try {
      const response = await this.$axios.$delete(`/api/users/admin/${id}`)
      const users = state.users.filter(user => user._id !== id)
      const newNotes = state.fullNotes.filter(note => note.userId !== id)
      commit('updateVUsers', users)
      commit('updateFullNotes', newNotes)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createUserNote ({ commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/users/admin/createNote', data)
      const newNotes = state.usersNotes.concat(response.note)
      commit('updateVUsersNotes', newNotes)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },

  async fetchUserById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/users/admin/getUserById/${id}`)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchUsersNotes ({ commit }) {
    try {
      const response = await this.$axios.$get('/api/users/admin/getAllUsersNotes')
      commit('updateVUsersNotes', response)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetch ({ commit }) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async remove ({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async create ({ dispatch, commit }, { title, text, image }) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/api/post/admin', fd)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchAdminById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async addView ({ commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, { views })
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async getAnalytics ({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  }
}
export const getters = {
  users: state => state.users,
  usersNotes: state => state.usersNotes,
  fullNotes: state => state.fullNotes
}
