<template>
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
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Login from '~/components/Home/Login.vue'

@Component({
  components: {
    Login
  }
})
export default class AdminIndex extends Vue {
  dialog: Boolean = true
  tab: Number = 0
  tabs: Array<Object> = [
    { name: 'Connexion', icon: 'mdi-account' }
  ]

  mounted() {
    const user: any = this.$auth.user
    if ((user !== null) && (user.admin === true)) {
      this.onLoginDone()
    }
  }

  async onLoginDone() {
    const user: any = this.$auth.user
    // await this.$api.users.get(user.id)
    // this.$router.push({ path: '/admin/cards' })
    this.$axios
      .$get('/users/' + user.id)
      .then(() => {
        this.$router.push('/admin/cards')
      })
  }
}
</script>
