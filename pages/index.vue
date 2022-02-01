<template>
  <div>
    <Presentation />
    <Skills />
    <BlogInformation />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Presentation from '~/components/Blog/Presentation.vue'
import Skills from '~/components/Blog/Skills.vue'
import BlogInformation from '~/components/Blog/BlogInformation.vue'

@Component({
  components: {
    Presentation, Skills, BlogInformation
  }
})
export default class Index extends Vue {
}
</script>

<style lang="sass">
  .extra-padding
    padding-bottom: 96px !important
    padding-top: 96px !important

    @media screen and (max-width: 959px)
      padding-top: 48px !important
      padding-bottom: 48px !important

  .base-divider .v-divider
    border-width: 3px 0 0 0 !important

  .base-divider.base-divider--dense .v-divider
    border-width: 2px 0 0 0 !important
</style>
