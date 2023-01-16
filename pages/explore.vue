<template>
  <v-row justify="start">
    <v-col cols="4" sm="4" md="3" lg="3" class="pa-1">
      <WorkPreview :wordLimit="{title:100, text: 0}" header="false"/>
    </v-col>
    <v-col cols="4" sm="4" md="3" lg="3" class="pa-1">
      <WorkPreview :wordLimit="{title:100, text: 0}" header="false"/>
    </v-col>
    <v-col cols="4" sm="4" md="3" lg="3" class="pa-1">
      <WorkPreview :wordLimit="{title:100, text: 0}" header="false"/>
    </v-col>
    <v-col cols="4" sm="4" md="3" lg="3" class="pa-1">
      <WorkPreview :wordLimit="{title:100, text: 0}" header="false"/>
    </v-col>
    <v-col cols="4" sm="4" md="3" lg="3" class="pa-1">
      <WorkPreview :wordLimit="{title:100, text: 0}" header="false"/>
    </v-col>
    <v-col cols="4" sm="4" md="3" lg="3" class="pa-1">
      <WorkPreview :wordLimit="{title:100, text: 0}" header="false"/>
    </v-col>
  </v-row>
</template>

<script>
import WorkPreview from '../components/WorkPreview.vue'

export default {
    name: "IndexPage",
    data: () => ({
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium nisi tempora iure rerum, facilis saepe pariatur fugiat quas explicabo autem id eveniet distinctio porro quos eius, natus aspernatur dolore, repellendus laboriosam molestiae ipsum aut accusamus. Pariatur, necessitatibus et. Sequi ullam neque facere maiores? Nemo, corrupti ipsum sapiente ad reprehenderit placeat nobis similique modi, eaque distinctio repudiandae! Dolorem maxime neque vero iste suscipit animi deleniti, deserunt facilis hic, architecto assumenda nulla aut ipsam, qui perferendis ut praesentium amet? Porro, cupiditate voluptate deserunt aut assumenda quo aliquam quasi reprehenderit eius est beatae excepturi eum corporis odio dignissimos modi id vitae veritatis.'
    })
}
</script>
