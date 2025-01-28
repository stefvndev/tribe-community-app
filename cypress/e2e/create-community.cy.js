describe("Create Community", () => {
  it("Should create a new community", () => {
    // Login user
    cy.visit("http://localhost:5173/login");
    cy.url().should("include", "/login");
    cy.get('[data-testid="email-input"]').type("test@test.com");
    cy.get('[data-testid="password-input"]').type("TestPassword123!");
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should("eq", "http://localhost:5173/");

    // Open the 'Create Community' page
    cy.get('[data-testid="create-community-link"]').click();

    // Fill in the form

    // - First step
    cy.get('[data-testid="community-name-input"]').type("Test Community");
    cy.get('[data-testid="community-description-input"]').type(
      "Lorem ipsum dolor sit amet consectetur adipiscing elit amet consectetur adipiscing elit met consectetur adipiscing elit"
    );
    cy.get('[data-testid="submit-button"]').click();

    // - Second step
    cy.get('[data-testid="community-category-option"]').click();
    cy.get('[data-testid="option-business"]').click();
    cy.get('[data-testid="community-type-option"]').click();
    cy.get('[data-testid="option-public"]').click();
    cy.get('[data-testid="community-pricing-option"]').click();
    cy.get('[data-testid="option-free"]').click();
    cy.get('[data-testid="submit-button"]').click();

    // - Third step
    cy.get('[data-testid="community-banner-input"]').attachFile(
      "test-image.jpg"
    );
    cy.get('[data-testid="community-image-input"]').attachFile(
      "test-image.jpg"
    );
    cy.get('[data-testid="submit-button"]').click();

    // Remove community (To prevent cluttering the database)
    cy.get('[data-testid="delete-community-button"]').click();
    cy.get('[data-testid="delete-community-input"]').type("Test Community");
    cy.get('[data-testid="delete-community-submit-button"]').click();
  });
});
