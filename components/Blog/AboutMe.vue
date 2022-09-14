<template>
  <v-container id="about-me" class="text-center py-12">
    <h2 class="display-2 font-weight-bold mb-3">
      A propos de moi
    </h2>

    <v-responsive class="mx-auto mb-8" width="56">
      <v-divider class="mb-1" />

      <v-divider />
    </v-responsive>

    <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
      Bonjour ! <br>
      Je m'appelle Christophe Hartmann,<br>
      Je suis passionné de judo et d'informatique depuis tout petit,
      curieux de nature, j'adore découvrir et apprendre.<br>
      Je suis tombé amoureux de Ruby à travers son framework
      <a
        href="#"
        class="text-decoration-none blue--text text--darken-1"
        @click="$vuetify.goTo('#features')"
      >
        Ruby on Rails
      </a>
      <br>
      Ce langage me sert pour gérer les données (backend).
      Côté utilisateur (frontend), VueJS avec le framework
      <a
        href="#"
        class="text-decoration-none blue--text text--darken-1"
        @click="$vuetify.goTo('#features')"
      >
        NuxtJS
      </a> (simple rapide et efficace) m'a redonné le goût du
      JavaScript.<br>
      Pour être autonome ainsi que de comprendre le
      <a
        href="#"
        class="text-decoration-none blue--text text--darken-1"
        @click="$vuetify.goTo('#features')"
      >
        CI / CD
      </a>,
      j'ai mis en place le mien avec Gitea, Jenkins, SonarQube et Openproject.<br>
      Devenu professeur de judo, j'applique ce que m'ont transmis mes senseïs
      dans mon travail et mes cours de Judo.
      Une question ? envoyez moi un message
      <a
        href="#"
        class="text-decoration-none blue--text text--darken-1"
        @click="$vuetify.goTo('#contact')"
      >
        message
      </a>
    </v-responsive>

    <v-avatar class="elevation-12 mb-12" size="128">
      <v-img src="/images/head.png" />
    </v-avatar>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class AboutMe extends Vue {}
</script>
