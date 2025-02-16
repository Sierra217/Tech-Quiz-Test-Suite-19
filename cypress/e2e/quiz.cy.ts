describe('Quiz e2e flow', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
        cy.visit('http://localhost:3000');
    });
    it('should allow a user to complete the entire quiz', () => {
        cy.get('.btn').contains('Start Quiz').should('be.visible').click();
        cy.wait('@getQuestions');
            cy.get('.btn').contains('2').click();
            cy.get('.alert-success').contains('Your score:');
            cy.get('.btn').contains('Take New Quiz').click()
            cy.get('.card').should('be.visible');
            cy.get('h2').should('not.be.empty');
    })
});


