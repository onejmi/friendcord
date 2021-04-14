<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>Welcome to the Dashboard</v-card-title>
        <v-card-actions>
          <v-btn @click="sayHi">Let's go!</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { onBeforeMount, useContext, useAsync } from '@nuxtjs/composition-api' 
export default {
  layout: 'app',
  middleware: 'logged',
  setup(setup, context) {
        const { $auth } = useContext()

        function sayHi() {
            console.log($auth.user)
        }

        return { sayHi }
    }
}
</script>
