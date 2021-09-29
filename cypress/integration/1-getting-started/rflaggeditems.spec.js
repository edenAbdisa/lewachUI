import * as ROUTE from "../../../src/constants/routes.js";
import * as THEME from "../../../src/constants/theme.js";
/*  before(() => {
    cy.visit('/')
    cy.get('.form-group')
    cy.get('[name="email"]').type('liwach2021@gmail.com{enter}')
    cy.get('[name="password"]').type('password{enter}') 
     
    cy.get('[data-cy=signinSubmit]')
    .invoke('attr', 'disabled', false)
    .click()
    cy.wait(1500);
    cy.url().should('include', '/report')
  })  */
 
it('Get list of flagged item', () => {
  cy.visit('/flaggeditem') 
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
  cy.get('[data-cy=flaggeddatatable]')
    .click()
    cy.get('.form-group')
    cy.get('#formBasicAddCategory').type('CategoryNewForTest{enter}') 
    cy.get('[data-cy=categorySubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeCategorypopup]') 
    .click()
    cy.wait(500);
})
