<template>
  <section
    id="my-design"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          src="/images/ruby.svg"
          height="50vh"
          contain
        />
      </v-col>
      <v-col
        class="align-content-space-between layout wrap"
        cols="12"
        md="6"
      >
        <v-img
          class="grow hidden-sm-and-down"
          contain
          max-height="200"
          width="100%"
          position="top right"
          style="transform: rotate(180deg) translateY(25%)"
          src="/images/bubbles2.png"
        />

        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="11"
            class="pr-2"
          >
            <base-heading>Conclusion</base-heading>
            <base-text>
              Voili voilou,<br>
              C'est tout pour mon premier article,<br>
              J'espère que ça vous a plu,<br>
              La prochaine fois, on regardera le côté frontend avec VueJS & NuxtJS.<br>
              <br>
            </base-text>
          </v-col>
        </v-row>

        <v-img
          class="grow hidden-sm-and-down"
          contain
          max-height="200"
          width="100%"
          position="bottom left"
          src="/v.png"
          style="transform: rotate(180deg) translate(-200px, -15%)"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Conclusion extends Vue {}
</script>
