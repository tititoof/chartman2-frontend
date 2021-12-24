<template>
  <section>
    <div class="grey darken-4 white--text">
      <v-responsive
        class="mx-auto"
        max-width="1400"
      >
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <base-image
                src="android-chrome-512x512.png"
                contain
                max-width="128"
                min-height="78"
                width="100%"
              />

              <div class="text-h6 text-uppercase">
                Web Artisan
              </div>
              <p>
                Amateur au premier sens du terme, J'adore explorer et découvrir les nouvelles technologies.
                Amoureux de Ruby, ainsi que de son framework RoR.
                Côté front, VueJS avec Nuxt m'ont redonnés le goût du JavaScript.
                Pour être autonome et comprendre le CI / CD, j'ai construit le mien avec Gitea, Jenkins, SonarQube et Openproject.
              </p>
            </v-col>
            <v-col
              v-for="item in itemList"
              :key="item.text"
              cols="12"
              :md="item.md"
            >
              <div class="text-h6 text-uppercase">
                {{ item.name }}
              </div>
              <v-responsive
                class="my-2 v-divider theme--dark base-divider primary"
                max-width="24"
              >
                <v-divider />
              </v-responsive>
              <template
                v-for="(information, index) in item.information"
              >
                <BaseInformation
                  :key="information.text + index"
                  :type-prop="itemTypeOf(information.type, 'icon')"
                  :icon-prop="itemTypeOf(information.icon, '')"
                  :image-prop="itemTypeOf(information.image, '')"
                  :content-prop="itemTypeOf(information.content, '')"
                  :text-prop="information.text"
                  :text-class-prop="information.textClass"
                />
                <v-responsive
                  v-if="index < (item.information.length - 1)"
                  :key="index"
                  class="my-2 v-divider theme--dark base-divider"
                  max-width="280"
                >
                  <v-divider />
                </v-responsive>
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-responsive>
    </div>
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
export default class BlogInformation extends Vue {
  itemList: Array<Object> = [
    {
      name: 'Contact',
      md: 3,
      information: [
        {
          icon: 'mdi-map-marker-outline',
          text: '1 route de Cormery<br/>37320 Saint Branchs',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          icon: 'mdi-cellphone',
          text: '06 65 71 19 75',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mt-6'
        },
        {
          icon: 'mdi-email',
          text: 'chartmann.35@gmail.com',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mt-6'
        }
      ]
    },
    {
      name: 'Frontend',
      md: 2,
      information: [
        {
          icon: 'mdi-language-javascript',
          text: 'JavaScript',
          content: 'Interactive web page',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          icon: 'mdi-vuejs',
          text: 'VueJS',
          content: 'Progressive framework',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          icon: 'mdi-nuxt',
          text: 'NuxtJS',
          content: 'Frontend framework',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          icon: 'mdi-vuetify',
          text: 'Vuetify',
          content: 'Material design framework',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        }
      ]
    },
    {
      name: 'Backend',
      md: 2,
      information: [
        {
          icon: 'mdi-language-ruby',
          text: 'Ruby',
          content: 'Dynamic language',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          icon: 'mdi-language-ruby-on-rails',
          text: 'Ruby on Rails',
          content: 'Web framework',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          icon: 'mdi-database',
          text: 'Database design',
          content: 'MySQL / PostgreSQL',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        }
      ]
    },
    {
      name: 'CI/CD',
      md: 2,
      information: [
        {
          type: 'image',
          image: 'images/gitea.png',
          text: 'Gitea',
          content: 'Code hosting',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          type: 'image',
          image: 'images/jenkins.png',
          text: 'Jenkins',
          content: 'Automation',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          type: 'image',
          image: 'images/sonarqube.png',
          text: 'SonarQube',
          content: 'Code quality and security',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        },
        {
          type: 'image',
          image: 'images/openproject.jpg',
          text: 'Openproject',
          content: 'Project managment',
          textClass: 'base-body text-body-1 mx-auto text--lighten-1 text-left mb-0 mt-3'
        }
      ]
    }
  ]

  itemTypeOf (item: any, defaultValue: String) {
    return typeof item !== 'undefined' ? item : defaultValue
  }
}
</script>
