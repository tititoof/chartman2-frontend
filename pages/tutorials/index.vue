<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
      contain
    >
      <v-container class="fill-height px-4 py-3 justify-center overflow-y-auto">
        <v-responsive
          class="d-flex px-4 py-6"
          height="100%"
          max-width="1400"
          width="100%"
        >
          <v-row>
            <v-col cols="2">
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
            </v-col>
            <v-col cols="10" class="text-h4">
              Catégories
            </v-col>
          </v-row>
          <v-row>
            <template v-for="(category, index) in categories">
              <v-col
                :key="index"
                class="mx-1"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    color="primary"
                    dark
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
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
                      {{ category.attributes.published_count }} article(s)
                    </v-subheader>
                  </v-card>
                </v-hover>
              </v-col>
            </template>
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
  async asyncData ({ $api, redirect }) {
    try {
      const response = await $api.articles.categories()
      const categories = response.data

      return { categories }
    } catch (e) {
      redirect('/redirect', { previous_url: '/tutorials/' })
    }
  }
})
export default class Tutorials extends Vue {
  minHeight: string = '200'
  maxHeight: string = '700'
  background: string = '/backgrounds/tutorial.svg'
  categories: Array<CategoryType> = []

  goToCategory (id: string) {
    this.$router.push('/tutorials/category/' + id)
  }

  goBack () {
    this.$router.push('/')
  }
}
</script>
