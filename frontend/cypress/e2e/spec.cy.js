// spec.cy.js

describe("My Web Application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Homepage test", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.title().should("include", "Countries App");
  });

});
