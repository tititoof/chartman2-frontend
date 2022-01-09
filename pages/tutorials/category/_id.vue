<template>
  <section>
    <client-only>
      <v-img
        :min-height="minHeight"
        :max-height="maxHeight"
        :src="background"
        contain
      >
        <v-container class="fill-height px-4 py-3 justify-center">
          <v-responsive
            class="d-flex px-4 py-12 overflow-y-auto"
            height="100%"
            max-width="1400"
            width="100%"
          >
            <div class="text-h4 py-3">
              <v-btn
                class="mx-2 float-left"
                small
                fab
                dark
                color="indigo"
                @click.prevent="goBack"
              >
                <v-icon
                  dark
                >
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              {{ category }}
            </div>
            <v-row>
              <template v-for="(article, index) in articles">
                <v-col
                  :key="index"
                  class="mx-1"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      max-width="344"
                      max-height="200"
                      :elevation="hover ? 12 : 2"
                      :class="{ 'on-hover': hover }"
                      class="mx-auto"
                      color="primary"
                      dark
                      @click="goToArticle(article.id)"
                    >
                      <v-card-title>
                        <v-icon
                          medium
                          left
                        >
                          mdi-book-open
                        </v-icon>
                        {{ article.attributes.title }}
                      </v-card-title>
                      <v-subheader>
                        {{ article.attributes.description | truncate(150, '...') }}
                      </v-subheader>
                    </v-card>
                  </v-hover>
                </v-col>
              </template>
            </v-row>
          </v-responsive>
        </v-container>
      </v-img>
    </client-only>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { PostType } from '~/types/index'

@Component({
  async asyncData ({ $api, params, redirect }) {
    try {
      const responseCategory = await $api.articles.category(params.id)
      const category = responseCategory.data.attributes.name

      const response = await $api.articles.fromCategory(params.id)
      const articles = response.data

      return { articles, category }
    } catch (e) {
      redirect('/')
    }
  },
  head (this: Id) {
    return {
      title: this.category,
      meta: [
        {
          property: 'og:title',
          content: this.category,
          hid: 'og:title'
        },
        {
          property: 'og:description',
          content: this.category,
          hid: 'og:description'
        }
      ]
    }
  }
})
export default class Id extends Vue {
  articles: Array<PostType> = []
  background: string = '/backgrounds/library.svg'
  minHeight: string = '200'
  maxHeight: string = '700'
  category: string = ''

  goToArticle (id: string) {
    this.$router.push('/tutorials/article/' + id)
  }

  goBack () {
    this.$router.push('/tutorials')
  }
}
</script>
