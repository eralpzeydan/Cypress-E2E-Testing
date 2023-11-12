/// <reference types="Cypress" />

describe('contact form ', () => {
    it('should submit the from', () => {
        cy.visit('http://localhost:5173/about')
        cy.get('[data-cy="contact-input-message"]').type('Hello World!');
        cy.get('[data-cy="contact-input-name"]').type('eralp zeydan');
        cy.get('[data-cy="contact-input-email"]').type('test@example.com');
        cy.get('[data-cy="contact-btn-submit"]')
            .click()
            .contains('Sending...')
            .should('have.attr', 'disabled');
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn')
        cy.get('@submitBtn').click()
        cy.get('@submitBtn') .contains('Sending...')
        cy.get('@submitBtn').should('have.attr', 'disabled'); 
        
        cy.get('[data-cy="contact-btn-submit"]').then( (el) => {
            expect(el.attr('disabled')).to.not.be.undefined;
            expect(el.text()).to.be('Send Message');
        });

        cy.get('[data-cy="contact-input-email"]').type('type@example{enter}')
    });

    it('should validate the form input', () => {
        cy.visit('http://localhost:5173/about')
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]').then( (el) => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...')
        })
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
        cy.get('[data-cy="contact-input-message"]').blur()
    })
  })