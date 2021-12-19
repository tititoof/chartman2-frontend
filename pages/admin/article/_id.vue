<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
      contain
    >
      <v-container class="fill-height px-4 py-12 justify-center">
        <v-responsive
          class="d-flex px-4 py-12"
          height="100%"
          max-width="1400"
          width="100%"
        >
          <div class="text-h4">
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
            {{ title }}
            <v-btn
              id="submit_button"
              class="mx-2 float-right"
              small
              fab
              :disabled="!formValid"
              color="success"
              @click.prevent="submitForm"
            >
              <v-icon
                dark
              >
                mdi-check
              </v-icon>
            </v-btn>
          </div>
          <p class="text-justify py-12">
            <v-form v-model="formValid">
              <v-text-field
                v-model="form.title"
                label="Nom"
                :rules="[rules.required]"
                :error-count="formError.title.length"
                :error-messages="formError.title"
                required
                @keyup="onFormNameChange"
              />
              <v-text-field
                v-model="form.description"
                label="Description"
                :rules="[rules.required]"
                :error-count="formError.description.length"
                :error-messages="formError.description"
                required
                @keyup="onFormNameChange"
              />
              <v-autocomplete
                ref="customers"
                v-model="form.categories"
                :items="categories"
                label="Catégorie(s)"
                placeholder="Sélection d'une ou des catégories"
                item-text="attributes.name"
                :rules="[rules.categories]"
                :error-count="formError.categories.length"
                :error-messages="formError.categories"
                item-value="id"
                multiple
                required
              />
              <div
                class="overflow-y-auto"
                style="max-height: 450px"
              >
                Texte
                <Editor
                  ref="editor"
                  v-model="form.content"
                  mode="preview"
                  hint="Hint"
                  :rules="[rules.required]"
                  :error-count="formError.content.length"
                  :error-messages="formError.content"
                  :outline="false"
                  :render-config="renderConfig"
                />
              </div>
            </v-form>
          </p>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script lang="ts">
import { Vue, Component, namespace, getModule, Watch } from 'nuxt-property-decorator'
import { Editor } from 'vuetify-markdown-editor'
import MainStore from '~/store/MainStore'
import { CategoryType, PostDefault, PostFormDefault, PostFormType, PostType } from '~/types'

const mainModule = namespace('MainStore')

@Component({
  async asyncData({ $api, params }) {
    const responseCategories = await $api.categories.findAll()
    const categories = responseCategories.data

    const responseArticle = await $api.posts.find(params.id)
    const article = responseArticle.data
    
    return { article, categories }
  },
  middleware: ['auth'],
  components: { Editor }
})
export default class AdminArticleId extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  // Data
  background: string = '/backgrounds/business.svg'
  article: PostType = PostDefault
  form: PostFormType = PostFormDefault
  categories: Array<CategoryType> = []
  minHeight: string = '200'
  maxHeight: string = '900'
  formValid: boolean = false
  title: string = ''
  rules: Object = {
    required: (value: any) => !!value || 'Requis.',
    categories: (v: any) => (v.length > 0) || 'Au moins 1 catégorie est requise'
  }

  formError: any = {
    title: [],
    description: [],
    categories: [],
    content: []
  }

  renderConfig: any = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  mounted() {
    this.initialize()
  }

  goBack() {
    this.$router.back()
  }

  initialize() {
    const attributes = this.article.attributes
    const relationships = this.article.relationships
    this.title = 'Edition de l\'article ' + attributes.title
  
    this.form.categories = []
    this.form.title = attributes.title
    this.form.description = attributes.description
    this.form.content = attributes.content

    for (const category in relationships.categories.data) {
      this.form.categories.push(relationships.categories.data[category].id)
    }
  }

  submitForm() {
    try {
      this.$api.posts.update(this.$route.params.id, this.form)
      this.showSnackbar('L\'article est sauvegardé')
      this.goBack()
    } catch(e) {
      this.showSnackbar('Impossible de mettre à jour l\'article.')
    }
  }

  // Watch form title changes
  @Watch('form.title')
  onFormNameChange(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.formError.title = []
    }
  }
}
</script>
