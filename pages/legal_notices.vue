<template>
  <v-container class="fill-height align-stretch">
    <v-row>
      <v-col cols="12" width="100%">
        <v-icon large left>
          mdi-scale-balance
        </v-icon>
        <span class="text-h6 font-weight-light">
          Mentions Légales
        </span>
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-space-around" dense>
      <v-col class="d-flex justify-center text-h4" cols="12">
        EIRL chartman2.fr
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-space-around" dense>
      <v-col cols="6" class="d-flex justify-end">
        Nom
      </v-col>
      <v-col cols="6" class="font-weight-black">
        Christophe Hartmann
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-space-around" dense>
      <v-col cols="6" class="d-flex justify-end">
        Adresse
      </v-col>
      <v-col cols="6" class="font-weight-black">
        1 route de Cormery - 37320 Saint Branchs - France
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-space-around" dense>
      <v-col cols="6" class="d-flex justify-end">
        Contact
      </v-col>
      <v-col cols="6" class="font-weight-black">
        chartman2.fr@gmail.com
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-space-around" dense>
      <v-col cols="6" class="d-flex justify-end">
        Site web
      </v-col>
      <v-col cols="6" class="font-weight-black">
        <a class="text-decoration-none" :href="$vuetify.lang.t('$vuetify.legal_notices.texts.website')" text target="_blank">
          https://chartman2.fr
        </a>
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-space-around" dense>
      <v-col cols="6" class="d-flex justify-end">
        SIRET
      </v-col>
      <v-col cols="6" class="font-weight-black">
        752 332 742 00028
      </v-col>
    </v-row>

    <v-row class="d-flex align-content-space-around" dense>
      <v-col cols="6" class="d-flex justify-end">
        Hébergement
      </v-col>
      <v-col cols="6" class="font-weight-black">
        OVHcloud - SAS <br>
        2 rue Kellermann - 59100 Roubaix - France<br>
        <a class="text-decoration-none" :href="$vuetify.lang.t('$vuetify.legal_notices.texts.website')" text target="_blank">
          https://www.ovh.com/
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class legalMention extends Vue {

}
</script>
