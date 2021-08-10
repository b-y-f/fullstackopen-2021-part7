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
  })

  it('Login form work?', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials',function(){
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('tester logged in')
      cy.contains('logout').click()
    })



    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

})