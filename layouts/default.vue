<template>
  <v-app>
    <home-app-bar />
    <v-main>
      <v-fade-transition mode="out-in">
        <nuxt />
      </v-fade-transition>
      <v-snackbar
        v-model="isSnackbarVisible"
        top
        left
        color="deep-purple accent-4 align-center text-sm-left"
        elevation="24"
      >
        {{ snackbarText }}
        <template #action="{ attrs }">
          <v-btn
            color="blue-grey"
            class="justify-right"
            fab
            dark
            right
            x-small
            v-bind="attrs"
            @click="isSnackbarVisible = false"
          >
            <v-icon
              small
            >
              mdi-close
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <home-footer />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch, namespace, getModule } from 'nuxt-property-decorator'
import HomeAppBar from '~/components/Home/HomeAppBar.vue'
import HomeFooter from '~/components/Home/HomeFooter.vue'

import MainStore from '~/store/MainStore'

const mainModule = namespace('MainStore')

@Component({
  components: {
    HomeAppBar, HomeFooter
  }
})
export default class Default extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Getter('isSnackbarVisible') snackbarVisible: any
  @mainModule.Getter('getSnackbarText') snackbarText: any
  @mainModule.Action('closeSnackbar') closeSnackbar: any

  isSnackbarVisible = false

  mounted () {
    this.isSnackbarVisible = this.snackbarVisible
  }

  @Watch('snackbarVisible')
  syncSnackbar (val: any) {
    this.isSnackbarVisible = val
  }

  @Watch('isSnackbarVisible')
  setSnackbar (val: any) {
    if (val === false) {
      this.closeSnackbar()
    }
  }
}
</script>
