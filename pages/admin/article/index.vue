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
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import HomeList from '~/components/Home/HomeList.vue'
import PostModule from '~/store/PostModule'

const postStore = namespace('PostModule')

@Component({
  components: { HomeList }
})
export default class AdminArticle extends Vue {
  // Store
  postStore = getModule(PostModule, this.$store)
  // Store action
  @postStore.Action('findAll') findAllPosts: any
  // Data
  articles: Array<Object> = []
  fetchOnServer: Boolean = false
  middleware: String = 'auth'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate ({ params, query, store }: any): Boolean {
    const user: any = store.$auth.user
    return ((user !== null) && (user.admin === true))
  }

  mounted () {
    this.getArticles()
  }

  async getArticles () {
    await this.findAllPosts().then((response: any) => {
      this.articles = response.data
    })
  }
}
</script>
