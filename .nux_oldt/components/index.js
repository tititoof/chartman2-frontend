export { default as BaseAvatar } from '../../components/Base/BaseAvatar.vue'
export { default as BaseBtn } from '../../components/Base/BaseBtn.vue'
export { default as BaseIcon } from '../../components/Base/BaseIcon.vue'
export { default as BaseImage } from '../../components/Base/BaseImage.vue'
export { default as BaseInformation } from '../../components/Base/BaseInformation.vue'
export { default as BaseHeading } from '../../components/Base/Heading.vue'
export { default as BaseSubheading } from '../../components/Base/Subheading.vue'
export { default as BaseText } from '../../components/Base/Text.vue'
export { default as BlogAboutMe } from '../../components/Blog/AboutMe.vue'
export { default as BlogInformation } from '../../components/Blog/BlogInformation.vue'
export { default as BlogContactMe } from '../../components/Blog/ContactMe.vue'
export { default as BlogHero } from '../../components/Blog/Hero.vue'
export { default as BlogInfos } from '../../components/Blog/Infos.vue'
export { default as BlogPresentation } from '../../components/Blog/Presentation.vue'
export { default as BlogSkill } from '../../components/Blog/Skill.vue'
export { default as BlogSkills } from '../../components/Blog/Skills.vue'
export { default as HomeFadeView } from '../../components/Home/FadeView.vue'
export { default as HomeAppBar } from '../../components/Home/HomeAppBar.vue'
export { default as HomeArticleList } from '../../components/Home/HomeArticleList.vue'
export { default as HomeCard } from '../../components/Home/HomeCard.vue'
export { default as HomeCategoryList } from '../../components/Home/HomeCategoryList.vue'
export { default as HomeDrawer } from '../../components/Home/HomeDrawer.vue'
export { default as HomeFooter } from '../../components/Home/HomeFooter.vue'
export { default as HomeList } from '../../components/Home/HomeList.vue'
export { default as HomeNew } from '../../components/Home/HomeNew.vue'
export { default as HomeLogin } from '../../components/Home/Login.vue'
export { default as HomeRegister } from '../../components/Home/Register.vue'
export { default as BlogRorDesignIntroduction } from '../../components/Blog/RorDesign/Introduction.vue'
export { default as BlogRorDesignExample } from '../../components/Blog/RorDesign/example.vue'
export { default as BlogRorDesignMyDesign } from '../../components/Blog/RorDesign/my_design.vue'
export { default as BlogRorDesign } from '../../components/Blog/RorDesign/ror_design.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
