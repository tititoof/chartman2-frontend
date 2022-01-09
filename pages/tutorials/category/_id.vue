<template>
  <section>
    <client-only>
      <v-img
        :min-height="minHeight"
        :src="background"
        contain
      >
        <v-container class="fill-height px-4 py-3 justify-center overflow-y-auto">
          <v-responsive
            class="d-flex px-4 py-6"
            height="100%"
            max-width="1400"
            width="100%"
          >
            <v-row>
              <v-col cols="2">
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
              </v-col>
              <v-col cols="10" class="text-h4">
                {{ category }}
              </v-col>
            </v-row>
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
      redirect('/redirect', { previous_url: `/tutorials/category/${params.id}` })
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
  category: string = ''

  goToArticle (id: string) {
    this.$router.push('/tutorials/article/' + id)
  }

  goBack () {
    this.$router.push('/tutorials')
  }
}
</script>
