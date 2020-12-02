<template>
  <v-app dark>
    <SnackBar />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list-item-subtitle class="pa-2">
        Страницы пользователя
      </v-list-item-subtitle>
      <v-list>
        <v-list-item
          v-for="(item, i) in userPages"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list-item-subtitle class="pa-2">
        Страницы администратора
      </v-list-item-subtitle>
      <v-list>
        <v-list-item
          v-for="(item, i) in adminPages"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <storeDebug />
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      ServerError: {{ errorMessage }}
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            text
            class="ma-2"
            v-on="on"
          >
            <v-icon
              left
            >
              mdi-account
            </v-icon>
            {{ user.fullname }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/profile"
          >
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/logout"
          >
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SnackBar from '@/components/infoPanel/SnackBar'
import storeDebug from '@/storeComponents/storeDebug'
import isAdmin from '@/middleware/isAdmin'
import getters from '@/mixins/getters'
import resetStore from '@/mixins/reset-store'

export default {
  name: 'Admin',
  middleware: [isAdmin],
  components: { SnackBar, storeDebug },
  mixins: [getters, resetStore],
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      userPages: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Панель пользователя',
          to: '/main'
        }
      ],
      adminPages: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Пользователи',
          to: '/admin/users'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Page2(admin)',
          to: '/admin/page2'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Page3(admin)',
          to: '/admin/page3'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Выйти из системы',
          to: '/logout'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Панель администратора'
    }
  },
  computed: {
    errorMessage () {
      const mess = this.$store.getters.message
      return mess || 'Нет ошибок'
    },
    user () {
      const user = this.gUser
      if (user) {
        user.fullname = user.name + ' ' + user.lastName
        return user
      }
      return {}
    }
  }
}
</script>
