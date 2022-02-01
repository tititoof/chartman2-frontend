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
              id="submit"
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
            <v-form ref="newCategoryForm" v-model="formValid">
              <v-text-field
                v-model="form.name"
                label="Nom"
                :rules="[rules.required]"
                :error-count="formError.name.length"
                :error-messages="formError.name"
                required
              />
            </v-form>
          </p>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script lang="ts">
import { Vue, Component, namespace, getModule, Ref } from 'nuxt-property-decorator'
import HomeList from '~/components/Home/HomeList.vue'
import MainStore from '~/store/MainStore'
import { CategoryFormDefault, CategoryFormErrorDefault, CategoryFormErrorType, CategoryFormType, VForm } from '~/types'
import { insertErrors } from '~/utils/error'

const mainModule = namespace('MainStore')

@Component({
  asyncData () {
    localStorage.setItem('current-route', '/admin/category/new')
  },
  middleware: ['auth'],
  components: { HomeList }
})
export default class New extends Vue {
  // Store
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any
  // Ref
  @Ref('newCategoryForm') readonly newCategoryForm!: VForm
  // Data
  title: string = 'Nouvelle catégorie'
  background: string = '/backgrounds/business.svg'
  minHeight: string = '200'
  maxHeight: string = '500'
  form: CategoryFormType = CategoryFormDefault
  formError: CategoryFormErrorType = CategoryFormErrorDefault
  formValid: boolean = false
  rules: Object = {
    required: (value: any) => !!value || 'Requis.'
  }

  mounted () {
    try {
      this.newCategoryForm.reset()
    } catch (reason: any) {
      this.showSnackbar('Impossible de réinitialiser le formulaire.')
    }
  }

  async submitForm () {
    try {
      await this.$api.categories.create(this.form)

      this.showSnackbar('Catégorie créée.')
      this.$router.push('/admin/category')
    } catch (reason: any) {
      this.formError = insertErrors(this.formError, reason)

      this.showSnackbar('Impossible de créer la catégorie.')
    }
  }

  goBack () {
    this.$router.back()
  }
}
</script>
