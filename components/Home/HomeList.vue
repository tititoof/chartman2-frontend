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
          </div>
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
  @Prop({ default: 'Title' }) readonly title!: String
  @Prop({ default: '/backgrounds/office.svg' }) readonly background!: String
  @Prop({ default: '200' }) readonly minHeight!: String
  @Prop({ default: '700' }) readonly maxHeight!: String
  @PropSync('items', { default: () => [] }) readonly synceditems!: Array<Object>
  @Prop({ default: 'Aucun item trouvé' }) readonly noItemFound!: String
  @Prop({ default: '' }) readonly basePathItem!: String
  @Prop({ default: 'HomeCategoryList' }) readonly itemComponent!: String

  get itemComponentInstance () {
    return () => import(`~/components/Home/${this.itemComponent}`)
  }

  get pathNew () {
    return this.basePathItem + '/new'
  }

  back () {
    this.$router.push('/admin/cards')
  }
}
</script>
