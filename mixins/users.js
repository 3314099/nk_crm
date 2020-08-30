export default {
  methods: {
    updateNotes () {
      const users = [...this.$store.getters['admin/users/users']]
      const notes = [...this.$store.getters['admin/users/usersNotes']]
      let newNotes = notes.map((note) => {
        const user = users.find(item => item._id === note.userId)
        // const creator = users.find(item => item.id = note.creatorId)
        if (user) {
          note.userLastName = user.lastName
          note.userName = user.name
          note.userEmail = user.email
          // note.date = this.$moment(new Date(note.date)).format()
          // note.userId
          // note.checked
          // note.text
          // note.creatorId = creator.id
          // note.creatorLastName = creator.lastName
          // note.creatorName = creator.name
          // note.creatorEmail = creator.email
        }
        return note
      })
      newNotes = this.UsortObjectsArrayByText(newNotes, 'date', true)
      this.$store.dispatch('admin/users/chgFullNotes', newNotes)
    }
  }
}
