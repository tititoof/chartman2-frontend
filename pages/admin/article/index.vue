<template>
  <section>
    <home-list
      title="Articles"
      background="/backgrounds/business.svg"
      no-item-found="Aucun article trouvé"
      max-height="700"
      base-path-item="article"
      :items.sync="articles"
      item-component="HomeArticleList"
    />
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import HomeList from '~/components/Home/HomeList.vue'
import { PostDefault, PostType } from '~/types'

@Component({
  async asyncData ({ $api, redirect }) {
    try {
      const responseArticle = await $api.posts.findAll()
      const articles = responseArticle.data

      return { articles }
    } catch (e) {
      redirect('/')
    }
  },
  middleware: ['auth'],
  components: { HomeList }
})
export default class AdminArticle extends Vue {
  // Data
  articles: Array<PostType> = [PostDefault]
}
</script>
