<template>
  <v-btn-toggle
    class="pr-2"
    active-class="false"
    mandatory
  >
    <v-btn
      v-if="sortBtn === 'drag'"
      @click="chgSortBtn('search')"
    >
      <v-icon>mdi-drag-vertical</v-icon>
    </v-btn>
    <v-btn
      v-if="sortBtn === 'search'"
      @click="chgSortBtn('alphabet')"
    >
      <v-icon>mdi-text-box-search-outline</v-icon>
    </v-btn>
    <v-btn
      v-if="sortBtn === 'alphabet'"
      @click="chgSortBtn('drag')"
    >
      <v-icon>mdi-sort-alphabetical-ascending</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: 'SortBtn',
  props: {
    numOfBtn: {
      type: String,
      default: () => 'first'
    },
  },
  computed: {
    sortBtn () {
      let visibleBtn
      switch (this.numOfBtn) {
        case 'first' :
          visibleBtn = this.$store.getters['utils/firstSortBtn']
          break
        case 'second' :
          visibleBtn = this.$store.getters['utils/secondSortBtn']
          break
        default:
          visibleBtn = this.$store.getters['utils/firstSortBtn']
      }
      return visibleBtn
    },
  },
  methods: {
    chgSortBtn (val) {
      switch (this.numOfBtn) {
        case 'first' :
          this.$store.commit('utils/chgFirstSortBtn', val)
          break
        case 'second' :
          this.$store.commit('utils/chgSecondSortBtn', val)
          break
        default:
          this.$store.commit('utils/chgFirstSortBtn', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
