<template>
  <v-app-bar color="dark">
    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    <v-toolbar-title>Sastra</v-toolbar-title>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="mobile ? 'right' : undefined"
    temporary
  >
    <!-- <v-list :items="nav_list"></v-list> -->
    <v-list>
      <v-tooltip
        :disabled="!mobile"
        v-for="(item, index) in nav_list"
        :key="index"
        right
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :to="item.target" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span>{{ item.name }}</span>
      </v-tooltip>
      <v-divider />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { nav_list } from "@/utils/constants";
const { mobile, mdAndUp } = useDisplay();

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>
