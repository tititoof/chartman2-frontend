<template>
  <component
    :is="tag"
    class="display-3 v-heading mb-3 font-weight-light"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BaseHeading extends Vue {
  tag: string = 'h1'
}
</script>

<style lang="sass">
  .v-heading
    letter-spacing: 3px !important
</style>
