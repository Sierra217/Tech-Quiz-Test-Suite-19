describe('Quiz Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
        cy.visit('/');
    
    });

    it('should render the Quiz component', () => {
        cy.get('button').contains('Start Quiz').should('be.visible');
    })

    it('should start the quiz when the start Quiz button is clicked', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('.card h2').should('be.visible');
    })

    it('should show the score when the quiz is complete', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('button').contains('1').click();
        cy.get('button').contains('Next Question').click();
        cy.get('.alert-success').should('be.visible');
        cy.get('.alert-success').contains('Score:')
    })

    it('should allow user to start a new quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('button').contains('1').click();
        cy.get('button').contains('Next Question').click();
        cy.get('.alert-success').should('be.visible');
        cy.get('button').contains('Take New Quiz').should('be.visible').click();
        cy.get('button').contains('Start Quiz').click();
    });
});
