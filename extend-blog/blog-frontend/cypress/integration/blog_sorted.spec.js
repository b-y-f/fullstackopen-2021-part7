/* eslint-disable linebreak-style */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const tester = {
      username:'test',
      password:'test',
      name:'tester',
    }
    cy.request('POST','http://localhost:3000/api/users',tester)

    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    ct.
  })
})