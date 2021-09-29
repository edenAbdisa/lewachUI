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
    
  cy.visit('/utilities') 
  })
it('Get list of category', () => { 
cy.wait(2500);
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
    cy.get('#formBasicAddCategory').type('CategoryuNewForTest{enter}') 
    cy.wait(500);
    cy.get('[data-cy=categorySubmit]').click()
    cy.wait(500);
    cy.get('[data-cy=closeCategorypopup]') 
    .click()
    cy.wait(500);
})
it('Edit category', () => { 
  cy.get('#cell-1-110 > button').click()
    cy.get('.form-group')
    cy.get('#formBasicAddCategory').type('CategoryuNewForTest{enter}') 
    cy.wait(500);
    cy.get('[data-cy=categorySubmit]').click()
    cy.wait(500);
    cy.get('[data-cy=closeCategorypopup]') 
    .click()
    cy.wait(500);
})
it('Delete category', () => { 
  cy.get('#cell-1-110 > button').click()
    cy.get('.form-group')  
    cy.wait(500);
    cy.get('[data-cy=categorySubmit]').click()
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
    cy.get('#formBasicAddType').type('NewuType{enter}') 
    cy.get('#exampleForm\\.ControlSelect2').select('Appliance')
    cy.get('[data-cy=typeSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeTypepopup]') 
    .click()
    cy.wait(500);
})
it('Edit type', () => { 
  cy.get('#cell-1-78 > button').click()
  cy.get('.form-group')
  cy.get('#formBasicAddType').type('NewuType{enter}') 
  cy.get('#exampleForm\\.ControlSelect2').select('Appliance')
  cy.get('[data-cy=typeSubmit]') 
  .click()
  cy.wait(500);
  cy.get('[data-cy=closeTypepopup]') 
  .click()
  cy.wait(500);
})
it('Delete type', () => { 
  cy.get('#cell-1-78> button').click()
  cy.get('.form-group')
  cy.get('#formBasicAddType').type('NewuType{enter}') 
  cy.get('#exampleForm\\.ControlSelect2').select('Appliance')
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
    cy.get('#formBasicAddMembership').type('NewuMembership{enter}') 
    cy.get('[data-cy=transactionLimit]').type('45{enter}') 
    cy.get('[data-cy=limitOfPost]').type('45{enter}') 
    cy.get('[data-cy=membershipSubmit]').click()
    cy.wait(500);
    cy.get('[data-cy=closeMembershippopup]').click()
    cy.wait(500);
})
it('Edit membership', () => { 
  cy.get('#cell-1-51 > button').click()
  cy.get('.form-group')
    cy.get('#formBasicAddMembership').type('NewuMembership{enter}') 
    cy.get('[data-cy=transactionLimit]').type('45{enter}') 
    cy.get('[data-cy=limitOfPost]').type('45{enter}') 
    cy.get('[data-cy=membershipSubmit]').click()
    cy.wait(500);
    cy.get('[data-cy=closeMembershippopup]').click()
    cy.wait(500);
})
it('Delete membership', () => { 
  cy.get('#cell-1-51 > button').click()
  cy.get('.form-group')
    cy.get('#formBasicAddMembership').type('NewuMembership{enter}') 
    cy.get('[data-cy=transactionLimit]').type('45{enter}') 
    cy.get('[data-cy=limitOfPost]').type('45{enter}') 
    cy.get('[data-cy=membershipSubmit]').click()
    cy.wait(500);
    cy.get('[data-cy=closeMembershippopup]').click()
    cy.wait(500);
})
it('Get list of report type', () => {
  cy.get('#uncontrolled-tab-example-tab-reporttype').click() 
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
    cy.get('[data-cy=reporttypeName]').type('NewuReporttype{enter}') 
    cy.get('#exampleForm\\.ControlSelect2').select('Item') 
    cy.get('[data-cy=reporttypeSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeReporttypepopup]') 
    .click()
    cy.wait(500);
})
it('Edit report type', () => { 
  cy.get('#cell-1-22 > button').click()
  cy.get('.form-group')
    cy.get('[data-cy=reporttypeName]').type('NewuReporttype{enter}') 
    cy.get('#exampleForm\\.ControlSelect2').select('Item') 
    cy.get('[data-cy=reporttypeSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeReporttypepopup]') 
    .click()
    cy.wait(500);
})
it('Delete report type', () => { 
  cy.get('#cell-1-22 > button').click()
  cy.get('.form-group')
    cy.get('[data-cy=reporttypeName]').type('NewuReporttype{enter}') 
    cy.get('#exampleForm\\.ControlSelect2').select('Item') 
    cy.get('[data-cy=reporttypeSubmit]') 
    .click()
    cy.wait(500);
    cy.get('[data-cy=closeReporttypepopup]') 
    .click()
    cy.wait(500);
})

it('Logout', () => {
  cy.wait(1500)
    cy.get('.mr-sm-2 > .nav-link').click()
    cy.url().should('include', '/signin')
})