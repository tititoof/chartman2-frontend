<template>
  <v-main>
    <v-fade-transition mode="out-in">
      <nuxt />
    </v-fade-transition>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BaseView extends Vue {
}
</script>
