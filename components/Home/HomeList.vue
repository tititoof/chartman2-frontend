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
            <v-col cols="8" class="text-h4">
              {{ title }}
            </v-col>
            <v-col cols="2">
              <v-btn
                class="mx-2 float-right"
                small
                fab
                dark
                color="indigo"
                :to="pathNew"
              >
                <v-icon
                  dark
                >
                  mdi-table-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <p class="text-justify">
            <template
              v-if="items.length === 0"
            >
              {{ noItemFound }}
            </template>
            <template
              v-else
            >
              <component
                :is="itemComponentInstance"
                :items="synceditems"
                :max-height="maxHeight - 250"
                :base-path-item="basePathItem"
                height="100%"
              />
            </template>
          </p>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'nuxt-property-decorator'

@Component
export default class HomeList extends Vue {
  @Prop({ default: '/backgrounds/office.svg' }) readonly background!: string
  @Prop({ default: '' }) readonly basePathItem!: string
  @Prop({ default: 'HomeCategoryList' }) readonly itemComponent!: string
  @Prop({ default: '200' }) readonly minHeight!: string
  @Prop({ default: '700' }) readonly maxHeight!: string
  @Prop({ default: 'Aucun item trouvé' }) readonly noItemFound!: string
  @PropSync('items', { default: () => [] }) readonly synceditems!: Array<Object>
  @Prop({ default: 'Title' }) readonly title!: string

  get itemComponentInstance () {
    return () => import(`~/components/Home/${this.itemComponent}`)
  }

  get pathNew () {
    return this.basePathItem + '/new'
  }

  goBack () {
    this.$router.push('/admin/cards')
  }
}
</script>
