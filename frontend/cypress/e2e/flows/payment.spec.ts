describe('Payment Processing Flow', () => {
  beforeEach(() => {
    cy.login()
  })

  it('completes successful payment', () => {
    cy.visit('/subscription/upgrade')
    
    // Select plan
    cy.get('[data-testid=pro-plan]').click()
    
    // Fill payment details
    cy.get('[data-testid=card-number]').type('4242424242424242')
    cy.get('[data-testid=card-expiry]').type('1225')
    cy.get('[data-testid=card-cvc]').type('123')
    
    cy.get('[data-testid=submit-payment]').click()
    
    // Verify success
    cy.get('[data-testid=payment-success]')
      .should('be.visible')
      .and('contain', 'Payment successful')
      
    // Verify subscription updated
    cy.get('[data-testid=subscription-status]')
      .should('contain', 'Pro Plan')
  })

  it('handles payment errors', () => {
    cy.visit('/subscription/upgrade')
    
    // Select plan
    cy.get('[data-testid=pro-plan]').click()
    
    // Fill invalid payment details
    cy.get('[data-testid=card-number]').type('4242424242424241')
    cy.get('[data-testid=card-expiry]').type('1225')
    cy.get('[data-testid=card-cvc]').type('123')
    
    cy.get('[data-testid=submit-payment]').click()
    
    // Verify error message
    cy.get('[data-testid=payment-error]')
      .should('be.visible')
      .and('contain', 'Your card number is invalid')
  })
}) 