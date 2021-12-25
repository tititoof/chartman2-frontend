<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      :src="background"
      contain
    >
      <v-container class="fill-height px-4 py-12 justify-space-around">
        <template
          v-for="(card, index) in cards"
        >
          <home-card
            :key="index"
            :card-icon="card.cardIcon"
            :card-name="card.cardName"
            :card-description="card.cardDescription"
            :card-route="card.cardRoute"
          />
        </template>
      </v-container>
    </v-img>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import HomeCard from '~/components/Home/HomeCard.vue'

@Component({
  middleware: ['auth'],
  components: { HomeCard }
})
export default class Cards extends Vue {
  minHeight: string = '200'
  maxHeight: string = '700'
  background: string = '/backgrounds/admin.svg'
  cards: Array<Object> = [
    {
      cardIcon: 'mdi-file-cabinet',
      cardName: 'Catégories',
      cardDescription: 'Gestion des catégories d\'article',
      cardRoute: '/admin/category'
    },
    {
      cardIcon: 'mdi-file-document-multiple-outline',
      cardName: 'Articles',
      cardDescription: 'Gestion des articles',
      cardRoute: '/admin/article'
    }
  ]
}
</script>
