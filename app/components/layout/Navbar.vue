<template>
  <section v-if="!mobile">
    <v-app-bar color="dark">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Sastra</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      :location="mobile ? 'right' : 'left'"
      color="dark"
      :rail="!drawer"
    >
      <v-list density="compact" nav>
        <v-list-item
        v-for="value in nav_list"
          :prepend-icon="value.icon"
          :title="value.name"
          :value="value.name"
          :to="value.target"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </section>

  <section v-if="mobile">
    <v-bottom-navigation mode="shift" bg-color="dark">
      <v-btn value="recent" v-for="item in nav_list" :to="item.target">
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.name }}</span>
      </v-btn>
    </v-bottom-navigation>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { nav_list } from "@/utils/constants";
const { mobile, mdAndUp } = useDisplay();

const drawer = ref(true);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>
