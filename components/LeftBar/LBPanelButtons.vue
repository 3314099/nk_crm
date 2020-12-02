<template>
  <v-card
    max-width="400"
    class="mx-auto mb-2"
    elevation="3"
  >
    <v-system-bar
      color="light-blue darken-2"
      dark
      height="8px"
    />
    <v-btn-toggle>
      <v-btn
        v-for="(button, i) in buttons"
        :key="i"
        fab
        :to="button.link"
        width="50px"
      >
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
      <v-btn
        fab
        @click="chgVisibility ()"
      >
        <v-icon
          v-if="visibility"
        >
          mdi-eye-off
        </v-icon>
        <v-icon
          v-if="!visibility"
        >
          mdi-eye-settings-outline
        </v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-card>
</template>
<script>
export default {
  name: 'LeftPanelButtons',
  data: () => ({
    buttons: [
      { to: '/targets', icon: 'mdi-target', click: 'targets', link: '/targets' },
      {
        to: '/accounts',
        icon: 'mdi-credit-card-multiple-outline',
        click: 'accounts',
        link: '/accounts'
      },
      {
        to: '/operations',
        icon: 'mdi-currency-rub',
        click: 'operations',
        link: '/operations'
      },
      {
        to: '/statistic',
        icon: 'mdi-poll',
        click: 'statistic',
        link: '/statistic'
      },
      {
        to: '/properties',
        icon: 'mdi-brightness-7',
        click: 'properties',
        link: '/properties'
      }
    ]
  }),
  computed: {
    visibility () {
      // return this.$store.getters.visibility
      return true
    }
  },
  methods: {
    chgVisibility () {
      // this.$store.dispatch('chgVisibility')
    }
  }
}
</script>

<style scoped>

</style>
