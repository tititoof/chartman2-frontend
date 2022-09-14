<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      src="/backgrounds/office.svg"
      class="white--text"
      gradient="to right, rgba(5, 11, 31, .4), rgba(5, 11, 31, .4)"
    >
      <v-container
        :class="$vuetify.breakpoint.mdAndDown ? `justify-center` : `justify-space-around`"
        class="fill-height py-12"
      >
        <v-responsive
          class="d-flex"
          max-width="550"
          width="100%"
        >
          <v-img
            src="/images/devops.svg"
            contain
          />
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>
<script lang="ts">
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import MainStore from '~/store/MainStore'

const mainModule = namespace('MainStore')

@Component
export default class Presentation extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  minHeight: number = 100
  get maxHeight (): number {
    return (this.$vuetify.breakpoint.mdAndDown) ? 1800 : 700
  }

  async goTo (category: string) {
    const response = await this.getCategories()
    const routeId = this.getCategoryId(category, response.data)

    if (routeId !== null) {
      this.$router.push('/tutorials/category/' + routeId)
    } else {
      this.showSnackbar('La catégorie n\'a pas été trouvée')
    }
  }

  getCategoryId (category: string, categories: Array<any>) {
    let routeId = null

    for (const categoryIndex in categories) {
      if (category.localeCompare(categories[categoryIndex].attributes.name) === 0) {
        routeId = categories[categoryIndex].id
      }
    }

    return routeId
  }

  getCategories (): Promise<any> {
    return this.$api.categories.findAll()
  }
}
</script>
