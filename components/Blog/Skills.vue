<template>
  <section class="py-12">
    <div class="text-uppercase text--primary text-center text-h5 font-weight-bold" min-width="96">
      DevOps
    </div>
    <div class="v-responsive base-divider primary mx-auto mb-6 justify-md-center" style="height: 2px; left: 0px; width: 24px;">
      <hr class="v-divider theme--light">
    </div>
    <p class="base-body text-body-1 mx-auto grey--text text--darken-1 text-center mb-10" style="max-width: 700px;">
      Le devops — ou DevOps (selon la graphie habituellement utilisée en langue anglaise) — est un mouvement en ingénierie informatique et une pratique technique visant à l'unification du développement logiciel (dev) et de l'administration des infrastructures informatiques (ops), notamment l'administration système.
    </p>
    <v-container>
      <v-row>
        <v-col
          v-for="feature in features"
          :key="feature.title"
          cols="12"
          md="6"
        >
          <BaseInformation
            :avatar-color-prop="itemTypeOf(feature.avatarColor, '')"
            :type-prop="itemTypeOf(feature.type, 'icon')"
            :icon-prop="itemTypeOf(feature.icon, '')"
            :icon-color-prop="itemTypeOf(feature.color, '')"
            :icon-height-prop="itemTypeOf(feature.iconHeight, '')"
            :image-prop="itemTypeOf(feature.image, '')"
            :content-prop="itemTypeOf(feature.content, '')"
            :text-prop="feature.title"
            :text-class-prop="feature.textClass"
            :text-content-class-prop="feature.textContentClassProp"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseInformation from '~/components/Base/BaseInformation.vue'

  @Component({
    components: {
      BaseInformation
    }
  })
export default class Skills extends Vue {
    features: Array<Object> = [
      {
        avatarColor: 'lime',
        title: 'Idée',
        content: 'Imagine ta nouvelle fonctionnalité.',
        textContentClassProp: 'mx-4',
        icon: 'mdi-head-lightbulb-outline',
        iconHeight: 72
      },
      {
        title: 'Histoire',
        content: 'Décrit ton idée comme une (ou des) histoires dans ta gestion de projet (OpenProject)',
        textContentClassProp: 'mx-4',
        icon: 'mdi-book-open-variant',
        iconHeight: 72,
        avatarColor: 'primary'
      },
      {
        title: 'Développement',
        content: 'Développe ton (ou tes) histoires ainsi que tes tests',
        textContentClassProp: 'mx-4',
        icon: 'mdi-dev-to',
        iconHeight: 72,
        avatarColor: 'primary'
      },
      {
        title: 'Validation',
        content: 'Valide ton développement avec le pipeline de Jenkins, <br/>lançant tes tests automatiquement (test framework)<br/> et validant ta qualité de code (SonarQube)',
        textContentClassProp: 'mx-4',
        icon: 'mdi-test-tube',
        iconHeight: 72,
        avatarColor: 'orange'
      },
      {
        title: 'Déploiement',
        content: 'Déploie ton code en test ou en production avec le pipeline de Jenkins',
        textContentClassProp: 'mx-4',
        icon: 'mdi-rocket-launch-outline',
        iconHeight: 72,
        avatarColor: 'teal'
      },
      {
        title: 'Bénéfices',
        content: 'Profite de la nouvelle fonctionnalité dès qu\'elle disponible',
        textContentClassProp: 'mx-4',
        icon: 'mdi-emoticon-happy-outline',
        iconHeight: 72,
        avatarColor: 'indigo'
      }
    ]

    itemTypeOf(item: any, defaultValue: String) {
      return typeof item !== 'undefined' ? item : defaultValue
    }
}
</script>
