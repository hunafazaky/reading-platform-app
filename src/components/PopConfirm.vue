<template>
  <v-dialog v-model="showPopConfirm" max-width="400px" persistent>
    <v-sheet @click="$emit('hidePopConfirm')" outlined class="zoom-out-pointer">
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: 'PopConfirm',
  props: ['message', 'showPopConfirm'],
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
