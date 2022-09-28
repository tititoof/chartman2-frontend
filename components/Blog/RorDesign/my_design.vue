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
        <v-card class="pt-12">
          <v-img
            src="/images/man_working.svg"
            height="50vh"
            contain
          />
        </v-card>
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
            <base-heading>Mon design</base-heading>
            <base-text>
              Après avoir lu pas mal d'articles de plein de personnes travaillant depuis des années sur RoR<br>
              Pour un développement classique,
              j'utilise le design suivant <br>
              <ul>
                <li>
                  Les <code>services</code> me servent à executer une tâche (création d'un article par exemple)
                </li>
                <li>
                  Les <code>procédures</code> vont executer plusieurs tâches à travers les services (la création d'un article puis effectuer le broadcast avec action cable)
                </li>
                <li>
                  les <code>namespace</code> pour faire les évolutions en douceur
                  <pre>
                    <code v-highlight class="language-ruby text-left blue-grey lighten-4 my-0 py-0">
Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
  namespace 'api' do
    namespace 'v1' do
      get '/article/:article_id', to: 'articles#show'
    end
    namespace 'v2' do
      get '/article/:article_id', to: 'articles#show'
    end
  end
end
                    </code>
                  </pre>
                  Ca donne des urls <code>/api/v1/article/1</code> et <code>/api/v2/article/1</code>
                  plutôt sympa non ? <v-icon color="orange">mdi-emoticon-cool</v-icon><br>
                </li>
                <li>
                  Les serializer avec la gem <a href="https://github.com/jsonapi-serializer/jsonapi-serializer">jsonapi-serializer</a>
                </li>
              </ul>
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
export default class MyDesign extends Vue {}
</script>
