import Quiz from "../../client/src/components/Quiz";
import { mount } from 'cypress/react18';

describe('Quiz Component', () => {
    beforeEach(() => {
        cy.intercept(
            {
                method: 'GET',
                url: '**/api/questions/random'
            },
            {
                fixture: 'questions.json',
                statusCode: 200
            }
        ).as('getQuestions');
    });

    it('should render the Quiz component', () => {
        mount(<Quiz />);
        cy.get('.btn').contains('Start Quiz').should('be.visible');
    });

    it('should start the quiz when the start Quiz button is clicked', () => {
        mount(<Quiz />)
        cy.get('.btn').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('.card h2').should('be.visible');
    });

    it('should show the score when the quiz is complete', () => {
        mount(<Quiz />)
        cy.get('.btn').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('.btn').contains('1').click();
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    });

    it('should allow user to start a new quiz', () => {
        mount(<Quiz />)
        cy.get('.btn').contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('.btn').contains('1').click();
        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
        cy.get('.btn').contains('Take New Quiz').click();
        cy.get('.card').should('be.visible');
        cy.get('h2').should('not.be.empty');
    });
});
