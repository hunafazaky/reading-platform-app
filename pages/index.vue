<template>
  <div>
    <h1 class="text-center ma-4">Reading App</h1>
    <v-row justify="center" align="center">
      <v-col md="6" lg="5" v-if="height >= 500">
        <v-img src="/login-image.png" width="100%"></v-img>
      </v-col>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="card mb-2" shaped outlined elevation="5">
          <v-card-title v-text="form_title"></v-card-title>
          <v-card-text>
            <v-text-field
              dense
              v-model="user.account.username"
              label="Username"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              dense
              v-model="user.account.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="mx-2">
            <v-btn
              v-if="form_title == 'Registrasi'"
              small
              color="success"
              @click="regis"
            >
              registrasi
            </v-btn>
            <v-btn
              v-if="form_title == 'Login'"
              small
              color="primary"
              @click="login"
            >
              login
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          class="mb-0"
          type="error"
          transition="slide-y-transition"
          :value="usernameTaken"
        >
          Username sudah terdaftar!!
        </v-alert>
        <span v-if="form_title == 'Registrasi'" class="caption text--secondary"
          >Sudah punya akun?
          <span class="text-decoration-none" @click.prevent="openLoginForm"
            >Login</span
          >
        </span>
        <span v-if="form_title == 'Login'" class="caption text--secondary"
          >Belum punya akun?
          <span
            class="text-decoration-none success--text"
            @click.prevent="openRegisForm"
            >Registrasi</span
          >
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.card {
  opacity: 90% !important;
}
</style>

<script>
// import { validationMixin } from 'vuelidate'
// import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {
  layout: 'login',
  // mixins: [validationMixin],
  // validations: {
  //   username: { required, maxLength: maxLength(12) },
  //   password: { required, minLength: minLength(8) },
  //   email: { required, email },
  //   select: { required },
  //   checkbox: {
  //     checked(val) {
  //       return val
  //     },
  //   },
  // },

  data: () => ({
    user: {
      account: {
        username: '',
        password: '',
      },
    },
    form_title: 'Registrasi',
    usernameTaken: false,
  }),

  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
    },
    // checkboxErrors() {
    //   const errors = []
    //   if (!this.$v.checkbox.$dirty) return errors
    //   !this.$v.checkbox.checked && errors.push('You must agree to continue!')
    //   return errors
    // },
    // selectErrors() {
    //   const errors = []
    //   if (!this.$v.select.$dirty) return errors
    //   !this.$v.select.required && errors.push('Item is required')
    //   return errors
    // },
    // usernameErrors() {
    //   const errors = []
    //   if (!this.$v.username.$dirty) return errors
    //   !this.$v.username.maxLength &&
    //     errors.push('Username must be at most 12 characters long')
    //   !this.$v.username.required && errors.push('Username is required.')
    //   return errors
    // },
    // emailErrors() {
    //   const errors = []
    //   if (!this.$v.email.$dirty) return errors
    //   !this.$v.email.email && errors.push('Must be valid e-mail')
    //   !this.$v.email.required && errors.push('E-mail is required')
    //   return errors
    // },
    // passwordErrors() {
    //   const errors = []
    //   if (!this.$v.password.$dirty) return errors
    //   !this.$v.password.minLength &&
    //     errors.push('Password must be at least 8 characters long')
    //   !this.$v.password.required && errors.push('Password is required.')
    //   return errors
    // },
  },

  methods: {
    openLoginForm() {
      this.form_title = 'Login'
    },
    openRegisForm() {
      this.form_title = 'Registrasi'
    },
    async login() {
      console.log(this.user.account.username)
      await this.$axios
        .get(`/users?username=${this.user.account.username}`)
        .then((user) => {
          console.log(user.data[0])
          this.$store.commit('users/login', user.data[0])
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async regis() {
      // const getByUsername = await this.$axios.get(`/users?username=${this.user.account.username}`)
      // console.log(getByUsername.data);
      await this.$axios
        .post(`/users`, this.user)
        .then((user) => {
          if (user.data.message) {
            this.usernameTaken = true
          } else {
            this.$store.commit('users/login', user.data[0])
            this.$router.push('/home')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // clear() {
    //   this.$v.$reset()
    //   this.username = ''
    //   this.email = ''
    //   this.select = null
    //   this.checkbox = false
    // },
  },
}
</script>
