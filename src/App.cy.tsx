import React from "react";
import { Provider } from "react-redux";
import Store from "../src/Component/store/Store";
import App from "./App";
import { mount } from "cypress/react";
import { deleteFolder } from "./Component/store/reducer/userReducer";
import { useDispatch } from "react-redux";
import { Ifolder } from "./Component/data/Filedata";
import ParentChild from "./Component/filefolder/Parentchild";
import { Home } from "@mui/icons-material";


describe("<App />", () => {
  beforeEach(() => {
    mount(
      <Provider store={Store}>
        <App />
      </Provider>
    );
  });
});


























//  it("should dispatch delete folder action with the correct folder ID", () => {
   
//    cy.stub("dispatch").returns((action: any) => {
    
//      expect(action).to.deep.equal(deleteFolder(1)); 
//    });

   
//    cy.get("[data-cy=delete-folder-btn]").click();
//    cy.window()
//      .its("appInstance")
//      .then((app) => {
//        expect(app.handleDeleteFolder).to.be.a("function");
//        app.handleDeleteFolder();
//      });
//  });