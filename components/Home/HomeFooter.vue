<template>
  <v-footer
    id="home-footer"
    color="grey darken-4"
    dark
    min-height="72"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex flex-wrap justify-md-start justify-center justify-md-none">
            <template v-for="(s, i) in social">
              <a
                :key="i"
                class="white--text pa-1 pa-md-0"
                :href="s.route"
                target="_blank"
                v-text="s.name"
              />

              <v-responsive
                v-if="i < social.length - 1"
                :key="`divider-${s}`"
                class="mx-4 shrink hidden-sm-and-down"
                max-height="24"
              >
                <v-divider vertical />
              </v-responsive>
            </template>
          </div>
        </v-col>

        <v-col
          class="text-center text-md-right"
          cols="12"
          md="6"
        >
          Created with NuxtJS and Vuetify
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class HomeFooter extends Vue {
  get social (): Array<object> {
    return [
      { name: 'Facebook', route: 'https://www.facebook.com/christophe.hartmann1/' },
      { name: 'Linkedin', route: 'https://www.linkedin.com/in/christophe-hartmann-3a297a42/' }
    ]
  }
}
</script>

<style lang="sass">
  #home-footer a
    text-decoration: none
</style>
