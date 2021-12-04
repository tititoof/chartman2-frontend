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
                :items="categories"
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

const mainModule = namespace('MainStore')
const postStore = namespace('PostModule')
const categoryStore = namespace('CategoryModule')

@Component({
  components: { Editor }
})
export default class AdminArticleNew extends Vue {
  // Stores
  mainModule = getModule(MainStore, this.$store)
  categoryStore = getModule(CategoryModule, this.$store)
  postStore = getModule(PostModule, this.$store)
  // Stores actions
  @mainModule.Action('showSnackbar') showSnackbar: any
  @categoryStore.Action('findAll') findAllCategories: any
  @postStore.Action('create') createPost: any
  // Data
  background: string = '/backgrounds/business.svg'
  categories: Array<any> = []
  categoriesRules: Array<object> = [
    (v: any) => (v.length > 0) || 'Au moins 1 catégorie est requise'
  ]

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

  formValid: boolean = false
  minHeight: string = '200'
  maxHeight: string = '900'

  pathAdd!: string
  renderConfig: object = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  title: string = 'Nouvel article'
  titleRules: Array<object> = [
    (v: any) => !!v || 'Le nom est requis'
  ]

  mounted () {
    this.getListCategories()
  }

  back () {
    this.$router.back()
  }

  submitForm () {
    const _self = this
    _self.createPost(_self.form).then(() => {
      _self.showSnackbar('Article crée.')
      _self.$router.push('/admin/article')
    }).catch((reason: any) => {
      for (const error in reason.response.data) {
        this.formError[error] = reason.response.data[error]
      }
    })
  }

  async getListCategories () {
    return await this.findAllCategories().then((response: any) => {
      this.categories = response.data
    })
  }

  @Watch('form.title')
  onFormNameChange (val: string, oldVal: string) {
    if (val !== oldVal) {
      this.formError.title = []
    }
  }
}
</script>
