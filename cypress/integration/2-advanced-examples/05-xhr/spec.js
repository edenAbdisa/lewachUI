/// <reference types="cypress" />
//
// note, we are not resetting the server before each test
// and we want to confirm that IF the application has items already
// (for example add them manually using the browser localhost:3000)
// then these tests fail!
//
// see https://on.cypress.io/intercept

/* eslint-disable no-unused-vars */

it('starts with zero items (waits)', () => {
  cy.visit('/')
  // wait 1 second
  cy.wait(1000)
  // then check the number of items
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items', () => {
  // start Cypress network proxy with cy.server()
  // spy on route `GET /todos`
  //  with cy.intercept(...).as(<alias name>)
  // THEN visit the page
  cy.intercept('GET', '/todos').as('todos')
  cy.visit('/')
  cy.wait('@todos').its('response.body').should('have.length', 0)
  // wait for `GET /todos` route
  //  using "@<alias name>" string
  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items (stubbed response)', () => {
  // start Cypress network server
  // stub `GET /todos` with []
  // save the stub as an alias

  // THEN visit the page
  cy.intercept('/todos', []).as('todos')
  cy.visit('/')
  cy.wait('@todos').its('response.body').should('have.length', 0)
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items (fixture)', () => {
  // start Cypress network server
  // stub `GET /todos` with fixture "empty-list"

  // visit the page
  cy.intercept('/todos', { fixture: 'empty-list.json' }).as('todos')
  cy.visit('/')
  cy.wait('@todos').its('response.body').should('have.length', 0)
  cy.get('li.todo').should('have.length', 0)
})

it('loads several items from a fixture', () => {
  // stub route `GET /todos` with data from a fixture file "two-items.json"
  // THEN visit the page
  cy.intercept('/todos', { fixture: 'two-items.json' }).as('todos')
  cy.visit('/')
  cy.wait('@todos').its('response.body').should('have.length', 2)
  cy.get('li.todo').should('have.length', 2)
  cy.get('li.todo.completed').should('have.length', 1)
  // then check the DOM: some items should be marked completed
  // we can do this in a variety of ways
})

it('posts new item to the server', () => {
  cy.intercept('POST', '/todos').as('new-item')
  cy.visit('/')
  cy.get('.new-todo').type('test api{enter}')
  cy.wait('@new-item').its('request.body').should('have.contain', {
    title: 'test api',
    completed: false
  })
})

it('posts new item to the server response', () => {
  cy.intercept('POST', '/todos').as('new-item')
  cy.visit('/')
  cy.get('.new-todo').type('test api{enter}')
  cy.wait('@new-item').its('response.body').should('have.contain', {
    title: 'test api',
    completed: false
  })
})

it('handles 404 when loading todos', () => {
  // when the app tries to load items
  // set it up to fail with 404 to GET /todos
  // after delay of 2 seconds
  cy.visit('/', {
    // spy on console.error because we expect app would
    // print the error message there
    onBeforeLoad: (win) => {
      // spy
    }
  })
  // observe external effect from the app - console.error(...)
  // cy.get('@console-error')
  //   .should(...)
})

it('shows loading element', () => {
  // delay XHR to "/todos" by a few seconds
  // and respond with an empty list
  // shows Loading element
  // wait for the network call to complete
  // now the Loading element should go away
})

it('handles todos with blank title', () => {
  // return a list of todos with one todo object
  // having blank spaces or null
  // confirm the todo item is shown correctly
})

it('waits for network to be idle for 1 second', () => {
  // intercept all requests
  // on every intercept set the timestamp
  // retry using should(cb) checking the time
  // that has passed since the network timestamp
})
