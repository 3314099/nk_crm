export default {
  methods: {
    updateNotes () {
      const users = [...this.$store.getters['admin/users/users']]
      const notes = [...this.$store.getters['admin/users/usersNotes']]
      let newNotes = notes.map((note) => {
        const admin = users.find(item => item._id === note.adminId)
        // const creator = users.find(item => item.id = note.creatorId)
        if (admin) {
          note.adminLastName = admin.lastName
          note.adminName = admin.name
          note.adminEmail = admin.email
        } else {
          note.adminLastName = 'Пользователь удален'
          note.adminName = ''
          note.adminEmail = ''
        }
        const recipient = users.find(item => item._id === note.recipientId)
        if (recipient) {
          note.recipientLastName = recipient.lastName
          note.recipientName = recipient.name
          note.recipientEmail = recipient.email
        } else {
          note.recipientLastName = 'Пользователь удален'
          note.recipientName = ''
          note.recipientEmail = ''
        }
        return note
      })
      newNotes = this.UsortObjectsArrayByText(newNotes, 'date', true)
      this.$store.commit('admin/users/updateFullNotes', newNotes)
    }
  }
}
