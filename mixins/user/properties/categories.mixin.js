import utils from '@/mixins/utils.mixin'
import getters from '@/mixins/getters'

export default {
  mixins: [getters, utils],
  methods: {
    MXcategories () {
      return this.$store.getters['user/properties/categories/categories'] || []
    },
    MXcategoriesGroups () {
      return this.$store.getters['user/properties/categories/categoriesGroups'] || []
    },
    async MXtoCreateCategory (item) {
      this.$store.commit('utils/chgLoading', true)
      try {
        this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
        const newItem = await this.$store.dispatch('user/properties/categories/createCategory', item)
        const newItems = this.MXcategories().concat(newItem)
        this.$store.commit('user/properties/categories/chgCategories', newItems)
        this.$store.commit('utils/chgLoading', false)
      } catch (err) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoEditCategory (data) {
      this.$store.commit('utils/chgLoading', true)
      try {
        const newItems = this.MXcategories().map(item =>
          item._id === data._id ? data : item)
        this.$store.commit('user/properties/categories/chgCategories', newItems)
        this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
        await this.$store.dispatch('user/properties/categories/editCategory', data)
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoRemoveCategory (data) {
      this.$store.commit('utils/chgLoading', 'true')
      try {
        const newItems = this.MXcategories().filter(item =>
          item._id !== data._id)
        this.$store.commit('user/properties/categories/chgCategories', newItems)
        this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
        await this.$store.dispatch('user/properties/categories/removeCategory', data)
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    // async MXchgOrderCategories (arr) {
    //   this.$store.commit('utils/chgLoading', true)
    //   const data = {
    //     userId: this.gUser.id,
    //     arr: arr.map(item => item._id)
    //   }
    //   try {
    //     await this.$store.dispatch('user/properties/categories/chgOrderCategories', data)
    //     this.$store.commit('utils/chgLoading', false)
    //   } catch (e) {
    //     this.$store.commit('utils/chgLoading', false)
    //   }
    // },
    async MXtoCreateCategoriesGroup (item) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/categories/createCategoriesGroup', item)
        this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
        this.$store.commit('utils/chgLoading', false)
      } catch (err) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoEditCategoriesGroup (data) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/categories/editCategoriesGroup', data)
        this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoRemoveCategoriesGroup (data) {
      try {
        await this.$store.dispatch('user/properties/categories/removeCategoriesGroup', data)
        this.$store.commit('mode/chgTabMode', { tab: 'propertyCategories', content: 'default' })
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    // async MXchgOrderCategoriesGroups (arr) {
    //   this.$store.commit('utils/chgLoading', true)
    //   const data = {
    //     userId: this.gUser.id,
    //     data: arr.map(item => item._id)
    //   }
    //   try {
    //     await this.$store.dispatch('user/properties/categories/chgOrderCategoriesGroups', data)
    //     this.$store.commit('utils/chgLoading', false)
    //   } catch (e) {
    //     this.$store.commit('utils/chgLoading', false)
    //   }
    // },
  }
}
