import React from "react";
import ParentChild from "./Parentchild";
import { mount } from "cypress/react";
import { Provider } from "react-redux";
import Store, { RootState } from "../store/Store";
import explorer, { Ifolder } from "../data/Filedata";

describe("<ParentChild />", () => {
 
 

  const handleInsertNode = (
    folderId: number,
    item: string,
    isFolder: boolean,
    size: number,
    type: string,
    lastModifiedDate: number
  ) =>
   {
      
   };

   beforeEach(() => {
      mount(
      <Provider store={Store}>
        <ParentChild explorer={explorer} handleInsertNode={handleInsertNode} />
      </Provider>
    );
  });

   console.log("function" , handleInsertNode);

  // folder-click
  it("should handle folder click", () => {
    cy.contains("root").click();
    cy.contains("root").should("have.class", "selected_item");
  });

});
