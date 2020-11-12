<template>
  <div class="my-4">
    <v-row class="d-flex justify-center">
      <v-col
        v-if="tabMode.content !== 'TabContentGroupsEdit'"
        cols="12"
        :sm="cols"
      >
        <v-card
          class="fullScreen pa-2"
        >
          <sections />
        </v-card>
      </v-col>
      <v-col
        v-if="tabMode.content !== 'TabContentSectsEdit'"
        cols="12"
        :sm="cols"
      >
        <v-card
          class="fullScreen pa-2"
        >
          <groups />
        </v-card>
      </v-col>
    </v-row>
    <h1>sectionsAndGroups</h1>
  </div>
</template>

<script>
import getters from '@/mixins/getters'
export default {
  name: 'SectionsAndGroupsMain',
  components: {
    sections: () => import('@/components/user/properties/sectionsAndGroups/sections'),
    groups: () => import('@/components/user/properties/sectionsAndGroups/groups')
  },
  mixins: [getters],
  computed: {
    tabMode () {
      return this.gTabMode
    },
    cols () {
      return this.gTabMode.content === 'default' ? 6 : 9
    }
  }
}
</script>

<style scoped>
.fullScreen {
   height: 100%;
 }
</style>
