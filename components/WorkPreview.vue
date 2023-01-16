<template>
  <v-card class="card mb-4" width="100%" shaped elevation="5">
    <v-card-header v-if="header === 'true'">
      <!-- v-if="i < 5"
      :key="i"
      :style="`left: ${i * 25}px;`"
      :to="'/user/' + userByID(reader.user_id).account.username" -->
      <v-btn 
        class="pa-2 ma-2"
        nuxt fab small
      >
        <v-img
          class="rounded-circle"
          cover
          aspect-ratio="1"
          src="/icon.png"
        ></v-img>
      </v-btn>
      <span class="font-weight-medium">Hunafa Zaky</span>
    </v-card-header>
    <v-img
      cover
      src="/cover.jpg"
      gradient="to top right, rgba(100,115,201,.25), rgba(25,32,72,1)"
    >
      <v-card-title 
        class="text-capitalize" :class="header !== 'true' ? 'caption font-weight-bold':''"
        v-text="title.length > wordLimit.title ? title.slice(0,wordLimit.title)+'...':title"
      ></v-card-title>
      <v-spacer></v-spacer>
      <v-chip
        class="my-4 ml-4"
        color="pink"
        label
        x-small
        text-color="white"
      >
        <v-icon left x-small>
          mdi-label
        </v-icon>
        Tags
      </v-chip>
      <v-spacer></v-spacer>
      <v-card-text>
        <p class="text--secondary" v-text="text.length > wordLimit.text ? text.slice(0,wordLimit.text)+'...':text"></p>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "WorkPreview",
  props: ['wordLimit', 'header'],
  data: () => ({
    title: 'Ano hi mita hana no namae wo bokutachi wa mada shiranai',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi laudantium nisi tempora iure rerum, facilis saepe pariatur fugiat quas explicabo autem id eveniet distinctio porro quos eius, natus aspernatur dolore, repellendus laboriosam molestiae ipsum aut accusamus. Pariatur, necessitatibus et. Sequi ullam neque facere maiores? Nemo, corrupti ipsum sapiente ad reprehenderit placeat nobis similique modi, eaque distinctio repudiandae! Dolorem maxime neque vero iste suscipit animi deleniti, deserunt facilis hic, architecto assumenda nulla aut ipsam, qui perferendis ut praesentium amet? Porro, cupiditate voluptate deserunt aut assumenda quo aliquam quasi reprehenderit eius est beatae excepturi eum corporis odio dignissimos modi id vitae veritatis.'
  })
}
</script>