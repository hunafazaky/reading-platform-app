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
                  :src="work.image_cover"
                ></v-img>
                <v-icon v-else style="inset: 0; position: absolute" x-large>
                  mdi-plus-box
                </v-icon>
              </v-sheet>
              <p class="caption text--secondary text-center">Preview</p>
            </v-col>
            <v-col cols="8" md="9">
              <v-radio-group class="my-0" v-model="work.type" mandatory>
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
              </v-radio-group>
              <v-divider></v-divider>
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
                v-model="work.hashtags"
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
              <!-- <v-sheet outlined class="py-4" rounded="lg">
                <div id="codex-editor"/>
              </v-sheet>
              <v-btn type="button" name="button" @click="save()">save</v-btn>
              <div v-if="value">
                <template v-for="val in value.blocks">
                  <p v-if="val.data.text" v-html="val.data.text"></p>
                  <p v-if="val.data.items">
                    <ul v-for="item in val.data.items">
                      <li v-html="item"></li>
                    </ul>
                  </p>
                </template>
              </div> -->

              <!-- <TextBox
                ref="myQuillEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              /> -->
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ma-2 px-4"
            color="success"
            :disabled="!work.title || !work.text"
            @click="addWork"
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
    file: null,
    success: false,
    work: {
      image_cover: null,
      title: null,
      text: null,
      type: 'Fiksi',
      hashtags: [],
      writer_id: 1,
      reader_id: [],
      favorite_count: null,
      bookshelf_count: null,
      created_at: '21 Desember 2012',
      updated_at: '21 Desember 2012',
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
  },
  methods: {
    addWork() {
      // this.success = false;
      this.work.id = Math.random()
      if (this.work.image_cover === null)
        this.work.image_cover = '/temp-profile.webp'
      this.$store.commit('works/add', this.work)
      this.file = null
      this.work = {
        image_cover: null,
        title: null,
        text: null,
        type: null,
        hashtags: null,
        writer_id: 1,
        reader_list: [1, 2, 3, 4, 5],
        favorite: 20,
        bookshelf: 21,
        created_at: '21 Desember 2012',
        updated_at: '21 Desember 2012',
      }
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 2000)
    },
    fileToImage() {
      if (this.file) {
        this.work.image_cover = URL.createObjectURL(this.file)
      }
    },
  },
  components: { TiptapEditor },
}
</script>
