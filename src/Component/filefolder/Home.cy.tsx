import React from "react";
import Home from "./Home";
import { mount } from "cypress/react";
import { Provider } from "react-redux";
import Store from "../store/Store";
import cypress from "cypress";

describe("<Home />", () => {
  beforeEach(() => {
    mount(
      <Provider store={Store}>
        <Home />
      </Provider>
    );
  });

  it("renders the Home component", () => {
    cy.contains("add folder").should("be.visible");
    cy.contains("delete folder").should("be.visible");
    cy.contains("FOLDER").should("be.visible");
    cy.contains("FILE DETAILS AREA").should("be.visible");
    cy.contains("DROP AREA").should("be.visible");
    cy.contains("No folder selected").should("be.visible");
    cy.contains("No images / files selected").should("be.visible");
  });

  // ADD_NEW_FOLDER
  it("adds a new folder", () => {
    cy.get("[data-cy=add-folder-btn]").click();
    cy.get("[data-cy=new-folder-input]").type("Add New Folder");
    cy.get("[data-cy=submit-folder-btn]").click();
    cy.get("div[class=folder_style]").contains("Add New Folder");
  });

  // DELETE_FOLDER
  it("deletes a folder", () => {
    cy.get("div[class=folder_style]").contains("Add New Folder").click();
    cy.get("[data-cy=delete-folder-btn]").click();
    cy.get("div[class=folder_style]").should("not.contain", "Add New Folder");
  });

  // ADD_NESTED_FOLDER
  it("should call handleInsertNode with the correct arguments", () => {
    const item = "New Folder";
    cy.contains(".folder_style", "root-2").click();
    cy.contains("[data-cy=add-folder]", "Folder +").click({ multiple: true });
    cy.get("[data-cy=add-folder-input]").should("be.visible");
    cy.get("[data-cy=add-folder-input]").type(`${item}`).type("{enter}");
    cy.contains("📁Folder-name :").should("be.visible");
  });

  // ADD_NESTED_FILE
  it("should call handleInsertNode with the correct arguments", () => {
    const item = "newFile.tsx";
    cy.contains(".folder_style", "root-2").click();
    cy.contains("[data-cy=add-file]", "File +").click({ multiple: false });
    cy.get("[data-cy=add-folder-input]").should("be.visible");
    cy.get("[data-cy=add-folder-input]").type(`${item}`).type("{enter}");
  });

  // CHECK_DISPLAY_FOLDER
  it("should add folder display it ", () => {
    let selectedFolder = { name: "root" };
    cy.get(".add_folder").should("have.text", selectedFolder.name);
    cy.contains("[data-cy=display_folder]", "New Folder").should("exist");
  });

  //  CHECK_DISPLAY_FILE
  it("should add new file display it ", () => {
    cy.contains("[data-cy=display_file]", "newFile.tsx").should("exist");
  });

  //OPEN_FILE_UPLOADER
  it("should add file on specific area", () => {
    // const fileName = "11.png";
    cy.get(".input_box").click({ force: true });
    cy.get('input[id="fileInput"]').selectFile("cypress/images/11.png", {
      force: true,
    });
    cy.get('input[id="fileInput"]').should("contain.value", "11.png");
  });

});
