/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login user
     */
    login(): Chainable<void>
    
    /**
     * Custom command to select DOM element by data-testid attribute
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
  }
} 