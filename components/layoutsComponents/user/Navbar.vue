<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dense
      dark
      clipped-left
    >
      <router-link
        to="/"
        tag="div"
        class="v-toolbar__title"
        exact
        :style="{ cursor: 'pointer'}"
      >
        НаКонтроле
      </router-link>

      <v-btn
        text
        class="ma-2"
        href="https://ru.vuejs.org/v2/guide/installation.html"
        target="blank"
      >
        <v-icon
          left
        >
          mdi-vuejs
        </v-icon>
        Vuejs
      </v-btn>
      <v-btn
        text
        class="ma-2"
        href="https://vuetifyjs.com/ru/introduction/why-vuetify"
        target="blank"
      >
        <v-icon
          left
        >
          mdi-vuetify
        </v-icon>
        vuetify
      </v-btn>

      <v-btn
        text
        class="ma-2"
        href="https://materialdesignicons.com/"
        target="blank"
      >
        <v-icon
          left
        >
          mdi-material-design
        </v-icon>
        Material design icons
      </v-btn>
      <v-btn
        v-if="user.role === 'admin'"
        text
        class="ma-2"
        to="/admin"
      >
        Панель администратора
      </v-btn>
      <v-btn
        text
        class="ma-2"
        to="/"
      >
        На главную
      </v-btn>
      <v-btn
        text
        class="ma-2"
        to="/properties"
      >
        Настройки
      </v-btn>
      <v-btn
        text
        class="ma-2"
        @click="openModal('historyModal')"
      >
        Журнал
      </v-btn>
      <v-btn
        text
        class="ma-2"
        @click="openModal('logsModal')"
      >
        Логи
      </v-btn>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>
              mdi-book-open-page-variant
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.url"
          >
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  components: {
  },
  data () {
    return {
      links: [
        { title: 'Admin', icon: '', url: '/admin' },
        { title: 'Клиент', icon: '', url: '/client' },
        { title: 'Организация', icon: '', url: '/business' },
        { title: 'Счета', icon: '', url: '/accounts' },
        { title: 'Операции', icon: '', url: '/operations' },
        { title: 'Настройки', icon: '', url: '/properties' },
        { title: 'тестовая', icon: '', url: '/test' },
        { title: 'Счета2', icon: '', url: '/accounts2' },
        { title: 'Видео', icon: '', url: '/video' }
      ],
      loginLink: '/login',
      items: [
        { title: 'Профиль', url: '/profile' },
        { title: 'Выйти', url: '/logout' }
      ],
      testBtns: ['MainPagePreloader', 'mainLCR', 'mainLC', 'mainCR', 'mainC'],
      counter: 0
    }
  },
  computed: {
    user () {
      const user = this.$store.getters['auth/user']
      if (user) {
        user.fullname = user.name + ' ' + user.lastName
        return user
      }
      return {}
    }
  },
  methods: {
    openModal (val) {
      this.$store.commit('setModal', val)
    },
    profile () {

    },
    change1 () {
      const val = this.testBtns[this.counter]
      this.$store.dispatch('chgModes', val)
      this.counter !== 4 ? this.counter++ : this.counter = 0
    },
    async logout () {
      // console.log(111)
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  }

}
</script>
