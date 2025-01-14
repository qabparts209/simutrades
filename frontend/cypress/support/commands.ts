/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

// Login command
Cypress.Commands.add('login', () => {
  const email = Cypress.env('TEST_USER_EMAIL')
  const password = Cypress.env('TEST_USER_PASSWORD')
  
  return cy.request({
    method: 'POST',
    url: '/api/v1/auth/login',
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token)
  })
})

// Get by test ID command
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid=${testId}]`)
})

export {} 