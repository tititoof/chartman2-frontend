<template>
  <section id="stats">
    <v-parallax
      :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
      src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    >
      <v-container fill-height>
        <v-row class="mx-auto">
          <v-col
            v-for="{ value, title, url } of stats"
            :key="title"
            cols="12"
            md="3"
            class="text-center"
          >
            <div
              class="display-3 font-weight-black mb-4"
            >
              {{ value }}
              <v-icon color="yellow">mdi-star</v-icon>
            </div>

            <v-btn color="white" :href="url" outlined large target="_blank">
              <span class="white--text text--darken-1 font-weight-bold">
                {{ title }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { StatInterface } from '~/types'

@Component
export default class Infos extends Vue {
  get stats (): Array<StatInterface> {
    return [
      {
        value: '199k+',
        title: 'VueJS',
        url: 'https://github.com/vuejs/vue'
      },
      {
        value: '41k+',
        title: 'NuxtJS',
        url: 'https://github.com/nuxt/nuxt.js/'
      },
      {
        value: '19k+',
        title: 'Ruby',
        url: 'https://github.com/ruby/ruby'
      },
      {
        value: '51k+',
        title: 'Ruby on Rails',
        url: 'https://github.com/rails/rails'
      }
    ]
  }
}
</script>
