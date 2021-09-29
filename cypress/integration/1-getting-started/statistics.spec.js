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
    
  cy.visit('/statstics') 
  })
it('Get graph of user', () => { 
  //cy.get('[data-cy=h3title]').should('contain', 'Statistics')   
  cy.request('GET', ROUTE.API_GET_USER_COUNT_DATE+'/created_at/2021-09-09/2021-09-09').as('graphuser')
    cy.get('@graphuser').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Get item graph', () => {
  cy.request('GET', ROUTE.API_GET_ITEM_COUNT_DATE+'/created_at/2021-09-09/2021-09-09').as('graphitem')
  cy.get('@graphitem').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers') 
    })
})
it('Get request graph', () => {
  cy.request('GET', ROUTE.API_GET_REQUEST_COUNT_DATE+'/created_at/2021-09-09/2021-09-09').as('graphrequest')
  cy.get('@graphrequest').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers') 
    })
})
it('Get service graph', () => {
  cy.request('GET', ROUTE.API_GET_SERVICE_COUNT_DATE+'/created_at/2021-09-09/2021-09-09').as('graphservice')
  cy.get('@graphservice').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers') 
    })
})
it('Get flag graph', () => {
  cy.request('GET', ROUTE.API_GET_FLAG_COUNT_DATE+'/created_at/2021-09-09/2021-09-09').as('graphflag')
  cy.get('@graphflag').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers') 
    })
})