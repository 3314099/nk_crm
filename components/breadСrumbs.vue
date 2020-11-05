<template>
  <div>
    <v-breadcrumbs
      :items="items"
    >
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.href"
          :disabled="item.disabled"
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  data: () => ({
    items: [
      {
        text: 'Главная',
        disabled: false,
        href: '/main',
      },
      {
        text: 'Настройки',
        disabled: true,
        href: '/properties',
      },
      {
        text: 'Разделы и группы',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
}
</script>

<style scoped>

</style>
