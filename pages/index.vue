<template>
  <div class="form">
    <LoadingPage :loading="loading" />
    <v-row justify="center" align="center">
      <v-col cols="10" sm="8" md="4" lg="4">
        <h1 class="text-center">Reading App</h1>
        <v-card class="mb-2" shaped outlined>
          <v-card-title v-text="formType" />
          <v-card-text>
            <v-text-field
              dense
              v-model="user.username"
              label="Username"
              type="text"
              required
            />
            <v-text-field
              dense
              v-model="user.password"
              label="Password"
              type="password"
              required
            />
            <v-text-field
              v-if="formType == 'Sign Up'"
              dense
              v-model="user.password"
              label="Password Confirmation"
              type="password-confirmation"
              required
            />
          </v-card-text>
          <v-card-actions class="ma-2">
            <v-btn small :color="btnColor" @click="handleSubmit">
              {{ formType }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          class="mb-0"
          type="info"
          transition="slide-y-transition"
          :value="signUpAttempt || signInAttempt"
        >
          {{ message }}
        </v-alert>
        <v-card class="mb-2" shaped outlined>
          <v-card-text>
            Move to
            <span
              :class="[
                'text-decoration-none',
                'font-weight-bold',
                formType == 'Sign Up' ? 'primary--text' : 'success--text',
              ]"
              @click.prevent="changeFormType"
              >{{ formType == "Sign Up" ? "Sign In" : "Sign Up" }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoadingComponent from "../components/LoadingComponent.vue";
import LoadingPage from "../components/LoadingPage.vue";

export default {
  layout: "AuthLayout",
  data: () => ({
    user: {
      username: null,
      password: null,
    },
    signInAttempt: false,
    signUpAttempt: false,
    formType: "Sign Up",
    message: "",
    loading: false,
  }),
  components: {
    LoadingComponent,
    LoadingPage,
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    },
    btnColor() {
      return this.formType === "Sign Up" ? "success" : "primary";
    },
  },

  methods: {
    handleSubmit() {
      if (this.formType === "Sign Up") this.signup();
      if (this.formType === "Sign In") this.signin();
    },
    changeFormType() {
      if (this.formType === "Sign Up") this.formType = "Sign In";
      if (this.formType === "Sign In") this.formType = "Sign Up";
    },
    // ... method lain ...
    signin() {
      this.loading = true;
      this.$store
        .dispatch("signin", this.user)
        .then((data) => {
          // Cek apakah data.user ada dan memiliki id
          if (data.user && data.user.id) {
            this.message = "Sign In Berhasil!!";
            this.signInAttempt = true;
            this.$router.push("/home");
          } else {
            // Fallback message jika ada error dari backend
            this.message = "Error: " + (data.message || "Terjadi kesalahan");
            this.signInAttempt = true;
            this.loading = false;
          }
        })
        .catch((err) => {
          // Tangkap response error dari axios (jika status 40x / 50x)
          const errorMsg =
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : err;
          alert(errorMsg);
          this.loading = false;
        });
    },
    signup() {
      this.signUpAttempt = true;
      this.loading = true;
      this.$store
        .dispatch("signup", this.user)
        .then((data) => {
          this.loading = false;
          if (data.user && data.user.id) {
            this.message = "Sign Up Berhasil!!";
            this.signin();
          } else {
            this.message = "Error: " + (data.message || "Terjadi kesalahan");
          }
        })
        .catch((err) => {
          const errorMsg =
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : err;
          alert(errorMsg);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.form {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
