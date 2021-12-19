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
          class="d-flex px-4 py-12 overflow-y-auto"
          height="100%"
          max-width="1400"
          width="100%"
        >
          <div class="text-h4 py-3">
            Catégories
          </div>
          <v-row class="py-12">
            <v-col
              v-for="(category, index) in categories"
              :key="index"
              cols="4"
            >
              <v-card
                class="mx-auto"
                color="info"
                dark
                max-width="344"
                min-width="344"
                max-height="200"
                @click="goToCategory(category.id)"
              >
                <v-card-title>
                  <v-icon
                    medium
                    left
                  >
                    mdi-file-cabinet
                  </v-icon>
                  <span class="title font-weight-light">
                    {{ category.attributes.name }}
                  </span>
                </v-card-title>
                <v-subheader>
                  {{ category.relationships.posts.data | length }} article(s)
                </v-subheader>
              </v-card>
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { CategoryType } from '~/types'

@Component({
  async asyncData({ $api }) {
    const response = await $api.articles.categories()
    const categories = response.data
    
    return { categories }
  }
})
export default class Tutorials extends Vue {
  minHeight: string = '200'
  maxHeight: string = '700'
  background: string = '/backgrounds/tutorial.svg'
  categories: Array<CategoryType> = []

  goToCategory(id: number) {
    this.$router.push('/tutorials/category/' + id)
  }
}
</script>
