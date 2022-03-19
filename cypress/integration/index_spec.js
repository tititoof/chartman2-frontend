describe('home', () => {
  it('>> diplay', () => {
    cy.visit('http://localhost:3000')

    cy.get('div.text-h4').should('contain', 'Developpement agile avec Ruby on Rails & VueJS')
  })

  it('>> buttons', () => {
    cy.intercept({ method: 'GET', url: '/articles/categories' }, { fixture: 'articlesCategories.json' }).as('getArticlesCategories')
    cy.visit('http://localhost:3000')

    cy.get('[e2e="Articles"]').click()
  })
})
