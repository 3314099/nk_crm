<template>
  <div>
    <v-card class="mt-2">
      <v-toolbar
        color="teal"
        dark
      >
        <v-toolbar-title
          v-if="user"
          style="cursor: pointer"
          @click="chgSearchField(user.email)"
        >
          {{ user.lastName + ' ' + user.name }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          Все заметки
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          v-if="user"
          icon
          @click="chgUserNote"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </v-toolbar>
      <div v-if="user">
        <v-text-field
          v-model="userNotes"
          class="pa-2"
          color="teal"
          full-width
          hide-details
          append-outer-icon="mdi-send"
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="Заметка"
          type="text"
          @click:append-outer="sendNote"
          @click:clear="userNotes = null"
        />
      </div>
      <v-container
        v-if="fullNotes.length"
        id="scroll-target"
        :style="user ? 'max-height: 303px' : 'max-height: 375px'"
        class="pt-1 pl-0 overflow-y-auto"
      >
        <div
          v-for="(note, index) in fullNotes"
          :key="note.id"
        >
          <div class="d-flex justify-between pl-1">
            <div
              style="cursor: pointer"
              class="subtitle-2 text-capitalize text--secondary text--darken-3"
              @click="chgSearchField(note.userEmail)"
            >
              От: {{ note.adminLastName + ' ' + note.adminName }}
            </div>
            <v-spacer />
            <div class="subtitle-2 text-capitalize font-italic text--secondary">
              {{ formatDate(note.date, 'DD.MM.YYYY, HH:mm') }}
            </div>
          </div>
          <div
            v-if="!user"
            style="cursor: pointer"
            class="subtitle-2 text-capitalize text--secondary text--darken-3  pl-1"
            @click="chgSearchField(note.userEmail)"
          >
            Для: {{ note.recipientLastName + ' ' + note.recipientName }}
          </div>
          <div class="text-capitalize text--darken-3  pl-1">
            <v-icon
              @click="chgUserNote(item)"
            >
              mdi-chat-outline
            </v-icon>
            {{ note.text }}
          </div>
          <v-divider
            v-if="index + 1 < fullNotes.length"
            :key="index"
          />
        </div>
      </v-container>
      <div
        v-if="!fullNotes.length"
        class="d-flex justify-center subtitle-1 text-capitalize text--secondary text--darken-3"
      >
        Нет заметок
      </div>
    </v-card>
  </div>
</template>

<script>
import utils from '@/mixins/utils.mixin'
import users from '@/mixins/users.mixin'
export default {
  name: 'Notes',
  mixins: [utils, users],
  props: {
    fullNotes: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => null
    }
  },
  data: () => ({
    userNotes: '',
    selected: [2]
  }),
  methods: {
    chgSearchField (val) {
      this.$emit('chgSearchField', val)
    },
    chgUserNote () {
      this.$emit('chgUserNote', null)
    },
    async sendNote () {
      if (this.userNotes) {
        const admin = this.$store.getters['auth/user']
        const noteData = {
          adminId: admin.id,
          recipientId: this.user._id,
          // дата присваивается по умолчанию на уровне модели
          text: this.userNotes
        }
        await this.$store.dispatch('admin/users/createUserNote', noteData)
        this.updateNotes()
        this.userNotes = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
