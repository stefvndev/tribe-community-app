describe("Home page", () => {
  it("Should load the home page, apply the 'Health & Fitness' filter, and navigate to the 'Fitness Group' community card", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("eq", "http://localhost:5173/");

    // Verify that the 'Fitness Group' community card is rendered on the page
    cy.get('[data-testid="community-card-fitness-group"]').should("exist");

    // Apply the 'Health & Fitness' filter
    cy.get('[data-testid="filter-button-health-fitness"]').click();

    // Click on the 'Fitness Group' community card to view details
    cy.get('[data-testid="community-card-fitness-group"]').click();
  });

  it("Should load the home page, filter communities using the search input, and navigate to the 'Fitness Group' community card", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("eq", "http://localhost:5173/");

    // Use the search input to filter communities by the term 'Fitness'
    cy.get('[data-testid="search-input"]').click().type("Fitness");

    // Click on the 'Fitness Group' community card to view details
    cy.get('[data-testid="community-card-fitness-group"]').click();
  });
});
