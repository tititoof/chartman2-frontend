<template>
  <v-sheet
    id="contact"
    dark
    tag="section"
    tile
    class="grey darken-4"
  >
    <v-container>
      <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center pt-12">
        Contactez moi
      </h2>

      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider class="mb-1" />

        <v-divider />
      </v-responsive>

      <v-theme-provider dark>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                flat
                label="Nom*"
                :rules="nameRules"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                flat
                label="Email*"
                :rules="emailRules"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="subject"
                flat
                label="Sujet*"
                :rules="subjectRules"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="message"
                flat
                label="Message*"
                :rules="messageRules"
              />
            </v-col>
            <v-col
              class="mx-auto"
              cols="auto"
            >
              <v-btn
                color="blue lighten-1"
                x-large
                dark
                @click="sendEmail"
              >
                Envoyer
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-theme-provider>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ContactMe extends Vue {
  valid: boolean = false
  name: string = ''
  email: string = ''
  subject: string = ''
  message: string = ''
  nameRules: unknown = [
    (v: string) => !!v || 'Votre nom est requis',
    (v: string) => v.length <= 30 || 'Votre nom doit faire moins de 30 caractères'
  ]

  emailRules: unknown = [
    (v: string) => !!v || 'Votre courriel (e-mail) est requis',
    (v: string) => /.+@.+\..+/.test(v) || 'Votre courriel (e-mail) doit être valide'
  ]

  subjectRules: unknown = [
    (v: string) => !!v || 'Le sujet est requis',
    (v: string) => v.length >= 5 || 'Le sujet doit faire au moins de 5 caractères'
  ]

  messageRules: unknown = [
    (v: string) => !!v || 'Le message est requis',
    (v: string) => v.length >= 15 || 'Le message doit faire au moins de 15 caractères'
  ]

  sendEmail () {
    if (this.valid) {
      this.$axios.$post('/contacts/send', {
        contact: {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        }
      })
    }
  }
}
</script>
