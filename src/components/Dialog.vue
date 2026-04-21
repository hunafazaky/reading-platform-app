<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ props }">
      <v-btn class="hz-container" color="bg-hz-ocean text-hz-light" v-bind="props">Upload</v-btn>
    </template>
    <v-card class="hz-container">
      <v-card-title>Upload your story</v-card-title>
      <v-card-actions>
        <v-btn color="text-hz-forest" variant="text" @click="dialog = false">Confirm</v-btn>
        <v-btn color="text-hz-dawn" variant="text" @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref(false);
</script>

<style scoped>
@reference "../styles/tailwind.css";
.hz-container {
  @apply rounded p-4;
}
</style>
