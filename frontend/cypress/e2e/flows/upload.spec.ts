describe('File Upload Flow', () => {
  beforeEach(() => {
    cy.login() // Custom command for authentication
  })

  it('successfully uploads a file', () => {
    cy.visit('/upload')
    
    // Upload file
    cy.get('[data-testid=file-input]')
      .attachFile('test-file.csv')
    
    // Verify upload progress
    cy.get('[data-testid=upload-progress]')
      .should('be.visible')
    
    // Verify success message
    cy.get('[data-testid=upload-success]')
      .should('be.visible')
      .and('contain', 'File uploaded successfully')
    
    // Verify file appears in list
    cy.get('[data-testid=files-list]')
      .should('contain', 'test-file.csv')
  })

  it('handles upload errors gracefully', () => {
    cy.visit('/upload')
    
    // Try uploading invalid file
    cy.get('[data-testid=file-input]')
      .attachFile('invalid.exe')
    
    // Verify error message
    cy.get('[data-testid=upload-error]')
      .should('be.visible')
      .and('contain', 'Invalid file type')
  })
}) 