<template>
  <div class="my-4">
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        :sm="cols"
      >
        <v-card>
          <v-system-bar
            color="teal"
            dark
            height="8px"
          />
          <sections />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        :sm="cols"
      >
        <v-card>
          <v-system-bar
            color="green"
            dark
            height="8px"
          />
          <groups />
        </v-card>
      </v-col>
    </v-row>
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
      return 6
      // return this.gTabMode.content === 'default' ? 6 : 9
      // v-if="tabMode.content !== 'TabContentGroupsEdit'"
      // v-if="tabMode.content !== 'TabContentSectsEdit'"
    }
  }
}
</script>

<style scoped>
</style>
