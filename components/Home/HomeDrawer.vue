<template>
  <v-navigation-drawer
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list
      color="white"
      shaped
    >
      <v-list-item
        v-for="(item, key) in items"
        :key="key"
        :to="item.route"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="item.name"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class HomeDrawer extends Vue {
  // Props
  @Prop() readonly items!: Array<Object>
}
</script>
