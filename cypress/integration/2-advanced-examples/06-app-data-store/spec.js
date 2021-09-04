/// <reference types="cypress" />
// application should be running at port 3000
// and the "localhost:3000" is set as "baseUrl" in "cypress.json"
describe('App Data Store', { retries: 2 }, () => {
  beforeEach(() => {
    cy.request('POST', '/reset', {
      todos: []
    })
  })
  beforeEach(() => {
    cy.visit('/')
  })
  beforeEach(function stubRandomId() {
    let count = 1
    cy.window()
      .its('Math')
      .then((Math) => {
        cy.stub(Math, 'random', () => {
          return `0.${count++}`
        }).as('random') // save reference to the spy
      })
  })
  afterEach(function () {
    // makes debugging failing tests much simpler
    cy.screenshot(this.currentTest.fullTitle())
  })
  /**
   * Adds a todo item
   * @param {string} text
   */
  const addItem = (text) => {
    cy.get('.new-todo').type(`${text}{enter}`)
  }

  it('adds items to store', () => {
    addItem('something')
    addItem('something else')
    // get application's window
    // then get app, $store, state, todos
    // it should have 2 items
    cy.window().its('app.$store.state.todos').should('have.length', 2)
  })

  it('creates an item with id 1', () => {
    cy.server()
    cy.route('POST', '/todos').as('new-item')

    // TODO change Math.random to be deterministic

    // STEPS
    // get the application's "window" object using cy.window
    // then change its Math object and replace it
    // with your function that always returns "0.1"

    addItem('something')
    // confirm the item sent to the server has the right values
    cy.wait('@new-item').its('request.body').should('deep.equal', {
      id: '1',
      title: 'something',
      completed: false
    })
  })

  // stub function Math.random using cy.stub
  it('creates an item with id using a stub', () => {
    cy.window()
      .its('Math')
      .then((Math) => {
        cy.stub(Math, 'random', () => {
          return `0.${count++}`
        }).as('random') // save reference to the spy
      })
    addItem('foo')
    cy.get('@random').should('have.been.calledOnce')
    // get the application's "window.Math" object using cy.window
    // replace Math.random with cy.stub and store the stub under an alias
    // create a todo using addItem("foo")
    // and then confirm that the stub was called once
  })

  it('puts the todo items into the data store', () => {
    // application uses data store to store its items
    // you can get the data store using "window.app.$store.state.todos"
    // add a couple of items
    // get the data store
    // check its contents
    let count = 0
    cy.window()
      .its('Math')
      .then((Math) => {
        cy.stub(Math, 'random', () => {
          return `0.${count++}`
        }) // save reference to the spy
      })
    addItem('Item 1')
    addItem('Item 2')
    cy.window()
      .its('app.$store.state.todos')
      .should('deep.equal', [
        { title: 'Item 1', completed: false, id: '1' },
        { title: 'Item 2', completed: false, id: '2' }
      ])
  })
  it('adds todos via app', () => {
    // bypass the UI and call app's actions directly from the test
    // app.$store.dispatch('setNewTodo', <desired text>)
    // app.$store.dispatch('addTodo')
    // using https://on.cypress.io/invoke
    // bypass the UI and call app's actions directly from the test
    // app.$store.dispatch('setNewTodo', <desired text>)
    // app.$store.dispatch('addTodo')
    cy.window().its('app.$store').invoke('dispatch', 'setNewTodo', 'todoviaapp')

    cy.window().its('app.$store').invoke('dispatch', 'addTodo')
    // and then check the UI
    cy.contains('li.todo', 'todoviaapp')
  })
  it('handles todos with blank title', () => {
    // bypass the UI and call app's actions directly from the test
    // app.$store.dispatch('setNewTodo', <desired text>)
    // app.$store.dispatch('addTodo')
    // using https://on.cypress.io/invoke
    // and then
    // confirm the application is not breaking
    cy.window().its('app.$store').invoke('dispatch', 'setNewTodo', ' ')

    cy.window().its('app.$store').invoke('dispatch', 'addTodo')
    cy.get('li.todo').find('label').should('have.text', ' ')
  })
})
