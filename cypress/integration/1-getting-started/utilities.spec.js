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
 
it('Get list of category', () => {
  cy.visit('/utilities') 
    cy.get('[data-cy=h3title]').should('contain', 'Utilities')  
  cy.request('GET', ROUTE.API_GET_CATEGORY).as('listofcategory')
    cy.get('@listofcategory').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Add category', () => { 
  cy.get('[data-cy=addCategory]')
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
it('Get list of type', () => {
    cy.get('#uncontrolled-tab-example-tab-type').first().click() 
    cy.request('GET', ROUTE.API_GET_TYPE).as('listoftype')
    cy.get('@listoftype').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Add type', () => { 
  cy.get('[data-cy=addType]')
    .click()
    cy.get('.form-group')
    cy.get('#formBasicAddType').type('NewType{enter}') 
    cy.get('#exampleForm\\.ControlSelect2').select('Computers')
    cy.get('[data-cy=typeSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeTypepopup]') 
    .click()
    cy.wait(500);
})
it('Get list of membership', () => {
    cy.get('#uncontrolled-tab-example-tab-membership').click() 
    cy.request('GET', ROUTE.API_GET_MEMBERSHIP).as('listofmembership')
    cy.get('@listofmembership').should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers') 
      })
})
it('Add membership', () => { 
  cy.get('[data-cy=addMembership]')
    .click()
    cy.get('.form-group')
    cy.get('#formBasicAddMembership').type('NewMembership{enter}') 
    cy.get('transactionLimit').type('45{enter}') 
    cy.get('limitOfPost').type('45{enter}') 
    cy.get('[data-cy=membershipSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeMembershippopup]') 
    .click()
    cy.wait(500);
})
it('Get list of report type', () => {
  cy.get('#uncontrolled-tab-example-tab-reporttype').next().click() 
  cy.request('GET', ROUTE.API_GET_REPORTTYPE).as('listofreporttype')
  cy.get('@listofreporttype').should((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers') 
    })
})
it('Add report type', () => { 
  cy.get('[data-cy=addReporttype]')
    .click()
    cy.get('.form-group')
    cy.get('#formBasicAddReporttype').type('NewReporttype{enter}') 
    cy.get('#exampleForm\\.ControlSelect2').select('Users') 
    cy.get('[data-cy=reporttypeSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeReporttypepopup]') 
    .click()
    cy.wait(500);
})