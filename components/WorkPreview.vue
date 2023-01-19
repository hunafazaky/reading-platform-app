<template>
  <v-card rounded="lg" class="card mb-4" :width="width" dark>
    <v-img
      cover
      src="/cover.jpg"
      gradient="to top, rgba(12.9, 12.9, 12.9, .25), rgba(12.9, 12.9, 12.9, 1)"
    >
      <v-card-actions v-if="miniVariant === false" class="mb-2 d-flex align-center">
        <v-avatar color="secondary" size="30" class="ma-2">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-avatar>
        <span class="font-weight-bold">Hunafa Zaky</span>
        <v-spacer></v-spacer>
        <v-icon left class="red--text"> mdi-tag </v-icon>
      </v-card-actions>
      <v-card-title
        class="text-capitalize"
        :class="miniVariant === true ? 'caption font-weight-bold' : ''"
        v-text="
          title.length > wordLimit.title
            ? title.slice(0, wordLimit.title) + '...'
            : title
        "
      ></v-card-title>
      <v-card-text 
        v-if="miniVariant === false"
        class="text-caption"
        v-text="
          text.length > wordLimit.text
            ? text.slice(0, wordLimit.text) + '...'
            : text
        "
      >
      </v-card-text>
      <v-card-actions >
        <template v-if="miniVariant === true">
          <v-btn
            class="mx-2"
            dark
            small
            color="primary"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            class="mx-2"
            small
            color="blue darken-2"
          >
            <v-icon left>mdi-bookmark-plus</v-icon>            
            simpan
          </v-btn>
          <v-btn
            class="mx-2"
            small
            color="red darken-2"
          >
            <v-icon left>mdi-book-open</v-icon>            
            lanjut baca
          </v-btn>
        </template>
      </v-card-actions>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'WorkPreview',
  props: {
    wordLimit: Object,
    miniVariant: Boolean,
    width: {
      type: String,
      default:'100%'
    }
  },
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
