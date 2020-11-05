<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        class="py-2"
      >
        <v-card
          class="fullScreen"
        >
          <sections />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="py-2"
      >
        <v-card
          height="100%"
        >
          <groups />
        </v-card>
      </v-col>
    </v-row>
    <h1>sectionsAndGroups</h1>
  </div>
</template>

<script>
export default {
  name: 'SectionsAndGroupsMain',
  components: {
    sections: () => import('@/components/user/properties/sectionsAndGroups/sections'),
    groups: () => import('@/components/user/properties/sectionsAndGroups/groups')
  },
}
</script>

<style scoped>
.fullScreen {
   height: 100%;
 }
</style>
