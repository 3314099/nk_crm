<template>
  <div class="ma-3">
    <h2>Права администратора</h2>
    <v-container
      id="scroll-target"
      style="max-height: 390px"
      class="pt-1 pl-0 overflow-y-auto"
    >
      <div class="pa-2">
        <v-switch
          v-model="rule1"
          label="Создание новых пользователей"
          color="red"
          value="red"
          hide-details
        />
        <v-switch
          v-model="rule2"
          label="Изменение пользователей"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule3"
          label="Удаление пользователей"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule4"
          label="Назначение администраторов"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule5"
          label="Изменение прав "
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule6"
          label="red darken-3"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule7"
          label="red darken-3"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule8"
          label="red darken-3"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
        <v-switch
          v-model="rule9"
          label="red darken-3"
          color="red darken-3"
          value="red darken-3"
          hide-details
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import utils from '@/mixins/utils.mixin'
import users from '@/mixins/users.mixin'
export default {
  name: 'UseRoleForm',
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
    rule1: true,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false,
    rule6: false,
    rule7: false,
    rule8: false,
    rule9: false,
    rule10: false
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
        const noteData = {
          userId: this.user._id,
          // дата присваивается по умолчанию на уровне модели
          text: this.userNotes
          // creatorId: '111',
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
