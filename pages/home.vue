<template>
  <v-row justify="center">
    <v-col cols="10" sm="6" md="5">
      <template v-if="works.length > 0">
        <WorkCard
          v-for="work in works"
          :key="work.id"
          class="mx-auto"
          :work="work"
          :wordLimit="{ title: 150, text: 400 }"
          :miniVariant="false"
        />
      </template>
      <template v-else>
        <p class="overline text-center text-secondary ma-4">Kosong</p>
      </template>
    </v-col>
    <v-col cols="10" sm="6" md="5">
      <SideCard :bookmark="true" :recommend="true" />
    </v-col>
  </v-row>
</template>

<script>
import WorkCard from '../components/WorkCard.vue'
import SideCard from '../components/SideCard.vue'
import { mapMutations } from 'vuex'

export default {
  async asyncData({ $axios, $config }) {
    const works = await $axios.$get(`/works`)
    return { works }
  },
  name: 'Home',
  data: () => ({
    works: {},
  }),
  computed: {},
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
    // getAllWorks() {
    //   this.$store.dispatch('works/getAllWorks');
    //   this.works = this.$store.state.works.data;
    // }
    // async asyncData({ $axios, $config }) {
    //   const works = await $axios.$get(`/works`)
    //   return { works }
    // }
  },
  components: {
    WorkCard,
  },
  mounted() {
    // this.getAllWorks();
    // this.asyncData();
  },
}
</script>
