<template>
  <section
    id="ror-design"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col
        class="primary text-center pa-5 white--text"
        cols="12"
        md="6"
      >
        <base-heading>
          Structure projet RoR
        </base-heading>

        <base-text class="mb-5 text-left">
          Dans un premier temps,
          regardons la structure d'un projet Ruby on Rails<br>
          On créé un nouveau projet RoR :
          <code>
            rails new rails01 --api --database=postgresql
          </code><br>
          Dans le répertoire <code>app</code>, on retrouve les répertoires :
          <ul>
            <li>
              models, pour les modèles (M)
            </li>
            <li>
              views, pour les vues (V)
            </li>
            <li>
              controllers, pour les contrôleurs (C)
            </li>
          </ul>
          De plus le fichier config/routes.rb permet de gérer les ... routes (les points d'entrées de l'application).<br>
          Exemple :<br>
          <code>config/routes.rb</code>
          <pre>
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 py-0">
get '/article/:article_id', to: 'articles#show'
            </code>
          </pre>
          <code>app/controllers/articles_controller.rb</code>
          <pre>
            <code v-highlight class="language-ruby blue-grey darken-1 light my-0 text-left py-0">
class ArticlesController &lt; ApplicationController
  # show an article
  def show
    article = Articles::FindService.call(articles_params[:article_id])

    render_json ArticleSerializer.new(article)
  end

  private

  # params permitted
  def articles_params
    params.permit(:article_id)
  end
end
            </code>
          </pre>
          Lorsque l'on va appeler la route <code>/article/1</code><br>
          RoR va appeler la méthode show du contrôleur <code>ArticlesController</code><br>
          Pour aller plus loin dans l'architecture de Ruby on rails
          <a class="white--text" href="https://adrianmejia.com/ruby-on-rails-architectural-design/">Adrian Mejia Logo</a><br>
        </base-text>
      </v-col>

      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          class="grow hidden-sm-and-down"
          contain
          height="50vh"
          src="/images/ror.svg"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class RorDesign extends Vue {}
</script>
