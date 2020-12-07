import utils from '@/mixins/utils.mixin'
import getters from '@/mixins/getters'

export default {
  mixins: [getters, utils],
  methods: {
    MXsections () {
      return this.$store.getters['user/properties/sections/sections'] || []
    },
    MXgroups () {
      return this.$store.getters['user/properties/groups/groups'] || []
    },
    async MXtoCreateSection (item) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/sections/createSection', item)
        this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
      } catch (err) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoEditSection (data) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/sections/editSection', data)
        this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoRemoveSection (data) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/sections/removeSection', data)
        this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXchgOrderSections (arr) {
      this.$store.commit('utils/chgLoading', true)
      const data = {
        userId: this.gUser.id,
        data: arr.map(item => item._id)
      }
      try {
        await this.$store.dispatch('user/properties/sections/chgOrderSections', data)
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoCreateGroup (item) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/groups/createGroup', item)
        this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
      } catch (err) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoEditGroup (data) {
      this.$store.commit('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/groups/editGroup', data)
        this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXtoRemoveGroup (data) {
      try {
        await this.$store.dispatch('user/properties/sections/removeGroup', data)
        this.$store.commit('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
    async MXchgOrderGroups (arr) {
      this.$store.commit('utils/chgLoading', true)
      const data = {
        userId: this.gUser.id,
        data: arr.map(item => item._id)
      }
      try {
        await this.$store.dispatch('user/properties/groups/chgOrderGroups', data)
        this.$store.commit('utils/chgLoading', false)
      } catch (e) {
        this.$store.commit('utils/chgLoading', false)
      }
    },
  }
}
