describe('movie search app', () => {
beforeEach(() => {
  cy.visit('http://localhost:5173/')
});


  it('should contain form', () => {
    cy.get("form").should("exist");
    cy.get("form input#searchText").should("exist");
    cy.get("form button").contains("Sök").should("exist");
    cy.get("form button#sort").should("exist");
  })
})