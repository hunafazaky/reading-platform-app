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
                  :src="imagePreview"
                ></v-img>
                <v-icon style="inset: 0; position: absolute" v-else x-large>
                  mdi-plus-box
                </v-icon>
              </v-sheet>
              <p class="caption text--secondary text-center">Preview</p>
            </v-col>
            <v-col cols="8" md="9">
              <v-text-field
                outlined
                dense
                v-model="title"
                label="Judul"
                hint="Pilih judul yang sesuai dan menarik pembaca"
                persistent-hint
              ></v-text-field>
              <v-radio-group class="my-0" v-model="radios" row mandatory>
                <v-radio
                  label="Non-Fiksi"
                  value="non-fiction"
                  off-icon="mdi-pound-box"
                  on-icon="mdi-pound-box"
                  color="error"
                ></v-radio>
                <v-radio
                  label="Fiksi"
                  value="fiction"
                  off-icon="mdi-pound-box"
                  on-icon="mdi-pound-box"
                  color="purple"
                ></v-radio>
              </v-radio-group>
              <v-autocomplete
                outlined
                dense
                multiple
                hide-selected
                small-chips
                deletable-chips
                clearable
                hint="Pilih (max. 5) kategori yang paling sesuai"
                :counter="5"
                persistent-hint
                v-model="select"
                :items="items"
                label="Kategori"
              ></v-autocomplete>
              <v-file-input
                prepend-icon=""
                append-outer-icon="mdi-image-plus"
                outlined
                dense
                clearable
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
              <client-only>
                <tiptap-editor v-model="content"/>
              </client-only>
              <div class="content">
                <h3>Content</h3>
                <pre><code>{{ content }}</code></pre>
              </div>
              <div class="content">
                <h3>Content</h3>
                <p v-html="content"></p>
              </div>
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
          <Dialog />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Dialog from '../components/Dialog.vue'
import TiptapEditor from '~/components/TiptapEditor.vue'

export default {
  layout: 'default',
  data: () => ({
    content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
    radios: 'non-fiction',
    title: null,
    text: null,
    select: null,
    file: null,
    imagePreview: null,
    items: [
      'Teknologi',
      'Sains',
      'Sejarah',
      'Ekonomi',
      'Sosial',
      'Budaya',
      'Agama',
      'Politik',
      'Olahraga',
      'Aksi',
      'Romansa',
      'Fiksi Ilmiah',
      'Fantasi',
      'Horor',
      'Drama',
    ],
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
  },
  methods: {
    upload() {
      this.$v.$touch()
      // this.$router.push('/home')
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.title = ''
      this.select = null
      this.checkbox = false
    },
    fileToImage() {
      if (this.file) {
        this.imagePreview = URL.createObjectURL(this.file)
      }
    },
  },
  components: { Dialog, TiptapEditor },
}
</script>