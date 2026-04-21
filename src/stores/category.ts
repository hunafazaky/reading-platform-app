// stores/category.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const data = ref([
    { id: 0, name: "Non-Fiction" },
    { id: 1, name: "Fiction" },
  ]);
});
