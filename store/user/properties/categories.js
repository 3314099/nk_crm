
export const state = () => ({
  icon: 'mdi-camera-off',
  stdCategoriesGroup: {}, // std = 'selected'
  categoriesGroups: [],
  categories: [],
  sortedCategoriesGroups: []
})

export const mutations = {
  chgCategoriesGroups (state, payload) {
    state.categoriesGroups = sortObjectsArrayByText(payload, 'title', false)
  },
  // makeSortedCategoriesGroups (state, payload) {
  //   const categories = state.categories.slice()
  //   const categoriesGroups = state.categoriesGroups.slice()
  //   let arr = []
  //   categoriesGroups.forEach(group => {
  //     const newCats = categories.filter(item => group._id.toString() === item.groupId.toString())
  //     group.categories = newCats
  //     arr = arr.concat(group)
  //   })
  //   state.sortedCategoriesGroups = arr
  // },
  chgCategories (state, payload) {
    state.categories = sortObjectsArrayByText(payload, 'title', false)
  },
  chgCategoriesGroupIcon (state, payload) {
    state.icon = payload
  },
  chgStdCategoriesGroup (state, payload) {
    state.stdCategoriesGroup = payload
  }
}

export const actions = {
  async fetchCategoriesGroups ({ commit }, userId) {
    try {
      const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategoriesGroups/${userId}`)
      commit('chgCategoriesGroups', orderItems(arr))
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createCategoriesGroup ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/categories/categoriesGroup', data)
      // const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategoriesGroups/${data.userId}`)
      dispatch('fetchCategoriesGroups', data.userId)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async editCategoriesGroup ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$put('/api/user/properties/categories/editCategoriesGroup', data)
      // const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategoriesGroups/${data.userId}`)
      dispatch('fetchCategoriesGroups', data.userId)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async removeCategoriesGroup ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/categories/removeCategoriesGroup', data)
      // const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategoriesGroups/${data.userId}`)
      dispatch('fetchCategoriesGroups', data.userId)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async chgOrderCategoriesGroups ({ commit }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/categories/chgOrderCategoriesGroups', data)
      // загрузка нового списка не требуется тк store изменен через get на sections.vue
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async fetchCategories ({ commit }, userId) {
    try {
      const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategories/${userId}`)
      commit('chgCategories', arr)
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async createCategory ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/categories/createCategory', data)
      // const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategories/${data.userId}`)
      // commit('chgCategories', arr)
      commit('setAlert', response.message, { root: true })
      return response.item
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async editCategory ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$put('/api/user/properties/categories/editCategory', data)
      // const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategories/${data.userId}`)
      // commit('chgCategories', orderItems(arr))
      // dispatch('fetchCategoriesGroups', data.userId)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async removeCategory ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/categories/removeCategory', data)
      const arr = await this.$axios.$get(`/api/user/properties/categories/fetchCategories/${data.userId}`)
      commit('chgCategories', orderItems(arr))
      dispatch('fetchCategoriesGroups', data.userId)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  },
  async chgOrderCategories ({ commit, dispatch }, data) {
    try {
      const response = await this.$axios.$post('/api/user/properties/categories/chgOrderCategories', data)
      // загрузка нового списка не требуется тк store изменен через get на sections.vue
      dispatch('fetchCategoriesGroups', data.userId)
      commit('setAlert', response.message, { root: true })
      return response
    } catch (err) {
      commit('setAlert', err.response.data.message, { root: true })
      throw err
    }
  }
}
export const getters = {
  categoriesGroups: state => state.categoriesGroups,
  categories: state => state.categories,
  categoryGroupIcon: state => state.icon,
  stdCategoriesGroup: state => state.stdCategoriesGroup,
  sortedCategoriesGroups: state => state.sortedCategoriesGroups
}

function orderItems (items) {
  return items.map((item, index) => {
    item.order = index + 1
    return item
  })
}

function sortObjectsArrayByText (array, field, reverse = false) {
  const newArray = array.sort(function (a, b) {
    const nameA = a[field].toString().toLowerCase()
    const nameB = b[field].toString().toLowerCase()
    if (nameA < nameB) { return -1 }
    if (nameA > nameB) { return 1 }
    return 0
  })
  return reverse ? newArray.reverse() : newArray
}
