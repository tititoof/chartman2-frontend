<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
      contain
      class="white--text"
      gradient="to right, rgba(5, 11, 31, .4), rgba(5, 11, 31, .4)"
    >
      <v-container class="fill-height px-4 py-12 justify-center">
        <v-responsive
          class="d-flex px-4 py-12"
          height="100%"
          max-width="1400"
          width="100%"
        >
          <div class="text-h4">
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
                mdi-plus
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
              v-for="item in items"
              v-else
            >
              {{ item.title }}
            </template>
          </p>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class HomeList extends Vue {
  @Prop({ default: 'Title' }) readonly title!: string
  @Prop({ default: '/backgrounds/office.svg' }) readonly background!: string
  @Prop({ default: '200' }) readonly minHeight!: string
  @Prop({ default: '200' }) readonly maxHeight!: string
  @Prop({ default: () => [] }) readonly items!: Array<Object>
  @Prop({ default: 'Aucun item trouvé' }) readonly noItemFound!: string
  @Prop({ default: '' }) readonly basePathItem!: string

  get pathNew () {
    return this.basePathItem + '/new'
  }

  get pathEdit () {
    return this.basePathItem + '/_id'
  }
}
</script>
