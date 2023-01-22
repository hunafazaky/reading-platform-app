<template>
  <v-sheet
    rounded="lg"
    :width="size.numbers * 1 + size.units"
    class="overflow-hidden mb-2"
    :style="{
      'padding-top': size.numbers * (19 / 13) + size.units,
      position: 'relative',
    }"
  >
    <v-card
      rounded="lg"
      style="inset: 0; position: absolute"
      class="card"
      elevation="2"
      height="100%"
      width="100%"
      dark
    >
      <v-img
        height="100%"
        src="/cover.jpg"
        gradient="to top, rgba(12.9, 12.9, 12.9, .25), rgba(12.9, 12.9, 12.9, 1)"
      >
        <v-card-actions v-if="miniVariant === true" class="ma-0 pa-0 mx-4 mt-2">
          <v-icon class="error--text" small left> mdi-pound-box </v-icon>
          <span class="overline text-truncate">Non-Fiction</span>
        </v-card-actions>
        <v-card-actions v-else class="mb-2 d-flex align-center">
          <v-avatar color="secondary" size="30" class="ma-2">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>
          <span class="font-weight-bold">Hunafa Zaky</span>
          <v-spacer></v-spacer>
          <v-icon class="error--text ma-2"> mdi-pound-box </v-icon>
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
        <v-card-actions>
          <div class="mx-2 absolute bottom" v-if="miniVariant === true">
            <v-btn fab small color="primary">
              <v-icon small> mdi-bookmark-plus </v-icon>
            </v-btn>
            <v-btn fab small color="success">
              <v-icon small> mdi-book-open </v-icon>
            </v-btn>
          </div>
          <div class="mx-2 absolute bottom" v-else>
            <v-btn small color="primary">
              <v-icon left>mdi-bookmark-plus</v-icon>
              simpan
            </v-btn>
            <v-btn small color="success">
              <v-icon left>mdi-book-open</v-icon>
              lanjut baca
            </v-btn>
          </div>
        </v-card-actions>
      </v-img>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: 'WorkPreview',
  props: {
    wordLimit: Object,
    miniVariant: Boolean,
    size: {
      type: Object,
      default: {
        numbers: 100,
        units: '%',
      },
    },
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
