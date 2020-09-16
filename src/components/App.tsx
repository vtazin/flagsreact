import React, { Component } from "react";
import ColorTable from "./ColorTable";
import TypeSelector from "./TypeSelector";

export default class App extends Component {
  render() {
    return (
      <div>
        <ColorTable />
        <TypeSelector />
      </div>
    );
  }
}
