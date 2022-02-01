<template>
  <v-img
    :min-height="minHeight"
    :max-height="maxHeight"
    :src="background"
    contain
  >
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="blue accent-2"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="blue darken-2" />
          <v-tab v-for="item in tabs" :key="item.name">
            <v-icon large>
              {{ item.icon }}
            </v-icon>
            <div class="caption py-1">
              {{ item.name }}
            </div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <login
                  @login-done="onLoginDone"
                />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-img>
</template>
<script lang="ts">
import { Vue, Component, getModule, namespace } from 'nuxt-property-decorator'
import Login from '~/components/Home/Login.vue'
import MainStore from '~/store/MainStore'

const mainModule = namespace('MainStore')

@Component({
  components: {
    Login
  }
})
export default class AdminIndex extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Getter('previousRoute') previousRoute: any

  background: string = '/backgrounds/home.svg'
  dialog: boolean = true
  minHeight: string = '200'
  maxHeight: string = '900'
  tab: number = 0
  tabs: Array<Object> = [
    { name: 'Connexion', icon: 'mdi-account' }
  ]

  mounted () {
    const user: any = this.$auth.user

    if ((user !== null) && (user.admin === true)) {
      this.onLoginDone()
    }
  }

  onLoginDone () {
    const user: any = this.$auth.user

    this.$axios
      .$get('/users/' + user.id)
      .then(() => {
        const currentRoute = localStorage.getItem('current-route')

        if ((currentRoute !== '') && (currentRoute !== null)) {
          this.$router.push(currentRoute)
        } else {
          this.$router.push('/admin/cards')
        }
      })
  }
}
</script>
