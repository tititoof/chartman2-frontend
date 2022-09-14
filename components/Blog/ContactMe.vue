<template>
  <v-sheet
    id="contact"
    dark
    tag="section"
    tile
    class="grey darken-4"
  >
    <v-container>
      <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center pt-12">
        Contactez moi
      </h2>

      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider class="mb-1" />

        <v-divider />
      </v-responsive>

      <v-theme-provider dark>
        <v-row>
          <v-col cols="12">
            <v-text-field
              flat
              label="Nom*"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              flat
              label="Email*"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              flat
              label="Sujet*"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              flat
              label="Message*"
            />
          </v-col>

          <v-col
            class="mx-auto"
            cols="auto"
          >
            <v-btn
              color="blue lighten-1"
              x-large
              dark
            >
              Envoyer
            </v-btn>
          </v-col>
        </v-row>
      </v-theme-provider>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ContactMe extends Vue {}
</script>
