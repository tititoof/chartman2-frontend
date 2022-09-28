<template>
  <section id="articles">
    <div class="py-12" />

    <v-container>
      <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">
        Articles
      </h2>

      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider class="mb-1" />

        <v-divider />
      </v-responsive>

      <v-row>
        <v-col
          v-for="({ src, text, title, link }, i) in articles"
          :key="i"
          cols="12"
          md="4"
        >
          <v-img
            :src="src"
            class="mb-4"
            height="275"
            max-width="100%"
          />

          <h3
            class="font-weight-black mb-4 text-uppercase"
            v-text="title"
          />

          <div
            class="title font-weight-light mb-5"
            v-text="text"
          />
          <div class="d-flex justify-center">
            <v-btn
              class="ml-n4 font-weight-black blue"
              :nuxt="true"
              :to="link"
              dark
              text
            >
              Lire
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="py-12" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Articles extends Vue {
  articles: Array<any> = [
    {
      src: '/images/ror.svg',
      title: 'Design pattern',
      text: 'Mon design pattern utilisé au quotidien',
      link: '/blog/my_ror_design'
    }
  ]
}
</script>
