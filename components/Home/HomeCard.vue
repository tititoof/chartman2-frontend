<template>
  <v-card
    class="mx-auto"
    color="info"
    dark
    max-width="344"
    min-width="344"
    max-height="200"
    :to="cardRoute"
  >
    <v-card-title>
      <v-icon
        medium
        left
      >
        {{ cardIcon }}
      </v-icon>
      <span class="title font-weight-light">
        {{ cardName }}
      </span>
    </v-card-title>
    <v-card-text
      class="font-weight-bold"
      max-height="50"
    >
      {{ cardDescription }}
    </v-card-text>
    <v-card-actions
      class="mx-3"
    >
      <v-spacer />
      <v-row
        align="end"
        justify="end"
      >
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class HomeCard extends Vue {
  @Prop({ default: 'mdi-twitter' }) readonly cardIcon!: String|undefined
  @Prop({ default: 'Twitter' }) readonly cardName!: String|undefined
  @Prop({ default: '"Card description."' }) readonly cardDescription!: String|undefined
  @Prop({ default: '/admin/cards' }) readonly cardRoute!: String|undefined
}
</script>
