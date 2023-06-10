/// <reference types="Cypress" />

describe('Add and delete client', () => {
    it('Loads main page, navigates to login, logs in, navigates to add client, adds client, \
    checks it in own clients, deletes it, logs out', () => {
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

      cy.get('#clientsButton')
        .should('exist')
        .should('be.visible')
        .click()
        
      cy.url().should('contain', '/clients')

      cy.get('#addClientButton')
        .should('exist')
        .should('be.visible')
        .click()

      cy.url().should('contain', '/addClient')

      cy.get("#clientEmail-helper-text")
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email is not valid')

      cy.get("#clientPhone-helper-text")
        .should('exist')
        .should('be.visible')
        .should('contain', 'Phone number is not valid')

      cy.get("#clientBirthDate-helper-text")
        .should('exist')
        .should('be.visible')
        .should('contain', 'Date must be of format dd-MM-yyyy and valid')

      cy.get('#addClientFormButton')
        .should('exist')
        .should('be.visible')
        .should('be.disabled')


      cy.get('#clientName')
        .should('exist')
        .should('be.visible')
        .type('test client')
        .should('have.value', 'test client')

      cy.get('#clientEmail')
        .should('exist')
        .should('be.visible')
        .type('bad email')
        .should('have.value', 'bad email')

      cy.get('#clientPhone')
        .should('exist')
        .should('be.visible')
        .type('bad phone')
        .should('have.value', 'bad phone')

      cy.get('#clientBirthDate')
        .should('exist')
        .should('be.visible')
        .type('bad birth date')
        .should('have.value', 'bad birth date')

      cy.get('#clientAddress')
        .should('exist')
        .should('be.visible')
        .type('test client address')
        .should('have.value', 'test client address')

      cy.get('#addClientFormButton')
        .should('exist')
        .should('be.visible')
        .should('be.disabled')

      cy.get('#clientEmail')
        .clear()
        .should('have.value', '')
        .type('testemail@site.com')
        .should('have.value', 'testemail@site.com')

      cy.get("#clientEmail-helper-text")
        .should('not.exist')

      cy.get('#clientPhone')
        .clear()
        .should('have.value', '')
        .type('0743865443')
        .should('have.value', '0743865443')

      cy.get('#clientPhone-helper-text')
        .should('not.exist')

      cy.get('#clientBirthDate')
        .clear()
        .should('have.value', '')
        .type('10-10-2000')
        .should('have.value', '10-10-2000')

      cy.get('#clientBirthDate-helper-text')
        .should('not.exist')

      cy.get('#addClientFormButton')
        .should('be.enabled')
        .click()

      cy.get('#clientDialogOkButton')
        .should('exist')
        .should('be.visible')
        .click()
        .should('not.exist')

      cy.get('#ownClientsButton')
        .should('exist')
        .should('be.visible')
        .click()

      cy.url().should('contain', '/ownClients')

      cy.contains('table tr td','test client')
        .closest('tr')
        .find('#seeEntity')
        .should('exist')
        .should('be.visible')
        .click()

      cy.url().should('contain', '/seeClient')

      cy.get('#clientName')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'test client')

      cy.get('#clientEmail')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'testemail@site.com')

      cy.get('#clientPhone')
        .should('exist')
        .should('be.visible')
        .should('have.value', '0743865443')

      cy.get('#clientAddress')
        .should('exist')
        .should('be.visible')
        .should('have.value', 'test client address')

      cy.get('#ownClientsButton')
        .should('exist')
        .should('be.visible')
        .click()

      
      cy.url().should('contain', '/ownClients')
      cy.contains('table tr td','test client')
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