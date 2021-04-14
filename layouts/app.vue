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
import { useContext, useRouter } from '@nuxtjs/composition-api'
export default {
  middleware: 'auth',
  setup() {
      const { $auth, $cookies } = useContext()
      const router = useRouter()
      function logout() {
          $cookies.set('authLogged', false, { path: '/app'})
          $auth.logout()
          router.replace('/')
      }

      return { logout }
  }
}
</script>
