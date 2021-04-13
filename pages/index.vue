<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>Make Friends on Discord!</v-card-title>
        <v-card-actions>
          <v-btn @click="login">Let's go!</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { onBeforeMount, useContext, useRouter } from '@nuxtjs/composition-api' 
export default {
  middleware: 'auth',
  auth: 'guest',
  setup(setup, context) {
        const { $auth } = useContext()
        
        function login() {
            $auth.loginWith('discord')
        }

        return { login }
    }
}
</script>
