it('loads', () => {
  cy.visit('localhost:3000')
})
describe('log in page', () => {
  it('Check if input appears', () => {   
    cy.get('.form-group')
    cy.get('[name="email"]').type('string@gmail.com{enter}')
    cy.get('[name="password"]').type('pass{enter}') 
    /* cy.wait(500);
    cy.window().then(win => {
      win.document
        .querySelector("iframe[src*='recaptcha']")
        .contentDocument.getElementById("recaptcha-token")
        .click();
    }); */ 
    cy.get('[data-cy=signinSubmit]')
    .invoke('attr', 'disabled', false)
    .click()
  })
})