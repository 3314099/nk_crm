<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    permanent
    :right="right"
    :src="bg"
    floating
    clipped
    disable-resize-watcher
    dark
  >
    <v-list
      dense
      nav
      class="py-0"
    >
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>
        <v-btn
          icon
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="`${item.link}`"
      >
        <v-list-item-icon>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'CRM', icon: 'mdi-account-box-multiple', link: '/crm' },
        { title: 'Учет финансов', icon: 'mdi-cash-multiple', link: '/fp' },
        { title: 'Список дел и целей', icon: 'mdi-sticker-check-outline', link: '/td' },
        { title: 'Сделки', icon: 'mdi-handshake', link: '/qwerty' },
        { title: 'Товары и услуги', icon: 'mdi-cart-arrow-right', link: '/qwerty2' },
        { title: 'Здоровье', icon: 'mdi-dumbbell' }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal'
      ],
      right: false,
      miniVariant: true,
      expandOnHover: false,
      background: false,
      clipped: true
    }
  },
  computed: {
    bg () {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    }
  }
}
</script>
