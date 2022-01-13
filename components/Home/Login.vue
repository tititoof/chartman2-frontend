<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation submit.prevent="userLogin()">
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
        <v-text-field v-model="loginEmail" :rules="[rules.required, rules.email]" label="E-mail" required />
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
    </v-row>
    <v-row class="justify-space-around">
      <v-col
        cols="12"
        sm="6"
        xsm="12"
        min-width="344"
      >
        <v-btn
          x-large
          block
          color="primary"
          router
          to="/"
        >
          Retour à l'accueil
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        xsm="12"
        min-width="344"
      >
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

  error: string = ''
  valid: boolean = false
  loginEmail: string = ''
  loginPassword: string = ''
  show1: boolean = false
  rules: Object = {
    required: (value: any) => !!value || 'Requis.',
    min: (v: any) => (v && v.length >= 8) || '8 charactères minimum',
    email: (v: any) => /.+@.+\..+/.test(v) || 'E-mail doit être valide'
  }

  snackbarText: string = 'Vous êtes connecté.'

  mounted () {
    this.valid = false
  }

  async userLogin () {
    try {
      this.error = ''
      const response: any = await this.$auth.loginWith('local', { data: { email: this.loginEmail, password: this.loginPassword } })

      this.$auth.setUser(response.data.data)
      await this.setUserToken(response.headers.client)
    } catch (err) {
      this.error = 'Adresse e-mail ou mot de passe invalide'
    }
  }

  async setUserToken (token: any) {
    await this.$auth.setUserToken(token)

    this.onLoginDone()
    this.showSnackbar(this.snackbarText)
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
