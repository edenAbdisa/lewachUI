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
    
  cy.visit('/membership') 
  })
it('Get list of membership ', () => {
  cy.wait(1500);
    cy.get('[data-cy=h3title]').should('contain', 'User Managment')  
  cy.request('GET', ROUTE.API_GET_USER+'/pending').as('listofmembershipitem')
  cy.wait(1500);
    cy.get('@listofmembershipitem').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
/* it('Approve flagged item', () => { 
  cy.get('#cell-1-110 > button').click()
    cy.get('.form-group')
    cy.get('#formBasicAddCategory').type('CategoryuNewForTest{enter}') 
    cy.wait(500);
    cy.get('[data-cy=categorySubmit]').click()
    cy.wait(500);
    cy.get('[data-cy=closeCategorypopup]') 
    .click()
    cy.wait(500); 
}) */
