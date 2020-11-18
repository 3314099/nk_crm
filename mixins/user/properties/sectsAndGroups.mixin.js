import utils from '@/mixins/utils.mixin'
import getters from '@/mixins/getters'

export default {
  mixins: [getters, utils],
  methods: {
    MXsectionsSerial () {
      return this.$store.getters.sectionsSerial || []
    },
    MXsections () {
      return this.$store.getters['user/properties/sections/sections'] || []
    },
    MXsectionsSortedBysectionsSerial () {
      return this.MXsections() ? this.UsortFromObjectsArrayByArray(
        this.MXsections(), this.MXsectionsSerial(), 'id'
      ) : []
    },
    MXsectionsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXsectionsSortedBysectionsSerial())
    },
    MXsortedRuEnSections () {
      return this.UsortRuEnArray(this.MXsectionsSortedByVisibleButton(), this.UsearchField())
    },
    MXsecGroups () {
      return this.$store.getters.secGroups || []
    },
    MXsecGroupsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXsecGroups())
    },
    MXSecGroupsSortedBySortButton () {
      return this.MXsecGroupsSortedByVisibleButton() ? this.UsortBySortButton(
        this.MXsecGroupsSortedByVisibleButton(), this.$store.getters.sortButton) : []
    },
    MXsortedRuEnSecGroups () {
      return this.UsortRuEnArray(this.MXsecGroupsSortedBySortButton(), this.UsearchField())
    },
    MXcolorsIgnoreArray () {
      return this.UarrayFromObjectsArrayByField(this.MXsections(), 'color')
    },
    async MXtoCreateSection (item) {
      this.$store.dispatch('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/sections/createSection', item)
        this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
        this.resetFields()
        this.resetUtils()
        this.resetV()
      } catch (err) {
        this.$store.dispatch('utils/chgLoading', false)
      }
    },
    async MXtoEditSection (data) {
      this.$store.dispatch('utils/chgLoading', true)
      try {
        await this.$store.dispatch('user/properties/sections/editSection', data)
        this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
        this.resetFields()
        this.resetUtils()
        this.resetV()
        this.$store.dispatch('snackBar/changeSnackBar', 'sectionUpdated')
      } catch (e) {
        this.$store.dispatch('utils/chgLoading', false)
      }
    },
    async MXtoRemoveSection (data) {
      try {
        await this.$store.dispatch('user/properties/sections/removeSection', data)
        this.$store.dispatch('mode/chgTabMode', { tab: 'propertySectAndGrps', content: 'default' })
        this.resetFields()
        this.resetUtils()
        this.resetV()
        this.$store.dispatch('snackBar/changeSnackBar', 'sectionRemoved')
      } catch (e) {
        this.$store.dispatch('utils/chgLoading', false)
      }
    },
    async MXchgOrderSections (arr) {
      this.$store.dispatch('utils/chgLoading', true)
      const data = {
        userId: this.gUser.id,
        data: arr.map(item => item._id)
      }
      try {
        await this.$store.dispatch('user/properties/sections/chgOrderSections', data)
        this.$store.dispatch('utils/chgLoading', false)
      } catch (e) {
        this.$store.dispatch('utils/chgLoading', false)
      }
    },
    async MXtoCreateSecGroup (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateSecGroup', {
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXcreatedSecGroup(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedSecGroup (item) {
      const secGroups = this.MXsecGroups().concat(item)
      this.$store.dispatch('updateSecGroups', secGroups)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEditSectionSerial (sectionsSerial) {
      try {
        await this.$store.dispatch('DBeditSectionsSerial', {
          sectionsSerial
        })
      } catch (e) {
        // console.log('error')
      }
    },
    async MXtoEditSecGroup (item) {
      try {
        const updatedSecGroup = await this.$store.dispatch('DBeditSecGroup', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXupdatedSecGroup(updatedSecGroup)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedSecGroup (updatedSecGroup) {
      const secGroups = this.MXsecGroups().map(secGroup => secGroup.id ===
      updatedSecGroup.id ? updatedSecGroup : secGroup)
      this.$store.dispatch('updateSecGroups', secGroups)
    },
    MXcreatedSection (item) {
      const sections = this.MXsections().concat(item)
      this.$store.dispatch('updateSections', sections)
      this.MXtoEditSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
      this.$store.dispatch('chgLoading', 'false')
    },
    MXupdatedSection (updatedSection) {
      const sections = this.MXsectionsSortedBysectionsSerial().map(section => section.id ===
      updatedSection.id ? updatedSection : section)
      this.$store.dispatch('updateFPSections', sections)
      this.MXtoEditSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
    },
    async MXtoRemoveSecGroup (id) {
      try {
        await this.$store.dispatch('DBremoveSecGroup', id)
        const secGroups = this.MXsecGroups().filter(secGroups => secGroups.id !== id)
        this.$store.dispatch('updateSecGroups', secGroups)
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
