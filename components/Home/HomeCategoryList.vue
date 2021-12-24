<template>
  <article class="py-10">
    <v-list-item-group
      v-model="selectedItem"
      color="indigo"
    >
      <v-virtual-scroll
        :items="syncedItems"
        :height="maxHeight"
        :item-height="57"
      >
        <template #default="{ index, item }">
          <v-list-item
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.attributes.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
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
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                x-small
                fab
                dark
                color="red darken-4"
                @click="confirmDestroy(item.id, index, item.attributes.name )"
              >
                <v-icon
                  medium
                >
                  mdi-table-large-remove
                </v-icon>
              </v-btn>
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
  </article>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, namespace, getModule } from 'nuxt-property-decorator'
import MainStore from '~/store/MainStore'

const mainModule = namespace('MainStore')

@Component
export default class HomeCategoryList extends Vue {
  // Store
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  // Props
  @Prop({ default: '/backgrounds/office.svg' }) readonly background!: string
  @Prop({ default: '200' }) readonly minHeight!: string
  @Prop({ default: '300' }) readonly maxHeight!: string
  @PropSync('items', { default: () => [] }) readonly syncedItems!: Array<object>
  @Prop({ default: '' }) readonly basePathItem!: string

  selectedItem: object = {}
  dialogShow: boolean = false
  dialogName: string = ''
  dialogItemId: number = 0
  dialogItemIndex: number = 0

  get pathNew () {
    return this.basePathItem + '/new'
  }

  get pathEdit () {
    return this.basePathItem + '/_id'
  }

  confirmDestroy (id: number, index: number, name: string) {
    this.dialogItemId = id
    this.dialogItemIndex = index
    this.dialogName = 'Êtes vous sûr de vouloir supprimer la catégorie "' + name + '" ?'
    this.dialogShow = true
  }

  edit (id: number) {
    this.$router.push(this.basePathItem + '/' + id)
  }

  async destroy () {
    this.dialogShow = false
    try {
      await this.$api.categories.destroy(this.dialogItemId)
      this.showSnackbar('Catégorie supprimée.')
      this.$delete(this.syncedItems, this.dialogItemIndex)
    } catch (reason) {
      this.showSnackbar('Impossible de supprimer la catégorie.')
    }
  }
}
</script>
