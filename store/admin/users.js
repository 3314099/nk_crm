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
  clear ({ commit }) {
    commit('clear')
  },
  chgFullNotes ({ commit }, payload) {
    commit('updateFullNotes', payload)
  },
  async fetchUsers ({ dispatch, commit }) {
    try {
      const response = await this.$axios.$get('/api/users/admin')
      commit('updateVUsers', response)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createUser ({ dispatch, commit, state }, formData) {
    try {
      const response = await this.$axios.$post('/api/users/admin/create', formData)
      const users = state.users.concat(response.user)
      commit('updateVUsers', users)
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async updateUser ({ dispatch, commit, state }, user) {
    try {
      const response = await this.$axios.$put(`/api/users/admin/${user._id}`, user)
      const newUsers = state.users.map((item) => {
        return item._id === user._id ? user : item
      })
      commit('updateVUsers', newUsers)
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async deleteUser ({ dispatch, commit, state }, id) {
    try {
      const response = await this.$axios.$delete(`/api/users/admin/${id}`)
      const users = state.users.filter(user => user._id !== id)
      const newNotes = state.fullNotes.filter(note => note.userId !== id)
      commit('updateVUsers', users)
      commit('updateFullNotes', newNotes)
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createUserNote ({ dispatch, commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/users/admin/createNote', data)
      const newNotes = state.usersNotes.concat(response.note)
      commit('updateVUsersNotes', newNotes)
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },

  async fetchUserById ({ dispatch, commit }, id) {
    try {
      return await this.$axios.$get(`/api/users/admin/getUserById/${id}`)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchUsersNotes ({ dispatch, commit }) {
    try {
      const response = await this.$axios.$get('/api/users/admin/getAllUsersNotes')
      commit('updateVUsersNotes', response)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetch ({ dispatch }) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async remove ({ dispatch, commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
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
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchAdminById ({ dispatch, commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchById ({ dispatch, commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async addView ({ dispatch, commit }, { views, _id }) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, { views })
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async getAnalytics ({ dispatch }) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  }
}
export const getters = {
  users: state => state.users,
  usersNotes: state => state.usersNotes,
  fullNotes: state => state.fullNotes
}
