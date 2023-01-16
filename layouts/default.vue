<template>
  <v-app dark>
    <v-navigation-drawer
      :permanent="height > 400"
      :mini-variant="height <= 500"
      fixed
      app
    >
      <h1 v-if="height > 500" class="text-center ma-5">Reading App</h1>
      <h1 v-else class="text-center ma-5">R</h1>
      <v-text-field
        v-if="height > 500"
        class="ma-2"
        solo
        dense
        v-model="search"
        append-icon="mdi-magnify"
        label="Cari Sesuatu..."
        single-line
        hide-details
      ></v-text-field>
      <v-list>
        <v-tooltip v-for="(item, i) in items" :key="i" right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" :to="item.to" router exact>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
        <v-divider />
        <v-list-item to="/my-profile">
          <v-list-item-action>
            <v-icon>mdi-chart-bubble</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profil Saya</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-profile">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-navigation-drawer 
      v-model="rightDrawer"
      temporary 
      fixed
      app
    >
      <h1 class="text-center ma-5">Reading App</h1>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar v-if="height <= 500" fixed app>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <v-spacer />
      <v-text-field
        class="ma-2"
        solo
        dense
        v-model="search"
        append-icon="mdi-magnify"
        label="Cari Sesuatu..."
        single-line
        hide-details
      ></v-text-field>
      <v-spacer />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="height > 400" :fixed="height <= 400" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
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
          to: '/my-bookshelf',
        },
        {
          icon: 'mdi-account-box-multiple',
          title: 'Penulis Favorit',
          to: '/my-favorite',
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
  },
}
</script>
