<template>
  <v-form ref="registerForm" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="firstName" :rules="[rules.required]" label="Prénom" maxlength="20" required />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="lastName" :rules="[rules.required]" label="Nom" maxlength="20" required />
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="email" :rules="[rules.required, rules.validEmail]" label="E-mail" required />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="password"
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
      <v-col cols="12">
        <v-text-field
          v-model="verify"
          block
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, passwordMatch]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Confirmation du mot de passe"
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
      <v-col class="d-flex ml-auto mx-16" cols="12" sm="3" xsm="12">
        <v-btn x-large block :disabled="!valid" color="success" @click="register()">
          S'enregistrer
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Register extends Vue {
  // Data
  email: string = ''
  firstName: string = ''
  lastName: string = ''
  password: string = ''
  rules: object = {
    required: (value: any) => !!value || 'Requis.',
    validEmail: (v: any) => /.+@.+\..+/.test(v) || 'doit être valide',
    min: (v: any) => (v && v.length >= 8) || '8 charactères minimum'
  }

  show1: boolean = false
  valid: boolean = false
  verify: string = ''

  get passwordMatch () {
    return () => this.password === this.verify || 'Les mots de passes doivent correspondre'
  }

  register () {
    return true
  }
}
</script>
