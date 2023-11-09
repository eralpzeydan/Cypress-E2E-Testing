/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render main the main image', () => {
    cy.visit('http://localhost:5173/');
    //cy.get('.main-header img');  
    //cy.get('.main-header').get('img'); looks for any image in the page not in the main-header class
    cy.get('.main-header').find('img');
   
  })

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('My Cypress Course Tasks'); 

  })
})