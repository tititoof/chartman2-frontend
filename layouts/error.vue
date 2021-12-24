<template>
  <v-app dark>
    <h1 v-if="error === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Error extends Vue {
  @Prop({ default: 404 }) readonly error!: number

  layout: string = 'empty'
  pageNotFound: string = '404 Not Found'
  otherError: string = 'An error occurred'

  head () {
    return { title: this.error === 404 ? this.pageNotFound : this.otherError }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
