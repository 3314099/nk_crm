export const state = () => ({
  sections: []
})

export const mutations = {
  chgSections (state, payload) {
    state.sections = payload
  }
}

export const actions = {
  async fetchSections ({ commit }, userId) {
    try {
      const arr = await this.$axios.$get(`/api/user/properties/section/fetchSections/${userId}`)
      commit('chgSections', orderItems(arr))
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createSection ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/section', data)
      const arr = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSections', orderItems(arr))
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
      const arr = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSections', orderItems(arr))
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
      const arr = await this.$axios.$get(`/api/user/properties/section/fetchSections/${data.userId}`)
      commit('chgSections', orderItems(arr))
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
  sections: state => state.sections
}

function orderItems (items) {
  return items.map((item, index) => {
    item.order = index + 1
    return item
  })
}
