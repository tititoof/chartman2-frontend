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
import { Vue, Component } from 'nuxt-property-decorator'
import HomeList from '~/components/Home/HomeList.vue'

@Component({
  async asyncData ({ $api, redirect }) {
    try {
      const response = await $api.categories.findAll()
      const categories = response.data

      return { categories }
    } catch (e) {
      redirect('/')
    }
  },
  middleware: ['auth'],
  components: { HomeList }
})
export default class AdminCategory extends Vue {
  // Data
  categories: Array<any> = []
}
</script>
