/// <reference types="cypress" />
/* eslint-disable no-unused-vars */
beforeEach(function resetData() {
  cy.request('POST', '/reset', {
    todos: []
  })
})

beforeEach(function visitSite() {
  cy.visit('/')
})

it('shows UL-BDD', function () {
  cy.get('.new-todo')
    .type('todo A{enter}')
    .type('todo B{enter}')
    .type('todo C{enter}')
    .type('todo D{enter}')
  cy.contains('ul', 'todo A')
    .should('be.visible')
    .and('have.class', 'todo-list')
    .and('have.css', 'list-style-type', 'none')
  // confirm that the above element
  //  1. is visible
  //  2. has class "todo-list"
  //  3. css property "list-style-type" is equal "none"
})

it('shows UL - TDD', function () {
  cy.get('.new-todo')
    .type('todo A{enter}')
    .type('todo B{enter}')
    .type('todo C{enter}')
    .type('todo D{enter}')
  cy.contains('ul', 'todo A').then(($ul) => {
    assert.exists($ul)

    // assert.isTrue($ul.is(':visible'), 'ul is visible')
    //assert.include($ul[0].className, 'todo-list')
    assert.isTrue($ul.hasClass('todo-list'))
    assert.equal($ul.css('list-style-type'), 'none')
    // use TDD assertions
    // $ul is visible
    // $ul has class "todo-list"
    // $ul css has "list-style-type" = "none"
  })
})

it('every item starts with todo', function () {
  cy.get('.new-todo')
    .type('todo A{enter}')
    .type('todo B{enter}')
    .type('todo C{enter}')
    .type('todo D{enter}')
  cy.get('.todo label').should(($labels) => {
    expect($labels).to.have.length(4)
    $labels.each((k, el) => {
      expect(el.textContent).to.match(/^todo /)
    })
    // confirm that there are 4 labels
    // and that each one starts with "todo-"
  })
})

it('has the right label', () => {
  cy.get('.new-todo').type('todo A{enter}')
  // ?
})

// flaky test - can pass or not depending on the app's speed
// to make the test flaky add the timeout
// in todomvc/app.js "addTodo({ commit, state })" method
it('has two labels', () => {
  cy.get('.new-todo').type('todo A{enter}')
  cy.get('.todo-list li') // command
    .find('label') // command
    .should('contain', 'todo A') // assertion

  cy.get('.new-todo').type('todo B{enter}')
  // ? copy the same check as above
  // then make the test flaky ...
  cy.get('.todo-list li') // command
    .find('label') // command
    .should('contain', 'todo B') // assertion
})

it('solution 1: merges queries', () => {
  cy.get('.new-todo').type('todo A{enter}')
  // ?

  cy.get('.new-todo').type('todo B{enter}')
  // ?
})

it('solution 2: alternate commands and assertions', () => {
  cy.get('.new-todo').type('todo A{enter}')
  // ?

  cy.get('.new-todo').type('todo B{enter}')
  // ?
})

it('retries reading the JSON file', () => {
  // add N items via UI
  // then read the file ./todomvc/data.json
  // and assert it has the N items and the first item
  // is the one entered first
  // note cy.readFile retries reading the file until the should(cb) passes
  // https://on.cypress.io/readilfe
})
