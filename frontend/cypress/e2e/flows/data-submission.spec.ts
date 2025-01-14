describe('Data Submission Flow', () => {
  beforeEach(() => {
    cy.login()
  })

  it('successfully submits market data', () => {
    cy.visit('/data/submit')
    
    const testData = {
      symbol: 'AAPL',
      price: '150.50',
      volume: '1000000'
    }
    
    cy.get('[data-testid=symbol-input]').type(testData.symbol)
    cy.get('[data-testid=price-input]').type(testData.price)
    cy.get('[data-testid=volume-input]').type(testData.volume)
    
    cy.get('[data-testid=submit-button]').click()
    
    cy.get('[data-testid=success-message]')
      .should('be.visible')
      .and('contain', 'Data submitted successfully')
    
    // Verify data appears in list
    cy.get('[data-testid=data-list]')
      .should('contain', testData.symbol)
  })

  it('validates required fields', () => {
    cy.visit('/data/submit')
    
    cy.get('[data-testid=submit-button]').click()
    
    cy.get('[data-testid=symbol-error]')
      .should('be.visible')
      .and('contain', 'Symbol is required')
      
    cy.get('[data-testid=price-error]')
      .should('be.visible')
      .and('contain', 'Price is required')
  })
}) 