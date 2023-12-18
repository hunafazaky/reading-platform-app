<template>
  <div>
    <LoadingPage :loading="loading"/>
    <v-row justify="space-between">
      <PopZoom
        maxWidth="500px"
        :image="work?.cover"
        :showPopZoom="showPopZoom"
        @hidePopZoom="showPopZoom = false"
      />
      <v-col class="my-5" cols="12" md="7">
        <h1
          class="headline font-weight-medium text--secondary"
          v-text="work?.title"
        ></h1>
        <p class="subtitle-1 my-5" v-html="work?.text"></p>
        <!-- <a class="subtitle-1 my-5 text-decoration-none" :href="work?.attachment.link" target="_blank" v-html="work?.attachment.title"></a> -->
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
                    :src="work?.cover"
                  ></v-img>
                </v-sheet>
              </v-col>
              <v-col sm="6" md="12">
                <div class="my-5">
                  <p class="caption font-weight-bold my-0">Penulis :</p>
                  <nuxt-link
                    :to="`../../user/${work?.writer.username}`"
                    class="text-decoration-none"
                  >
                    <div
                      class="caption text-truncate text-capitalize font-weight-medium"
                      v-text="work?.writer.pen_name"
                    ></div>
                  </nuxt-link>
                </div>
                <div class="my-5">
                  <p class="caption font-weight-bold my-0">Kategori :</p>
                  <span
                    class="overline font-weight-bold"
                    v-for="category in work?.category"
                  >
                  #{{ category }}
                  </span>
                </div>
                <div class="my-5" v-if="work?.attachment">
                  <p class="caption font-weight-bold my-0">Lampiran :</p>
                  <v-btn
                    color="error"
                    class="my-2 white--text truncate"
                    block
                    :max-width="150"
                    @click="openLink(work?.attachment.link)"
                  >
                    <v-icon
                      left
                      dark
                    >
                      mdi-file-pdf-box
                    </v-icon>
                    <span class="text-truncate" style="max-width:150px">
                      
                      {{ work?.attachment.title }}
                    </span>
                  </v-btn>
                </div>
                <div class="my-5">
                  <p class="caption font-weight-bold my-0">Berikan Penilaian Anda</p>
                  <v-rating
                    hover
                    :length="5"
                    :size="32"
                    v-model="rating"
                    @input="sendRating"
                  />
                </div>
                <!-- <div class="my-5" v-if="work?.keyword.hashtags.length > 0">
                  <p class="caption font-weight-bold my-0">Tagar :</p>
                  <v-chip-group column class="mb-4">
                    <v-chip
                      label
                      small
                      color="grey darken-4"
                      class="font-weight-medium white--text"
                      v-for="hashtag in work?.keyword.hashtags"
                      :key="hashtag"
                    >
                      <v-icon small left>mdi-pound</v-icon>
                      <span class="text-capitalize" v-text="hashtag"></span>
                    </v-chip>
                  </v-chip-group>
                </div> -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PopZoom from '../../../components/PopZoom.vue'
import LoadingPage from '../../../components/LoadingPage.vue'

export default {
  name: 'Read',
  data: () => ({
    me: {},
    showPopZoom: false,
    loading: true,
    rating: null
  }),
  computed: {
    work() {
      if (this.$store.getters['work']) {
        // const work = 
        this.loading = false
        return this.$store.getters['work'];
      }
    },
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
  },
  methods: {
    getMe() {
      this.me = this.$store.getters['me']
      // this.getRating();
    },
    getRating() {
      const rate_list = this.$store.getters['me'].rate_list.find(item => item.work_id === this.$route.params.id)
      this.rating = rate_list?.rating
      // if (this.$store.getters['me']?.rate_list) {
      //   // console.log(this.rating);
      // }
      // else {
      //   this.rating = null
      // }
    },  
    getWorkById() {
      this.$store.dispatch('getWorkById', this.$route.params.id)
      .then((data) => {
        this.$store.dispatch('updateReadList', data.id)
        this.$store.dispatch('updateReaders', data)
      })
    },
    async sendRating() {
      // console.log(this.rating);
      this.$store.dispatch('updateRateList', this.rating);
      this.$store.dispatch('updateRateBy', this.rating);
      this.$store.dispatch('updateRecommender', this.rating).then((data) => {
        console.log(data);
      })
      // this.$store.dispatch('getWorkById', this.$route.params.id)
      // .then((data) => {
      //   this.$store.dispatch('updateRateList', data.id, this.rating)
      //   this.$store.dispatch('updateRateBy', data, this.rating)
      // })
    },
    hashtag(id) {
      return this.$store.state.hashtags.data.find((hashtag) => hashtag.id == id)
    },
    writer(id) {
      return this.$store.state.users.data.find((user) => user.id == id)
    },
    openLink(link) {
      window.open(link, "_blank");
    }
  },
  components: { PopZoom, LoadingPage },
  mounted() {
    this.getMe()
    this.getWorkById();
    this.getRating()
    if (!this.me) this.$router.push('/')
  },
}
</script>
