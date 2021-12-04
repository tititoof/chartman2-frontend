/* eslint-disable vue/no-v-html */
<template>
  <div class="pt-2 mb-0 d-flex">
    <v-avatar
      class="base-avatar d-inline-flex mb-3"
      :color="avatarColor"
      :size="iconHeight"
    >
      <v-icon
        v-if="typeIconImage == 'icon'"
        large
        dark
        :color="iconColor"
      >
        {{ icon }}
      </v-icon>
      <base-image
        v-else
        :src="image"
        contain
        max-width="36"
        max-height="36"
        width="100%"
      />
    </v-avatar>
    <div
      :class="textContentClass"
    >
      <div
        :class="textClass"
        v-html="text"
      />
      <div
        v-if="content !== ''"
        class="grey--text font-italic caption"

        v-html="content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import BaseAvatar from '~/components/Base/BaseAvatar.vue'

@Component({
  components: { BaseAvatar }
})
export default class BaseInformation extends Vue {
    @Prop({ default: '' }) readonly avatarColorProp!: String
    @Prop({ default: 'icon' }) readonly typeProp!: String
    @Prop({ default: 'mdi-cursor-default-outline' }) readonly iconProp!: String
    @Prop({ default: '' }) readonly iconColorProp!: String
    @Prop({ default: 72 }) readonly iconHeightProp!: Number
    @Prop({ default: 'images/gitea.png' }) readonly imageProp!: String
    @Prop({ default: 'Default text' }) readonly textProp!: String
    @Prop({ default: '' }) readonly textContentClassProp!: String
    @Prop({ default: '' }) readonly contentProp!: String

    @Prop({ default: 'base-body text-body-1 mx-auto text--lighten-1 text-left' }) readonly textClassProp!: String

    get avatarColor () {
      return this.avatarColorProp
    }

    get typeIconImage () {
      return this.typeProp
    }

    get icon () {
      return this.iconProp
    }

    get iconColor () {
      return this.iconColorProp
    }

    get iconHeight () {
      return this.iconHeightProp + 'px'
    }

    get image () {
      return this.imageProp
    }

    get text () {
      return this.textProp
    }

    get textContentClass () {
      return this.textContentClassProp
    }

    get content () {
      return this.contentProp
    }

    get textClass () {
      return this.textClassProp
    }
}
</script>
