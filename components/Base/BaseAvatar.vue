<template>
  <div
    :class="classes"
    class="base-avatar d-inline-flex"
  >
    <v-avatar
      v-if="outlined"
      :color="color || 'grey lighten-3'"
      :size="outlineSize"
      :style="styles"
      class="base-avatar__outline"
      style="opacity: .4"
    />

    <v-avatar
      :color="color || 'white'"
      :size="size"
      class="base-avatar__avatar"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <base-icon
        v-if="icon"
        :dark="dark"
        :size="size / 2"
      >
        {{ icon }}
      </base-icon>
    </v-avatar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import BaseIcon from '~/components/Base/BaseIcon.vue'

@Component({
  components: {
    BaseIcon
  }
})
export default class BaseAvatar extends Vue {
  @Prop() readonly color!: string
  @Prop() readonly dark!: boolean
  @Prop() readonly icon!: string
  @Prop() readonly outlined!: boolean
  @Prop({ default: 56 }) readonly size!: number

  multiply: number = 6

  get classes () {
    return [
      this.outlined && 'base-avatar--outlined'
    ]
  }

  get outlineSize () {
    return this.size + (this.size / this.multiply)
  }

  get styles () {
    const margin = this.size / (this.multiply * 2)

    return {
      // Aligns the outline content with the content
      margin: `-${margin}px 0 0 -${margin}px`
    }
  }
}
</script>

<style lang="sass">
  .base-avatar
    border-radius: 50%
    position: relative
    overflow: visible

    &__outline
      position: absolute !important
      left: 0
      top: 0

    &--outlined
      background-color: #FFFFFF

      .base-avatar__avatar
        border: thin solid rgba(0, 0, 0, .12) !important
</style>
