<template>
  <v-row :justify="works.length > 0 ? 'start' : 'center'" class="px-4">
    <v-col class="pa-1" cols="12">
      <Hashtags />
    </v-col>
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
          :miniVariant="true"
        />
      </v-col>
    </template>
    <template v-else>
      <p class="overline text-center text-secondary ma-4">Kosong</p>
    </template>
  </v-row>
</template>

<script>
import WorkCard from '../components/WorkCard.vue'
import Hashtags from '../components/Hashtags.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Explore',
  data: () => ({}),
  computed: {
    works() {
      return this.$store.state.works.data
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
  components: {
    WorkCard,
    Hashtags,
  },
}
</script>
