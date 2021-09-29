it('loads', () => {
  cy.visit('/')
  cy.wait(2500);  
  cy.get('.form-group')
  cy.get('[name="email"]').type('liwach2021@gmail.com{enter}')
  cy.get('[name="password"]').type('password{enter}') 
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
  cy.wait(2500);
})