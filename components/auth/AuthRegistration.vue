<template>
  <div>
    <v-card-text class="pb-0">
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
        label="Введите пароль"
        required
        name="password"
        prepend-icon="mdi-lock"
        type="password"
        @input="$v.password.$touch"
        @blur="$v.password.$touch"
      />
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn
        text
        color="teal"
        @click="chgMode('')"
      >
        Вход
      </v-btn>
      <v-spacer />
      <v-btn
        text
        type="submit"
        color="primary"
        :loading="loading"
        @click="submitHeandler"
      >
        Создать учетную запись
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'AuthRegistration',
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: {
      email,
      required,
      unique () {
        return this.uniqueEmail
      }
    },
    password: { minLength: minLength(8), maxLength: maxLength(12), required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  props: {
    chgMode: {
      type: Function,
      default: () => ''
    }
  },
  data: () => ({
    mode: '',
    noteOn: false,
    userNotes: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    admin: false,
    checkbox: true,
    loading: false
  }),
  computed: {
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
        return !(this.$store.getters.buzyEmail === this.email)
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
    }
  },
  methods: {
    async submitHeandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      try {
        const formData = {
          lastName: this.lastName,
          name: this.name,
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('auth/createUser', formData)
        this.chgMode('')
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.password = ''
        this.loading = false
      } catch (err) {
        this.loading = false
        // this.$store.dispatch('snackBar/changeSnackBar', 'newUser')
      }
    }
  }
}
</script>
