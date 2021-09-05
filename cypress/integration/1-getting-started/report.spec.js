import * as ROUTE from "../../../src/constants/routes.js";
import * as THEME from "../../../src/constants/theme.js";
before(() => {
    cy.visit('/')
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
    cy.wait(500);
    cy.url().should('include', '/report')
  })
 
it('Get list of item', () => {
    cy.get('[data-cy=h3title]').should('contain', 'Report') 
    cy.request('GET', ROUTE.API_GET_ITEM).as('listofitem')
    cy.get('@listofitem').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get list of service', () => {
    cy.get('#uncontrolled-tab-example-tab-service').first().click()
    cy.get('[data-cy=h3title]').should('contain', 'Report') 
    cy.request('GET', ROUTE.API_GET_SERVICE).as('listofservice')
    cy.get('@listofservice').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get list of user', () => {
    cy.get('#uncontrolled-tab-example-tab-user').click()
    cy.get('[data-cy=h3title]').should('contain', 'Report') 
    cy.request('GET', ROUTE.API_GET_USER).as('listofuser')
    cy.get('@listofuser').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})