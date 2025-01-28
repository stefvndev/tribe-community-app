describe("Signup page", () => {
  it("Should create a Tribe account", () => {
    cy.visit("http://localhost:5173/signup");
    cy.url().should("include", "/signup");

    // Fill the form with valid credentials
    cy.get('[data-testid="name-input"]').type("Test name");
    cy.get('[data-testid="lastname-input"]').type("Test lastname");
    cy.get('[data-testid="email-input"]').type("test@test.com"); // should be changed for each test
    cy.get('[data-testid="password-input"]').type("TestPassword123!");

    cy.get('[data-testid="submit-button"]').click();

    // Check redirection to the home page
    cy.url().should("eq", "http://localhost:5173/login");
  });
});
