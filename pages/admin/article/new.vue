<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
      contain
    >
      <v-container class="fill-height px-4 py-3 justify-center">
        <v-responsive
          class="d-flex px-4 py-6"
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
            <v-form ref="newArticleForm" v-model="formValid">
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
import { Vue, Component, namespace, getModule, Watch, Ref } from 'nuxt-property-decorator'
import { Editor } from 'vuetify-markdown-editor'
import MainStore from '~/store/MainStore'
import { CategoryType, PostFormDefault, PostFormErrorDefault, PostFormErrorType, PostFormType, VForm } from '~/types'
import { insertErrors } from '~/utils/error'

const mainModule = namespace('MainStore')

@Component({
  async asyncData ({ $api }) {
    localStorage.setItem('current-route', '/admin/article/new')

    const responseCategories = await $api.categories.findAll()
    const categories = responseCategories.data

    return { categories }
  },
  middleware: ['auth'],
  components: { Editor }
})
export default class New extends Vue {
  // Stores
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any
  // Ref
  @Ref('newArticleForm') readonly newArticleForm!: VForm
  // Data
  background: string = '/backgrounds/business.svg'
  categories: Array<CategoryType> = []
  form: PostFormType = PostFormDefault
  formError: PostFormErrorType = PostFormErrorDefault
  formValid: boolean = false
  minHeight: string = '200'
  maxHeight: string = '900'
  title: string = 'Nouvel article'
  rules: Object = {
    required: (value: any) => !!value || 'Requis.',
    categories: (v: any) => (v.length > 0) || 'Au moins 1 catégorie est requise'
  }

  renderConfig: object = {
    // Mermaid config
    mermaid: {
      theme: 'dark'
    }
  }

  mounted () {
    try {
      this.newArticleForm.reset()
    } catch (reason: any) {
      this.showSnackbar('Impossible de réinitialiser le formulaire.')
    }
  }

  goBack () {
    this.$router.push('/admin/article')
  }

  async submitForm () {
    try {
      await this.$api.posts.create(this.form)

      this.showSnackbar('Article créé.')
      this.goBack()
    } catch (reason: any) {
      this.formError = insertErrors(this.formError, reason)

      this.showSnackbar('Impossible de créer l\'article.')
    }
  }

  @Watch('form.title')
  onFormNameChange (val: string, oldVal: string) {
    if (val !== oldVal) {
      this.formError.title = []
    }
  }
}
</script>
