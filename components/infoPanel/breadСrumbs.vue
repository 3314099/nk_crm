<template>
  <div>
    <v-card
      loading="false"
      class="pa-0"
      flat
    >
      <v-card-actions
        class="pa-0"
      >
        <v-breadcrumbs
          :items="links"
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
        <v-spacer />
        <v-progress-circular
          v-if="loading"
          class="mr-4"
          :size="40"
          color="green"
          indeterminate
        >
          <v-icon>
            mdi-server
          </v-icon>
        </v-progress-circular>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import getters from '@/mixins/getters'
export default {
  name: 'BreadCrumbs',
  mixins: [getters],
  computed: {
    errorMessage () {
      return 111
    },
    loading () {
      return this.$store.getters['utils/loading']
    },
    links () {
      let links = []
      const link1 = this.link1()
      const link2 = this.link2()
      const link3 = this.link3()
      links = links.concat(link1, link2, link3)
      return links
    },
  },
  methods: {
    chTtopPanel () {
      if (this.topPanel === 'breadСrumbs') {
        this.topPanel = 'messagePanel'
      } else {
        this.topPanel = 'breadСrumbs'
      }
    },
    link1 () {
      const link = this.route
      let item = []
      switch (link) {
        case '/main':
          item = [{ text: 'Главная', disabled: false, href: '/main' }]
          break
        case '/admin':
          item = [{ text: 'Панель администратора', disabled: false, href: '/admin' }]
          break
        default:
          item = [{ text: 'Главная', disabled: false, href: '/main' }]
          break
      }
      return item
    },
    link2 () {
      const linkTab = this.gTabMode.tab
      let item = []
      switch (linkTab) {
        case 'propertySectAndGrps':
          item = [
            { text: 'Настройки', disabled: true, href: '/properties' },
            { text: 'Разделы и группы', disabled: true, href: '/properties' }
          ]
          break
        case 'propertyCategories':
          item = [
            { text: 'Настройки', disabled: true, href: '/properties' },
            { text: 'Категории', disabled: true, href: '/properties' }
          ]
          break
        case '/admin':
          item = [{ text: 'Панель администратора', disabled: false, href: '/admin' }]
          break
        default:
          item = [{ text: 'Ошибка', disabled: true, href: '/main' }]
          break
      }
      return item
    },
    link3 () {
      const linkTab = this.gTabMode.content
      const editMode = this.gEditMode
      const name = this.gEditItem ? this.gEditItem.title : ''
      let item = []
      switch (linkTab) {
        case 'default':
          item = []
          break
        case 'TabContentSectsEdit':
          item = editMode === 'create'
            ? [{ text: 'Создание нового раздела', disabled: true, href: '' }]
            : [{ text: 'Изменение раздела: <' + name + '>', disabled: true, href: '' }]
          break
        case 'TabContentGroupsEdit':
          item = editMode === 'create'
            ? [{ text: 'Создание новой группы', disabled: true, href: '' }]
            : [{ text: 'Изменение группы: <' + name + '>', disabled: true, href: '' }]
          break
        case 'TabContentCategoriesEdit':
          item = editMode === 'create'
            ? [{ text: 'Создание новой категории', disabled: true, href: '' }]
            : [{ text: 'Изменение категории: <' + name + '>', disabled: true, href: '' }]
          break
        case 'TabContentCategoriesGroupsEdit':
          item = editMode === 'create'
            ? [{ text: 'Создание новой ГРУППЫ категорий', disabled: true, href: '' }]
            : [{ text: 'Изменение ГРУППЫ категорий: <' + name + '>', disabled: true, href: '' }]
          break
        default:
          item = [{ text: 'Ошибка', disabled: true, href: '/main' }]
          break
      }
      return item
    }
  }
}
</script>

<style scoped>

</style>
