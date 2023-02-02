<template>
  <v-row justify="space-between">
    <PopZoom
      maxWidth="500px"
      :image="work.content.img_cover"
      :showPopZoom="showPopZoom"
      @hidePopZoom="showPopZoom = false"
    />
    <v-col class="my-5" cols="12" md="7">
      <h1
        class="headline font-weight-medium text--secondary"
        v-text="work.content.title"
      ></h1>
      <p class="subtitle-1 my-5" v-html="work.content.text"></p>
    </v-col>
    <v-col class="my-5" cols="12" md="4">
      <v-card rounded="lg" outlined>
        <v-card-text>
          <v-row justify="center">
            <v-col sm="6" md="12">
              <v-sheet
                @click.stop="showPopZoom = true"
                outlined
                rounded="lg"
                width="100%"
                class="overflow-hidden zoom-in-pointer"
                :style="{
                  'padding-top': 100 * (19 / 13) + '%',
                  position: 'relative',
                }"
              >
                <v-img
                  style="inset: 0; position: absolute"
                  height="100%"
                  cover
                  :src="work.content.img_cover"
                ></v-img>
              </v-sheet>
            </v-col>
            <v-col sm="6" md="12">
              <div class="my-5">
                <p class="caption font-weight-bold my-0">Penulis :</p>
                <nuxt-link
                  :to="`../../user/${work.activity.written_by.username}`"
                  class="text-decoration-none"
                >
                  <div
                    class="caption text-truncate text-capitalize font-weight-medium"
                    v-text="work.activity.written_by.pen_name"
                  ></div>
                </nuxt-link>
              </div>
              <div class="my-5">
                <p class="caption font-weight-bold my-0">Tipe :</p>
                <v-icon
                  class="mx-0"
                  :class="
                    work.keyword.type === 'Fiksi'
                      ? 'purple--text'
                      : 'error--text'
                  "
                  left
                >
                  mdi-pound-box
                </v-icon>
                <span
                  class="overline text-truncate"
                  v-text="work.keyword.type"
                ></span>
              </div>
              <div class="my-5" v-if="work.keyword.hashtags.length > 0">
                <p class="caption font-weight-bold my-0">Tagar :</p>
                <v-chip-group column class="mb-4">
                  <v-chip
                    label
                    small
                    color="grey darken-4"
                    class="font-weight-medium white--text"
                    v-for="hashtag in work.keyword.hashtags"
                    :key="hashtag"
                  >
                    <v-icon small left>mdi-pound</v-icon>
                    <span class="text-capitalize" v-text="hashtag"></span>
                  </v-chip>
                </v-chip-group>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PopZoom from '../../../components/PopZoom.vue'

export default {
  async asyncData({ $axios, $config }) {
    const work = await $axios.$get(`/works/63da9c365b863a980993e50f`)
    return { work }
  },
  name: 'Read',
  data: () => ({
    showPopZoom: false,
  }),
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
    },
    // work() {
    //   return this.$store.state.works.data.find(
    //     (work) => work.id == this.$route.params.id
    //   )
    // },
  },
  methods: {
    hashtag(id) {
      return this.$store.state.hashtags.data.find((hashtag) => hashtag.id == id)
    },
    writer(id) {
      return this.$store.state.users.data.find((user) => user.id == id)
    },
  },
  components: { PopZoom },
}
</script>
