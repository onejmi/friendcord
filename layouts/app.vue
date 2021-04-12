<template>
  <v-app>
      <v-app-bar
      app
      elevation="0"
    >
      <v-spacer></v-spacer>
      <v-btn @click="logout()" color="warning">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
  setup() {
      const { $auth } = useContext()
      function logout() {
          $auth.logout()
      }

      return { logout }
  }
}
</script>
