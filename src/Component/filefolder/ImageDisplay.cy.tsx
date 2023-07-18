import React from "react";
import ImageDisplay from "./ImageDisplay";
import { mount } from "cypress/react";
import { Provider } from "react-redux";
import Store from "../store/Store";

describe("<ImageDisplay />", () => {
  beforeEach("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <Provider store={Store}>
        <ImageDisplay />
      </Provider>
    );
  });
  it.only("should add file on specific area", () => {
    // const fileName = "11.png";
    cy.get(".input_box").click({ force: true });
    cy.get('input[id="fileInput"]').selectFile("cypress/images/11.png", {
      force: true,
    });
    cy.get('input[id="fileInput"]').should("contain.value", "11.png");
  });
});
