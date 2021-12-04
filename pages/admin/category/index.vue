<template>
  <section>
    <home-list
      title="Catégories"
      background="/backgrounds/business.svg"
      no-item-found="Aucune catégorie trouvée"
      max-height="700"
      base-path-item="category"
      :items.sync="categories"
    />
  </section>
</template>
<script lang="ts">
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import HomeList from '~/components/Home/HomeList.vue'
import CategoryModule from '~/store/CategoryModule'
import Category from '~/models/Category'

const categoryStore = namespace('CategoryModule')

@Component({
  components: { HomeList }
})
export default class AdminCategory extends Vue {
  // Store
  categoryStore = getModule(CategoryModule, this.$store)
  @categoryStore.Action('findAll') findAllCategories: any
  // Data
  categories: Array<any> = []
  fetchOnServer: Boolean = false
  middleware: String = 'auth'
  category: Category = new Category

  // Validate routing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate ({ params, query, store }: any): Boolean {
    const user: any = store.$auth.user
    return ((user !== null) && (user.admin === true))
  }

  // Setup
  mounted () {
    this.getCategories()
  }

  // Get categories
  async getCategories () {
    const toto = await this.category.get()
    console.log(toto)  
    // await this.findAllCategories().then((response: any) => {
    //   this.categories = response.data
    // })
  }
}
</script>
