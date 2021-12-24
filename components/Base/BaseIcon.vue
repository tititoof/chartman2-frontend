<template>
  <v-icon :size="size" v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-icon>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseIcon extends Vue {
  @Prop({ default: 56 }) readonly size!: number
}
</script>
