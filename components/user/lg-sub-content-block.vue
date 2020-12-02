<template>
  <component :is="component" />
</template>

<script>
export default {
  name: 'LgSubContentBlock',
  components: {
    sectionsAndGroupsMain: () => import('@/components/user/properties/sectionsAndGroups/sectionsAndGroupsMain'),
    accountsMain: () => import('@/components/user/properties/accounts/accountsMain'),
    categoriesMain: () => import('@/components/user/properties/categories/categoriesMain'),
    filtersMain: () => import('@/components/user/properties/filters/filtersMain'),
    tagsMain: () => import('@/components/user/properties/tags/tagsMain'),
    participantsMain: () => import('@/components/user/properties/participants/participantsMain')
  },
  computed: {
    component () {
      const vTabMode = this.$store.getters['mode/tabMode']
      let component
      switch (vTabMode.tab) {
        case ('propertyAccounts'):
          component = 'accountsMain'
          break
        case ('propertyCategories'):
          component = 'categoriesMain'
          break
        case ('propertyFilters'):
          component = 'filtersMain'
          break
        case ('propertyTags'):
          component = 'tagsMain'
          break
        case ('propertyParticipants'):
          component = 'participantsMain'
          break
        default:
          component = 'sectionsAndGroupsMain'
          break
      }
      return component
    }
  },
  created () {
    const vTabMode = this.$store.getters['mode/tabMode']
    if (!vTabMode.tab || !vTabMode.tab.includes('property')) {
      this.chgTabMode('propertySectAndGrps')
    }
  },
  methods: {
    chgTabMode (mode) {
      this.$store.commit('mode/chgTabMode', { tab: mode, content: 'default' })
    }
  }
}
</script>

<style scoped>

</style>
