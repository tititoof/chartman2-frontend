describe('story one', () => {
  it('works', () => {
    cy.visit('/')
    cy.contains('Nom d\'utilistateur')
    cy.contains('Mot de passe')
  })
})