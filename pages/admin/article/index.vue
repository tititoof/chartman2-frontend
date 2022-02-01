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
  async asyncData ({ $api }) {
    const responseArticle = await $api.posts.findAll()
    localStorage.setItem('current-route', '/admin/article')

    return { articles: responseArticle.data }
  },
  middleware: ['auth'],
  components: { HomeList }
})
export default class AdminArticle extends Vue {
  // Data
  articles: Array<PostType> = [PostDefault]
}
</script>
