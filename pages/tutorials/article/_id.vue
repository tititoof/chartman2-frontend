<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
    >
      <v-container class="fill-height px-4 py-12 justify-center">
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
              @click.prevent="back"
            >
              <v-icon
                dark
              >
                mdi-chevron-left
              </v-icon>
            </v-btn>
            {{ title }}
          </div>
          <v-divider />
          <v-responsive
            class="overflow-y-auto"
            height="100%"
          >
            <Editor
              ref="editor"
              v-model="content"
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
import VisitorModule from '~/store/VisitorModule'

const mainModule = namespace('MainStore')
const visitorStore = namespace('VisitorModule')

@Component({
  async asyncData({ $api, params }) {
    const response = await $api.articles.find(params.id)
    const article = response.data
    
    return { article }
  },
  components: { Editor }
})
export default class TutorialsArticle extends Vue {
  // Stores
  mainModule = getModule(MainStore, this.$store)
  visitorStore = getModule(VisitorModule, this.$store)
  // Stores actions
  @mainModule.Action('showSnackbar') showSnackbar: any
  @visitorStore.Action('findArticle') findArticle: any
  // Data
  background: string = '/backgrounds/background.svg'
  categories: Array<object> = []
  content: string = ''
  description: string = ''
  minHeight: string = '200'
  maxHeight: string = '700'
  title: string = ''
  renderConfig: object = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  back () {
    this.$router.push('/tutorials')
  }

  mounted () {
    this.getArticle()
  }

  async getArticle () {
    const _self = this
    await _self.findArticle(_self.$route.params.id)
      .then((response: any) => {
        _self.title = response.data.attributes.title
        _self.description = response.data.attributes.description
        _self.content = response.data.attributes.content
        for (const category in response.data.relationships.categories.data) {
          _self.categories.push(response.data.relationships.categories.data[category].id)
        }
      })
      .catch(() => {
        _self.showSnackbar('Impossible de récupérer l\'article.')
        _self.back()
      })
  }
}
</script>
