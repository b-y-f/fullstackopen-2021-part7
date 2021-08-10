/* eslint-disable linebreak-style */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    cy.createUser({ username:'test',password:'test', name:'Bill' })

    // log in user here
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
    cy.login({ username:'test',password:'test' })
    // Create 3 blogs
    cy.createBlog({ title:'t1', author:'bbbb',url:'www.url',likes:1 })
    cy.createBlog({ title:'t2', author:'bbbb',url:'www.url',likes:2 })
    cy.createBlog({ title:'t3', author:'bbbb',url:'www.url',likes:3 })
  })


  it('Test if sorted',function(){
    cy.get('.blogLikes').eq(0).contains('3')
    cy.get('.blogLikes').eq(2).contains('1')
  })
})

