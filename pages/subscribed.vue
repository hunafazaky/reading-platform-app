<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="9">
      <v-card class="mb-2" rounded="lg" outlined>
        <v-card-title>Hunafa Zaky</v-card-title>
        <v-card-text>
          <v-slide-group
            active-class="primary"
            prev-icon="mdi-arrow-left-bold-box"
            next-icon="mdi-arrow-right-bold-box"
            show-arrows
          >
            <v-slide-item v-for="n in 25" :key="n">
              <WorkPreview
                class="mx-2"
                :wordLimit="{ title: 100, text: 0 }"
                :miniVariant="true"
                :size="{ numbers: 150, units: 'px' }"
              />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
      <v-card class="mb-2" rounded="lg" outlined>
        <v-card-title>Hunafa Zaky</v-card-title>
        <v-card-text>
          <v-slide-group
            active-class="primary"
            prev-icon="mdi-arrow-left-bold-box"
            next-icon="mdi-arrow-right-bold-box"
            show-arrows
          >
            <v-slide-item v-for="n in 25" :key="n">
              <WorkPreview
                class="mx-2"
                :wordLimit="{ title: 100, text: 0 }"
                :miniVariant="true"
                :size="{ numbers: 150, units: 'px' }"
              />
            </v-slide-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="3">
      <SideCard :subscribed="true" />
    </v-col>
  </v-row>
</template>

<script>
import WorkPreview from '../components/WorkPreview.vue'
import SideCard from '../components/SideCard.vue'

export default {
  name: 'Favorite',
  data: () => ({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium nisi tempora iure rerum, facilis saepe pariatur fugiat quas explicabo autem id eveniet distinctio porro quos eius, natus aspernatur dolore, repellendus laboriosam molestiae ipsum aut accusamus. Pariatur, necessitatibus et. Sequi ullam neque facere maiores? Nemo, corrupti ipsum sapiente ad reprehenderit placeat nobis similique modi, eaque distinctio repudiandae! Dolorem maxime neque vero iste suscipit animi deleniti, deserunt facilis hic, architecto assumenda nulla aut ipsam, qui perferendis ut praesentium amet? Porro, cupiditate voluptate deserunt aut assumenda quo aliquam quasi reprehenderit eius est beatae excepturi eum corporis odio dignissimos modi id vitae veritatis.',
  }),
  components: { WorkPreview },
}
</script>
