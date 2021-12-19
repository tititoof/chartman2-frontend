<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
      contain
    >
      <v-container class="fill-height px-4 py-3 justify-center overflow-y-auto">
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
            {{ article.attributes.title }}
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
  </section>
</template>
<script lang="ts">
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import { Editor } from 'vuetify-markdown-editor'
import MainStore from '~/store/MainStore'
import { PostDefault, PostType } from '~/types'

const mainModule = namespace('MainStore')

@Component({
  async asyncData({ $api, params }) {
    const response = await $api.articles.find(params.id)
    const article = response.data
    
    return { article }
  },
  components: { Editor }
})
export default class TutorialsArticle extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  background: string = '/backgrounds/background.svg'
  article: PostType = PostDefault
  minHeight: string = '200'
  maxHeight: string = '700'
  renderConfig: object = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  goBack() {
    this.$router.back()
  }
}
</script>
