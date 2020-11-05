<template>
  <div>
    <component :is="component" />
  </div>
</template>

<script>
export default {
  name: 'LgTabsBlock',
  components: {
    PropertiesTabsBlock: () => import('@/components/user/properties/property-tabs-block')
  },
  data: () => {
    return {
      component: 'PropertiesTabsBlock',
      links: [
        {
          text: 'Разделы и Группы',
          page: 'sectionsAndGroupsMain',
        },
        {
          text: 'Счета',
          page: 'accountsMain',
        },
        {
          text: 'Категории',
          page: 'categoriesMain',
        },
        {
          text: 'Фильтры',
          page: 'filtersMain',
        },
        {
          text: 'Теги',
          page: 'tagsMain',
        },
        {
          text: 'Участники',
          page: 'participantsMain',
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>
