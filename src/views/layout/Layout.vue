<template>
  <v-card
      height="100vh"
      flat
  >
    <v-navigation-drawer
        dark
        permanent
        floating
    >
      <v-list>
        <v-list-item
            v-for="page in pages"
            :key="page.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Layout",
  data: () => ({
    pages: [
      {title: "Home", icon: "mdi-home"}
    ]
  })
}
</script>

<style scoped>

</style>