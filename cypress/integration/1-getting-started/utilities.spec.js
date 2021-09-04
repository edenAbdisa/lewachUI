import * as ROUTE from "../../../src/constants/routes.js";
import * as THEME from "../../../src/constants/theme.js";
before(() => {
    cy.visit('/')
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
    cy.wait(500);
    cy.url().should('include', '/utilities')
  })
 
it('Get list of category', () => {
  cy.visit('/utilities') 
    cy.get('[data-cy=h3title]').should('contain', 'Utilities')  
  cy.request('GET', ROUTE.API_GET_CATEGORY).as('listofcategory')
    cy.get('@listofcategory').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get list of type', () => {
    cy.get('#uncontrolled-tab-example-tab-type').first().click() 
    cy.request('GET', ROUTE.API_GET_TYPE).as('listoftype')
    cy.get('@listoftype').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get list of membership', () => {
    cy.get('#uncontrolled-tab-example-tab-membership').next().click() 
    cy.request('GET', ROUTE.API_GET_MEMBERSHIP).as('listofmembership')
    cy.get('@listofmembership').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})

it('Get list of report type', () => {
  cy.get('#uncontrolled-tab-example-tab-reporttype').next().click() 
  cy.request('GET', ROUTE.API_GET_REPORTTYPE).as('listofreporttype')
  cy.get('@listofreporttype').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers') 
    })
})