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
            class="d-flex px-4 py-12"
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
              {{ article.attributes.title }}
            </div>
            <div class="subtitle-1">
              publié le {{ $dayjs(article.attributes.published_at).format('D MMMM YYYY') }}
            </div>
            <v-divider />
            <v-responsive
              class="overflow-y-auto"
              height="100%"
            >
              <Editor
                ref="editor"
                v-model="article.attributes.content"
                mode="viewer"
                hint="Hint"
                :outline="false"
                :render-config="renderConfig"
              />
            </v-responsive>
          </v-responsive>
        </v-container>
      </v-img>
    </client-only>
  </section>
</template>
<script lang="ts">
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import { Editor } from 'vuetify-markdown-editor'
import MainStore from '~/store/MainStore'
import { PostDefault, PostType } from '~/types'

const mainModule = namespace('MainStore')

@Component({
  async asyncData ({ $api, params, redirect }) {
    try {
      const response = await $api.articles.find(params.id)
      const article = response.data

      return { article }
    } catch (e) {
      redirect('/redirect', { previous_url: `/tutorials/article/${params.id}` })
    }
  },
  head (this: Id) {
    return {
      title: this.article.attributes.title,
      meta: [
        {
          property: 'og:title',
          content: this.article.attributes.title,
          hid: 'og:title'
        },
        {
          property: 'og:description',
          content: this.article.attributes.description,
          hid: 'og:description'
        }
      ]
    }
  },
  components: { Editor }
})
export default class Id extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  background: string = '/backgrounds/background.svg'
  article: PostType = PostDefault
  minHeight: string = '200'

  renderConfig: object = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  get publishedAt () {
    return new Date(this.article.attributes.published_at)
  }

  goBack () {
    this.$router.back()
  }
}
</script>
