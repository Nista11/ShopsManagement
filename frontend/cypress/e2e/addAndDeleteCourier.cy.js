/// <reference types="Cypress" />

describe('Add and delete courier', () => {
    it('Loads main page, navigates to login, logs in, navigates to add courier, adds courier, \
    checks it in own couriers, deletes it, logs out', () => {
      cy.visit('localhost:8080')
  
      cy.get('#profileButton')
        .should('not.exist')
  
      cy.get('#loginButton')
        .should('exist')
        .should('be.visible')
        .click()
  
      cy.url().should('include', '/login')
  
      cy.get('#username')
        .type('admin')
        .should('have.value', 'admin')
  
      cy.get('#password')
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

      cy.get('#couriersButton')
        .should('exist')
        .should('be.visible')
        .click()
        
      cy.url().should('contain', '/couriers')

      cy.get('#addCourierButton')
        .should('exist')
        .should('be.visible')
        .click()

      cy.url().should('contain', '/addCourier')

      cy.get("#courierEmail-helper-text")
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email is not valid')

      cy.get("#courierPhone-helper-text")
      .should('exist')
      .should('be.visible')
      .should('contain', 'Phone number is not valid')

      cy.get('#addCourierFormButton')
        .should('exist')
        .should('be.visible')
        .should('be.disabled')


      cy.get('#courierName')
        .should('exist')
        .should('be.visible')
        .type('test courier')
        .should('have.value', 'test courier')

      cy.get('#courierEmail')
        .should('exist')
        .should('be.visible')
        .type('bad email')
        .should('have.value', 'bad email')

      cy.get('#courierPhone')
        .should('exist')
        .should('be.visible')
        .type('bad phone')
        .should('have.value', 'bad phone')

      cy.get('#courierDeliveryPrice')
        .should('exist')
        .should('be.visible')
        .type('bad delivery price')
        .should('have.value', 'bad delivery price')

      cy.get('#courierAddress')
        .should('exist')
        .should('be.visible')
        .type('test courier address')
        .should('have.value', 'test courier address')

      cy.get('#courierDescription')
        .should('exist')
        .should('be.visible')
        .type('test courier description')
        .should('have.value', 'test courier description')

      cy.get('#addCourierFormButton')
        .should('exist')
        .should('be.visible')
        .should('be.disabled')

      cy.get('#courierEmail')
        .clear()
        .should('have.value', '')
        .type('testemail@site.com')
        .should('have.value', 'testemail@site.com')

      cy.get("#courierEmail-helper-text")
        .should('not.exist')

      cy.get('#courierPhone')
        .clear()
        .should('have.value', '')
        .type('0743865443')
        .should('have.value', '0743865443')

      cy.get('#courierPhone-helper-text')
        .should('not.exist')

      cy.get('#courierDeliveryPrice')
        .clear()
        .should('have.value', '')
        .type('120')
        .should('have.value', '120')

      cy.get('#courierDeliveryPrice-helper-text')
        .should('not.exist')

      cy.get('#addCourierFormButton')
        .should('be.enabled')
        .click()

      cy.get('#courierDialogOkButton')
        .should('exist')
        .should('be.visible')
        .click()
        .should('not.exist')

      cy.get('#ownCouriersButton')
        .should('exist')
        .should('be.visible')
        .click()

      cy.url().should('contain', '/ownCouriers')

      cy.contains('table tr td','test courier')
        .closest('tr')
        .find('#seeEntity')
        .should('exist')
        .should('be.visible')
        .click()

      cy.url().should('contain', '/seeCourier')

      cy.get('#courierName')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'test courier')

      cy.get('#courierEmail')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'testemail@site.com')

      cy.get('#courierPhone')
        .should('exist')
        .should('be.visible')
        .should('have.value', '0743865443')

      cy.get('#courierDeliveryPrice')
        .should('exist')
        .should('be.visible')
        .should('have.value', '120')

      cy.get('#courierAddress')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'test courier address')

      cy.get('#courierDescription')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'test courier description')

      cy.get('#ownCouriersButton')
        .should('exist')
        .should('be.visible')
        .click()

      
      cy.url().should('contain', '/ownCouriers')
      cy.contains('table tr td','test courier')
        .closest('tr')
        .find('#deleteEntity')
        .should('exist')
        .should('be.visible')
        .click()
        
      cy.get('#deleteEntityDialogButton')
        .should('exist')
        .should('be.visible')
        .click()
    })
  })