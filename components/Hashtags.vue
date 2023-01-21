<template>
  <v-slide-group
    active-class="secondary"
    prev-icon="mdi-arrow-left-bold-box"
    next-icon="mdi-arrow-right-bold-box"
    show-arrows
  >
    <v-slide-item v-for="n in 25" :key="n" v-slot="{ active, toggle }">
      <v-btn
        class="mx-1 my-1 rounded-lg"
        :input-value="active"
        :dark="active"
        outlined
        depressed
        small
        @click="toggle"
      >
        Options {{ n }}
      </v-btn>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  name: 'Hashtags',
  props: [],
  data: () => ({
    title: 'Ano hi mita hana no namae wo bokutachi wa mada shiranai',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium nisi tempora iure rerum, facilis saepe pariatur fugiat quas explicabo autem id eveniet distinctio porro quos eius, natus aspernatur dolore, repellendus laboriosam molestiae ipsum aut accusamus. Pariatur, necessitatibus et. Sequi ullam neque facere maiores? Nemo, corrupti ipsum sapiente ad reprehenderit placeat nobis similique modi, eaque distinctio repudiandae! Dolorem maxime neque vero iste suscipit animi deleniti, deserunt facilis hic, architecto assumenda nulla aut ipsam, qui perferendis ut praesentium amet? Porro, cupiditate voluptate deserunt aut assumenda quo aliquam quasi reprehenderit eius est beatae excepturi eum corporis odio dignissimos modi id vitae veritatis.',
  }),
}
</script>

<!-- v-if="i < 5"
  :key="i"
  :style="`left: ${i * 25}px;`"
  :to="'/user/' + userByID(reader.user_id).account.username" -->
