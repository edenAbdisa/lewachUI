import * as ROUTE from "../../../src/constants/routes.js";
import * as THEME from "../../../src/constants/theme.js";
 
  it('loads', () => {
    cy.visit('/')
    cy.wait(2500);  
    cy.get('.form-group')
    cy.get('[name="email"]').type('liwach2021@gmail.com{enter}')
    cy.get('[name="password"]').type('password{enter}') 
    
    cy.get('[data-cy=signinSubmit]')
    .invoke('attr', 'disabled', false)
    .click()
    cy.wait(2500);
    
  cy.visit('/flaggeditem') 
  })
it('Get list of flagged item', () => {
  cy.wait(1500);
    cy.get('[data-cy=h3title]').should('contain', 'Flagged Items')  
  cy.request('GET', ROUTE.API_GET_FLAG).as('listofflaggeditem')
  cy.wait(1500);
    cy.get('@listofflaggeditem').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Approve flagged item', () => { 
  cy.get('#cell-1-29 > button').click() 
  cy.get('[data-cy=removeSubmit]') 
  .click() 
  cy.wait(500);
}) 
it('Keep flagged item', () => { 
  cy.get('#cell-1-29 > button').click() 
  cy.get('[data-cy=removeSubmit]') 
  .click() 
  cy.wait(500);
})