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
              @click.prevent="back"
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
                :rules="titleRules"
                :error-count="formError.title.length"
                :error-messages="formError.title"
                required
                @keyup="onFormNameChange"
              />
              <v-text-field
                v-model="form.description"
                label="Description"
                :rules="titleRules"
                :error-count="formError.description.length"
                :error-messages="formError.description"
                required
                @keyup="onFormNameChange"
              />
              <v-autocomplete
                ref="customers"
                v-model="form.categories"
                :items="listCategories"
                label="Catégorie(s)"
                placeholder="Sélection d'une ou des catégories"
                item-text="attributes.name"
                :rules="categoriesRules"
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
                  :rules="titleRules"
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
import PostModule from '~/store/PostModule'
import CategoryModule from '~/store/CategoryModule'

const categoryStore = namespace('CategoryModule')
const mainModule = namespace('MainStore')
const postStore = namespace('PostModule')

@Component({
  components: { Editor }
})
export default class AdminArticleId extends Vue {
  categoryStore = getModule(CategoryModule, this.$store)
  @categoryStore.Action('findAll') findAllCategories: any

  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  postStore = getModule(PostModule, this.$store)
  @postStore.Action('find') findPost: any
  @postStore.Action('update') putPost: any
  // Data
  background: string = '/backgrounds/business.svg'
  categoriesRules: Array<object> = [
    (v: any) => (v.length > 0) || 'Au moins 1 catégorie est requise'
  ]

  formValid: boolean = false
  form: any = {
    title: '',
    description: '',
    categories: [],
    content: ''
  }

  formError: any = {
    title: [],
    description: [],
    categories: [],
    content: []
  }

  listCategories: Array<any> = []
  minHeight: string = '200'
  maxHeight: string = '900'
  pathAdd!: string
  title: string = 'Edition de l\'article '
  titleRules: Array<object> = [
    (v: any) => !!v || 'Le nom est requis'
  ]

  renderConfig: any = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  mounted () {
    this.getListCategories()
    this.getPost()
  }

  submitForm () {
    const _self = this
    _self.putPost(_self.$route.params.id, _self.form)
      .then(() => {
        _self.showSnackbar('Article crée.')
        _self.$router.push('/admin/article')
      }).catch((reason: any) => {
        for (const error in reason.response.data) {
          this.formError[error] = reason.response.data[error]
        }
      })
  }

  back () {
    this.$router.back()
  }

  async getListCategories () {
    const _self = this
    await this.findAllCategories().then((response: any) => {
      _self.listCategories = response.data
    })
  }

  async getPost () {
    const _self = this
    await this.findPost(this.$route.params.id).then((response: any) => {
      _self.title += ' "' + response.data.attributes.title + '"'
      _self.form.title = response.data.attributes.title
      _self.form.description = response.data.attributes.description
      _self.form.content = response.data.attributes.content
      for (const category in response.data.relationships.categories.data) {
        _self.form.categories.push(response.data.relationships.categories.data[category].id)
      }
    })
  }

  // Watch form title changes
  @Watch('form.title')
  onFormNameChange (val: string, oldVal: string) {
    if (val !== oldVal) {
      this.formError.title = []
    }
  }
}
</script>
