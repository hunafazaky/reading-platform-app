<template>
  <div>
    <LoadingPage :loading="loading.page"/>
    <v-row :justify="works?.length > 0 ? 'start' : 'center'">
      <v-col cols="8">
        <v-row class="mt-0">
          <LoadingComponent v-if="loading.work" :loading="loading.work" />
          <template v-if="!loading.work">
            <template v-if="works?.length > 0">
              <v-col
                v-for="work in works"
                :key="work.id"
                class="px-1 py-0"
                cols="4"
              >
                <WorkCard
                  :work="work"
                  :wordLimit="{ title: 100, text: 0 }"
                  :miniVariant="false"
                  :mutation="false"
                  @remove-work="deleteWork"
                />
              </v-col>
            </template>
            <template v-else>
              <p class="overline text-center text-secondary ma-4">Memuat...</p>
            </template>
          </template>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row class="mt-0">
          <LoadingComponent v-if="loading.user" :loading="loading.user" />
          <template v-if="!loading.user">
            <v-card rounded="lg" fixed outlined>
              <v-card-text>
                <nuxt-link
                  :to="`/user/${me.username}`"
                  class="text-decoration-none black--text text-truncate"
                >
                  <v-avatar class="mr-1" size="36">
                    <v-img :src="me.photo"></v-img>
                  </v-avatar>
                  <span
                    class="title text-capitalize font-weight-bold"
                    v-text="me.pen_name"
                  ></span>
                </nuxt-link>
              </v-card-text>
              <v-divider />
              <v-card-title class="overline py-2 font-weight-bold">Terakhir ditulis</v-card-title>
              <v-card-text>
                <template v-if="me.work_list.length > 0">
                  <nuxt-link
                    v-for="(work, i) in me.work_list"
                    v-if="i < 5"
                    :key="work._id"
                    :to="`/work/${work._id}/read`"
                    class="text-decoration-none text--secondary"
                  >
                  <p v-text="work.title"></p>
                  </nuxt-link>
                </template>
                <template v-if="me.work_list.length === 0">
                  <p class="text--disabled">Belum menulis apa pun</p>
                </template>
              </v-card-text>
              <v-divider />
              <v-card-title class="overline py-2 font-weight-bold">Terakhir dibaca</v-card-title>
              <v-card-text>
                <template v-if="me.read_list.length > 0">
                  <nuxt-link
                    v-for="(read, i) in me.read_list"
                    v-if="i < 5"
                    :key="read._id"
                    :to="`/work/${read._id}/read`"
                    class="text-decoration-none text--secondary"
                    >
                    <!-- @click="readWork(read)" -->
                  <p v-text="read.title"></p>
                  </nuxt-link>
                </template>
                <template v-if="me.read_list.length === 0">
                  <p class="text--disabled">Belum membaca apa pun</p>
                </template>
              </v-card-text>
              <v-divider />
            </v-card>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkCard from '../components/WorkCard.vue'
import Hashtags from '../components/Hashtags.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import LoadingPage from '../components/LoadingPage.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    loading: {
      work: true,
      user: true,
      page: false
    },
  }),
  computed: {
    // counter() {
    //   return this.$store.getters.getCounter
    // },
    me() {
      if (this.$store.getters['me']) {
        this.loading.user = false
        return this.$store.getters['me']
      } else {
        this.$router.push('/');
        return []; 
      }
    },
    works() {
      if (this.$store.getters['works']) {
        this.loading.work = false
        return this.$store.getters['works']
      }
    }
  },
  methods: {
    // incrementCounter() {
    //   this.$store.dispatch('increment')
    // },
    // decrementCounter() {
    //   this.$store.dispatch('decrement')
    // },
    getWorks() {
      this.loading.work = true
      this.$store.dispatch('getWorks')
    },
    getUserById() {
      this.$store.dispatch('getUserById', this.me.id)
    },
    deleteWork(id) {
      if (window.confirm("Apakah anda ingin menghapus karya tulis ini??")) {
        this.$store.dispatch('deleteWork', id)
          .then(() => {
            this.getWorks()
            this.getUserById()
          })
      }
    },
    // readWork(work) {
    //   this.$store.dispatch('updateReadList', work._id)
    //   this.$store.dispatch('updateReaders', work)
    // },
    // addTodo(e) {
    //   console.log(e.target.value)
    //   console.log(this.todos)
    //   this.$store.commit('todos/add', e.target.value)
    //   e.target.value = ''
    // },
    // ...mapMutations({
    //   toggle: 'todos/toggle',
    // }),
  },
  components: {
    WorkCard,
    Hashtags,
    LoadingComponent,
    LoadingPage,
  },
  mounted() {
    this.getWorks()
    this.getUserById()
  },
}
</script>
