<template>
  <section
    id="welcome"
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
        :pa-5="$vuetify.breakpoint.smAndDown"
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
            <base-heading>Hello !</base-heading>
            <base-text>
              Pour mon premier article, je vais vous parler
              de la façon dont je travaille avec Ruby on Rails.<br>
              Ruby on Rails (RoR) est un
              framework web basé sur ... Ruby. <br>
              (Ruby => Ruby on Rails)<br>
              Il utilise l'architecture MVC (Modèle-vue-contrôleur).<br>
              Pour plus d'informations sur le MVC n'hésitez pas à visiter les sites
              <a href="https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur">Wikipédia</a> et
              <a href="https://rosedienglab.defarsci.org/a-quoi-sert-une-architecture-mvc-son-fonctionnement/">Rose Dieng Lab</a><br>
              Ruby est un langage de programmation que j'affectionne pour sa synaxe, son élégance (<a href="https://www.ruby-lang.org/fr/">Ruby lang</a>)<br>
              En fonction du besoin, on peut utiliser plusieurs <a href="https://refactoring.guru/fr/design-patterns/ruby">design patterns</a> avec Ruby on Rails<br>
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
export default class Introduction extends Vue {
}
</script>
