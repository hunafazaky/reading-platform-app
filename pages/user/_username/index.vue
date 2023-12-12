<template>
  <v-row justify="center" align="center">
    <PopZoom
      maxWidth="500px"
      :image="me.photo"
      :showPopZoom="showPopZoom"
      @hidePopZoom="showPopZoom = false"
    />
    <PopZoom
      :image="me.photo"
      :showPopConfirm="showPopConfirm"
      @hidePopConfirm="showPopConfirm = false"
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
          <v-img :src="me.photo"></v-img>
        </v-avatar>
      </v-sheet>
    </v-col>
    <v-col cols="8">
      <v-card rounded="lg" outlined>
        <v-card-text>
          <div class="d-flex">
            <p class="my-1 font-weight-black overline">
              Pen Name / Username
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-black overline"
            >{{ me.pen_name }} / {{ me.username }}</p>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex">
            <p class="my-1 font-weight-light">
              Jumlah karya yang ditulis
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-light"
              v-text="me.work_list.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light">
              Jumlah karya yang dibaca
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-light"
              v-text="me.read_list.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light">
              Jumlah karya yang disimpan
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-light"
              v-text="me.like_list.length"
            ></p>
          </div>
          <div class="d-flex">
            <p class="my-1 font-weight-light">
              Jumlah karya yang diberi rating
            </p>
            <v-spacer></v-spacer>
            <p
              class="my-1 font-weight-light"
              v-text="me.rate_list.length"
            ></p>
          </div>
          <template v-for="work in me.read_list">
            <div :key="work._id">
              {{ work.category }}
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card rounded="lg" outlined width="100%">
        <v-card-title class="ma-2">Karya Tulis Saya</v-card-title>
        <v-card-text>
          <v-row
            justify="start"
            class="px-4 py-1"
            v-if="me.work_list.length > 0"
          >
            <v-col
              v-for="work in me.work_list"
              :key="work._id"
              class="px-1 py-0"
              cols="4"
              sm="4"
              md="3"
              xl="2"
            >
              <!-- <WorkCard
                :work="getWorkById(work._id)"
                :wordLimit="{ title: 100, text: 0 }"
                :miniVariant="true"
              /> -->
              <WorkCard
                  :work="work"
                  :wordLimit="{ title: 100, text: 0 }"
                  :miniVariant="false"
                  :mutation="false"
                  @remove-work="deleteWork"
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
import PopConfirm from '../../../components/PopConfirm.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'User',
  data: () => ({
    showPopZoom: false,
    showPopConfirm: false,
    // user: {},
    work: {},
  }),
  computed: {
    me() {
      if (this.$store.getters['me']) {
        // this.loading.user = false
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
    getUserByUsername() {
      this.$axios
        .get(`/users?username=${this.$route.params.username}`)
        .then((user) => {
          this.user = me.data[0]
        })
    },
    getWorkById(work_id) {
      this.$axios.get(`/works/${work_id}`).then((work) => {
        this.work = work.data
      })
      return this.work
    },
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
  mounted() {
    this.getUserByUsername()
    // this.getMe()
    // if (!this.me.account) this.$router.push('/')
  },
  component: { PopZoom, PopConfirm },
}
</script>
