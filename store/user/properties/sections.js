export const state = () => ({
  sections: [],
  sortedSections: []
})

export const mutations = {
  chgSectionsState (state, payload) {
    state.sections = payload
  },
  chgSortedSections (state, payload) {
    state.sortedSections = payload
  }
}

export const actions = {
  chgSectionsState ({ commit }, sections) {
    commit('chgSectionsState', sections)
  },
  async fetchSections ({ commit }, userId) {
    try {
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${userId}`)
      // commit('chgStateSections', orderSections(sections))
      return orderSections(sections)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createSection ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section', data)
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSectionsState', orderSections(sections))
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async editSection ({ commit }, data) {
    try {
      const response = await this.$axios.$put('/api/user/properties/section', data)
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSectionsState', orderSections(sections))
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async removeSection ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section/remove', data)
      const sections = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSectionsState', orderSections(sections))
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async chgOrderSections ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section/chgOrderSections', data)
      // загрузка нового списка не требуется тк store изменен через get на sections.vue
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  }
}
export const getters = {
  sections: state => state.sections,
  sortedSections: state => state.sortedSections,
}

function orderSections (sections) {
  return sections.map((item, index) => {
    item.order = index + 1
    return item
  })
}
