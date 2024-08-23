describe("template spec", () => {
  it("redirects to /items from source", () => {
    cy.visit("/");

    cy.url().should("include", "/items");
  });

  it("redirects to /items/{id} with information of the selected item on readonly view", () => {
    cy.visit("/");

    cy.get('[data-testid="custom-row-1"]').click();
    cy.url().should("include", "/items/1");

    cy.get('input[name="id"]').should("have.value", "1").should("have.attr", "readonly");
    cy.get('input[name="name"]').should("have.value", "Laptop").should("have.attr", "readonly");
    cy.get('textarea[name="description"]')
      .should("have.value", "Powerful laptop for work and gaming")
      .should("have.attr", "readonly");
    cy.get('input[name="location.id"]').should("have.value", "1").should("have.attr", "readonly");
    cy.get('textarea[name="location.state"]')
      .should("have.value", "Ciudad de Mexico")
      .should("have.attr", "readonly");
    cy.get('input[name="location.phoneNumber"]')
      .should("have.value", "50934900")
      .should("have.attr", "readonly");
    cy.get('textarea[name="location.address"]')
      .should(
        "have.value",
        "Palacio Regional, edificio 200, planta baja,Centro, Cuauhtemoc, Codigo Postal 06060, Ciudad de Mexico"
      )
      .should("have.attr", "readonly");
  });

  it("redirects to /items/{id} when clicking in an edit button with editable properties", () => {
    cy.visit("/items");
    cy.get('[data-testid="custom-row-1"]').find('button[aria-label="edit"]').click();

    cy.get('input[name="id"]').should("have.value", "1").should("have.attr", "readonly");
    cy.get('input[name="name"]').should("have.value", "Laptop").should("not.have.attr", "readonly");
    cy.get('textarea[name="description"]')
      .should("have.value", "Powerful laptop for work and gaming")
      .should("not.have.attr", "readonly");
    cy.get('input[name="location.id"]').should("have.value", "1").should("have.attr", "readonly");
    cy.get('textarea[name="location.state"]')
      .should("have.value", "Ciudad de Mexico")
      .should("have.attr", "readonly");
    cy.get('input[name="location.phoneNumber"]')
      .should("have.value", "50934900")
      .should("have.attr", "readonly");
    cy.get('textarea[name="location.address"]')
      .should(
        "have.value",
        "Palacio Regional, edificio 200, planta baja,Centro, Cuauhtemoc, Codigo Postal 06060, Ciudad de Mexico"
      )
      .should("have.attr", "readonly");
  });

  it("opens a modal when clicking in the delete button", () => {
    cy.visit("/items");
    cy.get('[data-testid="custom-row-1"]').find('button[aria-label="delete"]').click();

    cy.get('div[role="dialog"]')
      .should("be.visible")
      .within(() => {
        cy.get("h2").should("contain.text", "Laptop");
        cy.contains("button", "Cancel").should("be.visible");
        cy.contains("button", "Confirm").should("be.visible");
      });
  });
});
