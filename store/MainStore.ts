import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator'
import { config } from 'vuex-module-decorators'
import { UserType } from '~/types/index'

config.rawError = true
@Module({
  name: 'MainStore',
  stateFactory: true,
  namespaced: true
})
export default class MainStore extends VuexModule {
  snackbarText: string = ''
  snackbarVisible: boolean = false
  user: UserType = {
    id: '',
    name: '',
    email: '',
    roles: [],
    groups: []
  }

  actionCables: Array<object> = [
    { role: 'contact', channel: 'ContactChannel' }
  ]

  @VuexMutation
  setSnackbarText (text: string) {
    this.snackbarText = text
  }

  @VuexMutation
  setSnackbar (visible: boolean) {
    this.snackbarVisible = visible
  }

  get isSnackbarVisible (): boolean {
    return this.snackbarVisible
  }

  get getSnackbarText (): string {
    return this.snackbarText
  }

  get listActionCables (): Array<Object> {
    return this.actionCables
  }

  @VuexAction
  showSnackbar (text: string) {
    this.setSnackbarText(text)
    this.setSnackbar(true)

    setTimeout(() => {
      this.setSnackbar(false)
    }, 6000)
  }

  @VuexAction({ commit: 'setSnackbar' })
  closeSnackbar () {
    return false
  }
}
