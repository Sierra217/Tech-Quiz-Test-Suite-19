describe('Quiz e2e flow', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
        cy.visit('/');
    });
    it('should allow a usder to complete the entire quiz', () => {
        cy.get('button').contains('Start Quiz').should('be.visible').click();
        cy.wait('@getQuestions');
        cy.fixture('questions.json').then((questions) => {
            questions.forEach((_: any, index: number) => {
                cy.get('button').contains(/\d+/).first().click();
                if (index < questions.length - 1) {
                    cy.get('button').contains('Next Question').should('be.visible').click();
                }
            })
        });

        cy.get('.alert-success').should('be.visible').contains('Score:');
        cy.get('button').contains('Take New Quiz').should('be visible').click();
        cy.get('button').contains('Start Quiz').should('be.visible');
    });
});