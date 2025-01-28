describe("Login page", () => {
  it("should redirect to home page on successful login", () => {
    cy.visit("http://localhost:5173/login");
    cy.url().should("include", "/login");

    // Fill the form with valid credentials
    cy.get('[data-testid="email-input"]').type("test@gmail.com");
    cy.get('[data-testid="password-input"]').type("TestPassword1!");
    cy.get('[data-testid="submit-button"]').click();

    // Check redirection to the home page
    cy.url().should("eq", "http://localhost:5173/");
  });
});
