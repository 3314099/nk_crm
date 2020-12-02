<template>
  <div class="my-2" style="height:115px">
    <v-tabs-items v-model="tabContent">
      <v-tab-item
        v-for="item in items"
        :key="item"
        :value="item"
      >
        <component :is="item" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<!--<transition name="component-fade" mode="out-in">-->
<!--  <component :is="tabContent" />-->
<!--</transition>-->

<script>
export default {
  name: 'LgMainBlock',
  components: {
    TabContentSectAndGrpsDefault: () =>
      import('@/components/user/properties/sectionsAndGroups/tabContent-sectAndGrps-default'),
    TabContentGroupsEdit: () =>
      import('@/components/user/properties/sectionsAndGroups/tabContent-groups-edit'),
    TabContentSectsEdit: () =>
      import('@/components/user/properties/sectionsAndGroups/tabContent-sects-edit'),
    TabContentAccountsDefault: () =>
      import('@/components/user/properties/accounts/tabContent-accounts-default.vue'),
    TabContentAccountsGroupsEdit: () =>
      import('@/components/user/properties/accounts/tabContent-accountsGroups-edit.vue'),
    TabContentAccountsEdit: () =>
      import('@/components/user/properties/accounts/tabContent-accounts-edit.vue'),
    TabContentCategoriesDefault: () =>
      import('@/components/user/properties/categories/tabContent-categories-default.vue'),
    TabContentCategoriesGroupsEdit: () =>
      import('@/components/user/properties/categories/tabContent-categoriesGroups-edit.vue'),
    TabContentCategoriesEdit: () =>
      import('@/components/user/properties/categories/tabContent-categories-edit.vue'),
    TabContentFiltersDefault: () =>
      import('@/components/user/properties/filters/tabContent-filters-default.vue'),
    TabContentFiltersGroupsEdit: () =>
      import('@/components/user/properties/filters/tabContent-filtersGroups-edit.vue'),
    TabContentFiltersEdit: () =>
      import('@/components/user/properties/filters/tabContent-filters-edit.vue'),
    TabContentTagsDefault: () =>
      import('@/components/user/properties/tags/tabContent-tags-default.vue'),
    TabContentTagsGroupsEdit: () =>
      import('@/components/user/properties/tags/tabContent-tagsGroups-edit.vue'),
    TabContentTagsEdit: () =>
      import('@/components/user/properties/tags/tabContent-tags-edit.vue'),
    TabContentParticipantsDefault: () =>
      import('@/components/user/properties/participants/tabContent-participants-default.vue'),
    TabContentParticipantsGroupsEdit: () =>
      import('@/components/user/properties/participants/tabContent-participantsGroups-edit.vue'),
    TabContentParticipantsEdit: () =>
      import('@/components/user/properties/participants/tabContent-participants-edit.vue'),
  },
  data: () => {
    return {
      items: [
        'TabContentSectAndGrpsDefault',
        'TabContentGroupsEdit',
        'TabContentSectsEdit',
        'TabContentAccountsDefault',
        'TabContentAccountsGroupsEdit',
        'TabContentAccountsEdit',
        'TabContentCategoriesDefault',
        'TabContentCategoriesGroupsEdit',
        'TabContentCategoriesEdit',
        'TabContentFiltersDefault',
        'TabContentFiltersGroupsEdit',
        'TabContentFiltersEdit',
        'TabContentTagsDefault',
        'TabContentTagsGroupsEdit',
        'TabContentTagsEdit',
        'TabContentParticipantsDefault',
        'TabContentParticipantsGroupsEdit',
        'TabContentParticipantsEdit',
      ]
    }
  },
  computed: {
    tabContent () {
      const tabMode = this.$store.getters['mode/tabMode']
      let tabContentMode = {}
      switch (tabMode.tab) {
        case 'propertySectAndGrps':
          tabContentMode = tabMode.content === 'default' ? 'TabContentSectAndGrpsDefault' : tabMode.content
          break
        case 'propertyAccounts':
          tabContentMode = tabMode.content === 'default' ? 'TabContentAccountsDefault' : tabMode.content
          break
        case 'propertyCategories':
          tabContentMode = tabMode.content === 'default' ? 'TabContentCategoriesDefault' : tabMode.content
          break
        case 'propertyFilters':
          tabContentMode = tabMode.content === 'default' ? 'TabContentFiltersDefault' : tabMode.content
          break
        case 'propertyTags':
          tabContentMode = tabMode.content === 'default' ? 'TabContentTagsDefault' : tabMode.content
          break
        case 'propertyParticipants':
          tabContentMode = tabMode.content === 'default' ? 'TabContentParticipantsDefault' : tabMode.content
          break
        default:
          tabContentMode = 'TabContentSectAndGrpsDefault'
      }
      return tabContentMode
    }
  }
}
</script>

<style scoped>
</style>
