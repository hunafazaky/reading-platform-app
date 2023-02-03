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
          <v-list-item
            v-bind="attrs"
            v-on="on"
            :to="`/user/${me.user.account.username}`"
            router
            exact
          >
            <v-list-item-action>
              <v-avatar color="white" size="24">
                <v-img :src="me.user.profile.img_profile"></v-img>
              </v-avatar>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                v-text="me.user.account.username"
              ></v-list-item-title>
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
            <v-avatar class="mr-1" color="white" size="24">
              <v-img :src="me.user.profile.img_profile"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list dark>
          <v-list-item :to="`/user/${me.user.account.username}`" router exact>
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
    <v-main class="mb-12">
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
    me() {
      const user = this.$store.state.users.me
      console.log(user)
      return user
    },
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
.zoom-in-pointer {
  cursor: zoom-in;
}
.zoom-out-pointer {
  cursor: zoom-out;
}
</style>
