<template>
  <section>
    <blog-hero />
    <blog-about-me />
    <blog-skill />
    <blog-infos />
    <blog-contact-me />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Presentation from '~/components/Blog/Presentation.vue'
import Skills from '~/components/Blog/Skills.vue'
import BlogInformation from '~/components/Blog/BlogInformation.vue'
import BlogHero from '~/components/Blog/Hero.vue'
import BlogAboutMe from '~/components/Blog/AboutMe.vue'
import BlogSkill from '~/components/Blog/Skill.vue'
import BlogInfos from '~/components/Blog/Infos.vue'
import BlogContactMe from '~/components/Blog/ContactMe.vue'

@Component({
  components: {
    Presentation, Skills, BlogInformation, BlogHero, BlogAboutMe, BlogSkill, BlogInfos, BlogContactMe
  }
})
export default class Index extends Vue {
}
</script>

<!-- <style lang="sass">
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
</style> -->
