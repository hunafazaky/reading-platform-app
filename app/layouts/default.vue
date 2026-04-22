<template>
  <v-app dark>
    <LayoutNavbar />
    <!-- <v-navigation-drawer>
      <v-list-item title="Literature App" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Home"></v-list-item>
      <v-list-item link title="Library"></v-list-item>
      <v-list-item link title="Write New Story"></v-list-item>
    </v-navigation-drawer> -->
    <v-main class="mb-12">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// import LayoutNavbar from '@component/layout/Navab'
</script>

<!-- <script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      search: '',
      items: [
        {
          icon: 'mdi-home',
          title: 'Beranda',
          to: '/home',
        },
        {
          icon: 'mdi-compass',
          title: 'Eksplorasi',
          to: '/explore',
        },
        {
          icon: 'mdi-bookshelf',
          title: 'Rak Buku',
          to: '/bookshelf',
        },
        {
          icon: 'mdi-text-box-plus',
          title: 'Tulis Sesuatu',
          to: '/write',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Reading App',
    }
  },
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
    me() {
      if (this.$store.getters['me']) {
        return this.$store.getters['me']
      } else {
        this.$router.push('/');
        return []; 
      }
    },
  },
  methods: {
    // getMe() {
    //   this.me = this.$store.state.users.me
    // },
  },
  mounted() {
    // this.getMe()
  },
}
</script>

<style lang="css">
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.bottom {
  bottom: 16px;
}
.dashed-border {
  border: 1px dashed #212122;
}
.h-100 {
  height: 100%;
}
.w-100 {
  width: 100%;
}
.zoom-in-pointer {
  cursor: zoom-in;
}
.zoom-out-pointer {
  cursor: zoom-out;
}
</style> -->
