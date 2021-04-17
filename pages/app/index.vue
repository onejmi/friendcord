<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1 v-if="loading">LOADING</h1>
      <v-card v-else>
        <v-card-title>Welcome to the Dashboard</v-card-title>
        <v-card-actions>
          <v-btn @click="sayHi">Let's go!</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { onBeforeMount, useContext, useAsync, ref} from '@nuxtjs/composition-api' 

export default {
  layout: 'app',
  middleware: 'logged',
  setup(setup, context) {
        const { $auth, $axios, store } = useContext()
        const loading = ref(false)
        const user = $auth.user

        if(store.state.loadingPrefs) {
          loading.value = true
          $axios.$post('/api/v1/auth/login', {
            id: user.id,
            email: user.email,
            a_token: $auth.strategy.token.get(),
            r_token: $auth.strategy.refreshToken.get()
          }).then((r) => {
            store.commit('invert')
            loading.value = false 
            }
          )
        }

        function sayHi() {
            console.log($auth.user)
        }

        return { sayHi, loading }
    }
}
</script>
