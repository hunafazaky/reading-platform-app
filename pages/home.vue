<template>
  <v-row justify="center">
    <v-col cols="10" sm="6" md="5">
      <WorkPreview
        :wordLimit="{ title: 100, text: 200 }"
        :miniVariant="false"
      />
      <WorkPreview
        :wordLimit="{ title: 100, text: 200 }"
        :miniVariant="false"
      />
      <WorkPreview
        :wordLimit="{ title: 100, text: 200 }"
        :miniVariant="false"
      />
    </v-col>
    <v-col cols="10" sm="6" md="5">
      <SideCard />
    </v-col>
  </v-row>
</template>

<script>
import WorkPreview from '../components/WorkPreview.vue'
import SideCard from '../components/SideCard.vue'

export default {
  name: 'Home',
  data: () => ({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium nisi tempora iure rerum, facilis saepe pariatur fugiat quas explicabo autem id eveniet distinctio porro quos eius, natus aspernatur dolore, repellendus laboriosam molestiae ipsum aut accusamus. Pariatur, necessitatibus et. Sequi ullam neque facere maiores? Nemo, corrupti ipsum sapiente ad reprehenderit placeat nobis similique modi, eaque distinctio repudiandae! Dolorem maxime neque vero iste suscipit animi deleniti, deserunt facilis hic, architecto assumenda nulla aut ipsam, qui perferendis ut praesentium amet? Porro, cupiditate voluptate deserunt aut assumenda quo aliquam quasi reprehenderit eius est beatae excepturi eum corporis odio dignissimos modi id vitae veritatis.',
  }),
}
</script>

<!-- <v-card-title>
  <v-btn class="pa-4 ma-4" nuxt fab>
    <v-img
      class="rounded-circle"
      cover
      aspect-ratio="1"
      src="/icon.png"
    ></v-img>
  </v-btn>
  <span class="font-weight-medium headline">Hunafa Zaky</span>
</v-card-title> -->
