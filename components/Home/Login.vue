<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation>
    <v-row v-show="error !== ''">
      <v-col cols="12">
        <v-alert
          :value="error !== ''"
          dense
          dark
          border="left"
          type="error"
          transition="scale-transition"
        >
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="loginPassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Mot de passe"
          hint="Au moins 8 charactères"
          counter
          @click:append="show1 = !show1"
        />
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
        xsm="12"
      >
        <v-btn
          x-large
          block
          color="primary"
          router
          align-start
          to="/"
        >
          Retour à l'accueil
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col class="d-flex mx-9" cols="12" sm="3" xsm="12" align-end>
        <v-btn
          x-large
          block
          :disabled="!valid"
          color="success"
          @click="userLogin()"
        >
          Connexion
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component, namespace, getModule, Emit } from 'nuxt-property-decorator'
import MainStore from '~/store/MainStore'

const mainModule = namespace('MainStore')

@Component
export default class Login extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  valid: Boolean = false
  loginEmail: String = ''
  loginEmailRules: Array<any> = [
    (v: any) => !!v || 'Requis',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail doit être valide'
  ]

  loginPassword: String = ''
  show1: Boolean = false

  rules: Object = {
    required: (value: any) => !!value || 'Requis.',
    min: (v: any) => (v && v.length >= 8) || '8 charactères minimum'
  }

  emailRules: Array<any> = [
    (v: any) => !!v || 'Required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ]

  error: String = ''

  snackbarText: String = 'Vous êtes connecté.'

  async userLogin () {
    try {
      const _self = this
      _self.error = ''
      const response: any = await _self.login()
      _self.$auth.setUser(response.data.data)
      await _self.setUserToken(response.headers.client)
    } catch (err) {
      this.error = 'Adresse Email ou mot de passe invalide'
    }
  }

  async setUserToken (token: any) {
    const _self = this
    await _self.$auth.setUserToken(token)
      .then(() => {
        _self.showSnackbar(this.snackbarText)
        _self.onLoginDone()
      })
  }

  async login () {
    return await this.$auth.loginWith('local', { data: { email: this.loginEmail, password: this.loginPassword } })
  }

  async logout () {
    await this.$auth.logout()
  }

  @Emit('login-done')
  onLoginDone () {
    return true
  }
}
</script>
