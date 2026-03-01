describe('Feedback widget e2e', () => {
  it('lets a student submit feedback', () => {
    cy.visit('http://localhost:5173');

    cy.get('#comment').type('Very clear examples');
    cy.get('#rating').clear().type('5');
    cy.contains('button', 'Add Feedback').click();

    cy.contains('Very clear examples (5/5)').should('exist');
  });
});
