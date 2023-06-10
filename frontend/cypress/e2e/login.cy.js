/// <reference types="Cypress" />

describe('Login', () => {
  it('Loads main page, navigates to login, sends invalid credentials, logs in, logs out', () => {
    cy.visit('localhost:8080')

    cy.get('#profileButton')
      .should('not.exist')

    cy.get('#loginButton')
      .should('exist')
      .should('be.visible')
      .click()

    cy.url().should('include', '/login')

    cy.get('#username')
      .should('exist')
      .should('be.visible')
      .type('badcredential')
      .should('have.value', 'badcredential')

    cy.get('#password')
      .should('exist')
      .should('be.visible')
      .type('badpassword')
      .should('have.value', 'badpassword')

    cy.get('#loginFormButton')
      .should('exist')
      .should('be.visible')
      .click()

    cy.url().should('contain', '/login')
    cy.contains('Invalid credentials')

    cy.get('#username')
      .clear()
      .should('have.value', '')
      .type('admin')
      .should('have.value', 'admin')

    cy.get('#password')
      .clear()
      .should('have.value', '')
      .type('password')
      .should('have.value', 'password')

    cy.get('#loginFormButton')
      .should('exist')
      .should('be.visible')
      .click()

    cy.url().should('not.contain', '/login')

    cy.get('#profileButton')
      .should('exist')
      .should('be.visible')
      .click()

    cy.url().should('contain', '/updateProfile/admin')
    cy.get('#usernameProfile')
      .should('exist')
      .should('be.visible')
      .should('have.attr', 'value', 'admin')
    cy.get('#goHomeButton')
      .should('exist')
      .should('be.visible')
      .click()

    cy.url().should('not.contain', '/updateProfile/admin')

    cy.get('#logoutButton')
      .should('exist')
      .should('be.visible')
      .click()
      .should('not.exist')

    cy.get('#loginButton')
      .should('exist')
      .should('be.visible')
  })
})