<template>
  <v-app dark>
    <v-navigation-drawer
      :permanent="height > 400"
      :mini-variant="height <= 500"
      dark
      fixed
      app
    >
      <h1 v-if="height > 500" class="text-center ma-5 white--text">
        Reading App
      </h1>
      <h1 v-else class="text-center ma-5 white--text">R</h1>
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
        <v-tooltip
          :disabled="height > 500"
          v-for="(item, i) in items"
          :key="i"
          right
        >
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
        <template v-if="height > 500">
          <v-list-item v-bind="attrs" v-on="on" to="/profile" router exact>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-bind="attrs" v-on="on" to="/setting" router exact>
            <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Pengaturan</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="height <= 500" dark fixed app>
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
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon size="24px"> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-list dark>
          <v-list-item to="/profile" router exact>
            <v-list-item-title>
              <v-icon small left>mdi-account-circle</v-icon>
              Profile</v-list-item-title
            >
          </v-list-item>
          <v-list-item to="/config" router exact>
            <v-list-item-title>
              <v-icon small left>mdi-cog</v-icon>
              Pengaturan</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="mb-10">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer v-if="height <= 400" dark fixed app padless>
      <v-card flat tile width="100%" class="text-center">
        <v-card-text>
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
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
          to: '/bookshelf',
        },
        {
          icon: 'mdi-account-box-multiple',
          title: 'Penulis Langganan',
          to: '/subscribed',
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
</style>

<!-- SAMPAH -->

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
<!-- <v-card-text class="white--text">
  {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
</v-card-text> -->
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
