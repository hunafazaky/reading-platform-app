<template>
  <div>
    <LoadingPage :loading="loadingPage"/>
    <v-row :justify="works.length > 0 ? 'start' : 'center'" class="px-4">
      <v-col class="pa-1" cols="12">
        <Hashtags @hashtag-actived="hashtagActived"/>
      </v-col>
      <LoadingComponent v-if="loading" :loading="loading" />
      <template v-if="!loading">
        <template v-if="works.length > 0">
          <v-col
            v-for="work in works"
            :key="work.id"
            class="px-1 py-0"
            cols="4"
            sm="4"
            md="3"
            xl="2"
          >
            <WorkCard
              :work="work"
              :wordLimit="{ title: 100, text: 0 }"
              :miniVariant="false"
              :mutation="false"
            />
          </v-col>
        </template>
        <template v-else>
          <p class="overline text-center text-secondary ma-4">Kosong</p>
        </template>
      </template>
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
  name: 'Explore',
  props: {
    loadingPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: true,
    category: null
  }),
  computed: {
    me() {
      if (this.$store.getters['me']) {
        return this.$store.getters['me'];
      } else {
        this.$router.push('/');
        return []; 
      }
    },
    // works() {
    //   return this.$store.getters['works'];
    // },
    works() {
      if (this.$store.getters['works']) {
        this.loading = false
        if (this.category) {
          const filtered = this.$store.getters['works'].filter((item) => item.category[0] === this.category)
          return filtered
        }
        return this.$store.getters['works']
      }
    }
  },
  methods: {
    // getWorks() {
    //   this.$store.dispatch('getWorks').then(() => {
    //     this.loading = false;
    //   });
    // },
    hashtagActived(data) {
      this.category = data;
    },
    getWorks() {
      this.$store.dispatch('getWorks')
    },
    getUserById() {
      this.$store.dispatch('getUserById', this.me.id).then(() => {
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
    LoadingPage,
  },
  mounted() {
    this.getWorks()
    this.getUserById()
  },
}
</script>
