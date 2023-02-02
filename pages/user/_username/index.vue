<template>
  <v-row justify="center" align="center">
    <PopZoom
      maxWidth="500px"
      :image="user.profile.image_profile"
      :showPopZoom="showPopZoom"
      @hidePopZoom="showPopZoom = false"
    />
    <v-col cols="4">
      <v-sheet
        width="100%"
        class="overflow-hidden"
        style="padding-top: 100%; position: relative"
      >
        <v-avatar
          color="secondary"
          size="100%"
          class="pa-1 zoom-in-pointer"
          style="inset: 0; position: absolute"
          @click="showPopZoom = true"
        >
          <v-img :src="user.profile.image_profile"></v-img>
        </v-avatar>
      </v-sheet>
    </v-col>
    <v-col cols="8">
      <v-card rounded="lg" outlined>
        <v-card-title>
          <p class="my-1 text-capitalize" v-text="user.profile.name"></p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">Username</p>
            <v-spacer></v-spacer>
            <p class="my-1 font-weight-bold" v-text="user.account.username"></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">
              Penulis Favorit
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.activities.writer_subs.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">Pembaca Setia</p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.activities.reader_subs.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light text-capitalize">
              Jumlah Karya Tulis
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-bold"
              v-text="user.activities.posts.length"
            ></p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card rounded="lg" outlined width="100%">
        <v-card-title class="ma-2">Karya Tulis Saya</v-card-title>
        <v-card-text>
          <v-row justify="start" class="px-4 py-1" v-if="posts.length > 0">
            <v-col
              v-for="post in posts"
              :key="post.id"
              class="px-1 py-0"
              cols="4"
              sm="4"
              md="3"
              xl="2"
            >
              <WorkCard
                :post="post"
                :wordLimit="{ title: 100, text: 0 }"
                :miniVariant="true"
              />
            </v-col>
          </v-row>
          <template v-else>
            <p class="overline text-center text-secondary ma-4">Kosong</p>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import WorkCard from '../../../components/WorkCard.vue'
import PopZoom from '../../../components/PopZoom.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'User',
  data: () => ({
    showPopZoom: false,
  }),
  computed: {
    user() {
      return this.$store.state.users.data.find(
        (user) => user.account.username === this.$route.params.username
      )
    },
    posts() {
      return this.$store.state.posts.data
    },
  },
  methods: {
    addTodo(e) {
      console.log(e.target.value)
      console.log(this.todos)
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle',
    }),
  },
}
</script>
