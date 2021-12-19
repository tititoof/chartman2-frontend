const storeMock = {
  modules: {
    MainStore: {
      namespaced: true,
      actions: {
        showSnackbar: jest.fn()
      },
      getters: {
        isSnackbarVisible: jest.fn(),
        getSnackbarText: jest.fn()
      }
    }
  }
}

export default storeMock