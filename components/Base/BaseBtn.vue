<template>
  <v-btn
    :color="color"
    :depressed="depressed"
    :min-width="minWidth"
    :tile="tile"
    class="font-weight-bold"
    x-large
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseBtn extends Vue {
  @Prop() color: string = 'primary'
  @Prop() depressed: boolean = true
  @Prop() minWidth: number = 164
  @Prop() tile: boolean = true
}
</script>
