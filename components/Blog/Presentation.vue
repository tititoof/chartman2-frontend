<template>
  <section>
    <v-img
      :min-height="minHeight"
      :max-height="maxHeight"
      src="/backgrounds/office.svg"
      class="white--text"
      gradient="to right, rgba(5, 11, 31, .4), rgba(5, 11, 31, .4)"
    >
      <v-container
        :class="$vuetify.breakpoint.mdAndDown ? `justify-center` : `justify-space-around`"
        class="fill-height py-12"
      >
        <v-responsive
          class="d-flex"
          max-width="550"
          width="100%"
        >
          <div class="text-h4">
            Developpement agile avec Ruby on Rails & VueJS
          </div>
          <p class="text-justify">
            - Ruby on Rails, également appelé RoR ou Rails, est un framework web libre écrit en Ruby. Il suit le motif de conception modèle-vue-contrôleur (MVC). Il propose une structure qui permet de développer rapidement et intuitivement. Cependant, il impose un grand niveau d'abstraction dans la programmation qui apporte en contrepartie l'économie d'écrire soi-même la plupart des routines obligatoires d'une application web.
            <br>
            - Vue.js (aussi appelé plus simplement Vue), est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web monopages. Vue a été créé par Evan You et est maintenu par lui et le reste des membres actifs de l'équipe principale travaillant sur le projet et son écosystème.
          </p>
          <p class="caption">
            Source Wikipedia
          </p>
          <div
            class="d-flex flex-wrap align-center"
          >
            <v-btn
              router
              to="/tutorials"
            >
              Tutoriels
            </v-btn>

            <span class="font-weight-bold ml-6 mr-4 my-4">
              ou
            </span>

            <v-btn
              :ripple="false"
              outlined
              color="indigo"
              @click="goTo('DevOps')"
            >
              Tutoriels RoR / VueJS
            </v-btn>
          </div>
        </v-responsive>
        <v-responsive
          class="d-flex"
          max-width="550"
          width="100%"
        >
          <div class="text-h4">
            Intégration continue & déploiement continu CI / CD
          </div>
          <p class="text-justify">
            <br>
            - L'intégration continue (CI) est un ensemble de pratiques utilisées en génie logiciel consistant à vérifier à chaque modification de code source que le résultat des modifications ne produit pas de régression dans l'application développée. Le concept a pour la première fois été mentionné par Grady Booch et se réfère généralement à la pratique de l'extreme programming. Le principal but de cette pratique est de détecter les problèmes d'intégration au plus tôt lors du développement. De plus, elle permet d'automatiser l'exécution des suites de tests et de voir l'évolution du développement du logiciel.
            <br>
            - Le déploiement continu ou Continuous deployment (CD) en anglais, est une approche d'ingénierie logicielle dans laquelle les fonctionnalités logicielles sont livrées fréquemment par le biais de déploiements automatisés. 1,2,3 Le déploiement continu diffère de la livraison continue, une approche similaire dans laquelle des fonctionnalités logicielles sont également livrées fréquemment et considérées comme pouvant potentiellement être déployées, mais qui ne le sont pas pour autant (le déploiement restant dans ce cas un processus manuel)
          </p>
          <p class="caption">
            Source Wikipedia
          </p>
          <div
            class="d-flex flex-wrap align-center"
          >
            <v-btn
              router
              to="/tutorials"
            >
              Tutoriels
            </v-btn>

            <span class="font-weight-bold ml-6 mr-4 my-4">
              ou
            </span>

            <v-btn
              :ripple="false"
              outlined
              color="indigo"
              @click="goTo('CI / CD')"
            >
              Tutoriels CI / CD
            </v-btn>
          </div>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>
<script lang="ts">
import { Vue, Component, namespace, getModule } from 'nuxt-property-decorator'
import MainStore from '~/store/MainStore'

const mainModule = namespace('MainStore')

@Component
export default class Presentation extends Vue {
  mainModule = getModule(MainStore, this.$store)
  @mainModule.Action('showSnackbar') showSnackbar: any

  minHeight: number = 100
  get maxHeight (): number {
    return (this.$vuetify.breakpoint.mdAndDown) ? 1800 : 700
  }

  async goTo (category: string) {
    const response = await this.getCategories()
    const routeId = this.getCategoryId(category, response.data)

    if (routeId !== null) {
      this.$router.push('/tutorials/category/' + routeId)
    } else {
      this.showSnackbar('La catégorie n\'a pas été trouvée')
    }
  }

  getCategoryId (category: string, categories: Array<any>) {
    let routeId = null

    for (const categoryIndex in categories) {
      if (category.localeCompare(categories[categoryIndex].attributes.name) === 0) {
        routeId = categories[categoryIndex].id
      }
    }

    return routeId
  }

  getCategories (): Promise<any> {
    return this.$api.categories.findAll()
  }
}
</script>
