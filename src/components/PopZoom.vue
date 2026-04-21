<template>
  <v-dialog v-model="showPopZoom" :max-width="maxWidth" persistent>
    <v-sheet
      @click="$emit('hidePopZoom')"
      outlined
      width="100%"
      class="zoom-out-pointer"
    >
      <v-img height="100%" cover :src="image"></v-img>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: 'PopZoom',
  props: ['maxWidth', 'image', 'showPopZoom'],
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
