<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
      <v-img
        src="/android-chrome-512x512.png"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"
        width="100%"
      />
      chartman².fr
      <v-spacer />

      <div>
        <v-tabs
          class="hidden-sm-and-down"
          optional
        >
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            router
            :to="item.route"
            :ripple="true"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      />
    </v-app-bar>

    <home-drawer
      v-model="drawer"
      :items="items"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import HomeDrawer from '@/components/Home/HomeDrawer.vue'

@Component({
  components: {
    HomeDrawer
  }
})
export default class HomeAppBar extends Vue {
  drawer: Boolean = false

  get items (): Array<Object> {
    return [
      { name: 'Home', route: '/' },
      { name: 'Tutoriels', route: '/tutorials' },
      { name: 'Exemples', route: '/authenticate' },
      { name: 'Admin', route: '/admin' }
    ]
  }
}
</script>

<style lang="scss">
  #home-app-bar {
    .v-tabs-slider {
      max-width: 24px;
      margin: 0 auto;
    }
    .v-tab {
      &::before {
        display: none;
      }
    }
  }
</style>
