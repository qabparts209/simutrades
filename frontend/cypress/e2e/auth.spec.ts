describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginRequest')
  })

  it('completes the login process', () => {
    cy.visit('/login')
    cy.get('[data-testid=email]').type('test@example.com')
    cy.get('[data-testid=password]').type('password123')
    cy.get('[data-testid=submit]').click()
    
    cy.wait('@loginRequest')
    cy.url().should('include', '/dashboard')
    cy.get('[data-testid=user-menu]').should('be.visible')
  })

  it('handles login errors', () => {
    cy.visit('/login')
    cy.get('[data-testid=email]').type('invalid@example.com')
    cy.get('[data-testid=password]').type('wrongpass')
    cy.get('[data-testid=submit]').click()
    
    cy.get('[data-testid=error-message]')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })
}) 