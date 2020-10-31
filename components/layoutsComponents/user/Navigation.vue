<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="grey lighten-2 py-1 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        @click="chgTabMode(link)"
      >
        {{ link }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    links: [
      'Разделы и Группы',
      'Счета',
      'Фильтры',
      'Категории',
      'Теги',
      'Участники'
    ]
  }),
  methods: {
    chgTabMode (item) {
      alert(item)
    }
  }
}
</script>

<style scoped>

</style>
