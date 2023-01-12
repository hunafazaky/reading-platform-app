<template>
  <v-app dark>
    <v-app-bar clipped-left app>
      <NuxtLink to="/" class="text-decoration-none" active-class="red--text">
        <v-toolbar-title v-text="'Article Media'" />
      </NuxtLink>
      <v-spacer />
      <v-btn 
        class="mr-2"
        color="green lighten-1"
        small
        outlined
        @click="signInDialog"
      >
        Masuk
      </v-btn>
      <v-btn 
        class="mr-2"
        color="blue lighten-1"
        small
        outlined
        @click="signUpDialog"
      >
        Daftar
      </v-btn>
    </v-app-bar>
    <v-main>
      <FormDialog 
        :formTitle="formTitle"
        :isDialogVisible="isDialogVisible"
        :isPasswordVisible="isPasswordVisible"
        @close="isDialogVisible = false"
        @signIn="signIn" 
        @isPasswordVisibleToggle="isPasswordVisible = !isPasswordVisible"
      />
      <Nuxt class="mt-10" />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'UnregistedLayout',
  data: () => ({
    formTitle: '',
    isPasswordVisible: false,
    isDialogVisible: false,
  }),
  computed: {
    users () {
      return this.$store.state.users.list
    }
  },
  methods: {
    signInDialog() {
      this.formTitle = 'Masuk';
      this.isDialogVisible = true;
    },
    signUpDialog() {
      this.formTitle = 'Daftar';
      this.isDialogVisible = true;
    },
    signIn() {
      this.isDialogVisible = false;
      this.signed = true;
      this.$router.push(`/home`);
    },
  },


  // computed: {
  //     fields () {
  //       if (!this.model) return []
  //       return Object.keys(this.model).map(key => {
  //         return {
  //           key,
  //           value: this.model[key] || 'n/a',
  //         }
  //       })
  //     },
  //     items () {
  //       return this.entries.map(entry => {
  //         const Description = entry.Description.length > this.descriptionLimit
  //           ? entry.Description.slice(0, this.descriptionLimit) + '...'
  //           : entry.Description
  //         return Object.assign({}, entry, { Description })
  //       })
  //     },
  //   },
  //   watch: {
  //     search (val) {
  //       // Items have already been loaded
  //       if (this.items.length > 0) return
  //       // Items have already been requested
  //       if (this.isLoading) return
  //       this.isLoading = true
  //       // Lazily load input items
  //       fetch('https://api.publicapis.org/entries')
  //         .then(res => res.json())
  //         .then(res => {
  //           const { count, entries } = res
  //           this.count = count
  //           this.entries = entries
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //         .finally(() => (this.isLoading = false))
  //     },
  //   },
}
</script>
