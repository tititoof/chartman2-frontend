<template>
  <p
    class="title font-weight-light"
    style="line-height: 1.7 !important;"
  >
    <slot />
  </p>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BaseText extends Vue {
  tag: string = 'h1'
}
</script>
