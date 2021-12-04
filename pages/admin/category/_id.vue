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
import { CategoryFormType } from '~/types/index'

const mainModule = namespace('MainStore')
const categoryStore = namespace('CategoryModule')

@Component({
  components: { HomeList }
})
export default class AdminCategoryId extends Vue {
  // Store
  mainModule = getModule(MainStore, this.$store)
  categoryStore = getModule(CategoryModule, this.$store)
  @categoryStore.Action('update') putCategory: any
  @categoryStore.Action('find') findCategory: any
  @mainModule.Action('showSnackbar') showSnackbar: any

  // Data
  title: string = 'Edition de la catégorie'
  background: string = '/backgrounds/business.svg'
  minHeight: string = '200'
  maxHeight: string = '500'
  pathAdd!: string
  formValid: boolean = false
  form: CategoryFormType = {
    name: ''
  }

  formError: object = {
    name: []
  }

  nameRules: Array<object> = [
    (v: any) => !!v || 'Le nom est requis'
  ]

  mounted() {
    this.getCategory()
  }

  submitForm () {
    const _self = this
    _self.putCategory(_self.$route.params.id, _self.form)
      .then(() => {
        _self.showSnackbar('Catégorie modifiée.')
        _self.$router.push('/admin/category')
      }).catch((reason: any) => {
        _self.formError = reason.response.data
      })
  }

  getCategory () {
    const _self = this
    _self.findCategory(_self.$route.params.id)
      .then((response: any) => {
        _self.title += ' "' + response.data.attributes.name + '"'
        _self.form.name = response.data.attributes.name
      })
      .catch(() => {
        _self.showSnackbar('Impossible de récupérer la catégorie.')
        _self.$router.push('/admin/category')
      })
  }

  back () {
    this.$router.back()
  }
}
</script>
