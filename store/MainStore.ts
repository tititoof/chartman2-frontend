import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator'
import { UserType } from '~/types/index'

@Module({
  name: 'MainStore',
  stateFactory: true,
  namespaced: true
})
export default class MainStore extends VuexModule {
  snackbarText: string = ''
  snackbarVisible: boolean = false
  user: UserType = {
    id: 0,
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

  @VuexAction({ rawError: true })
  showSnackbar (text: string) {
    this.context.commit('setSnackbarText', text)
    this.context.commit('setSnackbar', true)
    setTimeout(() => {
      this.context.commit('setSnackbar', false)
    }, 6000)
  }

  @VuexAction({ commit: 'setSnackbar', rawError: true })
  closeSnackbar () {
    return false
  }
}
