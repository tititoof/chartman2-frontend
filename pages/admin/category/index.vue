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

const categoryStore = namespace('CategoryModule')

@Component({
  async asyncData({ $api }) {
    const response = await $api.categories.findAll()
    const categories = response.data
    
    return { categories }
  },
  middleware: ['auth'],
  components: { HomeList }
})
export default class AdminCategory extends Vue {
  // Store
  categoryStore = getModule(CategoryModule, this.$store)
  @categoryStore.Action('findAll') findAllCategories: any
  
  // Data
  categories: Array<any> = []
  // middleware: String = 'auth'

  // Validate routing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // validate({ params, query, store }: any): Boolean {
  //   const user: any = store.$auth.user
  //   return ((user !== null) && (user.admin === true))
  // }
}
</script>
