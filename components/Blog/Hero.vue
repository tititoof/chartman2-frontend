<template>
  <v-card id="hero" color="blue lighten-1">
    <v-row no-gutters>
      <v-img :min-height="imgHeight" src="/backgrounds/hero-2.svg" contain>
        <v-theme-provider dark>
          <v-container fill-height>
            <v-row align="center" class="mx-auto" justify="center">
              <v-col class="black--text text-center" cols="12" tag="h1">
                <span
                  :class="[
                    $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                  ]"
                  class="font-weight-light pb-4"
                >
                  Bienvenu sur
                </span>

                <span
                  :class="[
                    $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4',
                  ]"
                  class="font-weight-black"
                >
                  chartman2.fr
                </span>
              </v-col>

              <v-btn
                class="align-self-end"
                fab
                outlined
                color="blue"
                @click="$vuetify.goTo('#about-me')"
              >
                <v-icon>mdi-chevron-double-down</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-theme-provider>
      </v-img>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Hero extends Vue {
  get imgHeight (): string {
    return this.$vuetify.breakpoint.smAndDown ? '70vh' : '100vh'
  }
}
</script>
