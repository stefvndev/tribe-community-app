describe("Login page", () => {
  it("should show validation errors when inputs are empty", () => {
    cy.visit("http://localhost:5173/login");
    cy.url().should("include", "/login");

    // Fill the form with empty inputs
    cy.get('[data-testid="email-input"]').clear();
    cy.get('[data-testid="password-input"]').clear();

    // Click the submit button
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="input-error"]').should("exist");

    cy.get('[data-testid="email-input"]')
      .siblings('[data-testid="input-error"]')
      .should("contain", "Email is required");

    // Check if the password input has an error message
    cy.get('[data-testid="password-input"]')
      .siblings('[data-testid="input-error"]')
      .should("contain", "Password is required");
  });

  it("should visit the login page and handle invalid login", () => {
    cy.visit("http://localhost:5173/login");
    cy.url().should("include", "/login");

    // Check the form exists
    cy.get('[data-testid="login-form"]').should("exist");

    // Fill the form with invalid credentials
    cy.get('[data-testid="email-input"]').type("invalidemail@example.com");
    cy.get('[data-testid="password-input"]').type("wrongpassword");
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("include", "/login");
  });

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
