<template>
  <div>
    <div class="d-flex justify-space-between">
      <div style="width: 400px">
        <registration />
        <notes
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
import utils from '@/mixins/utils'
import registration from '@/components/admin/registration'
import usersTable from '@/components/admin/usersTable'
import notes from '@/components/admin/notes'
export default {
  layout: 'admin',
  transition: 'bounce',
  components: { registration, usersTable, notes },
  mixins: [utils],
  data: () => {
    return {
      noteItem: '',
      user: null,
      searchField: ''
    }
  },
  computed: {
    fullNotes () {
      let fullNotes = [...this.$store.getters['admin/users/fullNotes']]
      if (this.noteItem) { fullNotes = fullNotes.filter(item => item.userId === this.noteItem) }
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
  }
  // async asyncData ({ store }) {
  //   const users = await store.dispatch('admin/users/fetchUsers')
  //   return { users }
  // }
}
</script>
