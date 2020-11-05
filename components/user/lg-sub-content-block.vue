<template>
  <component :is="component" />
</template>

<script>
export default {
  name: 'LgSubContentBlock',
  components: {
    sectionsAndGroupsMain: () => import('@/components/user/properties/sectionsAndGroups/SectionsAndGroupsMain'),
    accountsMain: () => import('@/components/user/properties/accounts/accountsMain'),
    categoriesMain: () => import('@/components/user/properties/categories/categoriesMain'),
    filtersMain: () => import('@/components/user/properties/filters/filtersMain'),
    tagsMain: () => import('@/components/user/properties/tags/tagsMain'),
    participantsMain: () => import('@/components/user/properties/participants/participantsMain')
  },
  computed: {
    component () {
      return 'sectionsAndGroupsMain'
    }
  }
}
</script>

<style scoped>

</style>
