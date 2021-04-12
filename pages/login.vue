<template>
  <v-row justify="center" align="center">
  </v-row>
</template>

<script>
import { onBeforeMount, useContext, useRouter } from '@nuxtjs/composition-api' 
 
export default {
  setup(setup, context) {
        const { $auth } = useContext()
        //todo send info to server
        console.log($auth.user)
    }
}
</script>
