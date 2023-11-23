<template>
  <div>
    <LoadingPage :loading="loadingPage"/>
    <v-row :justify="works?.length > 0 ? 'start' : 'center'" class="px-4 py-2">
      <LoadingComponent v-if="loading" :loading="loading" />
      <template v-if="!loading">
        <template v-if="works?.length > 0">
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
  name: 'Bookshelf',
  props: {
    loadingPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: true,
    works:[]
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
    // }
  },
  methods: {
    getWorks() {
      const like_list = this.me.like_list
      for (let index = 0; index < like_list.length; index++) {
        const element = like_list[index];
        this.$store.dispatch('getWorkById', element._id)
        .then((data) => {
          this.works.push(data)
        })        
      }
      // like_list.forEach(element => {
      //   this.$store.dispatch('getWorkById', element._id)
      //   .then((data) => {
      //     this.works.push(data)
      //   })
      // });
      this.loading = false
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

<!-- <template>
  <div>
    <LoadingPage :loading="loadingPage"/>
    <v-row :justify="works?.length > 0 ? 'start' : 'center'" class="px-4 py-2">
      <LoadingComponent v-if="loading" :loading="loading" />
      <template v-if="!loading">
        <template v-if="works?.length > 0">
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
  name: 'Bookshelf',
  props: {
    loadingPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: true,
    works:[]
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
    // }
  },
  methods: {
    getWorks() {
      const like_list = this.me.like_list
      for (let index = 0; index < like_list.length; index++) {
        const element = like_list[index];
        this.$store.dispatch('getWorkById', element._id)
        .then((data) => {
          this.works.push(data)
        })        
      }
      this.loading = false
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
 -->