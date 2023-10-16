<template>
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
          <v-card-title>Terakhir ditulis</v-card-title>
          <!-- {{ me.work_list }} -->
          <v-card-text>
            <nuxt-link
              v-for="(work, i) in me.work_list"
              v-if="i < 5"
              :key="work._id"
              :to="`/${work._id}/read`"
              class="text-decoration-none"
            >
            <p v-text="work.title" class="text-truncate ma-0 mb-1"></p>
            </nuxt-link>
          </v-card-text>
          <v-divider />
          <v-card-title>Terakhir dibaca</v-card-title>
          <v-card-text>
            <nuxt-link
              v-for="(read, i) in me.read_list"
              v-if="i < 10"
              :key="read._id"
              :to="`/${read._id}/read`"
              class="text-decoration-none"
            >
            <p v-text="read.title" class="text-truncate ma-0 mb-1"></p>
            </nuxt-link>
            <p>Counter: {{ counter }}</p>
              <button @click="incrementCounter">Increment</button>
              <button @click="decrementCounter">Decrement</button>
          </v-card-text>
          <v-divider />
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import WorkCard from '../components/WorkCard.vue'
import Hashtags from '../components/Hashtags.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    loading: {
      work: true,
      user: true
    },
  }),
  computed: {
    counter() {
      return this.$store.getters.getCounter
    },
    me() {
      if (this.$store.getters['me']) {
        return this.$store.getters['me'];
      } else {
        this.$router.push('/');
        return []; 
      }
    },
    works() {
      return this.$store.getters['works'];
    }
  },
  methods: {
    incrementCounter() {
      this.$store.dispatch('increment')
    },
    decrementCounter() {
      this.$store.dispatch('decrement')
    },
    getWorks() {
      this.$store.dispatch('getWorks').then(() => {
        this.loading.work = false;
      });
    },
    getUserById() {
      this.$store.dispatch('getUserById', this.me.id).then(() => {
        this.loading.user = false;
      });
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
  components: {
    WorkCard,
    Hashtags,
    LoadingComponent,
  },
  mounted() {
    this.getWorks()
    this.getUserById()
  },
}
</script>
