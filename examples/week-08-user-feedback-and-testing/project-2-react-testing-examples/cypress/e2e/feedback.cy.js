describe('Feedback widget e2e', () => {
  it('lets a student submit feedback', () => {
    cy.visit('/');

    cy.get('#comment').type('Very clear examples');
    cy.get('#rating').click().type('{selectall}5').should('have.value', '5');
    cy.contains('button', 'Add Feedback').click();

    cy.contains('Very clear examples (5/5)').should('exist');
  });
});
