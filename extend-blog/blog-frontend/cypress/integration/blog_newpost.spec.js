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

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test')
      cy.get('#url').type('test')
      cy.get('#author').type('test')
      cy.contains('add').click()
    })

    describe('after blog created',function(){
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('test')
        cy.get('#url').type('test')
        cy.get('#author').type('test')
        cy.contains('add').click()
      })

      it('User click like',function(){

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes : 1')
      })

      it('Delete button clicked', function(){
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.contains('Delete').should('not.exist')
      })

    })

  })
})