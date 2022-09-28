<template>
  <component
    :is="tag"
    class="display-1 v-heading mb-3 font-weight-light"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BaseSubheading extends Vue {
  tag: string = 'h1'
}
</script>
