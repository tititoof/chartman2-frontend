<!-- eslint-disable vue/no-template-shadow -->
<template>
  <section id="features" class="grey lighten-3">
    <v-container class="text-center py-12">
      <h2 class="display-2 font-weight-bold mb-3">
        Mes compétences
      </h2>

      <v-responsive class="mx-auto mb-12" width="56">
        <v-divider class="mb-1" />

        <v-divider />
      </v-responsive>

      <section
        v-for="({ title, text, skill }, iSkills) in skills"
        :key="iSkills"
        class="pb-4"
      >
        <h3 class="font-weight-bold mb-3 align-justify">
          {{ title }}
        </h3>
        <span class="subtitle-1">
          {{ text }}
        </span>
        <v-row class="d-flex justify-space-around">
          <v-col
            v-for="({ type, src, title, text }, iSkill) in skill"
            :key="iSkill"
            cols="12"
            md="3"
          >
            <v-card class="py-12 px-4" color="grey lighten-5" flat>
              <v-theme-provider dark>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon v-if="type === 'icon'" large v-text="src" />
                    <v-img
                      v-else
                      :src="src"
                      contain
                      max-width="36"
                      max-height="36"
                      width="100%"
                    />
                  </v-avatar>
                </div>
              </v-theme-provider>
              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="title"
              />
              <v-card-text class="subtitle-1" v-text="text" />
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { DomainInterface } from '~/types'

@Component
export default class Skill extends Vue {
  get skills (): Array<DomainInterface> {
    return [
      {
        title: 'Frontend',
        text: 'Tous les éléments du site que l’on voit à l’écran et avec lesquels on peut interagir. Ces éléments sont composés de HTML, CSS et de Javascript contrôlés par le navigateur web de l’utilisateur.',
        skill: [
          {
            type: 'icon',
            src: 'mdi-vuejs',
            title: 'VueJS',
            text: 'Progressive JavaScript framework'
          },
          {
            type: 'icon',
            src: 'mdi-nuxt',
            title: 'NuxtJS',
            text: 'Frontend framework'
          },
          {
            type: 'icon',
            src: 'mdi-vuetify',
            title: 'Vuetify',
            text: 'Material design framework'
          }
        ]
      },
      {
        title: 'Backend',
        text: 'C\'est la partie invisible pour les visiteurs mais qui donne vie au site. Le backend conserve toutes les données du webmaster et de ses clients, un peu comme un grand tableau. les langages comme PHP, Ruby, Python, SQL etc...',
        skill: [
          {
            type: 'icon',
            src: 'mdi-language-ruby',
            title: 'Ruby',
            text: 'Dynamic language'
          },
          {
            type: 'icon',
            src: 'mdi-language-ruby-on-rails',
            title: 'Ruby on Rails',
            text: 'Web framework'
          },
          {
            type: 'icon',
            src: 'mdi-database',
            title: 'Database design',
            text: 'MySQL / PostgreSQL'
          }
        ]
      },
      {
        title: 'CI/CD',
        text: 'L\'intégration continue (CI) est un ensemble de pratiques utilisées en génie logiciel consistant à vérifier à chaque modification de code source que le résultat des modifications ne produit pas de régression dans l\'application développée. Le déploiement continu ou Continuous deployment (CD) en anglais, est une approche d\'ingénierie logicielle dans laquelle les fonctionnalités logicielles sont livrées fréquemment par le biais de déploiements automatisés.',
        skill: [
          {
            type: 'image',
            src: '/images/gitea.png',
            title: 'Gitea',
            text: 'Code hosting'
          },
          {
            type: 'image',
            src: '/images/jenkins.png',
            title: 'Jenkins',
            text: 'Automation'
          },
          {
            type: 'image',
            src: '/images/sonarqube.png',
            title: 'SonarQube',
            text: 'Code quality and security'
          },
          {
            type: 'image',
            src: '/images/openproject.jpg',
            title: 'Openproject',
            text: 'Project managment'
          }
        ]
      }
    ]
  }
}
</script>
