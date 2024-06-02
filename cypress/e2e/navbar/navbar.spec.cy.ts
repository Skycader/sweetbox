describe('Check if navigation works fine', () => {
  it('should have a title in navbar NGRX Template App', () => {
    cy.visit('http://localhost:4200');
    cy.get('.app-title').should('contain.text', 'NGRX Template App');
  });

  it('should have a correctly working side-nav open button', () => {
    cy.visit('http://localhost:4200');
    cy.get('.open-side-nav').click();
    cy.get('.side-nav-navigation').should('contain.text', 'Navigation');

    cy.get('.close-side-nav-btn').click();
    cy.get('.side-nav').should('not.have.class', 'opened');
  });
});
