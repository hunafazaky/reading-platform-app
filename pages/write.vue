<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card class="mb-2" rounded="lg" outlined>
        <v-card-text>
          <v-row>
            <v-col cols="4" md="3">
              <v-sheet
                outlined
                rounded="lg"
                width="100%"
                class="overflow-hidden"
                :style="{
                  'padding-top': 100 * (19 / 13) + '%',
                  position: 'relative',
                }"
              >
                <v-img
                  style="inset: 0; position: absolute"
                  v-if="file"
                  height="100%"
                  cover
                  :src="work.cover"
                ></v-img>
                <v-icon v-else style="inset: 0; position: absolute" x-large>
                  mdi-plus-box
                </v-icon>
              </v-sheet>
              <p class="caption text--secondary text-center">Preview</p>
            </v-col>
            <v-col cols="8" md="9">
              <!-- <v-radio-group class="my-0" v-model="work.category[0]" mandatory>
                <template v-slot:label>
                  <div>Pilih jenis Karya Tulis</div>
                </template>
                <v-radio
                  value="Fiksi"
                  off-icon="mdi-pound-box"
                  on-icon="mdi-pound-box"
                  color="purple"
                >
                  <template v-slot:label>
                    <div>Fiksi</div>
                  </template>
                </v-radio>
                <v-radio
                  value="Non-Fiksi"
                  off-icon="mdi-pound-box"
                  on-icon="mdi-pound-box"
                  color="error"
                >
                  <template v-slot:label>
                    <div>Non-Fiksi</div>
                  </template>
                </v-radio>
              </v-radio-group> -->
              <!-- <v-divider></v-divider> -->
              <v-text-field
                outlined
                dense
                label="Judul"
                hint="Pilih judul yang sesuai dan menarik pembaca"
                persistent-hint
                required
                v-model="work.title"
              ></v-text-field>
              <v-autocomplete
                outlined
                dense
                multiple
                hide-selected
                small-chips
                deletable-chips
                clearable
                label="Tagar"
                hint="Pilih (max. 5) tagar yang paling sesuai"
                persistent-hint
                :counter="5"
                :items="hashtags"
                v-model="work.category"
              ></v-autocomplete>
              <v-file-input
                outlined
                dense
                clearable
                prepend-icon=""
                append-outer-icon="mdi-image-plus"
                show-size
                truncate-length="25"
                label="Cover"
                hint="Direkomendasikan cover dengan ratio 13:19"
                persistent-hint
                v-model="file"
                @change="fileToImage"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div>Tulis karyamu di kotak ini</div>
              <client-only>
                <tiptap-editor v-model="work.text" />
              </client-only>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ma-2 px-4"
            color="success"
            :disabled="!work.title || !work.text"
            @click="postWork"
          >
            Unggah
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        class="mb-0"
        type="success"
        transition="slide-y-transition"
        :value="success"
      >
        Data Berhasil Dikirim
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import TiptapEditor from '~/components/TiptapEditor.vue'

export default {
  name: 'Write',
  data: () => ({
    // me: {},
    loading: true,
    file: null,
    success: false,
    work: {
      cover: null,
      title: null,
      writer: null,
      category: [],
      text: null,
    },
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
    hashtags() {
      const hashtags = []
      this.$store.state.hashtags.data.forEach((element) => {
        hashtags.push(element.name)
      })
      return hashtags
    },
    me() {
      if (this.$store.getters['me']) {
        return this.$store.getters['me'];
      } else {
        this.$router.push('/');
        return []; 
      }
    },
  },
  methods: {
    // getMe() {
    //   this.me = this.$store.state.users.me
    //   if (!this.me.id) this.$router.push('/')
    //   else {
    //     this.loading = false
    //   }
    // },
    // setWrittenBy() {
    //   if (this.me.id) {
    //     this.work.writer = {
    //       id: this.me.id,
    //       username: this.me.account.username,
    //       img_profile: this.me.profile.img_profile,
    //       pen_name: this.me.profile.pen_name,
    //     }
    //   }
    // },
    postWork() {
      this.work.writer = this.me.id;
      if (this.work.cover === null) this.work.cover = '/temp-profile.webp';
      this.$store.dispatch('postWork', this.work).then((data) => {
        // this.works = this.$store.getters['works'];
        // this.loading = false;
        this.success = true
        setTimeout(() => {
          this.$router.push('/home')
        }, 2000)
      });
      // this.$axios
      //   .post(`/works`, this.work)
      //   // .then((data) => {
      //   //   this.me.activity.writings.push({
      //   //     id: data.id,
      //   //     createdAt: data.createdAt,
      //   //     updatedAt: data.updatedAt
      //   //   })
      //   //   this.$axios.put(`/users/${this.me.id}`, this.me);
      //   // })
      //   .then(() => {
      //     this.success = true
      //     setTimeout(() => {
      //       this.$router.push('/home')
      //     }, 2000)
      //   })
    },
    fileToImage() {
      if (this.file) {
        this.work.cover = URL.createObjectURL(this.file)
      }
    },
  },
  components: { TiptapEditor },
  mounted() {
    // this.getMe()
    // this.setWrittenBy()
  },
  created() {},
}
</script>
