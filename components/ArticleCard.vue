<!-- <template>
  <v-card 
    class="d-flex flex-column justify-space-between"
    color="grey darken-3"
    elevation="6"
    height="250px"
  >
    <v-img
      cover
      :src="work.image_src"
      height="150px"
      gradient="to top right, rgba(100,115,201,.25), rgba(25,32,72,1)"
    >
      <v-row>
        <v-col cols="10" class="d-flex flex-column justify-space-between">
          <div class="flex-grow-1">
            <v-card-title v-text="work.title.length > limit.text ? work.title.slice(0,limit.text)+'...':work.title"></v-card-title>
          </div>
          <v-card-text class="py-0">
            <div class="text-truncate">
              <span class="warning--text">Ditulis oleh </span>
              {{user[0].profile.name}}
            </div>
            <div class="d-flex">
              <v-chip 
                class="mr-1 font-weight-bold"
                :color="`${category[0].color}`" 
                label
                small
              >
                <v-icon small left>mdi-tag</v-icon>
                {{category[0].name}}
              </v-chip>
              <div v-for="(hashtag, i) in hashtags" :key="hashtag.id">
                <v-chip
                  v-if="i < limit.hashtag"
                  class="mr-1 font-weight-bold accent--text" 
                  color="grey lighten-4" 
                  label
                  small
                >
                  <v-icon x-small left>mdi-pound</v-icon>
                  {{hashtag.name}}
                </v-chip>
              </div>
              <v-chip
                v-if="hashtags.length > limit.hashtag"
                class="font-weight-bold accent--text" 
                color="grey lighten-4" 
                label
                small
              >
                <v-icon x-small>mdi-dots-horizontal</v-icon>
              </v-chip>
            </div>
          </v-card-text>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-card-title class="d-flex flex-column px-0 mx-0">
            <v-btn class="ml-auto mr-4" :plain="!star" icon @click="starWork">
              <v-icon :color="star ? 'secondary':''">mdi-star-box</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="d-flex flex-column px-0 mx-0">
            <v-btn 
              class="ml-auto mr-4" 
              nuxt :to="`/work/${work.id}/update`"
              plain icon>
              <v-icon color="yellow lighten-1">mdi-note-edit</v-icon>
            </v-btn>
            <v-btn class="ml-auto mr-4" plain icon @click="deleteWork">
              <v-icon color="red lighten-1">mdi-note-remove</v-icon>
            </v-btn>
            <v-btn class="ml-auto mr-4" :plain="!disabled" icon @click="disableWork">
              <v-icon :color="disabled ? 'blue lighten-1':''">mdi-note-off</v-icon>
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-img>

    <v-card-actions>
      <v-btn plain>
        <v-icon left>mdi-book-open-page-variant</v-icon>
        {{work.reader.length}}
      </v-btn>
      <v-spacer />
      <v-btn 
        nuxt :to="`/work/${work.id}/read`"
        color="teal"
        small
      > 
        Lanjut Baca
      </v-btn>
    </v-card-actions>
  </v-card>
</template> -->

<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    color="grey darken-4"
    elevation="6"
  >
    <v-img
      contain
      max-height="300px"
      :src="work.image_src"
    >
  
    </v-img>
    <v-card-title v-text="work.title.length > limit.text ? work.title.slice(0,limit.text)+'...':work.title"></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['work', 'cols', 'limit'],
  data: () => ({
    star: false,
    disabled: false,
  }),
  computed: {
    user () {
      return this.$store.state.users.list.filter(user => user.id == this.work.writer.user_id);
    },
    category () {
      return this.$store.state.categories.list.filter(category => category.id == this.work.type.category);
    },
    hashtags () {
      const data = [];
      this.work.type.hashtags.forEach(element => {
        this.$store.state.hashtags.list.forEach(tag => {
          if(tag.id == element) data.push(tag);
        });
      });
      return data;
    },
  },
  methods: {
    starWork() {
      this.star = !this.star;
    },
    editWork() {

    },
    deleteWork() {

    },
    disableWork() {
      this.disabled = !this.disabled;
    },
  }

}
</script>

<style scoped>
.bottom-5 {
  position: absolute; 
  bottom: 0.5rem;
}
.bottom-25 {
  position: absolute; 
  bottom: 2.5rem;
}
</style>