<template>
  <v-main>
    <div class="d-flex text-h1 justify-center">
      Design pattern
    </div>
    <div class="d-flex text-subtitle-1 justify-center pt-2">
      Créé le 30 Septembre 2022
    </div>

    <introduction />

    <rordesign />

    <my-design />

    <example />

    <conclusion />
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Introduction from '~/components/Blog/RorDesign/Introduction.vue'
import Rordesign from '~/components/Blog/RorDesign/ror_design.vue'
import MyDesign from '~/components/Blog/RorDesign/my_design.vue'
import Example from '~/components/Blog/RorDesign/example.vue'
import Conclusion from '~/components/Blog/RorDesign/conclusion.vue'

@Component({
  components: { Introduction, Rordesign, MyDesign, Example, Conclusion },
  head () {
    return {
      title: 'Ruby on Rails - Design pattern',
      meta: [
        {
          property: 'og:title',
          content: 'Ruby on Rails - Design pattern',
          hid: 'og:title'
        },
        {
          property: 'og:description',
          content: 'Le design pattern que j\'utilise avec le framework Ruby on Rails. service, procedure, serializer et namespace.',
          hid: 'og:description'
        },
        {
          hid: 'og:keywords',
          name: 'og:keywords',
          content:
            'Ruby, Ruby on Rails, Design Patterns, service, serializer, procedure, namespace'
        }
      ]
    }
  }
})
export default class myRorDesign extends Vue {
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
