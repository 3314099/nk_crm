<template>
  <v-btn-toggle
    class="pr-2"
    active-class="false"
    mandatory
  >
    <v-btn
      v-if="visibleBtn === 'all'"
      @click="chgVisibleBtn('visible')"
    >
      <v-icon>mdi-eye-outline</v-icon>
    </v-btn>
    <v-btn
      v-if="visibleBtn === 'visible'"
      @click="chgVisibleBtn('unvisible')"
    >
      <v-icon>mdi-eye-plus-outline</v-icon>
    </v-btn>
    <v-btn
      v-if="visibleBtn === 'unvisible'"
      @click="chgVisibleBtn('all')"
    >
      <v-icon>mdi-eye-minus-outline</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: 'VisibleBtn',
  props: {
    numOfBtn: {
      type: String,
      default: () => 'first'
    },
  },
  computed: {
    visibleBtn () {
      let visibleBtn
      switch (this.numOfBtn) {
        case 'first' :
          visibleBtn = this.$store.getters['utils/firstVisibleBtn']
          break
        case 'second' :
          visibleBtn = this.$store.getters['utils/secondVisibleBtn']
          break
        default:
          visibleBtn = this.$store.getters['utils/firstVisibleBtn']
      }
      return visibleBtn
    },
  },
  methods: {
    chgVisibleBtn (val) {
      switch (this.numOfBtn) {
        case 'first' :
          this.$store.commit('utils/chgFirstVisibleBtn', val)
          break
        case 'second' :
          this.$store.commit('utils/chgSecondVisibleBtn', val)
          break
        default:
          this.$store.commit('utils/chgFirstVisibleBtn', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
