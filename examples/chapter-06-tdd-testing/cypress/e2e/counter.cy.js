describe('Counter', () => {
  it('increments from the UI', () => {
    cy.visit('/');
    cy.contains('Increment').click();
    cy.findByTestId('count').should('have.text', '1');
  });
});
