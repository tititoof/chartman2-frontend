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
            <v-form v-model="formValid">
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
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import HomeList from '~/components/Home/HomeList.vue'
import MainStore from '~/store/MainStore'
import { CategoryDefault, CategoryFormDefault, CategoryFormErrorDefault, CategoryFormErrorType, CategoryFormType, CategoryType } from '~/types/index'

const mainModule = namespace('MainStore')

@Component({
  async asyncData ({ $api, params }) {
    const responseCategory = await $api.categories.find(params.id)
    const category = responseCategory.data

    return { category }
  },
  middleware: ['auth'],
  components: { HomeList }
})
export default class Id extends Vue {
  // Store
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  // Data
  category: CategoryType = CategoryDefault
  title: string = ''
  background: string = '/backgrounds/business.svg'
  minHeight: string = '200'
  maxHeight: string = '500'
  form: CategoryFormType = CategoryFormDefault
  formError: CategoryFormErrorType = CategoryFormErrorDefault
  formValid: boolean = false
  rules: Object = {
    required: (value: any) => !!value || 'Requis.'
  }

  initialize () {
    this.title = 'Edition de la catégorie ' + this.category.attributes.name
    this.form.name = this.category.attributes.name
  }

  mounted () {
    this.initialize()
  }

  submitForm () {
    try {
      this.$api.categories.update(this.$route.params.id, this.form)
      this.showSnackbar('Catégorie modifiée.')
      this.$router.push('/admin/category')
    } catch (reason: any) {
      this.formError = reason
    }
  }

  goBack () {
    this.$router.back()
  }
}
</script>
