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
                :rules="nameRules"
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
import CategoryModule from '~/store/CategoryModule'

const categoryStore = namespace('CategoryModule')
const mainModule = namespace('MainStore')

@Component({
  components: { HomeList }
})
export default class AdminCategoryNew extends Vue {
  // Store
  mainModule = getModule(MainStore, this.$store)
  categoryStore = getModule(CategoryModule, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any
  @categoryStore.Action('create') postCategory: any

  // Data
  title: String = 'Nouvelle catégorie'
  background: String = '/backgrounds/business.svg'
  minHeight: String = '200'
  maxHeight: String = '500'
  pathAdd!: String
  formValid: Boolean = false
  form: Object = {
    name: ''
  }

  formError: Object = {
    name: []
  }

  nameRules: Array<Object> = [
    (v: any) => !!v || 'Le nom est requis'
  ]

  submitForm () {
    const _self = this
    _self.postCategory(_self.form).then(() => {
      _self.showSnackbar('Catégorie crée.')
      _self.$router.push('/admin/category')
    }).catch((reason: any) => {
      _self.formError = reason.response.data
    })
  }

  back () {
    this.$router.back()
  }
}
</script>
