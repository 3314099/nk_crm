export const state = () => ({
  sections: []
})

export const mutations = {
  // clear (state) {
  //   state.users = []
  //   state.usersNotes = []
  //   state.fullNotes = []
  // },
  chgSectionsState (state, payload) {
    state.sections = payload
  }
}

export const actions = {
  chgStateSections ({ commit }, payload) {
    commit('chgStateSections', payload)
  },
  async fetchSections ({ commit }) {
    try {
      const response = await this.$axios.$get('/api/user/properties/sections')
      commit('chgStateSections', response)
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  async createSection ({ commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section', data)
      const userData = await this.$axios.$get(`/api/auth/fetchUserData/${data.userId}`)
      const sections = userData.sections.map((item, index) => {
        item.order = index + 1
        return item
      })
      commit('chgSectionsState', sections)
      commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  async editSection ({ commit, state }, data) {
    try {
      const response = await this.$axios.$put('/api/user/properties/section', data)
      const userData = await this.$axios.$get(`/api/auth/fetchUserData/${data.userId}`)
      const sections = userData.sections.map((item, index) => {
        item.order = index + 1
        return item
      })
      commit('chgSectionsState', sections)
      commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  async removeSection ({ commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section/remove', data)
      const userData = await this.$axios.$get(`/api/auth/fetchUserData/${data.userId}`)
      const sections = userData.sections
        .map((item, index) => {
          item.order = index + 1
          return item
        })
      commit('chgSectionsState', sections)
      commit('setResponse', response, { root: true })
      return response
    } catch (err) {
      commit('setError', err, { root: true })
      throw err
    }
  },
  chgSectionsState ({ commit, state }, sections) {
    commit('chgSectionsState', sections)
  }
}
export const getters = {
  sections: state => state.sections,
}
