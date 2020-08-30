<template>
  <div style="width: 400px">
    <v-card>
      <v-toolbar
        :loading="loading"
        :color="toolBarColor"
        dark
        flat
      >
        <v-toolbar-title>
          {{ toolBarText }}
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text class="pb-0">
        <v-text-field
          v-model.trim="lastName"
          dense
          label="Введите фамилию"
          name="lastName"
          prepend-icon="mdi-account"
          type="text"
        />
        <v-text-field
          v-model.trim="name"
          dense
          :error-messages="nameErrors"
          label="Введите имя"
          required
          name="name"
          prepend-icon="mdi-account"
          type="text"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />

        <v-text-field
          v-model.trim="email"
          dense
          :error-messages="emailErrors"
          label="E-mail"
          required
          name="email"
          prepend-icon="mdi-email"
          type="text"
          @input="$v.email.$touch"
          @blur="$v.email.$touch"
        />

        <v-text-field
          v-model.trim="password"
          dense
          :error-messages="passwordErrors"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :label="passLable"
          required
          name="password"
          prepend-icon="mdi-lock"
          :type="showPass ? 'text' : 'password'"
          @input="$v.password.$touch"
          @blur="$v.password.$touch"
          @click:append="showPass = !showPass"
        />
        <div class="d-flex">
          <v-switch
            v-if="route === 'admin'"
            v-model="admin"
            class="mt-0"
            label="Администратор"
          />
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <template
          v-if="mode === 'editUser'"
        >
          <v-btn
            color="warning"
            @click="chgVMode('cancel')"
          >
            Отменить
          </v-btn>
          <v-spacer />
          <v-btn
            icon
            @click="chgVMode('deleteUser')"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            color="success"
            @click="submitHeandler()"
          >
            Сохранить
          </v-btn>
        </template>
        <template
          v-else-if="mode === 'deleteUser'"
        >
          <v-btn
            color="warning"
            @click="chgVMode('cancelDelete')"
          >
            Отменить
          </v-btn>
          <v-spacer />
          <v-btn
            color="error"
            @click="submitHeandler()"
          >
            Удалить
          </v-btn>
        </template>
        <template
          v-else
        >
          <v-spacer />
          <v-btn
            color="primary"
            @click="submitHeandler()"
          >
            Создать учетную запись
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
import users from '@/mixins/users'
export default {
  name: 'Registr',
  mixins: [validationMixin, users],
  validations: {
    name: { required },
    email: {
      email,
      required,
      unique () {
        return this.uniqueEmail
      }
    },
    password: {
      minLength: minLength(8),
      maxLength: maxLength(12),
      required
    }
  },
  // props: {
  //   updateNotes: {
  //     type: Function,
  //     default: null
  //   }
  // },
  data: () => ({
    showPass: false,
    userNotes: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    admin: false,
    loading: false,
    toolBarColor: 'primary',
    toolBarText: 'Регистрация нового пользователя',
    passLable: 'Введите пароль',
    mode: ''
  }),
  computed: {
    editItem () {
      const editItem = this.$store.getters['mode/editItem']
      if (editItem) {
        return editItem._id
      } else {
        return ''
      }
    },
    editMode () {
      const editMode = this.$store.getters['mode/editMode']
      if (editMode) {
        return editMode
      } else {
        return ''
      }
    },
    message () {
      return this.$store.getters.message
    },
    uniqueEmail () {
      if (this.email) {
        const users = this.$store.getters['admin/users/users']
        const candidate = users.find(item => item.email === this.email)
        return !candidate
      } else {
        return true
      }
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.required && errors.push('Обязательное поле')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Введите E-mail')
      !this.$v.email.required && errors.push('Обязательное поле')
      !this.$v.email.unique && errors.push('Такой Email уже зарегистрирован в системе')

      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('Обязательное поле')
      !this.$v.password.minLength && errors.push('Пароль должен быть не менее ' + this.$v.password.$params.minLength.min + ' символов, cейчас: ' + this.password.length)
      !this.$v.password.maxLength && errors.push('Пароль должен быть не более ' + this.$v.password.$params.maxLength.max + ' символов, cейчас: ' + this.password.length)
      return errors
    },
    route () {
      if (this.$route.path === '/admin/users') {
        return 'admin'
      } else {
        return 'user'
      }
    },
    query () {
      return this.$route.path
    }
  },
  watch: {
    editItem (v) {
      this.chgMode(v)
    },
    editMode (v) {
      this.chgMode(v)
    }
  },
  methods: {
    chgVMode (val) {
      const item = this.$store.getters['mode/editItem']
      switch (val) {
        case 'deleteUser':
          this.$store.dispatch('mode/chgEditMode', { mode: 'deleteUser', item })
          break
        case 'cancelDelete':
          this.$store.dispatch('mode/chgEditMode', { mode: 'editUser', item })
          break
        default:
          this.$store.dispatch('mode/chgEditMode', { mode: '', item: {} })
          break
      }
    },
    chgMode () {
      const editItem = this.$store.getters['mode/editItem']
      const editMode = this.$store.getters['mode/editMode']
      switch (editMode) {
        case 'editUser':
          this.toolBarColor = 'teal'
          this.toolBarText = 'Изменение пользователя'
          if (editItem.lastName) { this.lastName = editItem.lastName }
          if (editItem.name) { this.name = editItem.name }
          if (editItem.email) { this.email = editItem.email }
          this.passLable = 'Введите НОВЫЙ пароль'
          this.password = ''
          editItem.role === 'admin' ? this.admin = true : this.admin = false
          this.mode = editMode
          break
        case 'deleteUser':
          this.toolBarColor = 'red darken-1'
          this.toolBarText = 'Удаление пользователя'
          this.mode = editMode
          break
        default:
          this.toolBarColor = 'primary'
          this.toolBarText = 'Регистрация нового пользователя'
          this.mode = ''
          this.lastName = ''
          this.name = ''
          this.email = ''
          this.password = ''
          this.admin = false
          break
      }
    },
    async submitHeandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      try {
        const role = this.admin ? 'admin' : 'user'
        const formData = {
          lastName: this.lastName,
          name: this.name,
          email: this.email,
          password: this.password,
          role
        }
        await this.$store.dispatch('admin/users/createUser', formData)
        this.$v.$reset()
        this.lastName = ''
        this.name = ''
        this.email = ''
        this.password = ''
        this.admin = false
        this.loading = false
        this.mode = ''
      } catch (err) {
        console.log(222)
        // this.loading = false
        // this.$store.dispatch('snackBar/changeSnackBar', 'newUser')
      }
    }
  }
}
</script>