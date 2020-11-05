<template>
  <v-footer
    color="primary lighten-1"
    padless
  >

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
