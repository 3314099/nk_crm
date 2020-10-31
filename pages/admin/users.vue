<template>
  <div class="full_height">
    <div class="d-flex justify-space-between">
      <div class="width">
        <registration
          @chgUserNote="chgUserNote"
        />
        <notes
          v-if="contentComponent !== 'userRoleForm'"
          :full-notes="fullNotes"
          :user="user"
          @chgUserNote="chgUserNote"
          @chgSearchField="chgSearchField"
        />
      </div>
      <div style="width: 100%" class="mx-3">
        <usersTable
          :srch-field="searchField"
          @chgUserNote="chgUserNote"
          @resetSearchField="resetSearchField"
        />
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/mixins/utils.mixin'
export default {
  layout: 'admin.layout',
  transition: 'bounce',
  components: {
    registration: () => import('@/components/admin/registration'),
    usersTable: () => import('@/components/admin/usersTable'),
    notes: () => import('@/components/admin/notes')
  },
  mixins: [utils],
  data: () => {
    return {
      noteItem: '',
      user: null,
      searchField: ''
    }
  },
  computed: {
    contentComponent () {
      let contentComponent = this.$store.getters['mode/contentMode']
      switch (contentComponent) {
        case 'userRoleForm':
          contentComponent = 'userRoleForm'
          break
        default:
          contentComponent = 'usersTable'
      }
      return contentComponent
    },
    fullNotes () {
      let fullNotes = [...this.$store.getters['admin/users/fullNotes']]
      if (this.noteItem) { fullNotes = fullNotes.filter(item => item.recipientId === this.noteItem) }
      return fullNotes
    },
    allNotes () {
      return this.$store.getters['admin/users/usersNotes']
    },
    users () {
      return this.$store.getters['admin/users/usersNotes']
    }
  },
  methods: {
    resetSearchField () {
      this.searchField = ''
    },
    chgSearchField (val) {
      if (val) { this.searchField = val }
    },
    chgUserNote (val) {
      if (val) {
        this.user = val
        this.noteItem = val._id
      } else {
        this.noteItem = null
        this.user = null
      }
    }
  },
  // async asyncData ({ store }) {
  //   const users = await store.dispatch('admin/users/fetchUsers')
  //   return { users }
  // }
  head: {
    title: 'Пользователи(Admin)'
  }
}
</script>

<style>
  .full_height {
    height: 100vh;
  }

  .width {
     width: 28vw;
   }
</style>
