<template>
  <v-img
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-img>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

  @Component
export default class BaseImage extends Vue {
}
</script>
