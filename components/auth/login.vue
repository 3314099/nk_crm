<template>
  <div>
    <v-card-text>
      <v-text-field
        v-model.trim="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        name="email"
        prepend-icon="mdi-account"
        type="text"
        @input="$v.email.$touch"
        @blur="$v.email.$touch"
      />

      <v-text-field
        v-model.trim="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        name="password"
        prepend-icon="mdi-lock"
        type="password"
        @input="$v.password.$touch"
        @blur="$v.password.$touch"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        disabled
        text
        color="teal"
        @click="chgMode('registration')"
      >
        Регистрация
      </v-btn>
      <v-spacer />
      <v-btn
        disabled
        text
        small
        color="warning"
        to="/registration"
      >
        забыли пароль
      </v-btn>
      <v-spacer />
      <v-btn
        type="submit"
        color="primary"
        :loading="loading"
        @click="submitHeandler"
      >
        Войти
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { email, required },
    password: { minLength: minLength(8), maxLength: maxLength(12), required }
  },
  props: {
    chgMode: {
      type: Function,
      default: () => ''
    }
  },
  data: () => ({
    loading: false,
    email: '',
    password: ''
  }),
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.email && errors.push('Введите E-mail')
      !this.$v.email.required && errors.push('Обязательное поле')
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
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('auth/login', formData)
        this.$router.push('/main?message=authed')
      } catch {
        this.loading = false
      }
    }
  }
}
</script>
