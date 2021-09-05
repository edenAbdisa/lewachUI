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
    .click();
    cy.wait(500);
    cy.url().should('include', '/report');
  })
 
it('Get graph of item', () => {
  cy.visit('/statistics') 
    cy.get('[data-cy=h3title]').should('contain', 'Statistics') 
    cy.get('input[name="Date"]').invoke('val').then((text) => {
      expect('08/05/2019').to.equal(text);
  }); 
  cy.request('GET', ROUTE.API_GET_ITEM_COUNT_DATE).as('listofITEM')
    cy.get('@listofitem').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get user graph', () => {
    cy.get('#uncontrolled-tab-example-tab-service').first().click() 
    cy.request('GET', ROUTE.API_GET_SERVICE).as('listofservice')
    cy.get('@listofservice').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get graph of user', () => {
    cy.get('#uncontrolled-tab-example-tab-user').next().click() 
    cy.request('GET', ROUTE.API_GET_USER).as('listofuser')
    cy.get('@listofuser').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})