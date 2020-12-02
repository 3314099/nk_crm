<template>
  <div class="my-4">
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        sm="4"
      >
        <v-card>
          <v-system-bar
            color="teal"
            dark
            height="8px"
          />
          <filterGroups />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-card>
          <v-system-bar
            color="green"
            dark
            height="8px"
          />
          <filters />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FiltersMain',
  components: {
    filters: () => import('@/components/user/properties/filters/filters'),
    filterGroups: () => import('@/components/user/properties/filters/filterGroups')
  },
}
</script>

<style scoped>

</style>
