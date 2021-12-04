<template>
  <article class="py-10">
    <v-list-item-group
      v-model="selectedItem"
      color="indigo"
    >
      <v-virtual-scroll
        :items="syncedItems"
        :height="maxHeight"
        :item-height="63"
      >
        <template v-slot:default="{ index, item }">
          <v-list-item
            :key="index"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.attributes.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formatedCategories(item.relationships.categories.data) }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row
                align="center"
                justify="space-around"
              >
                <v-btn
                  class="mx-2"
                  x-small
                  fab
                  dark
                  color="light-green darken-4"
                  @click="show(item.attributes.title, item.attributes.content)"
                >
                  <v-icon
                    medium
                  >
                    mdi-table-eye
                  </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  x-small
                  fab
                  dark
                  color="orange darken-4"
                  @click="edit(item.id)"
                >
                  <v-icon
                    medium
                  >
                    mdi-table-edit
                  </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  x-small
                  fab
                  dark
                  color="red darken-4"
                  @click="confirmDestroy(item.id, index, item.attributes.title)"
                >
                  <v-icon
                    medium
                  >
                    mdi-table-large-remove
                  </v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
        </template>
      </v-virtual-scroll>
    </v-list-item-group>
    <v-dialog
      v-model="dialogShow"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Confirmation
        </v-card-title>
        <v-card-text>
          {{ dialogName }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green darken-4"
            text
            @click.stop="dialogShow = false"
          >
            Non
          </v-btn>
          <v-spacer />
          <v-btn
            color="red darken-4"
            text
            @click="destroy()"
          >
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showDialogVisible"
      width="1400px"
    >
      <v-card>
        <v-card-title class="headline">
          {{ showDialogTitle }}
        </v-card-title>
        <v-card-text>
          <Editor
            v-model="showDialogContent"
            mode="viewer"
            hint="Hint"
            :outline="false"
            :render-config="renderConfig"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-4"
            class="right"
            text
            @click.stop="showDialogVisible = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </article>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, namespace, getModule } from 'nuxt-property-decorator'
import { Editor } from 'vuetify-markdown-editor'
import MainStore from '~/store/MainStore'
import CategoryModule from '~/store/CategoryModule'
import PostModule from '~/store/PostModule'
import { CategoryType } from '~/types/index'

const categoryStore = namespace('CategoryModule')
const mainModule = namespace('MainStore')
const postStore = namespace('PostModule')

@Component({
  components: { Editor }
})
export default class HomeArticleList extends Vue {
  // Stores
  mainModule = getModule(MainStore, this.$store)
  categoryStore = getModule(CategoryModule, this.$store)
  postStore = getModule(PostModule, this.$store)
  // Stores actions
  @categoryStore.Action('findAll') findAllCategories: any
  @mainModule.Action('showSnackbar') showSnackbar: any
  @postStore.Action('destroy') destroyPost: any
  // Props
  @Prop({ default: '/backgrounds/office.svg' }) readonly background!: string
  @Prop({ default: '200' }) readonly minHeight!: string
  @Prop({ default: '300' }) readonly maxHeight!: string
  @PropSync('items', { default: () => [] }) readonly syncedItems!: Array<object>
  @Prop({ default: '' }) readonly basePathItem!: string
  // Data
  selectedItem: object = {}
  dialogShow: boolean = false
  dialogName: string = ''
  dialogItemId: number = 0
  dialogItemIndex: number = 0
  showDialogTitle: string = ''
  showDialogContent: string = ''
  showDialogVisible: boolean = false
  categories: Array<CategoryType> = []
  renderConfig: object = {
    mermaid: {
      theme: 'dark'
    }
  }

  get pathNew () {
    return this.basePathItem + '/new'
  }

  get pathEdit () {
    return this.basePathItem + '/_id'
  }

  mounted () {
    this.getCategories()
  }

  confirmDestroy (id: number, index: number, name: string) {
    this.dialogItemId = id
    this.dialogItemIndex = index
    this.dialogName = 'Êtes vous sûr de vouloir supprimer l\'article "' + name + '" ?'
    this.dialogShow = true
  }

  formatedCategories (categories: Array<any>) {
    const listCategories: Array<string> = []
    for (const category in categories) {
      for (const categoryId in this.categories) {
        const baseCategory: CategoryType = this.categories[categoryId]
        if (categories[category].id === baseCategory.id) {
          listCategories.push(baseCategory.attributes.name)
        }
      }
    }

    return listCategories.join(', ')
  }

  show (title: string, content: string) {
    this.showDialogTitle = title
    this.showDialogContent = content
    this.showDialogVisible = true
  }

  edit (id: number) {
    this.$router.push(this.basePathItem + '/' + id)
  }

  destroy () {
    const _self = this
    _self.dialogShow = false
    _self.destroyPost(this.dialogItemId)
      .then(() => {
        _self.showSnackbar('Article supprimé.')
        _self.$delete(_self.syncedItems, this.dialogItemIndex)
      })
      .catch(() => {
        _self.showSnackbar('Impossible de supprimer l\'article.')
      })
  }

  async getCategories () {
    await this.findAllCategories()
      .then((response: any) => {
        this.categories = response.data
      })
  }
}
</script>
