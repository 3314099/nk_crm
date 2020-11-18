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
  chgSectionsState ({ commit, state }, sections) {
    commit('chgSectionsState', sections)
  },
  async fetchSections ({ dispatch, commit }, userId) {
    try {
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${userId}`)
      // commit('chgStateSections', orderSections(sections))
      return orderSections(sections)
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createSection ({ dispatch, commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section', data)
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSectionsState', orderSections(sections))
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async editSection ({ dispatch, commit, state }, data) {
    try {
      const response = await this.$axios.$put('/api/user/properties/section', data)
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSectionsState', orderSections(sections))
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async removeSection ({ dispatch, commit, state }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section/remove', data)
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSectionsState', orderSections(sections))
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async chgOrderSections ({ dispatch, commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section/chgOrderSections', data)
      // загрузка нового списка не требуется тк store изменен через get на sections.vue
      dispatch('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      dispatch('setAlert', err.response.data.message, { root: true })
      throw err
    }
  }
}
export const getters = {
  sections: state => state.sections,
}

function orderSections (sections) {
  return sections.map((item, index) => {
    item.order = index + 1
    return item
  })
}
