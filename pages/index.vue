<template>
  <v-card>
    <v-card-text>
      <v-row>
        <template>
          <v-col 
          class="pa-1"
            v-for="work in works"
            :key="work.id" 
            md="4"
            sm="3"
          >
            <ArticleCard
              :work="work"
              :limit="{'text':60}"
            />
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ArticleCard from "~/components/ArticleCard.vue";
export default {
  components: { ArticleCard },
  name: "IndexPage",
  layout: 'unregisted',
  data: () => ({
  }),
  computed: {
    works () {
      return this.$store.state.works.list
    }
  },
}
</script>