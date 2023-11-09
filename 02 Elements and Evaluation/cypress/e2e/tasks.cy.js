/// <reference types="Cypress" />

//before every test cypress reload the page and anything related to previous test is just erases
describe('task managment', () => {
    it('should open and close the new task modal', () => {
        cy.visit('http://localhost:5173/');
        cy.get('button').click();
        cy.contains('Add Task').click();
       // cy.get('.backdrop').click(); //fails because clicks middle of the item which is in the behind of the modal
        cy.get('.backdrop').click({force: true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create new tasks ', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some description');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('Some description');
        
    })

    it('should validate the input', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click(); 
        cy.contains('Please provide values');
    })

    it('should filter tasks' , () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click(); 
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some description');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
    });

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click(); 
        cy.get('#title').type('Task 1');
        cy.get('#summary').type('First task'); 
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.contains('Add Task').click(); 
        cy.get('#title').type('Task 2');
        cy.get('#summary').type('Second task'); 
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 2);

        cy.get('.task').eq(0).contains('First task')
        cy.get('.task').eq(1).contains('Second task')




    })
});