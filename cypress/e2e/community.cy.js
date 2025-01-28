describe("Community page", () => {
  it("Should load the 'Fitness Group' community page, verify the community name, write a post, like the post, write a comment on it, and remove post ", () => {
    // Login user
    cy.visit("http://localhost:5173/login");
    cy.url().should("include", "/login");
    cy.get('[data-testid="email-input"]').type("test@test.com");
    cy.get('[data-testid="password-input"]').type("TestPassword123!");
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should("eq", "http://localhost:5173/");

    // Open the 'Fitness Group' community page
    cy.get('[data-testid="community-card-fitness-group"]').should("exist");
    cy.get('[data-testid="community-card-fitness-group"]').click();

    // Verify the community name
    cy.get('[data-testid="community-name"]').should(
      "have.text",
      "Fitness Group"
    );

    // Write a post
    cy.get('[data-testid="create-post-button"]').click();
    cy.get('[data-testid="post-title-input"]')
      .click()
      .type("Hello, this is a new post!");
    cy.get('[data-testid="post-description-input"]')
      .click()
      .type("Lorem ipsum description dolor");
    cy.get('[data-testid="submit-button"]').click();

    // Check if the post is displayed
    cy.get('[data-testid="post-card-title"]').should(
      "have.text",
      "Hello, this is a new post!"
    );

    // Like post
    cy.get('[data-testid="like-button"]').click();

    // Comment on post
    cy.get('[data-testid="post-card"]').click();
    cy.get('[data-testid="comment-input"]').click().type("Nice post!");
    cy.get('[data-testid="submit-button"]').click();

    // Delete post (To prevent cluttering the database)
    cy.get('[data-testid="popover-trigger-button"]').click();
    cy.get('[data-testid="delete-post-button"]').click();
  });
});
